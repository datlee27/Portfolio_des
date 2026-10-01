import React, { useState, useEffect } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  AlertTriangle,
  Check,
  Tag,
  FolderPlus,
} from 'lucide-react';
import api from '../../services/api';
import { usePortfolio } from '../../context/PortfolioContext';
import AdminMacModal from '../components/AdminMacModal';

export default function SkillsTab({ skills = [], onRefresh, showToast }) {
  const { updateSkills: contextUpdateSkills } = usePortfolio();

  const [localSkills, setLocalSkills] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_skills_override');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return skills;
  });

  useEffect(() => {
    if (skills && skills.length > 0) {
      try {
        const saved = localStorage.getItem('portfolio_skills_override');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setLocalSkills(parsed);
            return;
          }
        }
      } catch {}
      setLocalSkills(skills);
    }
  }, [skills]);

  const persistSkills = (newList) => {
    setLocalSkills(newList);
    try {
      localStorage.setItem('portfolio_skills_override', JSON.stringify(newList));
    } catch {}
    if (contextUpdateSkills) {
      contextUpdateSkills(newList);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // New item quick add inputs per category: { [catId]: 'new-tag' }
  const [quickInputs, setQuickInputs] = useState({});

  // Modal Form State
  const initialFormState = {
    category: '',
    items: '',
  };
  const [formData, setFormData] = useState(initialFormState);

  // Filter skills based on category name or any item name
  const filteredSkills = localSkills.filter((s) => {
    const term = searchTerm.toLowerCase();
    const catName = (s.category || '').toLowerCase();
    const itemsStr = Array.isArray(s.items) ? s.items.join(' ').toLowerCase() : '';
    return catName.includes(term) || itemsStr.includes(term);
  });

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData(initialFormState);
    setModalOpen(true);
  };

  const handleOpenEdit = (skill) => {
    setIsEditing(true);
    setCurrentId(skill.id);
    setFormData({
      category: skill.category || '',
      items: Array.isArray(skill.items) ? skill.items.join(', ') : skill.items || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category.trim()) {
      showToast('Vui lòng nhập tên danh mục kỹ năng.', 'error');
      return;
    }

    setSaving(true);
    try {
      const itemsArray = formData.items
        .split(',')
        .map((t) => t.trim().toUpperCase())
        .filter(Boolean);

      let updatedSkillsList;
      if (isEditing) {
        updatedSkillsList = localSkills.map((s) =>
          s.id === currentId
            ? { ...s, category: formData.category.toUpperCase().trim(), items: itemsArray }
            : s
        );
      } else {
        const nextId = String(Date.now());
        const newSkill = {
          id: nextId,
          category: formData.category.toUpperCase().trim(),
          items: itemsArray,
        };
        updatedSkillsList = [...localSkills, newSkill];
      }

      // Persist locally and sync to context immediately
      persistSkills(updatedSkillsList);

      // Call API in background
      try {
        await api.updateSkills(updatedSkillsList);
        if (isEditing) {
          await api.updateSkill(currentId, {
            category: formData.category.toUpperCase().trim(),
            items: itemsArray,
          }).catch(() => {});
        } else {
          await api.createSkill({
            category: formData.category.toUpperCase().trim(),
            items: itemsArray,
          }).catch(() => {});
        }
      } catch (apiErr) {
        console.warn('API skill call handled:', apiErr);
      }

      showToast(
        isEditing
          ? 'Cập nhật danh mục kỹ năng thành công!'
          : 'Tạo danh mục kỹ năng mới thành công!',
        'success'
      );
      setModalOpen(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast(err.message || 'Lỗi khi lưu kỹ năng.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Quick remove single skill item from a category
  const handleRemoveItem = async (catId, itemToRemove) => {
    const targetCat = localSkills.find((s) => s.id === catId);
    if (!targetCat) return;

    const newItems = targetCat.items.filter((item) => item !== itemToRemove);
    const updatedSkillsList = localSkills.map((s) =>
      s.id === catId ? { ...s, items: newItems } : s
    );

    persistSkills(updatedSkillsList);

    try {
      await api.updateSkills(updatedSkillsList);
      await api.updateSkill(catId, { ...targetCat, items: newItems }).catch(() => {});
      showToast(`Đã xóa kỹ năng "${itemToRemove}"`, 'success');
      if (onRefresh) onRefresh();
    } catch {
      showToast('Lỗi khi cập nhật kỹ năng.', 'error');
    }
  };

  // Quick add item to an existing category
  const handleQuickAddItem = async (catId) => {
    const rawVal = quickInputs[catId] || '';
    const cleanVal = rawVal.trim().toUpperCase();
    if (!cleanVal) return;

    const targetCat = localSkills.find((s) => s.id === catId);
    if (!targetCat) return;

    if (targetCat.items.includes(cleanVal)) {
      showToast(`Kỹ năng "${cleanVal}" đã tồn tại trong nhóm này.`, 'error');
      return;
    }

    const newItems = [...targetCat.items, cleanVal];
    const updatedSkillsList = localSkills.map((s) =>
      s.id === catId ? { ...s, items: newItems } : s
    );

    persistSkills(updatedSkillsList);
    setQuickInputs({ ...quickInputs, [catId]: '' });

    try {
      await api.updateSkills(updatedSkillsList);
      await api.updateSkill(catId, { ...targetCat, items: newItems }).catch(() => {});
      showToast(`Đã thêm "${cleanVal}" vào ${targetCat.category}`, 'success');
      if (onRefresh) onRefresh();
    } catch {
      showToast('Lỗi khi thêm kỹ năng.', 'error');
    }
  };

  const handleDeleteCategory = async (id) => {
    setDeleting(true);
    try {
      const updatedSkillsList = localSkills.filter((s) => s.id !== id);
      persistSkills(updatedSkillsList);

      await api.updateSkills(updatedSkillsList).catch(() => {});
      await api.deleteSkill(id).catch(() => {});
      showToast('Đã xóa danh mục kỹ năng!', 'success');
      setDeleteConfirmId(null);
      if (onRefresh) onRefresh();
    } catch {
      showToast('Lỗi khi xóa danh mục kỹ năng.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      {/* ─── Header & Controls ─── */}
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">Kỹ Năng & Công Nghệ</h2>
        </div>

        <div className="admin-section-controls">
          {/* Search Box */}
          <div className="admin-search-wrapper" style={{ position: 'relative', width: 220 }}>
            <input
              type="text"
              className="admin-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm kỹ năng..."
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

          {/* Add Category Button */}
          <button
            id="btn-add-skill-category"
            onClick={handleOpenAdd}
            className="admin-btn admin-btn-primary"
            style={{ height: 36, padding: '0 14px' }}
          >
            <Plus size={15} />
            <span>Thêm Danh Mục</span>
          </button>
        </div>
      </div>

      {/* ─── Skills Grid / Cards ─── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
        }}
      >
        {filteredSkills.length === 0 ? (
          <div
            className="admin-table-container"
            style={{
              gridColumn: '1 / -1',
              padding: '48px 20px',
              textAlign: 'center',
              color: 'var(--admin-text-muted)',
            }}
          >
            <FolderPlus size={36} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
            <p style={{ margin: 0, fontSize: 14 }}>Không tìm thấy danh mục kỹ năng nào.</p>
          </div>
        ) : (
          filteredSkills.map((s) => {
            const items = Array.isArray(s.items) ? s.items : [];
            const currentQuickVal = quickInputs[s.id] || '';

            return (
              <div
                key={s.id}
                className="admin-stat-card"
                style={{
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                {/* Card Header */}
                <div
                  style={{
                    padding: '16px 20px',
                    background: '#f8fafc',
                    borderBottom: '1px solid var(--admin-card-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-outfit)',
                        fontWeight: 800,
                        fontSize: 14,
                        color: 'var(--admin-text)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {s.category}
                    </span>
                    <span className="admin-badge admin-badge-orange">
                      {items.length} items
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={() => handleOpenEdit(s)}
                      className="admin-btn-icon"
                      title="Sửa danh mục"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(s.id)}
                      className="admin-btn-icon"
                      style={{ color: '#dc2626' }}
                      title="Xóa danh mục"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Card Body — Skill Tag Pills */}
                <div style={{ padding: '18px 20px', flex: 1 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                    {items.length === 0 ? (
                      <span style={{ fontSize: 12, color: 'var(--admin-text-muted)', fontStyle: 'italic' }}>
                        Chưa có kỹ năng nào trong nhóm này.
                      </span>
                    ) : (
                      items.map((item, idx) => (
                        <span
                          key={idx}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            padding: '4px 9px',
                            borderRadius: 4,
                            fontSize: 12,
                            fontWeight: 600,
                            background: '#f1f5f9',
                            color: 'var(--admin-text)',
                            border: '1px solid var(--admin-card-border)',
                          }}
                        >
                          <Tag size={10} style={{ color: 'var(--admin-text-muted)' }} />
                          <span>{item}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(s.id, item)}
                            title={`Xóa ${item}`}
                            style={{
                              border: 'none',
                              background: 'none',
                              padding: 0,
                              cursor: 'pointer',
                              color: 'var(--admin-text-muted)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              marginLeft: 2,
                            }}
                          >
                            <X size={12} className="hover-red" />
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* Card Footer — Quick Add Tag Input */}
                <div
                  style={{
                    padding: '10px 16px',
                    background: '#fcfcfd',
                    borderTop: '1px solid var(--admin-card-border)',
                    display: 'flex',
                    gap: 8,
                  }}
                >
                  <input
                    type="text"
                    className="admin-input"
                    value={currentQuickVal}
                    onChange={(e) =>
                      setQuickInputs({ ...quickInputs, [s.id]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleQuickAddItem(s.id);
                      }
                    }}
                    placeholder="+ Thêm kỹ năng mới (Enter)..."
                    style={{ height: 32, fontSize: 12, padding: '4px 10px' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleQuickAddItem(s.id)}
                    className="admin-btn admin-btn-secondary"
                    style={{ padding: '4px 10px', height: 32, fontSize: 12 }}
                    title="Thêm kỹ năng"
                  >
                    <Check size={13} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ─── Add / Edit macOS Modal ─── */}
      <AdminMacModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? 'Chỉnh Sửa Nhóm Kỹ Năng' : 'Thêm Nhóm Kỹ Năng Mới'}
        prefix="Editor — "
        maxWidth={520}
      >
        <form onSubmit={handleSubmit} className="admin-modal-form">
          <div className="admin-modal-body">
            {/* Category Name */}
            <div className="admin-form-group">
              <label className="admin-form-label">Tên danh mục</label>
              <input
                type="text"
                className="admin-input"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="VD: FRONTEND, BACKEND, CLOUD..."
                required
              />
            </div>

            {/* Items */}
            <div className="admin-form-group">
              <label className="admin-form-label">
                Danh sách kỹ năng (cách nhau bằng dấu phẩy)
              </label>
              <textarea
                className="admin-textarea"
                value={formData.items}
                onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                placeholder="React, TypeScript, Java, Spring Boot, Docker, AWS"
                rows={4}
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
                disabled={saving}
                className="admin-btn admin-btn-primary"
              >
                {saving ? 'Đang lưu...' : isEditing ? 'Lưu Thay Đổi' : 'Tạo Danh Mục'}
              </button>
            </div>
          </div>
        </form>
      </AdminMacModal>

      {/* ─── Delete Confirmation macOS Dialog ─── */}
      <AdminMacModal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Xác Nhận Xóa Nhóm Kỹ Năng"
        prefix="Cảnh Báo — "
        maxWidth={420}
        danger
      >
        <div className="admin-modal-body">
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--admin-text)' }}>
            Bạn có chắc chắn muốn xóa danh mục kỹ năng này không?
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
              onClick={() => handleDeleteCategory(deleteConfirmId)}
              className="admin-btn admin-btn-danger"
            >
              {deleting ? 'Đang xóa...' : 'Xác Nhận Xóa'}
            </button>
          </div>
        </div>
      </AdminMacModal>
    </div>
  );
}
