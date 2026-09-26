import React, { useState, useEffect } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
  X,
  Search,
  AlertTriangle,
} from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import api from '../../services/api';
import { usePortfolio } from '../../context/PortfolioContext';

export default function ProjectsTab({ projects = [], onRefresh, showToast }) {
  const { updateProjects: contextUpdateProjects, projects: ctxProjects } = usePortfolio();

  const [localProjects, setLocalProjects] = useState(() => {
    if (projects && projects.length > 0) return projects;
    return ctxProjects || [];
  });

  useEffect(() => {
    if (projects && projects.length > 0) {
      setLocalProjects(projects);
    } else if (ctxProjects && ctxProjects.length > 0) {
      setLocalProjects(ctxProjects);
    }
  }, [projects, ctxProjects]);

  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [saving, setSaving] = useState(false);

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Form State
  const initialFormState = {
    project_code: '',
    title: '',
    description: '',
    image_url: '',
    tags: 'React, TypeScript',
    github_url: '',
    deploy_url: '',
    status: 'Latest',
  };
  const [formData, setFormData] = useState(initialFormState);

  // Filtered projects
  const filteredProjects = localProjects.filter((p) => {
    const term = searchTerm.toLowerCase();
    const title = (p.title || '').toLowerCase();
    const desc = (p.description || '').toLowerCase();
    const tags = Array.isArray(p.tags) ? p.tags.join(' ').toLowerCase() : (p.tags || '').toLowerCase();
    return title.includes(term) || desc.includes(term) || tags.includes(term);
  });

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    const nextCode = String(localProjects.length + 1).padStart(2, '0');
    setFormData({ ...initialFormState, project_code: nextCode });
    setModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setIsEditing(true);
    setCurrentId(project.id);
    setFormData({
      project_code: project.project_code || project.code?.replace(/[()]/g, '') || '',
      title: project.title || '',
      description: project.description || '',
      image_url: project.image_url || project.image || '',
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : project.tags || '',
      github_url: project.github_url || project.github || '',
      deploy_url: project.deploy_url || project.deploy || '',
      status: project.status || 'Latest',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Vui lòng nhập tên dự án.', 'error');
      return;
    }

    setSaving(true);
    try {
      // Format tags as array
      const tagsArray = formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const normalizedProject = {
        ...formData,
        id: isEditing ? currentId : String(Date.now()),
        tags: tagsArray,
        image: formData.image_url,
        github: formData.github_url,
        deploy: formData.deploy_url,
        code: `(${String(formData.project_code || '01').padStart(2, '0')})`,
        client: tagsArray.slice(0, 2).join(' / ') || 'Production App',
        hasCaseStudy: Boolean(formData.deploy_url || formData.github_url),
      };

      let updatedList;
      if (isEditing) {
        updatedList = localProjects.map((p) => (p.id === currentId ? { ...p, ...normalizedProject } : p));
      } else {
        updatedList = [...localProjects, normalizedProject];
      }

      setLocalProjects(updatedList);
      if (contextUpdateProjects) {
        contextUpdateProjects(updatedList);
      }

      // Sync with API in background
      try {
        if (isEditing) {
          await api.updateProject(currentId, normalizedProject);
          showToast('Cập nhật dự án thành công (Đồng bộ máy chủ)!', 'success');
        } else {
          await api.createProject(normalizedProject);
          showToast('Tạo dự án mới thành công (Đồng bộ máy chủ)!', 'success');
        }
      } catch (apiErr) {
        console.warn('API sync deferred/offline:', apiErr);
        showToast(
          isEditing
            ? 'Đã lưu thay đổi dự án vào bộ nhớ máy (Chế độ Ngoại tuyến)!'
            : 'Đã thêm dự án mới vào bộ nhớ máy (Chế độ Ngoại tuyến)!',
          'success'
        );
      }

      setModalOpen(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast(err.message || 'Lỗi khi lưu dự án.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const updatedList = localProjects.filter((p) => p.id !== id);
      setLocalProjects(updatedList);
      if (contextUpdateProjects) {
        contextUpdateProjects(updatedList);
      }

      try {
        await api.deleteProject(id);
        showToast('Đã xóa dự án thành công!', 'success');
      } catch (apiErr) {
        console.warn('API delete deferred/offline:', apiErr);
        showToast('Đã xóa dự án khỏi bộ nhớ cục bộ!', 'success');
      }

      setDeleteConfirmId(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast(err.message || 'Lỗi khi xóa dự án.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      {/* ─── Header & Controls ─── */}
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">Quản Lý Dự Án (Selected Works)</h2>
          <p className="admin-section-desc">
            Toàn bộ dự án hiển thị trên trang chủ và trang /work ({projects.length} dự án)
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
              placeholder="Tìm kiếm dự án..."
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

          {/* Add Project Button */}
          <button id="btn-add-project" onClick={handleOpenAdd} className="admin-btn admin-btn-primary">
            <Plus size={16} />
            <span>Thêm Dự Án Mới</span>
          </button>
        </div>
      </div>

      {/* ─── Projects Table ─── */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: 70 }}>Mã</th>
              <th style={{ width: 90 }}>Ảnh</th>
              <th>Tên Dự Án & Mô Tả</th>
              <th>Công Nghệ (Tags)</th>
              <th style={{ width: 100 }}>Trạng Thái</th>
              <th style={{ width: 100 }}>Liên Kết</th>
              <th style={{ width: 110, textAlign: 'right' }}>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--admin-text-muted)' }}>
                  Không tìm thấy dự án nào phù hợp.
                </td>
              </tr>
            ) : (
              filteredProjects.map((p) => {
                const tagsList = Array.isArray(p.tags) ? p.tags : (p.tags || '').split(',').map((t) => t.trim());
                return (
                  <tr key={p.id}>
                    {/* Project Code */}
                    <td style={{ fontWeight: 800, color: 'var(--admin-accent)', fontFamily: 'var(--font-outfit)' }}>
                      {p.project_code || '—'}
                    </td>

                    {/* Thumbnail Image */}
                    <td>
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
                        {p.image_url ? (
                          <img
                            src={p.image_url}
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

                    {/* Title & Description */}
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--admin-text)', fontSize: 13.5 }}>
                        {p.title}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: 'var(--admin-text-muted)',
                          marginTop: 3,
                          maxWidth: 380,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        title={p.description}
                      >
                        {p.description || 'Chưa có mô tả'}
                      </div>
                    </td>

                    {/* Tags */}
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, maxWidth: 220 }}>
                        {tagsList.map((tag, i) => (
                          <span key={i} className="admin-tag-pill">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td>
                      <span className={`admin-badge ${p.status === 'Latest' ? 'admin-badge-orange' : 'admin-badge-green'}`}>
                        {p.status || 'Active'}
                      </span>
                    </td>

                    {/* Links */}
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {p.github_url && (
                          <a
                            href={p.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="admin-btn-icon"
                            title="Mở GitHub Repo"
                          >
                            <SiGithub size={13} />
                          </a>
                        )}
                        {p.deploy_url && (
                          <a
                            href={p.deploy_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="admin-btn-icon"
                            title="Mở Live Website"
                          >
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="admin-btn-icon"
                          title="Chỉnh sửa dự án"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="admin-btn-icon"
                          style={{ color: '#ef4444' }}
                          title="Xóa dự án"
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
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {isEditing ? 'Chỉnh Sửa Dự Án' : 'Thêm Dự Án Mới'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="admin-btn-icon">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body">
                {/* Row: Project Code & Status */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Mã dự án (Project Code)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.project_code}
                      onChange={(e) => setFormData({ ...formData, project_code: e.target.value })}
                      placeholder="01"
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Trạng thái (Status)</label>
                    <select
                      className="admin-select"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Latest">Latest (Mới nhất)</option>
                      <option value="Completed">Completed (Hoàn thành)</option>
                      <option value="In Progress">In Progress (Đang làm)</option>
                      <option value="Archived">Archived (Lưu trữ)</option>
                    </select>
                  </div>
                </div>

                {/* Title */}
                <div className="admin-form-group">
                  <label className="admin-form-label">Tên dự án (Title)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="VD: Dev Roadmap Tracking System"
                    required
                  />
                </div>

                {/* Description */}
                <div className="admin-form-group">
                  <label className="admin-form-label">Mô tả dự án (Description)</label>
                  <textarea
                    className="admin-textarea"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Mô tả chức năng, bài toán giải quyết và giá trị của sản phẩm..."
                    rows={3}
                  />
                </div>

                {/* Image URL & Live Preview */}
                <div className="admin-form-group">
                  <label className="admin-form-label">Link ảnh đại diện (Image URL)</label>
                  <input
                    type="url"
                    className="admin-input"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://res.cloudinary.com/... hoặc https://images.unsplash.com/..."
                  />
                  {formData.image_url && (
                    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        style={{ width: 100, height: 60, borderRadius: 4, objectFit: 'cover', border: '1px solid var(--admin-card-border)' }}
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                      <span style={{ fontSize: 11.5, color: 'var(--admin-text-muted)' }}>Xem trước ảnh đại diện</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="admin-form-group">
                  <label className="admin-form-label">Công nghệ (Tags - cách nhau bằng dấu phẩy)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="React, TypeScript, Spring Boot, MySQL"
                  />
                </div>

                {/* Row: GitHub URL & Deploy URL */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="admin-form-group">
                    <label className="admin-form-label">GitHub Repository URL</label>
                    <input
                      type="url"
                      className="admin-input"
                      value={formData.github_url}
                      onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                      placeholder="https://github.com/datlee27/..."
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Live Demo / Deploy URL</label>
                    <input
                      type="url"
                      className="admin-input"
                      value={formData.deploy_url}
                      onChange={(e) => setFormData({ ...formData, deploy_url: e.target.value })}
                      placeholder="https://dev-roadmap.vercel.app/"
                    />
                  </div>
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
                  {saving ? 'Đang lưu...' : isEditing ? 'Lưu Thay Đổi' : 'Thêm Dự Án'}
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
                <span>Xác Nhận Xóa Dự Án</span>
              </h3>
              <button onClick={() => setDeleteConfirmId(null)} className="admin-btn-icon">
                <X size={16} />
              </button>
            </div>

            <div className="admin-modal-body">
              <p style={{ margin: 0, fontSize: 14, color: 'var(--admin-text)' }}>
                Bạn có chắc chắn muốn xóa dự án này? Thao tác này sẽ xóa dữ liệu trên hệ thống cơ sở dữ liệu và không thể hoàn tác.
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
