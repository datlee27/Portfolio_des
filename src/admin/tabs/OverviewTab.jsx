import React from 'react';
import {
  FolderKanban,
  FileText,
  Activity,
  Database,
  ExternalLink,
  CheckCircle2,
  UserCheck,
} from 'lucide-react';

export default function OverviewTab({
  portfolioData,
  postsData,
  onNavigateTab,
}) {
  const personal = portfolioData?.personal || {};
  const projects = portfolioData?.projects || [];
  const skills = portfolioData?.skills || [];
  const posts = postsData || [];

  return (
    <div>
      {/* ─── Top Stats ─── */}
      <div className="admin-grid-cols-4">
        {/* Stat 1: Projects */}
        <div className="admin-stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="admin-stat-label">Tổng Dự Án</div>
              <div className="admin-stat-value">{projects.length}</div>
              <div className="admin-stat-sub">Dự án Portfolio hoạt động</div>
            </div>
            <div className="admin-badge admin-badge-orange" style={{ padding: 8 }}>
              <FolderKanban size={20} />
            </div>
          </div>
        </div>

        {/* Stat 2: Blog Posts */}
        <div className="admin-stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="admin-stat-label">Bài Viết Blog</div>
              <div className="admin-stat-value">{posts.length}</div>
              <div className="admin-stat-sub">Threads & Ghi chép kỹ thuật</div>
            </div>
            <div className="admin-badge admin-badge-blue" style={{ padding: 8 }}>
              <FileText size={20} />
            </div>
          </div>
        </div>

        {/* Stat 3: Tech Skills */}
        <div className="admin-stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="admin-stat-label">Danh Mục Kỹ Năng</div>
              <div className="admin-stat-value">{skills.length}</div>
              <div className="admin-stat-sub">Phân hệ Tech Stack</div>
            </div>
            <div className="admin-badge admin-badge-green" style={{ padding: 8 }}>
              <Database size={20} />
            </div>
          </div>
        </div>

        {/* Stat 4: Server Status */}
        <div className="admin-stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="admin-stat-label">Trạng Thái API</div>
              <div
                className="admin-stat-value"
                style={{
                  fontSize: 20,
                  color: isConnected ? '#10b981' : '#f59e0b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <CheckCircle2 size={20} />
                <span>{isConnected ? 'ONLINE' : 'LOCAL / OFFLINE'}</span>
              </div>
              <div className="admin-stat-sub">
                {isConnected ? 'datdoc.id.vn • REST 200 OK' : 'Đang dùng bộ nhớ cục bộ dự phòng'}
              </div>
            </div>
            <div
              className={`admin-badge ${isConnected ? 'admin-badge-green' : 'admin-badge-orange'}`}
              style={{ padding: 8 }}
            >
              <Activity size={20} />
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <img
              src={personal.avatar_url || personal.avatarUrl || 'https://res.cloudinary.com/ddwt6nl7s/image/upload/v1775989709/IMG_6098_fuhsm3.jpg'}
              alt={personal.name || 'Avatar'}
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--admin-card-border)',
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--admin-text)' }}>
                  {personal.name || 'Lê Văn Đạt'}
                </h3>
                <span className="admin-badge admin-badge-orange">
                  {personal.short_name || personal.shortName || 'DAT LEE'}
                </span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--admin-text-muted)', margin: '4px 0 0 0' }}>
                {personal.title || 'Technical Artisan & Fullstack Developer'} • {personal.coordinates || 'Da Nang, Vietnam'}
              </p>
              <div style={{ fontSize: 12.5, color: 'var(--admin-text-secondary)', marginTop: 6, fontStyle: 'italic' }}>
                "{personal.identity_statement || personal.identityStatement || personal.bio || 'Creating bold, functional digital experiences.'}"
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => onNavigateTab('profile')}
              className="admin-btn admin-btn-secondary"
            >
              <UserCheck size={14} />
              <span>Sửa Thông Tin Cá Nhân</span>
            </button>

            {onResetToDefaults && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Bạn có chắc muốn khôi phục toàn bộ dữ liệu về mã nguồn tĩnh ban đầu không? (Mọi chỉnh sửa lưu tạm sẽ được đặt lại)')) {
                    onResetToDefaults();
                    if (showToast) showToast('Đã khôi phục dữ liệu gốc từ mã nguồn!', 'success');
                    if (onRefresh) onRefresh();
                  }
                }}
                className="admin-btn admin-btn-secondary"
                title="Khôi phục lại dữ liệu static mặc định ban đầu"
              >
                <span>Khôi Phục Dữ Liệu Gốc</span>
              </button>
            )}

            <a
              href="https://datdoc.id.vn/api/docs.php#/"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-btn admin-btn-secondary"
            >
              <ExternalLink size={14} />
              <span>Swagger API Docs</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── Quick Actions & Recent Projects Row ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
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
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 18px',
                  borderBottom: '1px solid var(--admin-border-subtle)',
                }}
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
