import React, { useState, useEffect, useCallback } from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  User,
  Layers,
  LogOut,
  ExternalLink,
  RefreshCw,
  Menu,
  X,
  CheckCircle,
  AlertCircle,
  Wifi,
  WifiOff,
  Briefcase,
} from 'lucide-react';
import api from '../services/api';
import { usePortfolio, isProjectMatch } from '../context/PortfolioContext';
import OverviewTab from './tabs/OverviewTab';
import ProjectsTab from './tabs/ProjectsTab';
import BlogTab from './tabs/BlogTab';
import ProfileTab from './tabs/ProfileTab';
import SkillsTab from './tabs/SkillsTab';
import ExperienceTab from './tabs/ExperienceTab';

export default function AdminDashboard({ onLogout, onGoHome, user }) {
  const {
    projects: contextProjects,
    skills: contextSkills,
    personal: contextPersonal,
    posts: contextPosts,
    experience: contextExperience,
    isOffline,
    resetToDefaults,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['overview', 'projects', 'skills', 'experience', 'blog', 'profile'].includes(hash)) {
        return hash;
      }
    }
    return 'overview';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['overview', 'projects', 'skills', 'experience', 'blog', 'profile'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState(() => ({
    projects: contextProjects,
    skills: contextSkills,
    personal: contextPersonal,
    experience: contextExperience,
  }));
  const [postsData, setPostsData] = useState(() => contextPosts || []);
  const [toast, setToast] = useState(null);
  const [isServerReachable, setIsServerReachable] = useState(true);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  const fetchData = useCallback(async (isManual = false) => {
    setLoading(true);
    try {
      const [pRes, bRes] = await Promise.all([
        api.getPortfolio().catch((e) => ({ success: false, error: e })),
        api.getPosts().catch((e) => ({ success: false, error: e })),
      ]);

      // If backend reports session is invalid or expired (401), immediately log out
      if (pRes?.error?.status === 401 || bRes?.error?.status === 401) {
        if (onLogout) {
          onLogout();
          return;
        }
      }

      let gotServerData = false;

      if (pRes && pRes.success && pRes.data) {
        gotServerData = true;
        try {
          const raw = localStorage.getItem('portfolio_skills_override');
          if (raw) {
            const savedSkills = JSON.parse(raw);
            if (Array.isArray(savedSkills) && savedSkills.length > 0) {
              pRes.data.skills = savedSkills;
            }
          }
        } catch {}

        // Preserve experience from localStorage if user updated offline or customized
        try {
          const rawExp = localStorage.getItem('portfolio_experience_override');
          if (rawExp) {
            const savedExp = JSON.parse(rawExp);
            if (Array.isArray(savedExp) && savedExp.length > 0) {
              pRes.data.experience = savedExp;
            }
          }
        } catch {}

        // Preserve body_images and video_demo from localStorage if server dropped them
        try {
          const rawProj = localStorage.getItem('portfolio_projects_override');
          if (rawProj && Array.isArray(pRes.data.projects)) {
            const savedProjects = JSON.parse(rawProj);
            if (Array.isArray(savedProjects)) {
              pRes.data.projects = pRes.data.projects.map((sp) => {
                const match = savedProjects.find((lp) => isProjectMatch(lp, sp.id, sp.title));

                let resolvedBody = [];
                if (match && Array.isArray(match.body_images)) {
                  resolvedBody = match.body_images;
                } else if (Array.isArray(sp.body_images)) {
                  resolvedBody = sp.body_images;
                } else if (match && Array.isArray(match.images)) {
                  resolvedBody = match.images;
                }

                return {
                  ...sp,
                  body_images: resolvedBody,
                  video_demo: sp.video_demo || sp.video_url || match?.video_demo || match?.video_url || '',
                  video_url: sp.video_demo || sp.video_url || match?.video_demo || match?.video_url || '',
                };
              });
            }
          }
        } catch {}

        setPortfolioData(pRes.data);
      } else {
        // Fallback to local context data
        setPortfolioData({
          projects: contextProjects,
          skills: contextSkills,
          personal: contextPersonal,
          experience: contextExperience,
        });
      }

      if (bRes && bRes.success && Array.isArray(bRes.data)) {
        gotServerData = true;
        setPostsData(bRes.data);
      } else {
        // Fallback to local posts data
        setPostsData(contextPosts);
      }

      setIsServerReachable(gotServerData);
      if (isManual === true) {
        if (gotServerData) {
          showToast('Đã đồng bộ dữ liệu mới nhất từ máy chủ API!', 'success');
        } else {
          showToast('Không thể kết nối máy chủ API hoặc phiên làm việc hết hạn.', 'error');
        }
      }
    } catch {
      setIsServerReachable(false);
      setPortfolioData({
        projects: contextProjects,
        skills: contextSkills,
        personal: contextPersonal,
        experience: contextExperience,
      });
      setPostsData(contextPosts);
      if (isManual === true) {
        showToast('Đang hoạt động trên bộ nhớ đệm cục bộ.', 'error');
      }
    } finally {
      setLoading(false);
    }
  }, [contextProjects, contextSkills, contextPersonal, contextPosts, contextExperience, showToast, onLogout]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch (e) {
      console.warn('Logout warning:', e);
    }
    if (onLogout) onLogout();
  };

  const navItems = [
    { id: 'overview', label: 'Tổng Quan', icon: LayoutDashboard },
    {
      id: 'projects',
      label: 'Dự Án Portfolio',
      icon: FolderKanban,
      count: portfolioData?.projects?.length || 0,
    },
    {
      id: 'skills',
      label: 'Kỹ Năng & Stack',
      icon: Layers,
      count: portfolioData?.skills?.length || 0,
    },
    {
      id: 'experience',
      label: 'Hành Trình & About',
      icon: Briefcase,
      count: portfolioData?.experience?.length || 0,
    },
    {
      id: 'blog',
      label: 'Blog & Threads',
      icon: FileText,
      count: postsData?.length || 0,
    },
    { id: 'profile', label: 'Thông Tin & Hero', icon: User },
  ];

  const isConnected = isServerReachable && !isOffline;

  return (
    <div className="admin-root">
      {/* ─── Toast Notification ─── */}
      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          {toast.type === 'success' ? (
            <CheckCircle size={16} style={{ color: '#10b981' }} />
          ) : (
            <AlertCircle size={16} style={{ color: '#ef4444' }} />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* ─── Mobile Sidebar Backdrop Overlay ─── */}
      <div
        className={`admin-sidebar-backdrop ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* ─── Sidebar ─── */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Brand */}
        <div className="admin-sidebar-brand">
          <div className="admin-brand-logo">
            <span>dl</span>
            <span style={{ color: 'var(--admin-accent)' }}>*</span>
            <span style={{ fontSize: 13, color: 'var(--admin-accent)', fontWeight: 800, marginLeft: 6 }}>
              PORTAL
            </span>
          </div>
          <span className="admin-brand-badge">ADMIN</span>
        </div>

        {/* Navigation Items */}
        <nav className="admin-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.count !== undefined && item.count > 0 && (
                  <span
                    style={{
                      fontSize: 11,
                      padding: '1px 7px',
                      borderRadius: 10,
                      background: isActive ? '#ffffff' : '#f1f5f9',
                      color: isActive ? 'var(--admin-primary)' : 'var(--admin-text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="admin-sidebar-footer">
          <button
            onClick={onGoHome}
            className="admin-btn admin-btn-secondary"
            style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12.5 }}
          >
            <ExternalLink size={14} />
            <span>Xem Live Portfolio</span>
          </button>

          <button
            onClick={handleLogout}
            className="admin-btn admin-btn-secondary"
            style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12.5, color: '#dc2626' }}
          >
            <LogOut size={14} />
            <span>Đăng Xuất</span>
          </button>
        </div>
      </aside>

      {/* ─── Main Content Container ─── */}
      <main className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="admin-btn-icon admin-menu-toggle"
              aria-label="Toggle navigation menu"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div className="admin-breadcrumb-title">
              {navItems.find((n) => n.id === activeTab)?.label || 'Dashboard'}
            </div>
          </div>

          <div className="admin-topbar-right">
            {/* Online / Offline Status Badge */}
            <div
              className="admin-status-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 10px',
                borderRadius: 20,
                fontSize: 11.5,
                fontWeight: 600,
                background: isConnected ? '#ecfdf5' : '#fff1f2',
                border: isConnected ? '1px solid #a7f3d0' : '1px solid #fecdd3',
                color: isConnected ? '#059669' : '#e11d48',
              }}
              title={isConnected ? 'Kết nối máy chủ API ổn định' : 'Đang chạy ngoại tuyến hoặc API chưa khả dụng'}
            >
              {isConnected ? <Wifi size={13} /> : <WifiOff size={13} />}
              <span>{isConnected ? 'API Sẵn Sàng' : 'Chế Độ Cục Bộ (Offline)'}</span>
            </div>

            {/* Live Refresh Button */}
            <button
              onClick={() => fetchData(true)}
              disabled={loading}
              className="admin-btn admin-btn-secondary admin-sync-btn"
              title="Làm mới dữ liệu từ API"
              style={{ padding: '6px 12px', fontSize: 12.5 }}
            >
              <RefreshCw size={13} className={loading ? 'spin' : ''} />
              <span>{loading ? 'Đang nạp...' : 'Đồng Bộ API'}</span>
            </button>

            {/* Admin User Info Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '5px 12px',
                borderRadius: 100,
                background: '#ffffff',
                border: '1px solid var(--admin-card-border)',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--admin-text)',
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: isConnected ? '#10b981' : '#f59e0b',
                }}
              />
              <span>{user?.username || 'admin'}</span>
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <div className="admin-content">
          {activeTab === 'overview' && (
            <OverviewTab
              portfolioData={portfolioData}
              postsData={postsData}
              onRefresh={fetchData}
              loading={loading}
              isConnected={isConnected}
              onResetToDefaults={resetToDefaults}
              showToast={showToast}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsTab
              projects={portfolioData?.projects || []}
              onRefresh={fetchData}
              showToast={showToast}
            />
          )}

          {activeTab === 'skills' && (
            <SkillsTab
              skills={portfolioData?.skills || []}
              onRefresh={fetchData}
              showToast={showToast}
            />
          )}

          {activeTab === 'experience' && (
            <ExperienceTab
              experienceData={portfolioData?.experience || contextExperience || []}
              onRefresh={fetchData}
              showToast={showToast}
            />
          )}

          {activeTab === 'blog' && (
            <BlogTab
              posts={postsData}
              onRefresh={fetchData}
              showToast={showToast}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileTab
              personalData={portfolioData?.personal}
              onRefresh={fetchData}
              showToast={showToast}
            />
          )}
        </div>
      </main>
    </div>
  );
}
