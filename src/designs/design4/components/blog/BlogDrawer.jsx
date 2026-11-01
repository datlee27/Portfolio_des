import React, { useState, useEffect } from 'react';
import './blog.css';
import { Trash2, Reply, X, CornerDownRight } from 'lucide-react';
import { IconClose } from './BlogIcons';
import BlogMediaGallery from './BlogMediaGallery';
import BlogMediaLightbox from './BlogMediaLightbox';
import BlogEmojiLikeButton from './BlogEmojiLikeButton';
import { formatDate } from './blogData';
import {
  getCommentsForPost,
  addCommentToPost,
  deleteCommentFromPost,
  formatRelativeTime,
  getAuthorInfo,
  getStoredGuestName,
  setStoredGuestName,
} from '../../../../services/commentsService';

export default function BlogDrawer({
  post,
  theme,
  likedPosts = {},
  onClose,
  onToggleLike,
  isAdmin: propIsAdmin = false,
}) {
  const isOpen = Boolean(post);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Chỉ bật quyền quản trị viên khi truyền isAdmin = true (trong Admin)
  // Khi ở ngoài blog công khai, mặc định là false (giống như khách thông thường)
  const isAdmin = Boolean(propIsAdmin);

  const authorInfo = getAuthorInfo();

  // Comments state
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [guestName, setGuestName] = useState(() => getStoredGuestName());
  const [draftText, setDraftText] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Load comments when post changes
  useEffect(() => {
    if (post) {
      const initialList = post.comments || [];
      const loaded = getCommentsForPost(post, initialList);
      setComments(loaded);
      setReplyingTo(null);
      setDeletingId(null);
      setDraftText('');
    }
  }, [post?.id, post?.slug]);

  // Realtime comments sync across tabs and windows
  useEffect(() => {
    const handleSync = () => {
      if (post) {
        setComments(getCommentsForPost(post, post.comments || []));
      }
    };
    window.addEventListener('portfolio_comments_changed', handleSync);
    return () => window.removeEventListener('portfolio_comments_changed', handleSync);
  }, [post?.id, post?.slug]);

  const rawLikes = post
    ? (typeof post.likes === 'number' && !isNaN(post.likes)
      ? post.likes
      : (!isNaN(parseInt(post.total_likes, 10)) && parseInt(post.total_likes, 10) > 0
        ? parseInt(post.total_likes, 10)
        : (parseInt(post.likes, 10) || 12)))
    : 0;
  const likeCount = Math.max(0, rawLikes) + (likedPosts[post?.id] ? 1 : 0);

  // Tự động nhận diện media nếu bài viết có media hoặc image_url / image
  const media =
    post?.media ||
    (post?.image_url || post?.image
      ? { type: 'image', items: [post.image_url || post.image] }
      : null);
  const mediaItems = media?.items || [];

  function handleOpenLightbox(index = 0) {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  function handleReply(comment) {
    setReplyingTo({
      id: comment.id,
      name: comment.name,
    });
    // Focus into input
    const inputEl = document.getElementById('blog-drawer-comment-input');
    if (inputEl) inputEl.focus();
  }

  function handleCancelReply() {
    setReplyingTo(null);
  }

  function handleSendComment() {
    const text = draftText.trim();
    if (!text || !post?.id) return;

    if (!isAdmin && guestName.trim()) {
      setStoredGuestName(guestName.trim());
    }

    addCommentToPost({
      postOrId: post,
      name: isAdmin ? authorInfo.name : guestName,
      text,
      isAuthor: isAdmin,
      replyToId: replyingTo?.id || null,
      replyToName: replyingTo?.name || null,
    });

    setDraftText('');
    setReplyingTo(null);
  }

  function handleDeleteComment(commentId) {
    if (!post || !commentId) return;
    deleteCommentFromPost(post, commentId);
    setDeletingId(null);
  }

  return (
    <>
      <div className="blog-drawer-overlay" data-open={String(isOpen)}>
        <div className="blog-drawer-backdrop" onClick={onClose} />

        <div
          className="blog-drawer-panel"
          data-open={String(isOpen)}
          style={{ backgroundColor: theme.surface, color: theme.text }}
        >
          {post && (
            <div className="blog-drawer-content">
              {/* Borderless Close Button */}
              <button
                onClick={onClose}
                aria-label="đóng bài viết"
                className="blog-drawer-close-btn"
                style={{ color: theme.muted }}
              >
                <IconClose size={16} />
              </button>

              <p className="blog-drawer-date" style={{ color: theme.muted }}>
                {formatDate(post.date)}
              </p>
              <p className="blog-drawer-tag" style={{ color: theme.accent }}>
                {post.tag}
              </p>

              <h2 className="blog-drawer-title">{post.title}</h2>

              {/* Media Gallery (Hero image or carousel slider with expand to lightbox) */}
              {media && mediaItems.length > 0 && (
                <div className="blog-drawer-media-section">
                  <BlogMediaGallery
                    media={media}
                    onOpenLightbox={handleOpenLightbox}
                    theme={theme}
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="blog-drawer-paragraphs">
                {Array.isArray(post.content) ? (
                  post.content.map((para, i) => <p key={i}>{para}</p>)
                ) : typeof post.content === 'string' && post.content.includes('<') ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : (
                  (post.content || '').split('\n').filter(Boolean).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))
                )}
              </div>

              {/* Like Button — Framer Emoji-Buttons effect */}
              <div className="blog-drawer-like-wrap">
                <BlogEmojiLikeButton
                  isLiked={!!likedPosts[post.id]}
                  likeCount={likeCount}
                  onToggleLike={() => onToggleLike && onToggleLike(post.id)}
                  theme={theme}
                  size="default"
                />
              </div>

              {/* Comments Section */}
              <div
                className="blog-comments-section"
                style={{ borderTop: `1px solid ${theme.border}` }}
              >
                <p className="blog-comments-count" style={{ color: theme.muted }}>
                  phản hồi ({comments.length})
                </p>

                {/* Comment List */}
                <div className="blog-comment-list">
                  {comments.length === 0 ? (
                    <p style={{ fontSize: 13, color: theme.muted, fontStyle: 'italic', margin: '8px 0 16px' }}>
                      Chưa có phản hồi nào. Hãy là người đầu tiên để lại vài dòng!
                    </p>
                  ) : (
                    comments.map((c) => (
                      <div
                        key={c.id}
                        className="blog-comment-item"
                      >
                        {/* Header: Name, Author Badge, Time, Delete */}
                        <div className="blog-comment-header">
                          <div className="blog-comment-author-wrap">
                            <p className="blog-comment-author" style={{ color: theme.text }}>
                              {c.name}
                              {c.isAuthor && (
                                <span className="blog-author-tag" style={{ color: theme.muted }}>
                                  {' '}· tác giả
                                </span>
                              )}
                            </p>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span className="blog-comment-time" style={{ color: theme.muted }}>
                              {formatRelativeTime(c.createdAt)}
                            </span>

                            {/* Nút Xóa bình luận dành riêng cho Admin */}
                            {isAdmin && (
                              deletingId === c.id ? (
                                <div className="blog-comment-delete-confirm">
                                  <span>Xóa?</span>
                                  <button
                                    onClick={() => handleDeleteComment(c.id)}
                                    className="blog-comment-delete-confirm-btn"
                                  >
                                    Có
                                  </button>
                                  <button
                                    onClick={() => setDeletingId(null)}
                                    className="blog-comment-delete-cancel-btn"
                                  >
                                    Hủy
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeletingId(c.id)}
                                  className="blog-comment-delete-btn"
                                  title="Xóa bình luận này (Admin)"
                                >
                                  <Trash2 size={12} />
                                </button>
                              )
                            )}
                          </div>
                        </div>

                        {/* Reply Target Info */}
                        {c.replyToName && (
                          <div className="blog-comment-reply-target">
                            <CornerDownRight size={11} />
                            <span>trả lời <strong>@{c.replyToName}</strong></span>
                          </div>
                        )}

                        {/* Text */}
                        <p className="blog-comment-text" style={{ color: theme.muted }}>
                          {c.text}
                        </p>

                        {/* Action: Reply button */}
                        <div className="blog-comment-actions">
                          <button
                            onClick={() => handleReply(c)}
                            className="blog-comment-reply-btn"
                            style={{ color: theme.muted }}
                          >
                            <Reply size={11} />
                            <span>Trả lời</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Comment Form */}
                <div style={{ marginTop: 20 }}>
                  {/* Banner hiển thị nếu đang đăng nhập Admin */}
                  {isAdmin && (
                    <div className="blog-comment-author-badge-banner">
                      <span className="blog-author-indicator-dot" />
                      <span>
                        Đang phản hồi với tư cách <strong>Tác giả (admin)</strong>
                      </span>
                    </div>
                  )}

                  {/* Banner đang trả lời ai đó */}
                  {replyingTo && (
                    <div className="blog-comment-replying-pill">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <CornerDownRight size={12} />
                        <span>
                          Đang trả lời <strong>@{replyingTo.name}</strong>
                        </span>
                      </div>
                      <button
                        onClick={handleCancelReply}
                        className="blog-comment-cancel-reply-btn"
                        title="Hủy trả lời"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  )}

                  {/* Nhập tên cho khách (nếu không phải Admin) */}
                  {!isAdmin && (
                    <div className="blog-comment-guest-wrap">
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Tên của bạn..."
                        aria-label="tên của bạn"
                        className="blog-comment-guest-input"
                        style={{ color: theme.text }}
                        maxLength={40}
                      />
                    </div>
                  )}

                  {/* Form nội dung */}
                  <div className="blog-comment-form">
                    <input
                      id="blog-drawer-comment-input"
                      type="text"
                      value={draftText}
                      onChange={(e) => setDraftText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendComment();
                      }}
                      placeholder={
                        replyingTo
                          ? `Trả lời @${replyingTo.name}...`
                          : (isAdmin ? 'viết phản hồi từ tác giả...' : 'để lại vài dòng...')
                      }
                      aria-label="viết bình luận"
                      className="blog-comment-input"
                      style={{ color: theme.text, borderBottomColor: theme.border }}
                    />
                    <button
                      onClick={handleSendComment}
                      disabled={!draftText.trim()}
                      className="blog-comment-submit"
                      style={{ color: draftText.trim() ? theme.accent : theme.muted }}
                    >
                      gửi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Media Lightbox Viewer */}
      {post && (
        <BlogMediaLightbox
          isOpen={lightboxOpen}
          items={mediaItems}
          type={post.media ? post.media.type : 'image'}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          theme={theme}
        />
      )}
    </>
  );
}
