import React, { useState, useEffect } from 'react';
import './styles/admin.css';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import api from '../services/api';

export default function AdminApp({ onGoHome }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check existing session on mount
  useEffect(() => {
    async function verify() {
      try {
        const res = await api.checkAuth();
        if (res && res.success && (res.data?.logged_in || res.data?.username)) {
          setIsAuthenticated(true);
          setUser(res.data);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    }
    verify();
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
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
