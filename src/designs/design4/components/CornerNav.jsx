import React from 'react';

export default function CornerNav({ onOpenLab, activeView, onGoHome }) {
  const scrollTo = (id) => {
    if (activeView === 'lab') {
      if (onGoHome) onGoHome();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
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
        href="#top"
        className="des4-corner-anchor"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
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
          onClick={() => scrollTo('d4-work')}
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
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          work
        </button>

        <button
          className="des4-corner-anchor"
          onClick={() => scrollTo('d4-blog')}
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
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          blog
        </button>
      </div>

      {/* Bottom Left: about */}
      <button
        className="des4-corner-anchor"
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
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        about
      </button>

      {/* Bottom Right: lab */}
      <button
        className="des4-corner-anchor"
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
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        lab
      </button>
    </>
  );
}

