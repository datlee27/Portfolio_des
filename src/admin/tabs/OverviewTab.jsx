import React from 'react';
import {
  FolderKanban,
  FileText,
  Activity,
  Database,
  ExternalLink,
  CheckCircle2,
  UserCheck,
  Briefcase,
} from 'lucide-react';

export default function OverviewTab({
  portfolioData,
  postsData,
  onRefresh,
  loading = false,
  isConnected = false,
  onResetToDefaults,
  showToast,
  onNavigateTab,
}) {
  const personal = portfolioData?.personal || {};
  const projects = portfolioData?.projects || [];
  const skills = portfolioData?.skills || [];
  const experience = portfolioData?.experience || [];
  const posts = postsData || [];

  return (
    <div>
      {/* ─── Top Stats ─── */}
      <div className="admin-grid-cols-4">
        {/* Stat 1: Projects */}
        <div className="admin-stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="admin-stat-label">Dự Án</div>
              <div className="admin-stat-value">{projects.length}</div>
            </div>
            <div className="admin-stat-icon-neutral">
              <FolderKanban size={18} />
            </div>
          </div>
        </div>

        {/* Stat 2: Blog Posts */}
        <div className="admin-stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="admin-stat-label">Bài Viết</div>
              <div className="admin-stat-value">{posts.length}</div>
            </div>
            <div className="admin-stat-icon-neutral">
              <FileText size={18} />
            </div>
          </div>
        </div>

        {/* Stat 3: Tech Skills */}
        <div className="admin-stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="admin-stat-label">Kỹ Năng</div>
              <div className="admin-stat-value">{skills.length}</div>
            </div>
            <div className="admin-stat-icon-neutral">
              <Database size={18} />
            </div>
          </div>
        </div>

        {/* Stat 4: Journey & About */}
        <div
          className="admin-stat-card"
          onClick={() => onNavigateTab && onNavigateTab('experience')}
          style={{ cursor: 'pointer' }}
          title="Bấm để xem và quản lý Hành Trình & About"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="admin-stat-label">Hành Trình / About</div>
              <div className="admin-stat-value">{experience.length}</div>
            </div>
            <div className="admin-stat-icon-neutral">
              <Briefcase size={18} />
            </div>
          </div>
        </div>

        {/* Stat 5: Server Status */}
        <div className="admin-stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="admin-stat-label">Hệ Thống API</div>
              <div
                className="admin-stat-value"
                style={{
                  fontSize: 15,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 6,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: isConnected ? '#10b981' : '#f59e0b',
                    display: 'inline-block',
                    boxShadow: isConnected ? '0 0 0 3px rgba(16, 185, 129, 0.18)' : '0 0 0 3px rgba(245, 158, 11, 0.18)',
                  }}
                />
                <span style={{ fontWeight: 700, color: 'var(--admin-text)' }}>
                  {isConnected ? 'Sẵn Sàng' : 'Cục Bộ'}
                </span>
              </div>
            </div>
            <div className="admin-stat-icon-neutral">
              <Activity size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Profile Summary Banner ─── */}
      <div
        className="admin-stat-card"
        style={{
          marginBottom: 24,
          background: '#ffffff',
          borderColor: 'var(--admin-card-border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img
              src={personal.avatar_url || personal.avatarUrl || 'https://res.cloudinary.com/ddwt6nl7s/image/upload/v1775989709/IMG_6098_fuhsm3.jpg'}
              alt={personal.name || 'Avatar'}
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid var(--admin-card-border)',
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--admin-text)' }}>
                  {personal.name || 'Lê Văn Đạt'}
                </h3>
                <span className="admin-tag-pill" style={{ margin: 0 }}>
                  {personal.short_name || personal.shortName || 'DAT LEE'}
                </span>
              </div>
              <p style={{ fontSize: 12.5, color: 'var(--admin-text-muted)', margin: '3px 0 0 0' }}>
                {personal.title || 'Technical Artisan & Fullstack Developer'} • {personal.coordinates || 'Da Nang, Vietnam'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => onNavigateTab('profile')}
              className="admin-btn admin-btn-secondary"
              style={{ fontSize: 12.5, padding: '7px 14px' }}
            >
              <UserCheck size={14} />
              <span>Sửa Hồ Sơ</span>
            </button>

            {onResetToDefaults && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Khôi phục toàn bộ dữ liệu về mã nguồn gốc ban đầu?')) {
                    onResetToDefaults();
                    if (showToast) showToast('Đã khôi phục dữ liệu gốc!', 'success');
                    if (onRefresh) onRefresh();
                  }
                }}
                className="admin-btn admin-btn-secondary"
                title="Khôi phục lại dữ liệu ban đầu"
                style={{ fontSize: 12.5, padding: '7px 12px' }}
              >
                <span>Khôi Phục Gốc</span>
              </button>
            )}

            <a
              href="https://datdoc.id.vn/api/docs.php#/"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-btn admin-btn-secondary"
              title="Mở Swagger API Docs"
              style={{ fontSize: 12.5, padding: '7px 12px' }}
            >
              <ExternalLink size={14} />
              <span>Swagger API</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── Quick Actions & Recent Projects Row ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {/* Recent Projects Card */}
        <div className="admin-table-container">
          <div
            style={{
              padding: '14px 18px',
              borderBottom: '1px solid var(--admin-card-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#f8fafc',
            }}
          >
            <h4 style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: 'var(--admin-text)' }}>
              Dự Án Mới Nhất ({projects.slice(0, 4).length}/{projects.length})
            </h4>
            <button
              onClick={() => onNavigateTab('projects')}
              style={{ background: 'none', border: 'none', color: 'var(--admin-text-secondary)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
            >
              Xem tất cả →
            </button>
          </div>

          <div style={{ padding: 0 }}>
            {projects.slice(0, 4).map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 18px',
                  borderBottom: '1px solid var(--admin-border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img
                    src={p.image_url}
                    alt={p.title}
                    style={{ width: 44, height: 32, borderRadius: 4, objectFit: 'cover', background: '#f1f5f9', border: '1px solid var(--admin-card-border)' }}
                  />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text)' }}>
                      <span style={{ color: 'var(--admin-accent)', marginRight: 6 }}>[{p.project_code || '00'}]</span>
                      {p.title}
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--admin-text-muted)', marginTop: 2 }}>
                      {Array.isArray(p.tags) ? p.tags.slice(0, 3).join(', ') : p.tags}
                    </div>
                  </div>
                </div>
                <span className="admin-badge admin-badge-green">{p.status || 'Active'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Blog Posts Card */}
        <div className="admin-table-container">
          <div
            style={{
              padding: '14px 18px',
              borderBottom: '1px solid var(--admin-card-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#f8fafc',
            }}
          >
            <h4 style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: 'var(--admin-text)' }}>
              Bài Viết Blog Gần Đây ({posts.slice(0, 4).length}/{posts.length})
            </h4>
            <button
              onClick={() => onNavigateTab('blog')}
              style={{ background: 'none', border: 'none', color: 'var(--admin-text-secondary)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
            >
              Xem tất cả →
            </button>
          </div>

          <div style={{ padding: 0 }}>
            {posts.slice(0, 4).map((b) => (
              <div
                key={b.id || b.post_id}
                onClick={() => onNavigateTab('blog')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 18px',
                  borderBottom: '1px solid var(--admin-border-subtle)',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                }}
                className="admin-hover-row"
                title="Xem chi tiết tại Tab Blog & Threads"
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--admin-text)' }}>
                    {b.title}
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--admin-text-muted)', marginTop: 2 }}>
                    {b.published_date || b.date || 'Gần đây'} • {b.read_time || b.readTime || 5} min read
                  </div>
                </div>
                <span className="admin-badge admin-badge-blue">Published</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
