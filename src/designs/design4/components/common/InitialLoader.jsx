import React, { useEffect, useState } from 'react';

/**
 * InitialLoader — Fullscreen branded preloader shown only on first visit.
 * Uses sessionStorage to skip on subsequent navigations / tab switches.
 * Waits for: fonts ready + minimum display time, then fades out.
 */
export default function InitialLoader({ onComplete }) {
  const [phase, setPhase] = useState('visible'); // 'visible' | 'fading' | 'done'
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId;
    const start = performance.now();
    const MIN_DURATION = 1400; // ms minimum display time

    // Animate progress bar
    const animateProgress = (now) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / MIN_DURATION, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        rafId = requestAnimationFrame(animateProgress);
      }
    };
    rafId = requestAnimationFrame(animateProgress);

    // Wait for fonts + minimum time
    const finish = async () => {
      try {
        await Promise.all([
          document.fonts.ready,
          new Promise((res) => setTimeout(res, MIN_DURATION)),
        ]);
      } catch {
        await new Promise((res) => setTimeout(res, MIN_DURATION));
      }

      setProgress(100);

      // Short pause at 100%, then fade out
      setTimeout(() => {
        setPhase('fading');
        setTimeout(() => {
          setPhase('done');
          sessionStorage.setItem('portfolio-loaded', '1');
          if (onComplete) onComplete();
        }, 500); // fade duration
      }, 150);
    };

    finish();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: '#F6F4EF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase === 'fading' ? 0 : 1,
        transition: phase === 'fading' ? 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
        pointerEvents: 'all',
        userSelect: 'none',
      }}
      aria-label="Loading portfolio"
      aria-live="polite"
    >
      {/* Logo Mark */}
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(56px, 12vw, 96px)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          color: '#111111',
          lineHeight: 1,
          marginBottom: '12px',
          animation: 'loaderPulse 1.6s ease-in-out infinite',
        }}
      >
        dl<span style={{ color: '#fe3c01' }}>*</span>
      </div>

      {/* Sub-label */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          fontWeight: 400,
          letterSpacing: '0.08em',
          color: 'rgba(17,17,17,0.4)',
          marginBottom: '40px',
          textTransform: 'lowercase',
        }}
      >
        loading // portfolio
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: 'clamp(120px, 20vw, 200px)',
          height: '2px',
          backgroundColor: 'rgba(17,17,17,0.1)',
          borderRadius: '999px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#fe3c01',
            borderRadius: '999px',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      {/* Percentage label */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          color: 'rgba(17,17,17,0.3)',
          marginTop: '10px',
          letterSpacing: '0.05em',
        }}
      >
        {progress}%
      </div>

      <style>{`
        @keyframes loaderPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.65; }
        }
      `}</style>
    </div>
  );
}

