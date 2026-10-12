import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
  X,
  Search,
  AlertTriangle,
  Upload,
  Loader2,
  Video,
  Film,
  RefreshCw,
} from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import api from '../../services/api';
import { uploadToCloudinary } from '../../services/cloudinary';
import { usePortfolio } from '../../context/PortfolioContext';
import AdminMacModal from '../components/AdminMacModal';

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
  const [uploadProgressText, setUploadProgressText] = useState('');

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Form State
  const initialFormState = {
    project_code: '',
    title: '',
    description: '',
    image_url: '',
    body_images: [],
    video_demo: '',
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

  // Cover image states
  const [selectedFile, setSelectedFile] = useState(null);
  const [localPreview, setLocalPreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  // Body images state: Array of { id, url, file, previewUrl } (max 6)
  const [bodyImagesList, setBodyImagesList] = useState([]);
  const bodyFileInputRef = useRef(null);
  const replaceFileInputRef = useRef(null);
  const [replacingIndex, setReplacingIndex] = useState(null);

  // Video demo state: { file, previewUrl }
  const [selectedVideoFile, setSelectedVideoFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState('');
  const videoFileInputRef = useRef(null);

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

  const handleBodyFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remainingSlots = 6 - bodyImagesList.length;
    if (remainingSlots <= 0) {
      showToast('Đã đạt giới hạn tối đa 6 ảnh body cho dự án.', 'warning');
      return;
    }

    const filesToAdd = files.slice(0, remainingSlots);
    if (files.length > remainingSlots) {
      showToast(`Chỉ thêm được ${remainingSlots} ảnh do giới hạn tối đa là 6 ảnh body.`, 'info');
    }

    const newItems = filesToAdd.map((file, idx) => ({
      id: `file-${Date.now()}-${idx}-${Math.random()}`,
      url: '',
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setBodyImagesList((prev) => [...prev, ...newItems]);
    if (bodyFileInputRef.current) bodyFileInputRef.current.value = '';
  };

  const handleAddBodyUrlSlot = () => {
    if (bodyImagesList.length >= 6) {
      showToast('Đã đạt giới hạn tối đa 6 ảnh body.', 'warning');
      return;
    }
    setBodyImagesList((prev) => [
      ...prev,
      {
        id: `url-${Date.now()}-${Math.random()}`,
        url: '',
        file: null,
        previewUrl: '',
      },
    ]);
  };

  const handleUpdateBodyUrl = (id, newUrl) => {
    setBodyImagesList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            url: newUrl,
            file: null,
            previewUrl: newUrl,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveBodyImage = (id) => {
    setBodyImagesList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleTriggerReplace = (index) => {
    setReplacingIndex(index);
    if (replaceFileInputRef.current) {
      replaceFileInputRef.current.value = '';
      replaceFileInputRef.current.click();
    }
  };

  const handleReplaceFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || replacingIndex === null) return;
    if (!file.type.startsWith('image/')) {
      showToast('Vui lòng chọn file hình ảnh hợp lệ (PNG, JPG, WEBP, GIF).', 'error');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setBodyImagesList((prev) =>
      prev.map((item, idx) => {
        if (idx === replacingIndex) {
          return {
            ...item,
            file: file,
            previewUrl: objectUrl,
            url: '',
          };
        }
        return item;
      })
    );
    showToast(`Đã đổi ảnh vị trí #${replacingIndex + 1}`, 'success');
    setReplacingIndex(null);
    if (replaceFileInputRef.current) replaceFileInputRef.current.value = '';
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      showToast('Vui lòng chọn file video hợp lệ (MP4, WEBM, MOV, v.v.).', 'error');
      return;
    }
    setSelectedVideoFile(file);
    setVideoPreviewUrl(URL.createObjectURL(file));
  };

  const handleClearVideo = () => {
    setSelectedVideoFile(null);
    setVideoPreviewUrl('');
    setFormData((prev) => ({ ...prev, video_demo: '' }));
    if (videoFileInputRef.current) videoFileInputRef.current.value = '';
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setCurrentId(null);
    setSelectedFile(null);
    setLocalPreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';

    setBodyImagesList([]);
    if (bodyFileInputRef.current) bodyFileInputRef.current.value = '';

    setSelectedVideoFile(null);
    setVideoPreviewUrl('');
    if (videoFileInputRef.current) videoFileInputRef.current.value = '';

    const nextCode = String(localProjects.length + 1).padStart(2, '0');
    setFormData({ ...initialFormState, project_code: nextCode });
    setModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setIsEditing(true);
    setCurrentId(project.id);
    setSelectedFile(null);
    setLocalPreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';

    // Parse existing body images
    let existingBody = [];
    if (Array.isArray(project.body_images) && project.body_images.length > 0) {
      existingBody = project.body_images;
    } else if (typeof project.body_images === 'string' && project.body_images.trim().length > 0) {
      if (project.body_images.trim().startsWith('[')) {
        try {
          existingBody = JSON.parse(project.body_images);
        } catch {
          existingBody = [];
        }
      } else {
        existingBody = project.body_images.split(',').map((s) => s.trim()).filter(Boolean);
      }
    } else if (Array.isArray(project.images) && project.images.length > 0) {
      existingBody = project.images;
    }

    // Fallback: check localStorage override if existingBody is empty
    if (!existingBody || existingBody.length === 0) {
      try {
        const rawOverride = localStorage.getItem('portfolio_projects_override');
        if (rawOverride) {
          const stored = JSON.parse(rawOverride);
          const matched = stored.find(
            (p) => String(p.id) === String(project.id) || (p.title && p.title.toLowerCase().trim() === (project.title || '').toLowerCase().trim())
          );
          if (matched) {
            if (Array.isArray(matched.body_images) && matched.body_images.length > 0) {
              existingBody = matched.body_images;
            } else if (Array.isArray(matched.images) && matched.images.length > 0) {
              existingBody = matched.images;
            }
          }
        }
      } catch (err) {
        console.warn('Fallback body_images lookup failed:', err);
      }
    }

    const cleanBody = (Array.isArray(existingBody) ? existingBody : [])
      .filter((s) => typeof s === 'string' && s.trim().length > 0)
      .slice(0, 6);

    setBodyImagesList(cleanBody.map((url, i) => ({
      id: `existing-${i}-${Date.now()}`,
      url: url,
      file: null,
      previewUrl: url,
    })));
    if (bodyFileInputRef.current) bodyFileInputRef.current.value = '';

    // Existing video demo
    let existingVideo = (project.video_demo || project.video_url || project.video || '').trim();
    if (!existingVideo) {
      try {
        const rawOverride = localStorage.getItem('portfolio_projects_override');
        if (rawOverride) {
          const stored = JSON.parse(rawOverride);
          const matched = stored.find(
            (p) => String(p.id) === String(project.id) || (p.title && p.title.toLowerCase().trim() === (project.title || '').toLowerCase().trim())
          );
          if (matched) {
            existingVideo = (matched.video_demo || matched.video_url || matched.video || '').trim();
          }
        }
      } catch (err) {}
    }

    setSelectedVideoFile(null);
    setVideoPreviewUrl(existingVideo);
    if (videoFileInputRef.current) videoFileInputRef.current.value = '';

    setFormData({
      project_code: project.project_code || project.code?.replace(/[()]/g, '') || '',
      title: project.title || '',
      description: project.description || '',
      image_url: project.image_url || project.image || '',
      body_images: cleanBody,
      video_demo: existingVideo,
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
    setUploadProgressText('Đang chuẩn bị lưu dữ liệu...');
    try {
      let finalImageUrl = formData.image_url.trim();

      // 1. Upload Cover/Avatar if local file selected
      if (selectedFile) {
        setUploadingImage(true);
        setUploadProgressText('Đang tải ảnh đại diện lên Cloudinary...');
        try {
          const uploadRes = await uploadToCloudinary(selectedFile);
          finalImageUrl = uploadRes.secure_url;
        } catch (uploadErr) {
          console.error('Lỗi upload Cloudinary:', uploadErr);
          showToast(`Lỗi tải ảnh đại diện lên Cloudinary: ${uploadErr.message}`, 'error');
          setSaving(false);
          setUploadingImage(false);
          setUploadProgressText('');
          return;
        } finally {
          setUploadingImage(false);
        }
      }

      // 2. Upload Body Images (deferred upload upon submit)
      const finalBodyUrls = [];
      for (let i = 0; i < bodyImagesList.length; i++) {
        const item = bodyImagesList[i];
        if (item.file) {
          setUploadProgressText(`Đang tải ảnh body (${i + 1}/${bodyImagesList.length}) lên Cloudinary...`);
          try {
            const res = await uploadToCloudinary(item.file);
            finalBodyUrls.push(res.secure_url);
          } catch (bErr) {
            console.error(`Lỗi upload ảnh body #${i + 1}:`, bErr);
            showToast(`Lỗi tải ảnh body #${i + 1}: ${bErr.message}`, 'error');
            setSaving(false);
            setUploadProgressText('');
            return;
          }
        } else if (item.url && item.url.trim()) {
          finalBodyUrls.push(item.url.trim());
        }
      }

      // 3. Upload Video Demo if local file selected
      let finalVideoUrl = (formData.video_demo || '').trim();
      if (selectedVideoFile) {
        setUploadProgressText('Đang tải video demo lên Cloudinary...');
        try {
          const videoRes = await uploadToCloudinary(selectedVideoFile, '', 'video');
          finalVideoUrl = videoRes.secure_url;
        } catch (vErr) {
          console.error('Lỗi upload video Cloudinary:', vErr);
          showToast(`Lỗi tải video demo lên Cloudinary: ${vErr.message}`, 'error');
          setSaving(false);
          setUploadProgressText('');
          return;
        }
      }

      setUploadProgressText('Đang lưu thông tin dự án...');

      // Format tags as array
      const tagsArray = formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const normalizedProject = {
        ...formData,
        id: isEditing ? currentId : String(Date.now()),
        tags: tagsArray,
        image: finalImageUrl,
        image_url: finalImageUrl,
        body_images: finalBodyUrls,
        video_demo: finalVideoUrl,
        video_url: finalVideoUrl,
        github: formData.github_url,
        github_url: formData.github_url,
        deploy: formData.deploy_url,
        deploy_url: formData.deploy_url,
        code: `(${String(formData.project_code || '01').padStart(2, '0')})`,
        client: tagsArray.slice(0, 2).join(' / ') || 'Production App',
        hasCaseStudy: Boolean(formData.deploy_url || formData.github_url),
      };

      if (isEditing) {
        await api.updateProject(currentId, normalizedProject);
        showToast('Cập nhật dự án thành công!', 'success');
      } else {
        await api.createProject(normalizedProject);
        showToast('Tạo dự án mới thành công!', 'success');
      }

      const updatedList = (isEditing
        ? localProjects.map((p) => (p.id === currentId ? { ...p, ...normalizedProject } : p))
        : [...localProjects, normalizedProject]
      ).map((item) => ({
        ...item,
        image: item.image || item.image_url || '',
        image_url: item.image_url || item.image || '',
        body_images: Array.isArray(item.body_images) ? item.body_images : [],
        video_demo: item.video_demo || item.video_url || '',
      }));

      setLocalProjects(updatedList);
      try {
        localStorage.setItem('portfolio_projects_override', JSON.stringify(updatedList));
      } catch (e) {
        console.warn('Failed to cache projects in localStorage:', e);
      }
      if (contextUpdateProjects) {
        contextUpdateProjects(updatedList);
      }

      setModalOpen(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Lỗi lưu dự án:', err);
      showToast(err.message || 'Lỗi khi lưu dự án.', 'error');
    } finally {
      setSaving(false);
      setUploadProgressText('');
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await api.deleteProject(id);

      const updatedList = localProjects.filter((p) => p.id !== id);
      setLocalProjects(updatedList);
      try {
        localStorage.setItem('portfolio_projects_override', JSON.stringify(updatedList));
      } catch (e) {
        console.warn('Failed to cache projects in localStorage:', e);
      }
      if (contextUpdateProjects) {
        contextUpdateProjects(updatedList);
      }

      showToast('Đã xóa dự án thành công!', 'success');
      setDeleteConfirmId(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Lỗi xóa dự án:', err);
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
          <h2 className="admin-section-title">Dự Án Portfolio</h2>
        </div>

        <div className="admin-section-controls">
          {/* Search Box */}
          <div className="admin-search-wrapper" style={{ position: 'relative', width: 220 }}>
            <input
              type="text"
              className="admin-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm dự án..."
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

          {/* Add Project Button */}
          <button id="btn-add-project" onClick={handleOpenAdd} className="admin-btn admin-btn-primary" style={{ height: 36, padding: '0 14px' }}>
            <Plus size={15} />
            <span>Thêm Dự Án</span>
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
                        {p.image_url || p.image ? (
                          <img
                            src={p.image_url || p.image}
                            alt={p.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const placeholder = e.currentTarget.nextElementSibling;
                              if (placeholder) placeholder.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            display: p.image_url || p.image ? 'none' : 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--admin-text-muted)',
                            background: '#f8fafc',
                          }}
                        >
                          <ImageIcon size={15} />
                        </div>
                      </div>
                    </td>

                    {/* Title & Description */}
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--admin-text)', fontSize: 13.5, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
                        <span>{p.title}</span>
                        {Array.isArray(p.body_images) && p.body_images.length > 0 && (
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              background: '#e0f2fe',
                              color: '#0369a1',
                              padding: '2px 7px',
                              borderRadius: 100,
                            }}
                            title={`${p.body_images.length} ảnh body bên trong`}
                          >
                            +{p.body_images.length} ảnh body
                          </span>
                        )}
                        {(p.video_demo || p.video_url) && (
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              background: '#f3e8ff',
                              color: '#7e22ce',
                              padding: '2px 7px',
                              borderRadius: 100,
                            }}
                            title="Có video demo"
                          >
                            🎥 video
                          </span>
                        )}
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

      {/* ─── Add / Edit macOS Modal ─── */}
      <AdminMacModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? 'Chỉnh Sửa Dự Án' : 'Thêm Dự Án Mới'}
        prefix="Editor — "
        maxWidth={660}
      >
        <form onSubmit={handleSubmit} className="admin-modal-form">
          <div className="admin-modal-body">
            {/* Row: Project Code & Status */}
            <div className="admin-form-grid-2">
              <div className="admin-form-group">
                <label className="admin-form-label">Mã dự án</label>
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
                <label className="admin-form-label">Trạng thái</label>
                <select
                  className="admin-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Latest">Mới nhất</option>
                  <option value="Completed">Hoàn thành</option>
                  <option value="In Progress">Đang thực hiện</option>
                  <option value="Archived">Lưu trữ</option>
                </select>
              </div>
            </div>

            {/* Title */}
            <div className="admin-form-group">
              <label className="admin-form-label">Tên dự án</label>
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
              <label className="admin-form-label">Mô tả</label>
              <textarea
                className="admin-textarea"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Mô tả chức năng và giá trị của sản phẩm..."
                rows={3}
              />
            </div>

            {/* Image URL & File Picker */}
            <div className="admin-form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label className="admin-form-label" style={{ margin: 0 }}>Ảnh đại diện</label>
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
                          Ảnh sẽ tự động upload lên Cloudinary khi bạn nhấn "{isEditing ? 'Lưu Thay Đổi' : 'Thêm Dự Án'}".
                        </div>
                      </div>
                    ) : (
                      <div style={{ color: 'var(--admin-text-muted)' }}>
                        Xem trước ảnh đại diện hiện tại
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ─── Body Images Section (Tối đa 6 ảnh) ─── */}
            <div className="admin-form-group" style={{ marginTop: 18, borderTop: '1px dashed #e2e8f0', paddingTop: 16 }}>
              {/* Hidden file input for single image replacement */}
              <input
                type="file"
                ref={replaceFileInputRef}
                onChange={handleReplaceFileChange}
                accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                style={{ display: 'none' }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <label className="admin-form-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ImageIcon size={14} style={{ color: '#0284c7' }} />
                    <span>Ảnh body (Chi tiết bên trong popup)</span>
                  </label>
                  <span style={{ fontSize: 11.5, color: 'var(--admin-text-muted)' }}>
                    Hiển thị ở slider sau ảnh đại diện • Chuẩn tỉ lệ 16:10 (Tối đa 6 ảnh)
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: 100,
                      background: bodyImagesList.length >= 6 ? '#fee2e2' : '#f1f5f9',
                      color: bodyImagesList.length >= 6 ? '#dc2626' : '#475569',
                    }}
                  >
                    {bodyImagesList.length}/6 ảnh
                  </span>

                  <input
                    type="file"
                    ref={bodyFileInputRef}
                    onChange={handleBodyFilesChange}
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                    multiple
                    style={{ display: 'none' }}
                  />

                  <button
                    type="button"
                    disabled={bodyImagesList.length >= 6}
                    onClick={() => bodyFileInputRef.current?.click()}
                    className="admin-btn admin-btn-secondary"
                    style={{
                      height: 30,
                      padding: '0 10px',
                      fontSize: 11.5,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      opacity: bodyImagesList.length >= 6 ? 0.5 : 1,
                    }}
                    title="Chọn nhiều file ảnh từ máy tính (tối đa 6 ảnh)"
                  >
                    <Upload size={12} />
                    <span>Chọn từ máy</span>
                  </button>

                  <button
                    type="button"
                    disabled={bodyImagesList.length >= 6}
                    onClick={handleAddBodyUrlSlot}
                    className="admin-btn admin-btn-secondary"
                    style={{
                      height: 30,
                      padding: '0 10px',
                      fontSize: 11.5,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      opacity: bodyImagesList.length >= 6 ? 0.5 : 1,
                    }}
                    title="Nhập thêm URL ảnh trực tiếp"
                  >
                    <Plus size={12} />
                    <span>Thêm URL</span>
                  </button>
                </div>
              </div>

              {/* Body Images Card Grid */}
              {bodyImagesList.length === 0 ? (
                <div
                  style={{
                    padding: '26px 16px',
                    borderRadius: 12,
                    background: '#f8fafc',
                    border: '2px dashed #cbd5e1',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: '#e0f2fe',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0284c7',
                    }}
                  >
                    <ImageIcon size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: '#1e293b', marginBottom: 3 }}>
                      Chưa có ảnh body nào cho dự án
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--admin-text-muted)', maxWidth: 400, margin: '0 auto', lineHeight: 1.5 }}>
                      Nhấn <strong>"Chọn từ máy"</strong> hoặc <strong>"Thêm URL"</strong> để thêm ảnh chụp giao diện chi tiết. Ảnh sẽ hiển thị dạng slider trong popup với chuẩn cắt tỉ lệ 16:10.
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <button
                      type="button"
                      onClick={() => bodyFileInputRef.current?.click()}
                      className="admin-btn admin-btn-primary"
                      style={{ height: 32, padding: '0 12px', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                    >
                      <Upload size={13} />
                      <span>Chọn ảnh từ máy</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleAddBodyUrlSlot}
                      className="admin-btn admin-btn-secondary"
                      style={{ height: 32, padding: '0 12px', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                    >
                      <Plus size={13} />
                      <span>Nhập link URL</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
                    gap: 12,
                  }}
                >
                  {bodyImagesList.map((item, idx) => (
                    <div
                      key={item.id}
                      style={{
                        background: '#ffffff',
                        borderRadius: 10,
                        border: '1px solid #e2e8f0',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                        transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                      }}
                    >
                      {/* Card Header: Badge & Status */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '6px 10px',
                          background: '#f8fafc',
                          borderBottom: '1px solid #f1f5f9',
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: '#0f172a',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <span style={{ color: '#fe3c01' }}>#{idx + 1}</span>
                          <span style={{ fontSize: 10, color: '#64748b', fontWeight: 500 }}>
                            (Slide {idx + 2})
                          </span>
                        </span>

                        {item.file ? (
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 600,
                              background: '#dcfce7',
                              color: '#15803d',
                              padding: '1px 6px',
                              borderRadius: 4,
                            }}
                          >
                            Chờ lưu
                          </span>
                        ) : (
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 600,
                              background: '#e0f2fe',
                              color: '#0369a1',
                              padding: '1px 6px',
                              borderRadius: 4,
                            }}
                          >
                            Cloudinary/URL
                          </span>
                        )}
                      </div>

                      {/* 16:10 Thumbnail Preview with Mockup Scale & Crop */}
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '16 / 10',
                          background: '#09090b',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {item.previewUrl ? (
                          <img
                            src={item.previewUrl}
                            alt={`Body ${idx + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'top center',
                              display: 'block',
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div style={{ textAlign: 'center', color: '#64748b', padding: 8 }}>
                            <ImageIcon size={20} style={{ margin: '0 auto 4px' }} />
                            <div style={{ fontSize: 10 }}>Chưa có link ảnh</div>
                          </div>
                        )}

                        {/* Badge 16:10 Crop */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 6,
                            right: 6,
                            background: 'rgba(0, 0, 0, 0.65)',
                            backdropFilter: 'blur(4px)',
                            color: '#fff',
                            fontSize: 9.5,
                            fontWeight: 600,
                            padding: '2px 5px',
                            borderRadius: 4,
                            pointerEvents: 'none',
                            letterSpacing: '0.02em',
                          }}
                        >
                          16:10 Cover
                        </div>
                      </div>

                      {/* Card Body Info / URL input */}
                      <div style={{ padding: '8px 10px', flex: 1, minHeight: 46 }}>
                        {item.file ? (
                          <div>
                            <div
                              style={{
                                fontSize: 11.5,
                                fontWeight: 600,
                                color: '#059669',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                              title={item.file.name}
                            >
                              📁 {item.file.name}
                            </div>
                            <div style={{ fontSize: 10, color: 'var(--admin-text-muted)', marginTop: 2 }}>
                              {(item.file.size / 1024).toFixed(0)} KB • Tự động upload khi lưu
                            </div>
                          </div>
                        ) : (
                          <input
                            type="text"
                            className="admin-input"
                            value={item.url}
                            onChange={(e) => handleUpdateBodyUrl(item.id, e.target.value)}
                            placeholder="Nhập link ảnh (https://...)"
                            style={{ height: 28, fontSize: 11, padding: '0 8px' }}
                          />
                        )}
                      </div>

                      {/* Card Actions: Đổi ảnh & Xóa */}
                      <div
                        style={{
                          display: 'flex',
                          gap: 6,
                          padding: '6px 10px',
                          background: '#f8fafc',
                          borderTop: '1px solid #f1f5f9',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleTriggerReplace(idx)}
                          className="admin-btn admin-btn-secondary"
                          style={{
                            flex: 1,
                            height: 26,
                            padding: '0 6px',
                            fontSize: 11,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 4,
                          }}
                          title="Chọn ảnh khác từ máy tính để thay thế ảnh này"
                        >
                          <RefreshCw size={11} />
                          <span>Đổi ảnh</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveBodyImage(item.id)}
                          style={{
                            height: 26,
                            padding: '0 8px',
                            fontSize: 11,
                            borderRadius: 6,
                            border: '1px solid #fecaca',
                            background: '#fef2f2',
                            color: '#ef4444',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 4,
                            cursor: 'pointer',
                            transition: 'background 0.15s ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = '#fee2e2')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = '#fef2f2')}
                          title="Xóa ảnh này"
                        >
                          <Trash2 size={11} />
                          <span>Xóa</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add More Slot Card if < 6 */}
                  {bodyImagesList.length < 6 && (
                    <button
                      type="button"
                      onClick={() => bodyFileInputRef.current?.click()}
                      style={{
                        minHeight: 160,
                        borderRadius: 10,
                        border: '2px dashed #cbd5e1',
                        background: '#f8fafc',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                        cursor: 'pointer',
                        padding: 12,
                        color: '#64748b',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#fe3c01';
                        e.currentTarget.style.color = '#fe3c01';
                        e.currentTarget.style.background = '#fff7ed';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#cbd5e1';
                        e.currentTarget.style.color = '#64748b';
                        e.currentTarget.style.background = '#f8fafc';
                      }}
                      title="Thêm ảnh body tiếp theo"
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background: '#ffffff',
                          border: '1px solid currentColor',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Plus size={16} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>Thêm ảnh body</span>
                      <span style={{ fontSize: 10.5, opacity: 0.8 }}>
                        (Còn {6 - bodyImagesList.length} vị trí)
                      </span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* ─── Video Demo Section (Tối đa 1 video) ─── */}
            <div className="admin-form-group" style={{ marginTop: 14, borderTop: '1px dashed #e2e8f0', paddingTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div>
                  <label className="admin-form-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Film size={14} style={{ color: '#9333ea' }} />
                    <span>Video demo dự án (Tùy chọn, tối đa 1 video)</span>
                  </label>
                  <span style={{ fontSize: 11.5, color: 'var(--admin-text-muted)' }}>
                    Nhập link YouTube, Vimeo, MP4 hoặc chọn video từ máy
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  type="text"
                  className="admin-input"
                  style={{ flex: 1 }}
                  value={selectedVideoFile ? `🎬 ${selectedVideoFile.name}` : formData.video_demo}
                  onChange={(e) => {
                    if (!selectedVideoFile) {
                      setFormData({ ...formData, video_demo: e.target.value });
                      setVideoPreviewUrl(e.target.value);
                    }
                  }}
                  placeholder="https://youtube.com/watch?v=... hoặc chọn file video từ máy"
                  readOnly={Boolean(selectedVideoFile)}
                />

                <input
                  type="file"
                  ref={videoFileInputRef}
                  onChange={handleVideoFileChange}
                  accept="video/mp4,video/webm,video/ogg,video/quicktime"
                  style={{ display: 'none' }}
                />

                <button
                  type="button"
                  onClick={() => videoFileInputRef.current?.click()}
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
                  title="Chọn video từ máy tính"
                >
                  <Video size={14} />
                  <span>Chọn từ máy</span>
                </button>

                {(selectedVideoFile || formData.video_demo) && (
                  <button
                    type="button"
                    onClick={handleClearVideo}
                    className="admin-btn admin-btn-secondary"
                    style={{
                      height: 38,
                      padding: '0 10px',
                      color: '#ef4444',
                      display: 'inline-flex',
                      alignItems: 'center',
                    }}
                    title="Xóa video demo này"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Video Preview */}
              {(videoPreviewUrl || formData.video_demo) && (
                <div
                  style={{
                    marginTop: 10,
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: '#f8fafc',
                    border: '1px solid var(--admin-card-border)',
                  }}
                >
                  <div style={{ fontSize: 12, marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600, color: '#9333ea' }}>
                      {selectedVideoFile ? '✓ Video từ máy (Xem trước - Sẽ tải lên khi lưu)' : '✓ Xem trước video demo'}
                    </span>
                  </div>

                  {selectedVideoFile ? (
                    <video
                      src={videoPreviewUrl}
                      controls
                      playsInline
                      style={{ width: '100%', maxHeight: 180, borderRadius: 6, background: '#000' }}
                    />
                  ) : formData.video_demo.includes('youtube.com') || formData.video_demo.includes('youtu.be') ? (
                    <div style={{ fontSize: 12, color: '#334155' }}>
                      📺 Video YouTube: <code>{formData.video_demo}</code> (sẽ tự động nhúng trong popup chi tiết)
                    </div>
                  ) : (
                    <video
                      src={formData.video_demo}
                      controls
                      playsInline
                      style={{ width: '100%', maxHeight: 180, borderRadius: 6, background: '#000' }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="admin-form-group">
              <label className="admin-form-label">Công nghệ (Tags)</label>
              <input
                type="text"
                className="admin-input"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="React, TypeScript, Spring Boot, MySQL"
              />
            </div>

            {/* Row: GitHub URL & Deploy URL */}
            <div className="admin-form-grid-2">
              <div className="admin-form-group">
                <label className="admin-form-label">Link GitHub</label>
                <input
                  type="url"
                  className="admin-input"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Link Demo / Website</label>
                <input
                  type="url"
                  className="admin-input"
                  value={formData.deploy_url}
                  onChange={(e) => setFormData({ ...formData, deploy_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
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
                  {uploadProgressText ||
                    (uploadingImage
                      ? 'Đang tải ảnh lên Cloudinary...'
                      : saving
                      ? 'Đang lưu dự án...'
                      : isEditing
                      ? 'Lưu Thay Đổi'
                      : 'Thêm Dự Án')}
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
        title="Xác Nhận Xóa Dự Án"
        prefix="Cảnh Báo — "
        maxWidth={440}
        danger
      >
        <div className="admin-modal-body">
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--admin-text)' }}>
            Bạn có chắc chắn muốn xóa dự án này không? Thao tác này không thể hoàn tác.
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
    </div>
  );
}
