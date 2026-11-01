/**
 * Service quản lý bình luận Blog & Phản hồi Tác giả
 * Lưu trữ bền vững qua localStorage + phát event đồng bộ thời gian thực
 */
import { POSTS as defaultPosts } from '../designs/design4/components/blog/blogData';

const STORAGE_KEY = 'portfolio_blog_comments';
const GUEST_NAME_KEY = 'blog_guest_name';

/**
 * Tìm canonical key cho bài viết (ưu tiên slug duy nhất, ví dụ 'mot-nam-dung-react-server-components')
 */
export function getCanonicalPostKey(postOrId) {
  if (!postOrId) return '';
  if (typeof postOrId === 'object' && postOrId !== null) {
    if (postOrId.slug) return postOrId.slug;
    if (postOrId.post_id) return postOrId.post_id;
    if (postOrId.title) {
      const matched = defaultPosts.find(
        (dp) => dp.title.toLowerCase().trim() === postOrId.title.toLowerCase().trim()
      );
      if (matched?.slug) return matched.slug;
    }
    return String(postOrId.id);
  }
  const idStr = String(postOrId);
  const matched = defaultPosts.find((dp) => dp.slug === idStr || String(dp.id) === idStr);
  return matched?.slug || idStr;
}

/**
 * Tìm default comments từ defaultPosts
 */
function findDefaultComments(postOrId) {
  if (!postOrId) return [];
  if (typeof postOrId === 'object' && postOrId !== null) {
    if (Array.isArray(postOrId.comments) && postOrId.comments.length > 0) {
      return postOrId.comments;
    }
  }
  const idStr =
    typeof postOrId === 'object' ? postOrId.slug || String(postOrId.id) : String(postOrId);
  const matched = defaultPosts.find(
    (dp) =>
      dp.slug === idStr ||
      String(dp.id) === idStr ||
      (typeof postOrId === 'object' &&
        dp.title?.toLowerCase().trim() === postOrId.title?.toLowerCase().trim())
  );
  return matched?.comments || [];
}

/**
 * Kiểm tra xem người dùng hiện tại có đang đăng nhập Admin không
 */
export function checkIsAdmin() {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem('admin_session');
    if (!raw) return false;
    const session = JSON.parse(raw);
    return Boolean(session && (session.logged_in || session.username || session.id));
  } catch {
    return false;
  }
}

/**
 * Lấy thông tin Tác giả / Admin hiện tại
 */
export function getAuthorInfo() {
  if (typeof window === 'undefined') return { name: 'Lê Văn Đạt', role: 'Tác giả' };
  try {
    const raw = localStorage.getItem('admin_session');
    if (raw) {
      const session = JSON.parse(raw);
      return {
        name: session.name || session.fullname || session.username || 'Lê Văn Đạt',
        role: 'Tác giả',
      };
    }
  } catch {}
  return { name: 'Lê Văn Đạt', role: 'Tác giả' };
}

/**
 * Lấy tên khách đã lưu trong trình duyệt
 */
export function getStoredGuestName() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(GUEST_NAME_KEY) || '';
}

/**
 * Lưu tên khách vào trình duyệt cho lần sau
 */
export function setStoredGuestName(name) {
  if (typeof window === 'undefined') return;
  if (name && name.trim()) {
    localStorage.setItem(GUEST_NAME_KEY, name.trim());
  }
}

/**
 * Lấy toàn bộ từ điển bình luận từ localStorage
 */
function getAllCommentsDict() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Lưu toàn bộ từ điển bình luận vào localStorage
 */
function saveAllCommentsDict(dict) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dict));
    window.dispatchEvent(new CustomEvent('portfolio_comments_changed', { detail: dict }));
  } catch (e) {
    console.error('Lỗi khi lưu bình luận vào localStorage:', e);
  }
}

/**
 * Chuẩn hóa 1 item comment
 */
