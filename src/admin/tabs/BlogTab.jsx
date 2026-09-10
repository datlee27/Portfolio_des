import React, { useState } from 'react';
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
  AlertTriangle,
} from 'lucide-react';
import api from '../../services/api';

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

export default function BlogTab({ posts, onRefresh, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [saving, setSaving] = useState(false);

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
  const filteredPosts = posts.filter((p) => {
    const term = searchTerm.toLowerCase();
    const title = (p.title || '').toLowerCase();
    const excerpt = (p.excerpt || '').toLowerCase();
    const slug = (p.slug || '').toLowerCase();
    return title.includes(term) || excerpt.includes(term) || slug.includes(term);
  });

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({ ...initialFormState, published_date: getTodayDate() });
    setModalOpen(true);
  };

  const handleOpenEdit = (post) => {
    setIsEditing(true);
    setCurrentId(post.id || post.post_id);
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
      const payload = {
        ...formData,
        read_time: Number(formData.read_time) || 5,
      };

      if (isEditing) {
        await api.updatePost(currentId, payload);
        showToast('Cập nhật bài viết thành công!', 'success');
      } else {
        await api.createPost(payload);
        showToast('Đăng bài viết mới thành công!', 'success');
      }

      setModalOpen(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast(err.message || 'Lỗi khi lưu bài viết.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await api.deletePost(id);
      showToast('Đã xóa bài viết thành công!', 'success');
      setDeleteConfirmId(null);
      if (onRefresh) onRefresh();
    } catch (err) {
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
          <h2 className="admin-section-title">Quản Lý Blog & Threads (Ghi Chép)</h2>
          <p className="admin-section-desc">
            Toàn bộ bài viết hiển thị trên trang Blog Chạng Vạng ({posts.length} bài viết)
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', width: 240 }}>
            <input
              type="text"
              className="admin-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm bài viết..."
              style={{ paddingLeft: 34, height: 38, fontSize: 13 }}
            />
            <Search
              size={15}
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
          <button onClick={handleOpenAdd} className="admin-btn admin-btn-primary">
            <Plus size={16} />
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
                const postId = p.id || p.post_id;
                return (
                  <tr key={postId}>
                    {/* Thumbnail */}
                    <td>
                      <div
                        style={{
                          width: 60,
                          height: 42,
                          borderRadius: 6,
                          overflow: 'hidden',
                          background: '#1a1d28',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                      >
                        {p.image_url || p.image ? (
                          <img
                            src={p.image_url || p.image}
                            alt={p.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>
                            <ImageIcon size={16} />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Title & Slug */}
                    <td>
                      <div style={{ fontWeight: 700, color: '#ffffff', fontSize: 14 }}>
                        {p.title}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--admin-accent)', marginTop: 2, fontFamily: 'monospace' }}>
                        /{p.slug || 'post'}
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
                      <div style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.85)', display: 'flex', alignItems: 'center', gap: 4 }}>
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
                          onClick={() => setDeleteConfirmId(postId)}
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

      {/* ─── Add / Edit Modal ─── */}
      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" style={{ maxWidth: 740 }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {isEditing ? 'Chỉnh Sửa Bài Viết' : 'Tạo Bài Viết Mới'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="admin-btn-icon">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                {/* Title */}
                <div className="admin-form-group">
                  <label className="admin-form-label">Tiêu đề bài viết (Title)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="VD: Sử dụng AI một cách hợp lý trong lập trình"
                    required
                  />
                </div>

                {/* Slug */}
                <div className="admin-form-group">
                  <label className="admin-form-label">URL Slug (Đường dẫn thân thiện)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="su-dung-ai-hop-ly"
                    required
                  />
                </div>

                {/* Excerpt */}
                <div className="admin-form-group">
                  <label className="admin-form-label">Tóm tắt ngắn (Excerpt)</label>
                  <textarea
                    className="admin-textarea"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="1-2 câu tóm tắt nội dung chính của bài viết..."
                    rows={2}
                  />
                </div>

                {/* Row: Author, Date, Read Time */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
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

                {/* Image URL */}
                <div className="admin-form-group">
                  <label className="admin-form-label">Ảnh bìa bài viết (Cover Image URL)</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                  />
                  {formData.image_url && (
                    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        style={{ width: 100, height: 60, borderRadius: 6, objectFit: 'cover', border: '1px solid rgba(254, 60, 1, 0.4)' }}
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                      <span style={{ fontSize: 11, color: 'var(--admin-text-muted)' }}>Xem trước ảnh bìa</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="admin-form-group">
                  <label className="admin-form-label">Nội dung chi tiết (HTML hoặc Text)</label>
                  <textarea
                    className="admin-textarea"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="<p>Đoạn văn mở đầu...</p><h3>Tiêu đề phụ</h3><p>Nội dung chi tiết...</p>"
                    rows={8}
                    style={{ fontFamily: 'monospace', fontSize: 13 }}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="admin-btn admin-btn-primary"
                >
                  {saving ? 'Đang lưu...' : isEditing ? 'Lưu Thay Đổi' : 'Đăng Bài Viết'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Delete Confirmation Dialog ─── */}
      {deleteConfirmId && (
        <div className="admin-modal-backdrop" onClick={() => setDeleteConfirmId(null)}>
          <div className="admin-modal" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title" style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: 8 }}>
                <AlertTriangle size={18} />
                <span>Xác Nhận Xóa Bài Viết</span>
              </h3>
              <button onClick={() => setDeleteConfirmId(null)} className="admin-btn-icon">
                <X size={16} />
              </button>
            </div>

            <div className="admin-modal-body">
              <p style={{ margin: 0, fontSize: 14, color: 'var(--admin-text)' }}>
                Bạn có chắc chắn muốn xóa bài viết này khỏi hệ thống? Thao tác này không thể hoàn tác.
              </p>
            </div>

            <div className="admin-modal-footer">
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
        </div>
      )}
    </div>
  );
}
