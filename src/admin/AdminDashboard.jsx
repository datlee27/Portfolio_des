import React, { useState, useEffect, useCallback } from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  User,
  LogOut,
  ExternalLink,
  RefreshCw,
  Menu,
  X,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import api from '../services/api';
import OverviewTab from './tabs/OverviewTab';
import ProjectsTab from './tabs/ProjectsTab';
import BlogTab from './tabs/BlogTab';
import ProfileTab from './tabs/ProfileTab';

export default function AdminDashboard({ onLogout, onGoHome, user }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState(null);
  const [postsData, setPostsData] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [pRes, bRes] = await Promise.all([
        api.getPortfolio().catch((e) => ({ success: false, error: e })),
        api.getPosts().catch((e) => ({ success: false, error: e })),
      ]);

      if (pRes && pRes.success) {
        setPortfolioData(pRes.data);
      }
      if (bRes && bRes.success) {
        setPostsData(bRes.data || []);
      }
    } catch {
      showToast('Lỗi khi tải dữ liệu từ máy chủ API.', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

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
      id: 'blog',
      label: 'Blog & Threads',
      icon: FileText,
      count: postsData?.length || 0,
    },
    { id: 'profile', label: 'Thông Tin & Hero', icon: User },
  ];

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
              className="admin-btn-icon"
              style={{ display: 'none' }} /* Visible on mobile via CSS */
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div className="admin-breadcrumb-title">
              {navItems.find((n) => n.id === activeTab)?.label || 'Dashboard'}
            </div>
          </div>

          <div className="admin-topbar-right">
            {/* Live Refresh Button */}
            <button
              onClick={fetchData}
              disabled={loading}
              className="admin-btn admin-btn-secondary"
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
                  background: '#10b981',
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
