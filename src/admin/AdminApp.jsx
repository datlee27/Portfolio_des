import React, { useState, useEffect } from 'react';
import './styles/admin.css';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import api from '../services/api';

export default function AdminApp({ onGoHome }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return Boolean(localStorage.getItem('admin_session'));
    } catch {
      return false;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('admin_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check existing session on mount
  useEffect(() => {
    async function verify() {
      try {
        const res = await api.checkAuth();
        if (res && res.success && res.data?.logged_in) {
          setIsAuthenticated(true);
          setUser(res.data);
          try {
            localStorage.setItem('admin_session', JSON.stringify(res.data));
          } catch {}
        } else {
          // If server explicitly returned logged_in === false, invalidate local session
          setIsAuthenticated(false);
          setUser(null);
          try {
            localStorage.removeItem('admin_session');
          } catch {}
        }
      } catch {
        // Only allow offline session if user explicitly entered offline mode
        const localSession = localStorage.getItem('admin_session');
        if (localSession) {
          try {
            const parsed = JSON.parse(localSession);
            if (parsed.isOfflineMode) {
              setIsAuthenticated(true);
              setUser(parsed);
            } else {
              setIsAuthenticated(false);
            }
          } catch {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } finally {
        setCheckingAuth(false);
      }
    }
    verify();
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    try {
      localStorage.setItem('admin_session', JSON.stringify(userData));
    } catch {}
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      localStorage.removeItem('admin_session');
    } catch {}
  };

  if (checkingAuth) {
    return (
      <div
        className="admin-login-wrapper"
        style={{ color: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
      >
        <div
          style={{
            fontFamily: 'var(--font-outfit)',
            fontSize: 32,
            fontWeight: 900,
            letterSpacing: '-0.03em',
          }}
        >
          dl<span style={{ color: '#fe3c01' }}>*</span> ADMIN
        </div>
        <div style={{ fontSize: 13, color: 'var(--admin-text-muted)' }}>
          Đang kiểm tra phiên đăng nhập...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onGoHome={onGoHome}
      />
    );
  }

  return (
    <AdminDashboard
      user={user}
      onLogout={handleLogout}
      onGoHome={onGoHome}
    />
  );
}
