import React, { useState } from 'react';
import { Lock, User, ArrowRight, ArrowLeft, ShieldAlert, Eye, EyeOff } from 'lucide-react';
import api from '../services/api';

export default function AdminLogin({ onLoginSuccess, onGoHome }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Vui lòng nhập đầy đủ tài khoản và mật khẩu.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.login(username.trim(), password);
      if (res && res.success) {
        if (onLoginSuccess) {
          onLoginSuccess(res.data || { username: username.trim() });
        }
      } else {
        setError(res?.message || 'Tài khoản hoặc mật khẩu không chính xác.');
      }
    } catch (err) {
      setError(
        err?.message || 'Không thể kết nối đến máy chủ API. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.'
      );
    } finally {
      setLoading(false);
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
              alignItems: 'center',
              gap: 8,
            }}
          >
            <ShieldAlert size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
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
                type={showPassword ? 'text' : 'password'}
                className="admin-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ paddingLeft: 38, paddingRight: 38 }}
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--admin-text-muted)',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
                tabIndex={-1}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
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
        </form>
      </div>
    </div>
  );
}
