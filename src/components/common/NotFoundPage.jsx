import React from 'react';
import { Home, ArrowLeft, FolderKanban, BookOpen, ShieldCheck, AlertCircle } from 'lucide-react';

export default function NotFoundPage({ onNavigate }) {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  const handleGo = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#0a0a0c',
        color: '#ffffff',
        fontFamily: 'var(--font-inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 20px',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Background Decorative Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), radial-gradient(rgba(254, 60, 1, 0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px, 96px 96px',
          backgroundPosition: '0 0, 16px 16px',
          pointerEvents: 'none',
          opacity: 0.6,
        }}
      />

      {/* Top Brand Pill */}
      <div
        style={{
          position: 'absolute',
          top: 28,
          left: 28,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-outfit, sans-serif)',
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: '#ffffff',
          }}
        >
          dl<span style={{ color: '#fe3c01' }}>*</span>
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.12em',
            padding: '3px 8px',
            borderRadius: 4,
            background: 'rgba(254, 60, 1, 0.15)',
            border: '1px solid rgba(254, 60, 1, 0.4)',
            color: '#fe3c01',
            textTransform: 'uppercase',
          }}
        >
          Status 404
        </span>
      </div>

      {/* Main Content Box */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 680,
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Error Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 100,
            background: 'rgba(254, 60, 1, 0.1)',
            border: '1px solid rgba(254, 60, 1, 0.3)',
            marginBottom: 24,
          }}
        >
          <AlertCircle size={15} color="#fe3c01" />
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#fe3c01',
              textTransform: 'uppercase',
            }}
          >
            Mã Lỗi: 404 // Trang Không Tồn Tại
          </span>
        </div>

        {/* Large 404 Typography */}
        <div
          style={{
            fontFamily: 'var(--font-outfit, sans-serif)',
            fontSize: 'clamp(90px, 18vw, 170px)',
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.06em',
            color: '#ffffff',
            margin: '0 0 16px 0',
            textShadow: '0 20px 60px rgba(254, 60, 1, 0.25)',
            userSelect: 'none',
          }}
        >
          4<span style={{ color: '#fe3c01' }}>0</span>4
        </div>

        {/* Main Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-outfit, sans-serif)',
            fontSize: 'clamp(22px, 4vw, 32px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            margin: '0 0 12px 0',
            color: '#f4f4f5',
          }}
        >
          Không tìm thấy liên kết bạn yêu cầu
        </h1>

        {/* Description in Vietnamese & English */}
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: '#a1a1aa',
            maxWidth: 520,
            margin: '0 0 28px 0',
          }}
        >
          Đường dẫn <code style={{ color: '#fe3c01', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 4, fontFamily: 'monospace' }}>{currentPath || 'trang này'}</code> không tồn tại trên hệ thống hoặc đã được điều chuyển.
          Hệ thống đã tự động ghi nhận và bảo lưu trạng thái hoạt động của portfolio.
        </p>

        {/* Action Button Navigation Group */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'center',
            marginBottom: 36,
          }}
        >
          <button
            type="button"
            onClick={() => handleGo('/')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              backgroundColor: '#fe3c01',
              color: '#ffffff',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'transform 0.2s, background-color 0.2s',
              boxShadow: '0 4px 20px rgba(254, 60, 1, 0.4)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e03500')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fe3c01')}
          >
            <Home size={16} />
            <span>Quay Về Trang Chủ</span>
          </button>

          <button
            type="button"
            onClick={() => handleGo('/work')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 20px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            <FolderKanban size={16} />
            <span>Dự Án (/work)</span>
          </button>

          <button
            type="button"
            onClick={() => handleGo('/blog')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 20px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            <BookOpen size={16} />
            <span>Bài Viết (/blog)</span>
          </button>

          <button
            type="button"
            onClick={() => handleGo('/admin')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 20px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            <ShieldCheck size={16} />
            <span>Admin Portal</span>
          </button>
        </div>

        {/* Technical Diagnostics Box */}
        <div
          style={{
            width: '100%',
            maxWidth: 480,
            background: 'rgba(18, 18, 22, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 10,
            padding: '14px 18px',
            textAlign: 'left',
            fontSize: 12,
            fontFamily: 'monospace',
            color: '#71717a',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span>DIAGNOSTIC_CODE:</span>
            <span style={{ color: '#fe3c01' }}>ERR_HTTP_404_NOT_FOUND</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span>FALLBACK_ENGINE:</span>
            <span style={{ color: '#22c55e' }}>OFFLINE_STATIC_CACHE_ONLINE</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>CLIENT_COORDINATES:</span>
            <span>10.7626° N, 106.6602° E</span>
          </div>
        </div>
      </div>
    </div>
  );
}
