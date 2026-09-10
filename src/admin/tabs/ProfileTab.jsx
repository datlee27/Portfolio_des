import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import api from '../../services/api';

export default function ProfileTab({ personalData, onRefresh, showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    short_name: '',
    title: '',
    role: '',
    bio: '',
    identity_statement: '',
    hero_subtext: '',
    status: '',
    coordinates: '',
    avatar_url: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (personalData) {
      setFormData({
        name: personalData.name || '',
        short_name: personalData.short_name || '',
        title: personalData.title || '',
        role: personalData.role || '',
        bio: personalData.bio || '',
        identity_statement: personalData.identity_statement || '',
        hero_subtext: personalData.hero_subtext || '',
        status: personalData.status || '',
        coordinates: personalData.coordinates || '',
        avatar_url: personalData.avatar_url || '',
      });
    }
  }, [personalData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updatePersonal(formData);
      showToast('Cập nhật thông tin cá nhân thành công!', 'success');
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast(err.message || 'Lỗi khi cập nhật thông tin.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">Thông Tin Cá Nhân & Hero Section</h2>
          <p className="admin-section-desc">
            Chỉnh sửa tên, chức danh, slogan, bio và ảnh đại diện hiển thị trên trang chủ
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: 900 }}>
        <div className="admin-table-container" style={{ padding: 28 }}>
          {/* Avatar Preview Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              paddingBottom: 24,
              marginBottom: 24,
              borderBottom: '1px solid var(--admin-card-border)',
            }}
          >
            <div style={{ position: 'relative' }}>
              <img
                src={
                  formData.avatar_url ||
                  'https://res.cloudinary.com/ddwt6nl7s/image/upload/v1775989709/IMG_6098_fuhsm3.jpg'
                }
                alt="Avatar Preview"
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #fe3c01',
                  boxShadow: '0 0 24px rgba(254, 60, 1, 0.35)',
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label className="admin-form-label">Link Ảnh Đại Diện (Avatar URL)</label>
              <input
                type="url"
                className="admin-input"
                value={formData.avatar_url}
                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                placeholder="https://res.cloudinary.com/..."
              />
              <span style={{ fontSize: 11, color: 'var(--admin-text-muted)', marginTop: 4, display: 'block' }}>
                Hỗ trợ link ảnh từ Cloudinary, Imgur hoặc bất kỳ máy chủ nào.
              </span>
            </div>
          </div>

          {/* Row 1: Name & Short Name */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 18 }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Họ và Tên Đầy Đủ</label>
              <input
                type="text"
                className="admin-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Lê Văn Đạt"
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Tên Ngắn / Monogram</label>
              <input
                type="text"
                className="admin-input"
                value={formData.short_name}
                onChange={(e) => setFormData({ ...formData, short_name: e.target.value })}
                placeholder="DAT LEE"
              />
            </div>
          </div>

          {/* Row 2: Title & Role */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Chức Danh Kỹ Thuật (Title)</label>
              <input
                type="text"
                className="admin-input"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Technical Artisan & Fullstack Developer"
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Vị Trí Nghề Nghiệp (Role)</label>
              <input
                type="text"
                className="admin-input"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Software Engineer"
              />
            </div>
          </div>

          {/* Row 3: Status & Coordinates */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Trạng Thái Hoạt Động (Status)</label>
              <input
                type="text"
                className="admin-input"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                placeholder="System Status: Operational"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Tọa Độ Địa Lý (Coordinates)</label>
              <input
                type="text"
                className="admin-input"
                value={formData.coordinates}
                onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                placeholder="10.7626° N, 106.6602° E"
              />
            </div>
          </div>

          {/* Identity Statement (Bold Quote) */}
          <div className="admin-form-group">
            <label className="admin-form-label">Tuyên Ngôn Triết Lý (Identity Statement)</label>
            <textarea
              className="admin-textarea"
              value={formData.identity_statement}
              onChange={(e) => setFormData({ ...formData, identity_statement: e.target.value })}
              placeholder="I'M A PASSIONATE DEVELOPER DEDICATED TO CREATING BOLD, FUNCTIONAL, AND USER-CENTERED DIGITAL EXPERIENCES."
              rows={2}
            />
          </div>

          {/* Hero Subtext */}
          <div className="admin-form-group">
            <label className="admin-form-label">Hero Subtext (Dưới Tiêu Đề Chính)</label>
            <textarea
              className="admin-textarea"
              value={formData.hero_subtext}
              onChange={(e) => setFormData({ ...formData, hero_subtext: e.target.value })}
              placeholder="Technical Rigor Meets Brutalist Aesthetics — Ensuring every project is a raw statement of intent."
              rows={2}
            />
          </div>

          {/* Bio */}
          <div className="admin-form-group">
            <label className="admin-form-label">Tiểu Sử / Bio Tóm Tắt</label>
            <textarea
              className="admin-textarea"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="I build scalable digital products with clean code, thoughtful design, and real-world impact."
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={saving}
              className="admin-btn admin-btn-primary"
              style={{ padding: '12px 28px', fontSize: 14 }}
            >
              <Save size={16} />
              <span>{saving ? 'Đang Lưu...' : 'Lưu Thay Đổi Thông Tin'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
