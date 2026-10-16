import React, { useState, useEffect } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Briefcase,
  GraduationCap,
  ArrowUp,
  ArrowDown,
  Calendar,
  Building,
  Sparkles,
} from 'lucide-react';
import api from '../../services/api';
import { usePortfolio } from '../../context/PortfolioContext';
import { defaultJourney } from '../../designs/design4/data/homeData';
import AdminMacModal from '../components/AdminMacModal';

export default function ExperienceTab({ experienceData = [], onRefresh, showToast }) {
  const { updateExperience: contextUpdateExperience, experience: ctxExperience } = usePortfolio();

  const [localList, setLocalList] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_experience_override');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    if (experienceData && experienceData.length > 0) return experienceData;
    if (ctxExperience && ctxExperience.length > 0) return ctxExperience;
    return defaultJourney;
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio_experience_override');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLocalList(parsed);
          return;
        }
      }
    } catch {}

    if (experienceData && experienceData.length > 0) {
      setLocalList(experienceData);
    } else if (ctxExperience && ctxExperience.length > 0) {
      setLocalList(ctxExperience);
    }
  }, [experienceData, ctxExperience]);

  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const initialForm = {
    place: '',
    role: '',
    period: '',
    description: '',
  };
  const [formData, setFormData] = useState(initialForm);

  const persistList = async (newList) => {
    setLocalList(newList);
    try {
      localStorage.setItem('portfolio_experience_override', JSON.stringify(newList));
    } catch (e) {
      console.warn('Failed to cache experience in localStorage:', e);
    }
    if (contextUpdateExperience) {
      contextUpdateExperience(newList);
    }
    try {
      await api.updateExperience(newList);
    } catch (err) {
      console.warn('API experience sync notice:', err);
    }
  };

  const filteredList = localList.filter((item) => {
    const term = searchTerm.toLowerCase();
    const place = (item.place || item.company || '').toLowerCase();
    const role = (item.role || item.title || '').toLowerCase();
    const period = (item.period || '').toLowerCase();
    return place.includes(term) || role.includes(term) || period.includes(term);
  });

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setFormData({
      place: item.place || item.company || '',
      role: item.role || item.title || '',
      period: item.period || '',
      description: item.description || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.place.trim() || !formData.role.trim()) {
      showToast('Vui lòng nhập tên đơn vị/công ty và vị trí/vai trò.', 'error');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        place: formData.place.trim(),
        company: formData.place.trim(),
        role: formData.role.trim(),
        title: formData.role.trim(),
        period: formData.period.trim() || 'ongoing',
        description: formData.description.trim(),
      };

      let newItem = {
        id: isEditing ? currentId : `exp-${Date.now()}`,
        ...payload,
      };

      // Send to backend API
      try {
        if (isEditing) {
          if (/^\d+$/.test(String(currentId))) {
            await api.updateExperienceItem(currentId, payload);
          }
        } else {
          const res = await api.createExperience(payload);
          if (res && res.data && res.data.id) {
            newItem.id = String(res.data.id);
          }
        }
      } catch (apiErr) {
        console.warn('Backend API item notice:', apiErr);
      }

      let updated;
      if (isEditing) {
        updated = localList.map((it) => (it.id === currentId ? newItem : it));
        showToast('Cập nhật cột mốc thành công!', 'success');
      } else {
        // New item added at the beginning (top of journey timeline)
        updated = [newItem, ...localList];
        showToast('Thêm cột mốc mới thành công!', 'success');
      }

      await persistList(updated);
      setModalOpen(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Lỗi lưu cột mốc:', err);
      showToast(err.message || 'Lỗi khi lưu cột mốc.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const updated = localList.filter((it) => it.id !== id);
      await persistList(updated);
      try {
        await api.deleteExperience(id);
      } catch (e) {
        console.warn('API deleteExperience notice:', e);
      }
      showToast('Đã xóa cột mốc thành công!', 'success');
      setDeleteConfirmId(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Lỗi xóa cột mốc:', err);
      showToast(err.message || 'Lỗi khi xóa cột mốc.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const handleMove = async (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= localList.length) return;

    const copy = [...localList];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;

    await persistList(copy);
    showToast('Đã thay đổi thứ tự hiển thị!', 'success');
    if (onRefresh) onRefresh();
  };

  return (
    <div>
      {/* ─── Header ─── */}
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">Hành Trình & Kinh Nghiệm (About)</h2>
          <p className="admin-section-desc">
            Quản lý các cột mốc học vấn, công việc hiện tại, và kinh nghiệm kỹ thuật hiển thị tại mục{' '}
            <strong style={{ color: 'var(--admin-accent)' }}>02 // JOURNEY*</strong> trên trang{' '}
            <code>/about</code>.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="admin-btn admin-btn-primary"
            style={{ height: 36, padding: '0 16px' }}
          >
            <Plus size={15} />
            <span>Thêm Cột Mốc Mới</span>
          </button>
        </div>
      </div>

      {/* ─── Search Bar & Metrics ─── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          marginBottom: 20,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ position: 'relative', width: 320, maxWidth: '100%' }}>
          <input
            type="text"
            className="admin-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo trường, công ty, vị trí, năm..."
            style={{ paddingLeft: 36, height: 38, fontSize: 13 }}
          />
          <Search
            size={15}
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--admin-text-muted)',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--admin-text-secondary)',
              background: '#f1f5f9',
              padding: '4px 10px',
              borderRadius: 6,
            }}
          >
            Tổng cộng: {localList.length} cột mốc
          </span>
        </div>
      </div>

      {/* ─── Milestones List ─── */}
      {filteredList.length === 0 ? (
        <div
          className="admin-empty-state"
          style={{
            padding: '60px 20px',
            textAlign: 'center',
            background: '#ffffff',
            borderRadius: 12,
            border: '1px dashed #cbd5e1',
          }}
        >
          <Briefcase size={36} style={{ color: '#94a3b8', margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 6px' }}>
            Chưa có cột mốc nào
          </h3>
          <p style={{ fontSize: 13, color: 'var(--admin-text-muted)', margin: '0 0 16px' }}>
            {searchTerm
              ? 'Không tìm thấy kết quả phù hợp với từ khóa.'
              : 'Hãy thêm trường học hoặc công việc đầu tiên để hiển thị trên trang About.'}
          </p>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="admin-btn admin-btn-primary"
            style={{ padding: '8px 18px', fontSize: 13 }}
          >
            <Plus size={14} />
            <span>Thêm Cột Mốc Ngay</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredList.map((item, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === filteredList.length - 1;
            const place = item.place || item.company;
            const role = item.role || item.title;

            return (
              <div
                key={item.id || idx}
                style={{
                  background: '#ffffff',
                  borderRadius: 12,
                  border: '1px solid var(--admin-card-border)',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  transition: 'all 0.15s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                }}
              >
                {/* Left: Reorder & Number */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                    }}
                  >
                    <button
                      type="button"
                      disabled={isFirst}
                      onClick={() => handleMove(idx, -1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 3,
                        cursor: isFirst ? 'not-allowed' : 'pointer',
                        color: isFirst ? '#cbd5e1' : '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      title="Di chuyển lên trên"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type="button"
                      disabled={isLast}
                      onClick={() => handleMove(idx, 1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 3,
                        cursor: isLast ? 'not-allowed' : 'pointer',
                        color: isLast ? '#cbd5e1' : '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      title="Di chuyển xuống dưới"
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>

                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      fontWeight: 700,
                      color: 'var(--admin-accent)',
                      background: 'rgba(254, 60, 1, 0.08)',
                      padding: '3px 8px',
                      borderRadius: 6,
                    }}
                  >
                    #{idx + 1}
                  </span>
                </div>

                {/* Middle: Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <h4
                      style={{
                        margin: 0,
                        fontSize: 15,
                        fontWeight: 700,
                        color: 'var(--admin-text)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {place}
                    </h4>

                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11.5,
                        fontWeight: 600,
                        color: '#475569',
                        background: '#f1f5f9',
                        padding: '2px 8px',
                        borderRadius: 4,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <Calendar size={11} />
                      <span>{item.period}</span>
                    </span>
                  </div>

                  <p
                    style={{
                      margin: '4px 0 0',
                      fontSize: 13,
                      color: 'var(--admin-text-secondary)',
                      lineHeight: 1.4,
                    }}
                  >
                    {role}
                  </p>

                  {item.description && (
                    <p
                      style={{
                        margin: '4px 0 0',
                        fontSize: 12,
                        color: 'var(--admin-text-muted)',
                        fontStyle: 'italic',
                      }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Right: Actions */}
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="admin-btn admin-btn-secondary"
                    style={{ height: 32, padding: '0 10px', fontSize: 12 }}
                    title="Chỉnh sửa cột mốc này"
                  >
                    <Pencil size={13} />
                    <span>Sửa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="admin-btn admin-btn-danger"
                    style={{ height: 32, padding: '0 10px', fontSize: 12 }}
                    title="Xóa cột mốc này"
                  >
                    <Trash2 size={13} />
                    <span>Xóa</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── Add / Edit Modal ─── */}
      <AdminMacModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? 'Chỉnh Sửa Cột Mốc' : 'Thêm Cột Mốc / Công Việc Mới'}
        prefix="Editor — "
        maxWidth={580}
      >
        <form onSubmit={handleSubmit} className="admin-modal-form">
          <div className="admin-modal-body" style={{ padding: '22px 24px' }}>
            {/* Informational Callout */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                borderRadius: 8,
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                fontSize: 12.5,
                color: '#475569',
                marginBottom: 18,
              }}
            >
              <Sparkles size={15} style={{ color: 'var(--admin-accent)', flexShrink: 0 }} />
              <span>
                Cột mốc này hiển thị trực tiếp tại mục{' '}
                <strong style={{ color: '#0f172a' }}>02 // JOURNEY*</strong> trên trang{' '}
                <strong style={{ color: '#0f172a' }}>/about</strong>.
              </span>
            </div>

            {/* Field 1: Organization / School / Company */}
            <div className="admin-form-group" style={{ marginBottom: 16 }}>
              <label
                className="admin-form-label"
                htmlFor="journey-place"
                style={{ fontWeight: 600, fontSize: 12.5, color: '#1e293b' }}
              >
                Đơn Vị / Trường Học / Công Ty <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="journey-place"
                  type="text"
                  className="admin-input"
                  value={formData.place}
                  onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                  placeholder="VD: fpt university, da nang hoặc TechCorp Global"
                  style={{ paddingLeft: 38, height: 40, borderRadius: 8, fontSize: 13.5 }}
                  required
                />
                <Building
                  size={15}
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#64748b',
                    pointerEvents: 'none',
                  }}
                />
              </div>
              <span style={{ fontSize: 11.5, color: '#64748b', marginTop: 4, display: 'block' }}>
                Tên tổ chức hoặc công ty sẽ hiển thị in đậm ở dòng trên cùng.
              </span>
            </div>

            {/* Field 2: Role / Field of Study */}
            <div className="admin-form-group" style={{ marginBottom: 16 }}>
              <label
                className="admin-form-label"
                htmlFor="journey-role"
                style={{ fontWeight: 600, fontSize: 12.5, color: '#1e293b' }}
              >
                Vị Trí / Vai Trò / Ngành Học <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="journey-role"
                  type="text"
                  className="admin-input"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="VD: software engineering student · distributed computing & web architecture"
                  style={{ paddingLeft: 38, height: 40, borderRadius: 8, fontSize: 13.5 }}
                  required
                />
                <Briefcase
                  size={15}
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#64748b',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>

            {/* Field 3: Period */}
            <div className="admin-form-group" style={{ marginBottom: 16 }}>
              <label
                className="admin-form-label"
                htmlFor="journey-period"
                style={{ fontWeight: 600, fontSize: 12.5, color: '#1e293b' }}
              >
                Thời Gian (Period) <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="journey-period"
                  type="text"
                  className="admin-input"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  placeholder="VD: 2022 — present, ongoing, hoặc 2020 — 2022"
                  style={{ paddingLeft: 38, height: 40, borderRadius: 8, fontSize: 13.5 }}
                  required
                />
                <Calendar
                  size={15}
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#64748b',
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* Quick Presets Chips */}
              <div style={{ display: 'flex', gap: 6, marginTop: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11.5, color: '#64748b' }}>Gợi ý nhanh:</span>
                {['2024 — present', '2022 — present', 'ongoing', '2020 — 2022'].map((preset) => {
                  const isSelected = formData.period === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setFormData({ ...formData, period: preset })}
                      style={{
                        background: isSelected ? '#0f172a' : '#f1f5f9',
                        color: isSelected ? '#ffffff' : '#334155',
                        border: isSelected ? '1px solid #0f172a' : '1px solid #e2e8f0',
                        borderRadius: 6,
                        padding: '3px 10px',
                        fontSize: 11.5,
                        fontFamily: "'JetBrains Mono', monospace",
                        cursor: 'pointer',
                        fontWeight: isSelected ? 600 : 500,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {preset}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 4: Description */}
            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label
                className="admin-form-label"
                htmlFor="journey-desc"
                style={{ fontWeight: 600, fontSize: 12.5, color: '#1e293b' }}
              >
                Mô Tả / Ghi Chú Kỹ Thuật{' '}
                <span style={{ fontSize: 11.5, color: '#94a3b8', fontWeight: 400 }}>(Tùy chọn)</span>
              </label>
              <textarea
                id="journey-desc"
                rows={3}
                className="admin-textarea"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Ghi chú thêm về dự án, công nghệ hoặc thành tựu (tùy chọn)..."
                style={{ borderRadius: 8, padding: '10px 12px', fontSize: 13.5, minHeight: 76, resize: 'vertical' }}
              />
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="admin-modal-footer">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="admin-btn admin-btn-secondary"
              style={{ height: 38, padding: '0 18px', borderRadius: 8 }}
            >
              Hủy Bỏ
            </button>
            <button
              type="submit"
              disabled={saving}
              className="admin-btn admin-btn-primary"
              style={{ height: 38, padding: '0 20px', borderRadius: 8 }}
            >
              <span>{saving ? 'Đang lưu...' : isEditing ? 'Lưu Thay Đổi' : 'Thêm Cột Mốc'}</span>
            </button>
          </div>
        </form>
      </AdminMacModal>

      {/* ─── Delete Confirmation Modal ─── */}
      <AdminMacModal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Xác Nhận Xóa Cột Mốc"
        prefix="Cảnh Báo — "
        maxWidth={440}
        danger={true}
      >
        <div className="admin-modal-body" style={{ textAlign: 'center', padding: '24px 24px 16px' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px',
              color: '#dc2626',
            }}
          >
            <Trash2 size={22} />
          </div>
          <h4 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700, color: 'var(--admin-text)' }}>
            Xác nhận xóa cột mốc này?
          </h4>
          <p style={{ fontSize: 13, color: 'var(--admin-text-secondary)', margin: 0, lineHeight: 1.5 }}>
            Cột mốc sẽ được gỡ khỏi mục <strong>02 // JOURNEY*</strong> trên trang About và đồng bộ tức thì.
          </p>
        </div>

        <div className="admin-modal-footer">
          <button
            type="button"
            onClick={() => setDeleteConfirmId(null)}
            className="admin-btn admin-btn-secondary"
            style={{ height: 36, padding: '0 16px', borderRadius: 8 }}
          >
            Hủy Bỏ
          </button>
          <button
            type="button"
            disabled={deleting}
            onClick={() => handleDelete(deleteConfirmId)}
            className="admin-btn admin-btn-danger"
            style={{ height: 36, padding: '0 18px', borderRadius: 8 }}
          >
            {deleting ? 'Đang xóa...' : 'Xác Nhận Xóa'}
          </button>
        </div>
      </AdminMacModal>
    </div>
  );
}
