import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Home, RefreshCw } from 'lucide-react';
import { SiGithub, SiFacebook } from 'react-icons/si';
import PixelMascot from './PixelMascot';

const ERROR_CONFIGS = {
  404: {
    tag: '04 // NOT FOUND',
    codeText: '404',
    title: 'page not found',
    description: 'the link you followed does not exist or has been moved.',
    mood: '404',
  },
  400: {
    tag: '00 // BAD REQUEST',
    codeText: '400',
    title: 'invalid request',
    description: 'the request contains invalid syntax or unrecognized parameters.',
    mood: '400',
  },
  403: {
    tag: '03 // RESTRICTED',
    codeText: '403',
    title: 'access denied',
    description: 'you do not have permission to access this protected area.',
    mood: '403',
  },
  500: {
    tag: '50 // SERVER ERROR',
    codeText: '500',
    title: 'server error',
    description: 'internal server hiccup. please reload or try again shortly.',
    mood: '500',
  },
  offline: {
    tag: '00 // OFFLINE',
    codeText: 'OFFLINE',
    title: "you're offline",
    description: 'network connection lost. please check your wifi or signal.',
    mood: 'offline',
  },
  crash: {
    tag: '99 // SYSTEM GLITCH',
    codeText: 'ERROR',
    title: 'system glitch',
    description: 'an unexpected interface error occurred. data remains secure.',
    mood: 'crash',
  },
};

export default function ErrorPage({
  code = 404,
  title,
  description: _description,
  onRetry,
  onGoHome,
}) {
  const [daNangTime, setDaNangTime] = useState('');

  // Normalize code key
  const codeKey = String(code).toLowerCase();
  const config =
    ERROR_CONFIGS[codeKey] ||
    (typeof code === 'number' && code >= 500 ? ERROR_CONFIGS[500] : ERROR_CONFIGS.crash);

  const displayTitle = title || config.title;

  // Live Da Nang Clock (GMT+7)
  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const vnTime = new Date(utc + 3600000 * 7);
      let hours = vnTime.getHours();
      const minutes = vnTime.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      setDaNangTime(`${hours}:${minutes} ${ampm}`);
    }

    updateClock();
    const interval = setInterval(updateClock, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigateHome = () => {
    if (onGoHome) {
      onGoHome();
    } else if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleReload = () => {
    if (onRetry) {
      onRetry();
    } else if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const gmailComposeUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=lvd27012004@gmail.com';

  return (
    <main
      style={{
        backgroundColor: '#F6F4EF',
        color: '#111111',
        height: '100dvh',
        maxHeight: '100dvh',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(18px, 3.2vh, 36px) clamp(20px, 4vw, 56px)',
        fontFamily: "var(--font-inter, 'Inter', sans-serif)",
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        position: 'relative',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .error-header-right {
            text-align: left !important;
          }
          .error-social-links {
            justify-content: flex-start !important;
          }
          .error-main-grid {
            flex-direction: column-reverse !important;
            align-items: flex-start !important;
            gap: 20px !important;
          }
          .error-watermark-row {
            padding-top: 14px !important;
          }
        }
      `}</style>

      {/* ─── 1. Top Header Row ─── */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          flexShrink: 0,
        }}
      >
        {/* Left: Dispatch Tag */}
        <div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11.5px',
              color: 'rgba(17, 17, 17, 0.55)',
              display: 'inline-flex',
              alignItems: 'center',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {config.tag}
          </span>
        </div>

        {/* Right: Social Links & Live Time */}
        <div className="error-header-right" style={{ textAlign: 'right' }}>
          <div
            className="error-social-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              fontSize: '13.5px',
              marginBottom: '6px',
              justifyContent: 'flex-end',
              flexWrap: 'wrap',
            }}
          >
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#111111',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              email
            </a>
            <span style={{ color: 'rgba(17, 17, 17, 0.25)' }}>·</span>
            <a
              href="https://github.com/datlee27"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#111111',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <SiGithub size={12} />
              github <ArrowUpRight size={12} />
            </a>
            <span style={{ color: 'rgba(17, 17, 17, 0.25)' }}>·</span>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#111111',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <SiFacebook size={12} />
              facebook <ArrowUpRight size={12} />
            </a>
          </div>

          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11.5px',
              color: 'rgba(17, 17, 17, 0.55)',
              letterSpacing: '-0.01em',
            }}
          >
            da nang&nbsp;&nbsp;
            <span style={{ color: '#111111', fontWeight: 600 }}>
              {daNangTime || '12:16 pm'}
            </span>
            &nbsp;&nbsp;[gmt +7] · open to work · 2026. lê văn đạt
          </div>
        </div>
      </header>

      {/* ─── 2. Main Content (Centered, Minimal, High-Impact Mascot) ─── */}
      <section
        style={{
          width: '100%',
          maxWidth: '720px',
          margin: '0 auto',
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: 0,
          padding: '20px 0',
        }}
      >
        {/* Centered Large Pixel Mascot */}
        <div style={{ marginBottom: '18px' }}>
          <PixelMascot mood={config.mood} size={165} />
        </div>

        {/* State Tag */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: 'rgba(17, 17, 17, 0.55)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            userSelect: 'none',
            marginBottom: '14px',
          }}
        >
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: '#fe3c01',
              display: 'inline-block',
            }}
          />
          STATE // {config.codeText}
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-sans, 'Inter', sans-serif)",
            fontSize: 'clamp(42px, 6.8vw, 76px)',
            fontWeight: 500,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            color: '#111111',
            textTransform: 'lowercase',
            margin: '0 0 28px 0',
          }}
        >
          {displayTitle}
        </h1>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <button
            type="button"
            onClick={handleNavigateHome}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 26px',
              borderRadius: '999px',
              backgroundColor: '#111111',
              color: '#F6F4EF',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: "var(--font-inter, 'Inter', sans-serif)",
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minHeight: '44px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#262626';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#111111';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Home size={15} />
            <span>về trang chủ</span>
            <ArrowUpRight size={15} />
          </button>

          <button
            type="button"
            onClick={handleReload}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '999px',
              backgroundColor: 'transparent',
              color: '#111111',
              border: '1px solid rgba(17, 17, 17, 0.2)',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: "var(--font-inter, 'Inter', sans-serif)",
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minHeight: '44px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.5)';
              e.currentTarget.style.backgroundColor = 'rgba(17, 17, 17, 0.04)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(17, 17, 17, 0.2)';
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <RefreshCw size={14} />
            <span>tải lại</span>
          </button>
        </div>
      </section>

      {/* ─── 3. Bottom Watermark & Brand Line (Single Viewport Guaranteed) ─── */}
      <footer
        className="error-watermark-row"
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          paddingTop: '16px',
          borderTop: '1px solid rgba(17, 17, 17, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          userSelect: 'none',
          flexWrap: 'wrap',
          gap: '12px',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-outfit, 'Inter', sans-serif)",
            fontSize: 'clamp(44px, 9vw, 96px)',
            fontWeight: 600,
            letterSpacing: '-0.05em',
            color: 'rgba(17, 17, 17, 0.06)',
            lineHeight: 0.85,
          }}
        >
          dl* /26
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: 'rgba(17, 17, 17, 0.42)',
            paddingBottom: '4px',
          }}
        >
          craft on paper — built with structural honesty
        </div>
      </footer>
    </main>
  );
}