export function normalizeComment(c, idx = 0, defaultPostId = null) {
  if (!c) return null;
  return {
    id: c.id || `cmt_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
    postId: c.postId || defaultPostId,
    name: c.name || (c.isAuthor ? 'Lê Văn Đạt' : 'bạn'),
    text: c.text || c.content || '',
    createdAt: c.createdAt || c.created_at || new Date().toISOString(),
    isAuthor: Boolean(c.isAuthor || c.is_author),
    replyToId: c.replyToId || c.reply_to_id || null,
    replyToName: c.replyToName || c.reply_to_name || null,
  };
}

/**
 * Lấy danh sách bình luận của một bài viết (kết hợp dữ liệu gốc + lưu trữ)
 */
export function getCommentsForPost(postOrId, fallbackComments = []) {
  if (!postOrId) return [];
  const dict = getAllCommentsDict();
  const canonicalKey = getCanonicalPostKey(postOrId);
  const rawId = typeof postOrId === 'object' ? String(postOrId.id || '') : String(postOrId);

  let saved = dict[canonicalKey] || (rawId ? dict[rawId] : null);

  const defaults = findDefaultComments(postOrId);
  const baseDefaults =
    fallbackComments && fallbackComments.length > 0 ? fallbackComments : defaults;

  // Nếu trong storage chưa có hoặc đang rỗng mà bài viết vốn có comment mặc định:
  if (!saved || (Array.isArray(saved) && saved.length === 0 && baseDefaults.length > 0)) {
    const normalized = baseDefaults
      .map((c, i) => normalizeComment(c, i, canonicalKey))
      .filter(Boolean);
    dict[canonicalKey] = normalized;
    if (rawId && rawId !== canonicalKey) {
      dict[rawId] = normalized;
    }
    saveAllCommentsDict(dict);
    return normalized;
  }

  return Array.isArray(saved) ? saved : [];
}

/**
 * Thêm một bình luận mới (cho cả Khách và Tác giả / Admin)
 */
export function addCommentToPost({
  postOrId,
  postId,
  name,
  text,
  isAuthor = false,
  replyToId = null,
  replyToName = null,
}) {
  const target = postOrId || postId;
  if (!target || !text || !text.trim()) return null;

  const canonicalKey = getCanonicalPostKey(target);
  const rawId = typeof target === 'object' ? String(target.id || '') : String(target);
  const dict = getAllCommentsDict();
  const currentList = getCommentsForPost(target);

  let finalName = (name || '').trim();
  let finalIsAuthor = Boolean(isAuthor);

  if (finalIsAuthor) {
    const author = getAuthorInfo();
    finalName = author.name;
  } else {
    if (!finalName) {
      finalName = getStoredGuestName() || 'Người đọc';
    } else {
      setStoredGuestName(finalName);
    }
  }

  const newComment = {
    id: `cmt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    postId: canonicalKey,
    name: finalName,
    text: text.trim(),
    createdAt: new Date().toISOString(),
    isAuthor: finalIsAuthor,
    replyToId: replyToId || null,
    replyToName: replyToName || null,
  };

  const updatedList = [...currentList, newComment];
  dict[canonicalKey] = updatedList;
  if (rawId && rawId !== canonicalKey) {
    dict[rawId] = updatedList;
  }
  saveAllCommentsDict(dict);
  return newComment;
}

/**
 * Xóa một bình luận (Chỉ tác giả / Admin mới có quyền gọi)
 */
export function deleteCommentFromPost(postOrId, commentId) {
  if (!postOrId || !commentId) return false;

  const canonicalKey = getCanonicalPostKey(postOrId);
  const rawId = typeof postOrId === 'object' ? String(postOrId.id || '') : String(postOrId);
  const dict = getAllCommentsDict();
  const currentList = getCommentsForPost(postOrId);

  const updatedList = currentList.filter((c) => c.id !== commentId);
  dict[canonicalKey] = updatedList;
  if (rawId && rawId !== canonicalKey) {
    dict[rawId] = updatedList;
  }
  saveAllCommentsDict(dict);
  return true;
}

/**
 * Format thời gian thân thiện tiếng Việt
 */
export function formatRelativeTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSec < 45) return 'vừa xong';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} phút trước`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} giờ trước`;
  if (diffSec < 86400 * 7) return `${Math.floor(diffSec / 86400)} ngày trước`;

  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}
