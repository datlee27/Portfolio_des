import React, { useState, useEffect, useRef } from 'react';
import { Save, Upload, X, Camera, Check, Loader2, FileText, ExternalLink } from 'lucide-react';
import api from '../../services/api';
import { usePortfolio } from '../../context/PortfolioContext';
import { uploadToCloudinary } from '../../services/cloudinary';

export default function ProfileTab({ personalData, onRefresh, showToast }) {
  const { updatePersonal: contextUpdatePersonal, personal: ctxPersonal } = usePortfolio();

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
    cv_url: '',
  });
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);
  const cvFileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCvFile, setSelectedCvFile] = useState(null);
  const [localPreview, setLocalPreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);

  useEffect(() => {
    const source = personalData || ctxPersonal;
    if (source) {
      setFormData({
        name: source.name || '',
        short_name: source.short_name || source.shortName || '',
        title: source.title || '',
        role: source.role || '',
        bio: source.bio || '',
        identity_statement: source.identity_statement || source.identityStatement || '',
        hero_subtext: source.hero_subtext || source.tagline || '',
        status: source.status || '',
        coordinates: source.coordinates || '',
        avatar_url: source.avatar_url || source.avatarUrl || '',
        cv_url: source.cv_url || source.cvUrl || '',
      });
    }
  }, [personalData, ctxPersonal]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showToast('Kích thước ảnh không được vượt quá 10MB.', 'error');
        return;
      }
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setLocalPreview(url);
    }
  };

  const handleClearSelectedFile = (revertPreview = true) => {
    if (localPreview && localPreview.startsWith('blob:')) {
      URL.revokeObjectURL(localPreview);
    }
    setSelectedFile(null);
    if (revertPreview) {
      setLocalPreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCvFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      if (!isPdf) {
        showToast('Vui lòng chọn file tài liệu định dạng PDF (.pdf).', 'error');
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        showToast('Kích thước file PDF không được vượt quá 20MB.', 'error');
        return;
      }
      setSelectedCvFile(file);
    }
  };

  const handleClearSelectedCvFile = () => {
    setSelectedCvFile(null);
    if (cvFileInputRef.current) {
      cvFileInputRef.current.value = '';
    }
  };

  const handleUploadNow = async () => {
    if (!selectedFile) return;
    setUploadingImage(true);
    try {
      const uploadRes = await uploadToCloudinary(selectedFile);
      const newUrl = uploadRes.secure_url;
      setFormData((prev) => ({ ...prev, avatar_url: newUrl }));
      handleClearSelectedFile(false);
      showToast('Đã tải ảnh lên Cloudinary thành công!', 'success');
    } catch (err) {
      console.error('Lỗi upload Cloudinary:', err);
      showToast(`Lỗi tải ảnh lên Cloudinary: ${err.message}`, 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleUploadCvNow = async () => {
    if (!selectedCvFile) return;
    setUploadingCv(true);
    try {
      const uploadRes = await uploadToCloudinary(selectedCvFile, '', 'auto');
      const newUrl = uploadRes.secure_url;
      setFormData((prev) => ({ ...prev, cv_url: newUrl }));
      handleClearSelectedCvFile();
      showToast('Đã tải file CV PDF lên Cloudinary thành công!', 'success');
    } catch (err) {
      console.error('Lỗi upload CV Cloudinary:', err);
      showToast(`Lỗi tải file CV lên Cloudinary: ${err.message}`, 'error');
    } finally {
      setUploadingCv(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSaving(true);
    try {
      let finalAvatarUrl = formData.avatar_url.trim();
      let finalCvUrl = (formData.cv_url || '').trim();

      if (selectedFile) {
        setUploadingImage(true);
        try {
          const uploadRes = await uploadToCloudinary(selectedFile);
          finalAvatarUrl = uploadRes.secure_url;
          setFormData((prev) => ({ ...prev, avatar_url: finalAvatarUrl }));
          handleClearSelectedFile(false);
        } catch (uploadErr) {
          console.error('Lỗi upload avatar Cloudinary:', uploadErr);
          showToast(`Lỗi tải ảnh đại diện lên Cloudinary: ${uploadErr.message}`, 'error');
          setSaving(false);
          setUploadingImage(false);
          return;
        } finally {
          setUploadingImage(false);
        }
      }

      if (selectedCvFile) {
        setUploadingCv(true);
        try {
          const uploadRes = await uploadToCloudinary(selectedCvFile, '', 'auto');
          finalCvUrl = uploadRes.secure_url;
          setFormData((prev) => ({ ...prev, cv_url: finalCvUrl }));
          handleClearSelectedCvFile();
        } catch (cvUploadErr) {
          console.error('Lỗi upload CV Cloudinary:', cvUploadErr);
          showToast(`Lỗi tải file CV lên Cloudinary: ${cvUploadErr.message}`, 'error');
          setSaving(false);
          setUploadingCv(false);
          return;
        } finally {
          setUploadingCv(false);
        }
      }

      const payload = {
        ...formData,
        avatar_url: finalAvatarUrl,
        cv_url: finalCvUrl,
      };

      await api.updatePersonal(payload);

      // Immediate local context & localStorage update
      if (contextUpdatePersonal) {
        contextUpdatePersonal({
          name: payload.name,
          shortName: payload.short_name,
          title: payload.title,
          role: payload.role,
          bio: payload.bio,
          identityStatement: payload.identity_statement,
          tagline: payload.hero_subtext,
          status: payload.status,
          coordinates: payload.coordinates,
          avatarUrl: payload.avatar_url,
          cvUrl: payload.cv_url,
          cv_url: payload.cv_url,
          ...payload,
        });
      }

      showToast('Cập nhật thông tin cá nhân & CV thành công!', 'success');
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Lỗi cập nhật hồ sơ:', err);
      showToast(err.message || 'Lỗi khi cập nhật thông tin.', 'error');
    } finally {
      setSaving(false);
      setUploadingImage(false);
      setUploadingCv(false);
    }
  };

  return (
    <div>
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">Hồ Sơ Cá Nhân</h2>
          <p className="admin-section-desc">
            Cập nhật ảnh đại diện, danh xưng, triết lý và thông tin hiển thị trên toàn bộ Portfolio.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: 900 }}>
        <div className="admin-table-container admin-profile-card">
          {/* Avatar Preview Row */}
          <div className="admin-profile-avatar-row">
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img
                src={
                  localPreview ||
                  formData.avatar_url ||
                  'https://res.cloudinary.com/ddwt6nl7s/image/upload/v1775989709/IMG_6098_fuhsm3.jpg'
                }
                alt="Avatar Preview"
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--admin-card-border)',
                  background: '#f1f5f9',
                  display: 'block',
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Chọn ảnh từ máy tính / thư viện"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'var(--admin-primary)',
                  color: '#ffffff',
                  border: '2px solid #ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                  transition: 'transform 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <Camera size={13} />
              </button>
            </div>

            <div style={{ flex: 1, minWidth: 220, width: '100%' }}>
              <label
                className="admin-form-label"
                style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}
              >
                Link Ảnh Đại Diện (Avatar URL)
              </label>

              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <input
                    type="url"
                    className="admin-input"
                    value={formData.avatar_url}
                    onChange={(e) => {
                      setFormData({ ...formData, avatar_url: e.target.value });
                      if (selectedFile) handleClearSelectedFile();
                    }}
                    placeholder="https://res.cloudinary.com/..."
                    style={{ height: 40, borderRadius: 8, fontSize: 13.5 }}
                  />
                </div>

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
                  disabled={uploadingImage}
                  className="admin-btn admin-btn-secondary"
                  style={{
                    height: 40,
                    padding: '0 14px',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12.5,
                    borderRadius: 8,
                    flexShrink: 0,
                  }}
                  title="Chọn ảnh từ máy tính / thư viện"
                >
                  <Upload size={14} />
                  <span>Chọn từ thư viện</span>
                </button>

                {selectedFile && (
                  <>
                    <button
                      type="button"
                      onClick={handleUploadNow}
                      disabled={uploadingImage}
                      className="admin-btn admin-btn-primary"
                      style={{
                        height: 40,
                        padding: '0 12px',
                        fontSize: 12,
                        borderRadius: 8,
                        flexShrink: 0,
                      }}
                      title="Tải ảnh lên Cloudinary ngay lập tức"
                    >
                      {uploadingImage ? (
                        <>
                          <Loader2 size={13} className="spin" />
                          <span>Đang tải...</span>
                        </>
                      ) : (
                        <span>Tải lên ngay</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleClearSelectedFile(true)}
                      className="admin-btn admin-btn-secondary"
                      style={{
                        height: 40,
                        padding: '0 10px',
                        color: '#ef4444',
                        display: 'inline-flex',
                        alignItems: 'center',
                        borderRadius: 8,
                        flexShrink: 0,
                      }}
                      title="Bỏ chọn file này"
                    >
                      <X size={15} />
                    </button>
                  </>
                )}
              </div>

              {/* Status / Helper Text */}
              {uploadingImage ? (
                <div
                  style={{
                    marginTop: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12,
                    color: 'var(--admin-accent)',
                    fontWeight: 600,
                  }}
                >
                  <Loader2 size={13} className="spin" />
                  <span>Đang tải ảnh đại diện lên Cloudinary...</span>
                </div>
              ) : selectedFile ? (
                <div
                  style={{
                    marginTop: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12,
                    color: '#059669',
                    fontWeight: 500,
                  }}
                >
                  <Check size={14} />
                  <span>
                    Đã chọn: <strong>{selectedFile.name}</strong> (
                    {(selectedFile.size / 1024).toFixed(0)} KB) — Sẽ tự động upload khi bấm
                    "Lưu Thay Đổi".
                  </span>
                </div>
              ) : (
                <span
                  style={{
                    fontSize: 11.5,
                    color: 'var(--admin-text-muted)',
                    marginTop: 6,
                    display: 'block',
                  }}
                >
                  Hỗ trợ dán link URL trực tiếp hoặc bấm <strong>"Chọn từ thư viện"</strong> để tải
                  ảnh từ máy tính lên Cloudinary.
                </span>
              )}
            </div>
          </div>

          {/* CV / Resume File Row */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              padding: '16px 18px',
              background: '#f8fafc',
              borderRadius: 12,
              border: '1px solid var(--admin-card-border, #e2e8f0)',
              alignItems: 'flex-start',
              marginBottom: 20,
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: '#fee2e2',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              <FileText size={22} />
            </div>

            <div style={{ flex: 1, minWidth: 260, width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 6,
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <label
                  className="admin-form-label"
                  style={{ fontWeight: 600, margin: 0, fontSize: 13.5 }}
                >
                  File CV / Resume (Định dạng .pdf)
                </label>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  {formData.cv_url && (
                    <a
                      href={formData.cv_url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontSize: 12,
                        color: 'var(--admin-primary, #2563eb)',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontWeight: 600,
                      }}
                      title="Mở file CV gốc trong tab mới"
                    >
                      <span>Xem file PDF</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                  <a
                    href="/work#cv"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: 12,
                      color: '#059669',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontWeight: 600,
                    }}
                    title="Xem hiển thị nhúng tại trang /work#cv"
                  >
                    <span>Mở trang /work#cv</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.cv_url}
                    onChange={(e) => {
                      setFormData({ ...formData, cv_url: e.target.value });
                      if (selectedCvFile) handleClearSelectedCvFile();
                    }}
                    placeholder="https://res.cloudinary.com/... hoặc /sample-cv.pdf"
                    style={{ height: 40, borderRadius: 8, fontSize: 13 }}
                  />
                </div>

                <input
                  type="file"
                  ref={cvFileInputRef}
                  onChange={handleCvFileChange}
                  accept="application/pdf,.pdf"
                  style={{ display: 'none' }}
                />

                <button
                  type="button"
                  onClick={() => cvFileInputRef.current?.click()}
                  disabled={uploadingCv}
                  className="admin-btn admin-btn-secondary"
                  style={{
                    height: 40,
                    padding: '0 14px',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12.5,
                    borderRadius: 8,
                    flexShrink: 0,
                  }}
                  title="Chọn file CV PDF từ máy tính để tải lên"
                >
                  <Upload size={14} />
                  <span>Tải file PDF từ máy</span>
                </button>

                {selectedCvFile && (
                  <>
                    <button
                      type="button"
                      onClick={handleUploadCvNow}
                      disabled={uploadingCv}
                      className="admin-btn admin-btn-primary"
                      style={{
                        height: 40,
                        padding: '0 12px',
                        fontSize: 12,
                        borderRadius: 8,
                        flexShrink: 0,
                      }}
                      title="Tải file PDF lên Cloudinary ngay lập tức"
                    >
                      {uploadingCv ? (
                        <>
                          <Loader2 size={13} className="spin" />
                          <span>Đang tải...</span>
                        </>
                      ) : (
                        <span>Tải lên ngay</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleClearSelectedCvFile}
                      className="admin-btn admin-btn-secondary"
                      style={{
                        height: 40,
                        padding: '0 10px',
                        color: '#ef4444',
                        display: 'inline-flex',
                        alignItems: 'center',
                        borderRadius: 8,
                        flexShrink: 0,
                      }}
                      title="Bỏ chọn file này"
                    >
                      <X size={15} />
                    </button>
                  </>
                )}
              </div>

              {/* Status / Helper Text */}
              {uploadingCv ? (
                <div
                  style={{
                    marginTop: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12,
                    color: 'var(--admin-accent)',
                    fontWeight: 600,
                  }}
                >
                  <Loader2 size={13} className="spin" />
                  <span>Đang tải file CV PDF lên Cloudinary...</span>
                </div>
              ) : selectedCvFile ? (
                <div
                  style={{
                    marginTop: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12,
                    color: '#059669',
                    fontWeight: 500,
                  }}
                >
                  <Check size={14} />
                  <span>
                    Đã chọn: <strong>{selectedCvFile.name}</strong> (
                    {(selectedCvFile.size / 1024).toFixed(0)} KB) — Sẽ tự động upload khi bấm "Lưu Thay Đổi".
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    fontSize: 11.5,
                    color: 'var(--admin-text-muted)',
                    marginTop: 6,
                    lineHeight: 1.5,
                  }}
                >
                  File CV sẽ được tự động đồng bộ và nhúng hiển thị tại{' '}
                  <strong style={{ color: '#059669' }}>http://localhost:5173/work#cv</strong>.
                  <div style={{ marginTop: 4, color: '#64748b', fontSize: 11 }}>
                    💡 <em>Mẹo Cloudinary:</em> Mặc định Cloudinary bật chặn tải PDF trực tiếp (lỗi 401). Portfolio đã tự động kích hoạt chế độ xem độ nét cao (HQ Preview). Để người xem tải được trực tiếp file <code>.pdf</code> gốc, bạn có thể vào <strong>Cloudinary Console &gt; Settings &gt; Security &gt; Bỏ chọn "PDF and ZIP files delivery"</strong>.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Row 1: Name & Short Name */}
          <div className="admin-form-grid-profile-name">
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
          <div className="admin-form-grid-2">
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
          <div className="admin-form-grid-2">
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
              disabled={saving || uploadingImage}
              className="admin-btn admin-btn-primary"
              style={{ padding: '12px 28px', fontSize: 14 }}
            >
              {saving || uploadingImage ? (
                <Loader2 size={16} className="spin" />
              ) : (
                <Save size={16} />
              )}
              <span>
                {uploadingImage
                  ? 'Đang tải ảnh lên...'
                  : saving
                  ? 'Đang lưu...'
                  : 'Lưu Thay Đổi'}
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
