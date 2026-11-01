import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Image as ImageIcon,
  Calendar,
  Clock,
  User,
  X,
  Search,
  Upload,
  Loader2,
} from 'lucide-react';
import api from '../../services/api';
import { uploadToCloudinary } from '../../services/cloudinary';
import { usePortfolio } from '../../context/PortfolioContext';
import AdminMacModal from '../components/AdminMacModal';
import BlogDrawer from '../../designs/design4/components/blog/BlogDrawer';
import { THEMES } from '../../designs/design4/components/blog/blogData';
import { getCommentsForPost } from '../../services/commentsService';
import '../../designs/design4/components/blog/blog.css';

// Helper to generate SEO-friendly slug
function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function BlogTab({ posts = [], onRefresh, showToast }) {
  const { updatePosts: contextUpdatePosts, posts: ctxPosts } = usePortfolio();

  const [localPosts, setLocalPosts] = useState(() => {
    if (posts && posts.length > 0) return posts;
    return ctxPosts || [];
  });

  useEffect(() => {
    if (posts && posts.length > 0) {
      setLocalPosts(posts);
    } else if (ctxPosts && ctxPosts.length > 0) {
      setLocalPosts(ctxPosts);
    }
  }, [posts, ctxPosts]);

  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [saving, setSaving] = useState(false);

  // Xem bài viết và quản lý bình luận dạng drawer trượt bên phải
  const [viewingPost, setViewingPost] = useState(null);

  // Đồng bộ số lượng bình luận theo thời gian thực
  const [, setCommentsTick] = useState(0);
  useEffect(() => {
    const handleSync = () => setCommentsTick((t) => t + 1);
    window.addEventListener('portfolio_comments_changed', handleSync);
    return () => window.removeEventListener('portfolio_comments_changed', handleSync);
  }, []);

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Form State
  const getTodayDate = () => new Date().toISOString().split('T')[0];
  const initialFormState = {
    title: '',
    slug: '',
    excerpt: '',
    content: '<p>Nội dung chi tiết bài viết...</p>',
    author: 'Lê Văn Đạt',
    published_date: getTodayDate(),
    read_time: 5,
    image_url: '',
  };
  const [formData, setFormData] = useState(initialFormState);

  // Filtered posts
  const filteredPosts = localPosts.filter((p) => {
    const term = searchTerm.toLowerCase();
    const title = (p.title || '').toLowerCase();
    const excerpt = (p.excerpt || '').toLowerCase();
    const slug = (p.slug || '').toLowerCase();
    return title.includes(term) || excerpt.includes(term) || slug.includes(term);
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [localPreview, setLocalPreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Vui lòng chọn file hình ảnh hợp lệ (PNG, JPG, WEBP, GIF).', 'error');
      return;
    }
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);
  };

  const handleClearSelectedFile = () => {
    setSelectedFile(null);
    setLocalPreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setSelectedFile(null);
    setLocalPreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setFormData({ ...initialFormState, published_date: getTodayDate() });
    setModalOpen(true);
  };

  const handleOpenEdit = (post) => {
    setIsEditing(true);
    const targetPostId = post.post_id || post.id;
    setCurrentId(targetPostId);
    setSelectedFile(null);
    setLocalPreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setFormData({
      title: post.title || '',
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      author: post.author || 'Lê Văn Đạt',
      published_date: post.published_date || post.date || getTodayDate(),
      read_time: post.read_time || post.readTime || 5,
      image_url: post.image_url || post.image || '',
    });
    setModalOpen(true);
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    if (!isEditing) {
      setFormData({
        ...formData,
        title: val,
        slug: generateSlug(val),
      });
    } else {
      setFormData({ ...formData, title: val });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Vui lòng nhập tiêu đề bài viết.', 'error');
      return;
    }

    setSaving(true);
    try {
      let finalImageUrl = formData.image_url.trim();

      // Upload to Cloudinary if local file was selected
      if (selectedFile) {
        setUploadingImage(true);
        try {
          const uploadRes = await uploadToCloudinary(selectedFile);
          finalImageUrl = uploadRes.secure_url;
        } catch (uploadErr) {
          console.error('Lỗi upload Cloudinary:', uploadErr);
          showToast(`Lỗi tải ảnh lên Cloudinary: ${uploadErr.message}`, 'error');
          setSaving(false);
          setUploadingImage(false);
          return;
        } finally {
          setUploadingImage(false);
        }
      }

      const payload = {
        ...formData,
        id: isEditing ? currentId : String(Date.now()),
        post_id: isEditing ? currentId : `post-${Date.now()}`,
        read_time: Number(formData.read_time) || 5,
        readTime: `${Number(formData.read_time) || 5} min read`,
        image: finalImageUrl,
        image_url: finalImageUrl,
        date: formData.published_date,
        media: finalImageUrl ? { type: 'image', items: [finalImageUrl] } : null,
      };

      if (isEditing) {
        await api.updatePost(currentId, payload);
        showToast('Cập nhật bài viết thành công!', 'success');
      } else {
        await api.createPost(payload);
        showToast('Đăng bài viết mới thành công!', 'success');
      }

      let updatedList;
      if (isEditing) {
        updatedList = localPosts.map((p) =>
          (p.id === currentId || p.post_id === currentId) ? { ...p, ...payload } : p
        );
      } else {
        updatedList = [payload, ...localPosts];
      }

      setLocalPosts(updatedList);
      if (contextUpdatePosts) {
        contextUpdatePosts(updatedList);
      }

      setModalOpen(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Lỗi lưu bài viết:', err);
      showToast(err.message || 'Lỗi khi lưu bài viết trên máy chủ.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (target) => {
    setDeleting(true);
    try {
      const targetPostId = typeof target === 'object' && target !== null 
        ? (target.post_id || target.id) 
        : target;

      await api.deletePost(targetPostId);
      
      const updatedList = localPosts.filter((p) => p.id !== targetPostId && p.post_id !== targetPostId);
      setLocalPosts(updatedList);
      if (contextUpdatePosts) {
        contextUpdatePosts(updatedList);
      }

      showToast('Đã xóa bài viết thành công!', 'success');
      setDeleteConfirmId(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Lỗi xóa bài viết:', err);
      showToast(err.message || 'Lỗi khi xóa bài viết.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      {/* ─── Header & Controls ─── */}
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">Bài Viết & Ghi Chép</h2>
        </div>

        <div className="admin-section-controls">
          {/* Search Box */}
          <div className="admin-search-wrapper" style={{ position: 'relative', width: 220 }}>
            <input
              type="text"
              className="admin-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm bài viết..."
              style={{ paddingLeft: 34, height: 36, fontSize: 13 }}
            />
            <Search
              size={14}
              style={{
                position: 'absolute',
                left: 11,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--admin-text-muted)',
              }}
            />
          </div>

          {/* Add Post Button */}
          <button id="btn-add-post" onClick={handleOpenAdd} className="admin-btn admin-btn-primary" style={{ height: 36, padding: '0 14px' }}>
            <Plus size={15} />
            <span>Viết Bài Mới</span>
          </button>
        </div>
      </div>

      {/* ─── Posts Table ─── */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 80 }}>Ảnh</th>
              <th>Tiêu Đề & Slug</th>
              <th>Tóm Tắt</th>
              <th style={{ width: 140 }}>Tác Giả & Ngày</th>
              <th style={{ width: 100 }}>Thời Lượng</th>
              <th style={{ width: 110, textAlign: 'right' }}>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--admin-text-muted)' }}>
                  Không tìm thấy bài viết nào phù hợp.
                </td>
              </tr>
            ) : (
              filteredPosts.map((p) => {
                const postId = p.post_id || p.id;
                return (
                  <tr key={postId}>
                    {/* Thumbnail */}
                    <td onClick={() => setViewingPost(p)} style={{ cursor: 'pointer' }} title="Bấm để xem bài viết">
                      <div
                        style={{
                          width: 60,
                          height: 40,
                          borderRadius: 4,
                          overflow: 'hidden',
                          background: '#f1f5f9',
                          border: '1px solid var(--admin-card-border)',
                        }}
                      >
                        {p.image_url || p.image ? (
                          <img
                            src={p.image_url || p.image}
                            alt={p.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-text-muted)' }}>
                            <ImageIcon size={15} />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Title & Slug */}
                    <td>
                      <div
                        onClick={() => setViewingPost(p)}
                        style={{
                          fontWeight: 600,
                          color: 'var(--admin-text)',
                          fontSize: 13.5,
                          cursor: 'pointer',
                          display: 'inline-block',
                          transition: 'color 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--admin-accent)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--admin-text)')}
                        title="Bấm để xem bài viết & trả lời bình luận (Drawer)"
                      >
                        {p.title}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 3 }}>
                        <span style={{ fontSize: 11, color: 'var(--admin-text-muted)', fontFamily: 'monospace' }}>
                          /{p.slug || 'post'}
                        </span>
                        <span style={{ fontSize: 11, color: 'var(--admin-accent)', fontWeight: 500 }}>
                          💬 {getCommentsForPost(p).length}
                        </span>
                      </div>
                    </td>

                    {/* Excerpt */}
                    <td>
                      <div
                        style={{
                          fontSize: 12,
                          color: 'var(--admin-text-muted)',
                          maxWidth: 320,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        title={p.excerpt}
                      >
                        {p.excerpt || 'Chưa có tóm tắt'}
                      </div>
                    </td>

                    {/* Author & Date */}
                    <td>
                      <div style={{ fontSize: 12, color: 'var(--admin-text)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <User size={11} style={{ color: 'var(--admin-text-muted)' }} />
                        <span>{p.author || 'Lê Văn Đạt'}</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--admin-text-muted)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Calendar size={11} />
                        <span>{p.published_date || p.date || '—'}</span>
                      </div>
                    </td>

                    {/* Read Time */}
                    <td>
                      <span className="admin-badge admin-badge-blue">
                        <Clock size={11} />
                        <span>{p.read_time || p.readTime || 5} min</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="admin-btn-icon"
                          title="Sửa bài viết"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(p)}
                          className="admin-btn-icon"
                          style={{ color: '#ef4444' }}
                          title="Xóa bài viết"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ─── Add / Edit macOS Modal ─── */}
      <AdminMacModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? 'Chỉnh Sửa Bài Viết' : 'Tạo Bài Viết Mới'}
        prefix="Editor — "
        maxWidth={740}
      >
        <form onSubmit={handleSubmit} className="admin-modal-form">
          <div className="admin-modal-body">
            {/* Title */}
            <div className="admin-form-group">
              <label className="admin-form-label">Tiêu đề</label>
              <input
                type="text"
                className="admin-input"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Nhập tiêu đề bài viết..."
                required
              />
            </div>

            {/* Slug */}
            <div className="admin-form-group">
              <label className="admin-form-label">Đường dẫn (Slug)</label>
              <input
                type="text"
                className="admin-input"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="duong-dan-bai-viet"
                required
              />
            </div>

            {/* Excerpt */}
            <div className="admin-form-group">
              <label className="admin-form-label">Tóm tắt</label>
              <textarea
                className="admin-textarea"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Tóm tắt ngắn gọn nội dung..."
                rows={2}
              />
            </div>

            {/* Row: Author, Date, Read Time */}
            <div className="admin-form-grid-3">
              <div className="admin-form-group">
                <label className="admin-form-label">Tác giả</label>
                <input
                  type="text"
                  className="admin-input"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Lê Văn Đạt"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Ngày đăng</label>
                <input
                  type="date"
                  className="admin-input"
                  value={formData.published_date}
                  onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Thời gian đọc (phút)</label>
                <input
                  type="number"
                  min="1"
                  className="admin-input"
                  value={formData.read_time}
                  onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                />
              </div>
            </div>

            {/* Image URL & File Picker */}
            <div className="admin-form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label className="admin-form-label" style={{ margin: 0 }}>Ảnh bìa</label>
                <span style={{ fontSize: 11.5, color: 'var(--admin-text-muted)' }}>
                  Nhập URL hoặc chọn file từ máy
                </span>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  type="text"
                  className="admin-input"
                  style={{ flex: 1 }}
                  value={selectedFile ? `📁 ${selectedFile.name}` : formData.image_url}
                  onChange={(e) => {
                    if (!selectedFile) {
                      setFormData({ ...formData, image_url: e.target.value });
                    }
                  }}
                  placeholder="https://... hoặc bấm nút bên phải để chọn ảnh"
                  readOnly={Boolean(selectedFile)}
                />

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                  style={{ display: 'none' }}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="admin-btn admin-btn-secondary"
                  style={{
                    height: 38,
                    padding: '0 12px',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12.5,
                  }}
                  title="Chọn ảnh từ máy tính / thư viện"
                >
                  <Upload size={14} />
                  <span>Chọn từ thư viện</span>
                </button>

                {selectedFile && (
                  <button
                    type="button"
                    onClick={handleClearSelectedFile}
                    className="admin-btn admin-btn-secondary"
                    style={{
                      height: 38,
                      padding: '0 10px',
                      color: '#ef4444',
                      display: 'inline-flex',
                      alignItems: 'center',
                    }}
                    title="Bỏ chọn file này"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Instant Image Preview */}
              {(localPreview || formData.image_url) && (
                <div
                  style={{
                    marginTop: 10,
                    padding: '8px 12px',
                    borderRadius: 8,
                    background: '#f8fafc',
                    border: '1px solid var(--admin-card-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 48,
                      borderRadius: 4,
                      overflow: 'hidden',
                      background: '#e2e8f0',
                      border: '1px solid #cbd5e1',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={localPreview || formData.image_url}
                      alt="Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>

                  <div style={{ fontSize: 12, lineHeight: 1.4, flex: 1 }}>
                    {selectedFile ? (
                      <div>
                        <div style={{ color: '#059669', fontWeight: 600 }}>
                          ✓ Đã chọn ảnh từ máy (Xem trước)
                        </div>
                        <div style={{ color: 'var(--admin-text-muted)', fontSize: 11 }}>
                          Ảnh sẽ tự động upload lên Cloudinary khi bạn nhấn "{isEditing ? 'Lưu Thay Đổi' : 'Đăng Bài Viết'}".
                        </div>
                      </div>
                    ) : (
                      <div style={{ color: 'var(--admin-text-muted)' }}>
                        Xem trước ảnh bìa hiện tại
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="admin-form-group">
              <label className="admin-form-label">Nội dung bài viết</label>
              <textarea
                className="admin-textarea"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Nội dung bài viết (hỗ trợ HTML và Markdown)..."
                rows={8}
                style={{ fontFamily: 'monospace', fontSize: 13 }}
              />
            </div>
          </div>

          <div className="admin-modal-footer">
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="admin-btn admin-btn-secondary"
              >
                Hủy Bỏ
              </button>
              <button
                type="submit"
                disabled={saving || uploadingImage}
                className="admin-btn admin-btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                {(saving || uploadingImage) && <Loader2 size={14} className="spin" />}
                <span>
                  {uploadingImage
                    ? 'Đang tải ảnh lên Cloudinary...'
                    : saving
                    ? 'Đang lưu...'
                    : isEditing
                    ? 'Lưu Thay Đổi'
                    : 'Đăng Bài Viết'}
                </span>
              </button>
            </div>
          </div>
        </form>
      </AdminMacModal>

      {/* ─── Delete Confirmation macOS Dialog ─── */}
      <AdminMacModal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Xác Nhận Xóa Bài Viết"
        prefix="Cảnh Báo — "
        maxWidth={440}
        danger
      >
        <div className="admin-modal-body">
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--admin-text)' }}>
            Bạn có chắc chắn muốn xóa bài viết này khỏi hệ thống? Thao tác này không thể hoàn tác.
          </p>
        </div>

        <div className="admin-modal-footer">
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => setDeleteConfirmId(null)}
              className="admin-btn admin-btn-secondary"
            >
              Hủy
            </button>
            <button
              type="button"
              disabled={deleting}
              onClick={() => handleDelete(deleteConfirmId)}
              className="admin-btn admin-btn-danger"
            >
              {deleting ? 'Đang xóa...' : 'Xác Nhận Xóa'}
            </button>
          </div>
        </div>
      </AdminMacModal>

      {/* Slide-out Drawer xem bài viết và quản lý/trả lời bình luận y hệt như tại /blog */}
      {viewingPost && (
        <BlogDrawer
          post={viewingPost}
          theme={THEMES.light}
          isAdmin={true}
          onClose={() => setViewingPost(null)}
        />
      )}
    </div>
  );
}
