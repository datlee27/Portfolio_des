import React from 'react';

export default function CornerNav({ onOpenLab, activeView, onGoHome, onOpenWork, onOpenBlog }) {
  const scrollTo = (id) => {
    if (activeView === 'lab' || activeView === 'work' || activeView === 'blog') {
      if (onGoHome) onGoHome();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (activeView === 'lab') {
    return null;
  }

  return (
    <>
      {/* Top Left: dl* */}
      <a
        href="/"
        className="des4-corner-anchor"
        onClick={(e) => {
          e.preventDefault();
          if (activeView === 'work' || activeView === 'blog') {
            if (onGoHome) onGoHome();
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        style={{
          position: 'fixed',
          top: 'clamp(16px, 3.5vw, 32px)',
          left: 'clamp(16px, 4vw, 36px)',
          zIndex: 99999,
          fontFamily: 'var(--font-outfit)',
          fontSize: 'clamp(18px, 4vw, 24px)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color: '#ffffff',
          mixBlendMode: 'difference',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        title="Back to Home"
      >
        dl<span style={{ color: '#fe3c01' }}>*</span>
      </a>

      {/* Top Right: work & blog */}
      <div
        className="des4-corner-group"
        style={{
          position: 'fixed',
          top: 'clamp(16px, 3.5vw, 32px)',
          right: 'clamp(16px, 4vw, 36px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          mixBlendMode: 'difference',
          color: '#ffffff',
        }}
      >
        <button
          className="des4-corner-anchor"
          onClick={() => {
            if (activeView === 'work') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (onOpenWork) {
              onOpenWork();
            }
          }}
          style={{
            position: 'relative',
            fontFamily: 'var(--font-outfit)',
            fontSize: 'clamp(14px, 3.5vw, 18px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            background: 'none',
            border: 'none',
            padding: 0,
            lineHeight: 1,
            color: '#ffffff',
            mixBlendMode: 'difference',
            cursor: 'pointer',
            borderBottom: activeView === 'work' ? '2px solid #fe3c01' : 'none',
            paddingBottom: activeView === 'work' ? 2 : 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          work{activeView === 'work' && <span style={{ color: '#fe3c01', marginLeft: 2 }}>*</span>}
        </button>

        <button
          className="des4-corner-anchor"
          onClick={() => {
            if (activeView === 'blog') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (onOpenBlog) {
              onOpenBlog();
            } else {
              scrollTo('d4-blog');
            }
          }}
          style={{
            position: 'relative',
            fontFamily: 'var(--font-outfit)',
            fontSize: 'clamp(14px, 3.5vw, 18px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            background: 'none',
            border: 'none',
            padding: 0,
            lineHeight: 1,
            color: '#ffffff',
            mixBlendMode: 'difference',
            cursor: 'pointer',
            borderBottom: activeView === 'blog' ? '2px solid #fe3c01' : 'none',
            paddingBottom: activeView === 'blog' ? 2 : 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          blog{activeView === 'blog' && <span style={{ color: '#fe3c01', marginLeft: 2 }}>*</span>}
        </button>
      </div>


      {/* Bottom Left: about — hidden on blog page */}
      {activeView !== 'blog' && (
        <button
          className="des4-corner-anchor"
          aria-label="Scroll to about section"
          onClick={() => scrollTo('d4-intro')}
          style={{
            position: 'fixed',
            bottom: 'clamp(16px, 3.5vw, 32px)',
            left: 'clamp(16px, 4vw, 36px)',
            zIndex: 99999,
            fontFamily: 'var(--font-outfit)',
            fontSize: 'clamp(14px, 3.5vw, 18px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            background: 'none',
            border: 'none',
            padding: 0,
            lineHeight: 1,
            color: '#ffffff',
            mixBlendMode: 'difference',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          about
        </button>
      )}

      {/* Bottom Right: lab — hidden on blog page */}
      {activeView !== 'blog' && (
        <button
          className="des4-corner-anchor"
          aria-label="Open experiments lab"
          onClick={() => {
            if (onOpenLab) onOpenLab();
          }}
          style={{
            position: 'fixed',
            bottom: 'clamp(16px, 3.5vw, 32px)',
            right: 'clamp(16px, 4vw, 36px)',
            zIndex: 99999,
            fontFamily: 'var(--font-outfit)',
            fontSize: 'clamp(14px, 3.5vw, 18px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            background: 'none',
            border: 'none',
            padding: 0,
            lineHeight: 1,
            color: '#ffffff',
            mixBlendMode: 'difference',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          lab
        </button>
      )}
    </>
  );
}

