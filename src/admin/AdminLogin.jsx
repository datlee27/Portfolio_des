import React, { useState } from 'react';
import { Lock, User, ArrowRight, ArrowLeft, ShieldAlert, WifiOff } from 'lucide-react';
import api from '../services/api';

export default function AdminLogin({ onLoginSuccess, onGoHome }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allowOfflineLogin, setAllowOfflineLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Vui lòng nhập đầy đủ tài khoản và mật khẩu.');
      return;
    }

    setLoading(true);
    setError(null);
    setAllowOfflineLogin(false);

    try {
      const res = await api.login(username, password);
      if (res && res.success) {
        if (onLoginSuccess) {
          onLoginSuccess(res.data || { username });
        }
      } else {
        setError(res?.message || 'Tài khoản hoặc mật khẩu không chính xác.');
        setAllowOfflineLogin(true);
      }
    } catch (err) {
      setError(
        'Không thể kết nối đến máy chủ API (Mạng ngoại tuyến hoặc máy chủ chưa sẵn sàng).'
      );
      // Offer offline login option
      setAllowOfflineLogin(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOfflineLogin = () => {
    if (onLoginSuccess) {
      onLoginSuccess({
        username: username || 'admin',
        role: 'offline_admin',
        isOfflineMode: true,
      });
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-box">
        {/* Top Back Link */}
        <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            type="button"
            onClick={onGoHome}
            className="admin-btn admin-btn-secondary"
            style={{ padding: '6px 12px', fontSize: 12 }}
          >
            <ArrowLeft size={13} />
            <span>Về Portfolio</span>
          </button>
          <span className="admin-brand-badge">PORTAL</span>
        </div>

        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div
            style={{
              fontFamily: 'var(--font-outfit, sans-serif)',
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: 'var(--admin-text)',
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            dl<span style={{ color: 'var(--admin-accent)' }}>*</span>
            <span style={{ fontSize: 16, color: 'var(--admin-accent)', marginLeft: 8, fontWeight: 700, letterSpacing: '0.05em' }}>
              ADMIN
            </span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--admin-text-muted)', margin: 0 }}>
            Hệ thống Quản trị Nội dung & Đồng bộ Dữ liệu
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              fontSize: 13,
              marginBottom: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShieldAlert size={16} />
              <span>{error}</span>
            </div>

            {allowOfflineLogin && (
              <button
                type="button"
                onClick={handleOfflineLogin}
                style={{
                  marginTop: 6,
                  padding: '7px 12px',
                  borderRadius: 6,
                  background: '#b91c1c',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <WifiOff size={14} />
                <span>Vào Chế Độ Quản Trị Cục Bộ (Offline Mode)</span>
              </button>
            )}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="username">
              Tài khoản
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="username"
                type="text"
                className="admin-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên tài khoản"
                style={{ paddingLeft: 38 }}
                autoComplete="username"
                required
              />
              <User
                size={16}
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--admin-text-muted)',
                }}
              />
            </div>
          </div>

          <div className="admin-form-group" style={{ marginBottom: 24 }}>
            <label className="admin-form-label" htmlFor="password">
              Mật khẩu
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type="password"
                className="admin-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ paddingLeft: 38 }}
                autoComplete="current-password"
                required
              />
              <Lock
                size={16}
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--admin-text-muted)',
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            disabled={loading}
            style={{ width: '100%', padding: '11px 20px', fontSize: 14 }}
          >
            {loading ? (
              <span>Đang xác thực...</span>
            ) : (
              <>
                <span>Đăng Nhập</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>

          {/* Quick Offline Access Option */}
          <div style={{ marginTop: 14, textAlign: 'center' }}>
            <button
              type="button"
              onClick={handleOfflineLogin}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--admin-text-muted)',
                fontSize: 12,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                textDecoration: 'underline',
              }}
            >
              <WifiOff size={13} />
              <span>Đăng nhập chế độ ngoại tuyến (Offline Mode)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
