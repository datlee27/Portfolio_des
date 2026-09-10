import React, { useState } from 'react';
import { Lock, User, ArrowRight, ArrowLeft, ShieldAlert, Sparkles } from 'lucide-react';
import api from '../services/api';

export default function AdminLogin({ onLoginSuccess, onGoHome }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Vui lòng nhập đầy đủ tài khoản và mật khẩu.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.login(username, password);
      if (res && res.success) {
        if (onLoginSuccess) {
          onLoginSuccess(res.data || { username });
        }
      } else {
        setError(res?.message || 'Đăng nhập không thành công. Kiểm tra lại thông tin.');
      }
    } catch (err) {
      setError(err.message || 'Lỗi kết nối máy chủ API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-box">
        {/* Top Back Link */}
        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            type="button"
            onClick={onGoHome}
            className="admin-btn admin-btn-secondary"
            style={{ padding: '6px 12px', fontSize: 12 }}
          >
            <ArrowLeft size={13} />
            <span>Về Portfolio</span>
          </button>
          <span className="admin-brand-badge">API V1.0</span>
        </div>

        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div
            style={{
              fontFamily: 'var(--font-outfit)',
              fontSize: 42,
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: '#ffffff',
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            dl<span style={{ color: '#fe3c01' }}>*</span>
            <span style={{ fontSize: 18, color: '#fe3c01', marginLeft: 8, fontWeight: 700, letterSpacing: '0.05em' }}>
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
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              fontSize: 13,
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <ShieldAlert size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="username">
              Tài khoản Admin
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="username"
                type="text"
                className="admin-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
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

          <div className="admin-form-group">
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

          {/* Quick Credential Helper Pill */}
          <div
            style={{
              padding: '8px 12px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 6,
              fontSize: 12,
              color: 'var(--admin-text-muted)',
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={13} style={{ color: '#fe3c01' }} />
              <span>Mặc định: <strong>admin</strong> / <strong>admin123</strong></span>
            </div>
            <button
              type="button"
              onClick={() => {
                setUsername('admin');
                setPassword('admin123');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#fe3c01',
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 700,
                padding: 0,
              }}
            >
              Điền nhanh
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            disabled={loading}
            style={{ width: '100%', padding: '12px 20px', fontSize: 14 }}
          >
            {loading ? (
              <span>Đang kết nối API...</span>
            ) : (
              <>
                <span>Đăng Nhập Quản Trị</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
