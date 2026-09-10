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
              <div className="admin-stat-value" style={{ fontSize: 24, color: '#10b981', display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={24} />
                <span>ONLINE</span>
              </div>
              <div className="admin-stat-sub">datdoc.id.vn • REST 200 OK</div>
            </div>
            <div className="admin-badge admin-badge-green" style={{ padding: 8 }}>
              <Activity size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Profile Summary Banner ─── */}
      <div
        className="admin-stat-card"
        style={{
          marginBottom: 28,
          background: 'linear-gradient(135deg, rgba(254, 60, 1, 0.08) 0%, rgba(17, 20, 31, 0.95) 100%)',
          borderColor: 'rgba(254, 60, 1, 0.25)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <img
              src={personal.avatar_url || 'https://res.cloudinary.com/ddwt6nl7s/image/upload/v1775989709/IMG_6098_fuhsm3.jpg'}
              alt={personal.name || 'Avatar'}
              style={{
                width: 68,
                height: 68,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #fe3c01',
                boxShadow: '0 0 20px rgba(254, 60, 1, 0.3)',
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: '#ffffff' }}>
                  {personal.name || 'Lê Văn Đạt'}
                </h3>
                <span className="admin-badge admin-badge-orange">
                  {personal.short_name || 'DAT LEE'}
                </span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--admin-text-muted)', margin: '4px 0 0 0' }}>
                {personal.title || 'Technical Artisan & Fullstack Developer'} • {personal.coordinates || 'Da Nang, Vietnam'}
              </p>
              <div style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.65)', marginTop: 6, fontStyle: 'italic' }}>
                "{personal.identity_statement || personal.bio || 'Creating bold, functional digital experiences.'}"
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigateTab('profile')}
              className="admin-btn admin-btn-secondary"
            >
              <UserCheck size={14} />
              <span>Sửa Thông Tin Cá Nhân</span>
            </button>
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24 }}>
        {/* Recent Projects Card */}
        <div className="admin-table-container">
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--admin-card-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#ffffff' }}>
              Dự Án Mới Nhất ({projects.slice(0, 4).length}/{projects.length})
            </h4>
            <button
              onClick={() => onNavigateTab('projects')}
              style={{ background: 'none', border: 'none', color: 'var(--admin-accent)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
            >
              Xem tất cả →
            </button>
          </div>

          <div style={{ padding: '8px 0' }}>
            {projects.slice(0, 4).map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 20px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img
                    src={p.image_url}
                    alt={p.title}
                    style={{ width: 44, height: 32, borderRadius: 6, objectFit: 'cover', background: '#222' }}
                  />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#ffffff' }}>
                      <span style={{ color: 'var(--admin-accent)', marginRight: 6 }}>[{p.project_code || '00'}]</span>
                      {p.title}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--admin-text-muted)', marginTop: 2 }}>
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
              padding: '16px 20px',
              borderBottom: '1px solid var(--admin-card-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#ffffff' }}>
              Bài Viết Blog Gần Đây ({posts.slice(0, 4).length}/{posts.length})
            </h4>
            <button
              onClick={() => onNavigateTab('blog')}
              style={{ background: 'none', border: 'none', color: 'var(--admin-accent)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
            >
              Xem tất cả →
            </button>
          </div>

          <div style={{ padding: '8px 0' }}>
            {posts.slice(0, 4).map((b) => (
              <div
                key={b.id || b.post_id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 20px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#ffffff' }}>
                    {b.title}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--admin-text-muted)', marginTop: 2 }}>
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
