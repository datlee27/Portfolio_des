import React, { useState, useEffect } from 'react';
import './styles/admin.css';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import api from '../services/api';

export default function AdminApp({ onGoHome }) {
  // Always default to unauthenticated; never trust localStorage blindly
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Strictly verify session with backend server on mount
  useEffect(() => {
    let isMounted = true;

    async function verify() {
      try {
        const res = await api.checkAuth();
        if (!isMounted) return;

        if (res && res.success && res.data?.logged_in) {
          setIsAuthenticated(true);
          setUser(res.data);
          try {
            localStorage.setItem('admin_session', JSON.stringify(res.data));
          } catch {}
        } else {
          // Server says not logged in -> strictly force logout & clear localStorage
          setIsAuthenticated(false);
          setUser(null);
          try {
            localStorage.removeItem('admin_session');
          } catch {}
        }
      } catch {
        // Any network/server error -> strictly reject access, do not allow bypass
        if (!isMounted) return;
        setIsAuthenticated(false);
        setUser(null);
        try {
          localStorage.removeItem('admin_session');
        } catch {}
      } finally {
        if (isMounted) {
          setCheckingAuth(false);
        }
      }
    }

    verify();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    try {
      localStorage.setItem('admin_session', JSON.stringify(userData));
    } catch {}
  };

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch (e) {
      console.warn('Logout API error:', e);
    }
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
