import React from 'react';

export default function CornerNav() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Left: yx* */}
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        style={{
          position: 'fixed',
          top: 28,
          left: 36,
          zIndex: 9999,
          mixBlendMode: 'difference',
          color: '#ffffff',
          fontFamily: 'var(--font-outfit)',
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: '-0.03em',
          textDecoration: 'none',
          cursor: 'pointer',
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        yx<span style={{ color: '#fe3c01' }}>*</span>
      </a>

      {/* Top Right: work */}
      <button
        onClick={() => scrollTo('d4-work')}
        style={{
          position: 'fixed',
          top: 28,
          right: 36,
          zIndex: 9999,
          mixBlendMode: 'difference',
          color: '#ffffff',
          fontFamily: 'var(--font-outfit)',
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        work
      </button>

      {/* Bottom Left: about */}
      <button
        onClick={() => scrollTo('d4-intro')}
        style={{
          position: 'fixed',
          bottom: 28,
          left: 36,
          zIndex: 9999,
          mixBlendMode: 'difference',
          color: '#ffffff',
          fontFamily: 'var(--font-outfit)',
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        about
      </button>

      {/* Bottom Right: lab */}
      <button
        onClick={() => scrollTo('d4-whatido')}
        style={{
          position: 'fixed',
          bottom: 28,
          right: 36,
          zIndex: 9999,
          mixBlendMode: 'difference',
          color: '#ffffff',
          fontFamily: 'var(--font-outfit)',
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        lab
      </button>
    </>
  );
}
