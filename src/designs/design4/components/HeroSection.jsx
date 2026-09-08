import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Wand2, RotateCcw, Layers, Cpu, Code2, Terminal } from 'lucide-react';
import NekoCat from './NekoCat';
import PixelMonster from './PixelMonster';

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isCreativeMode, setIsCreativeMode] = useState(false);
  const heroRef = useRef(null);

  // Drag positions for elements in Creative Mode
  const [dragPositions, setDragPositions] = useState({
    statusHud: { x: 0, y: 0 },
    avatarHud: { x: 0, y: 0 },
    pixelMonster: { x: 0, y: 0 },
    datLePillar: { x: 0, y: 0 },
    techChip1: { x: 0, y: 0 },
    techChip2: { x: 0, y: 0 },
    headline: { x: 0, y: 0 },
  });
  const dragTargetRef = useRef(null);

  const handlePointerDown = (key, e) => {
    if (!isCreativeMode) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) { }
    dragTargetRef.current = {
      key,
      startX: e.clientX,
      startY: e.clientY,
      origX: dragPositions[key]?.x || 0,
      origY: dragPositions[key]?.y || 0,
    };
  };

  const handlePointerMove = (key, e) => {
    if (!dragTargetRef.current || dragTargetRef.current.key !== key) return;
    const { startX, startY, origX, origY } = dragTargetRef.current;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    setDragPositions((prev) => ({
      ...prev,
      [key]: { x: origX + deltaX, y: origY + deltaY },
    }));
  };

  const handlePointerUp = (e) => {
    if (dragTargetRef.current) {
      try {
        if (e.currentTarget.hasPointerCapture && e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch (err) { }
      dragTargetRef.current = null;
    }
  };

  const resetPositions = (e) => {
    e.stopPropagation();
    setDragPositions({
      statusHud: { x: 0, y: 0 },
      avatarHud: { x: 0, y: 0 },
      pixelMonster: { x: 0, y: 0 },
      datLePillar: { x: 0, y: 0 },
      techChip1: { x: 0, y: 0 },
      techChip2: { x: 0, y: 0 },
      headline: { x: 0, y: 0 },
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById('featured-work') || document.getElementById('d4-work') || document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <section id="top" ref={heroRef} className="des4-hero-section">
      {/* Interactive Neko Cat - Controlled in Creative Mode */}
      <NekoCat
        followCursor={isCreativeMode}
        showToggle={false}
        rememberChoice={false}
        showLabel={false}
        cat="Socks"
        size="1.25x"
      />

      {/* Ambient background lighting blobs */}
      <div
        className="des4-hide-mobile"
        style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: 360,
          height: 360,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, rgba(254, 60, 1, 0.04) 50%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      />
      <div
        className="des4-hide-mobile"
        style={{
          position: 'absolute',
          bottom: '12%',
          right: '8%',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(11, 29, 255, 0.07) 0%, rgba(0, 242, 254, 0.04) 50%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      />

      {/* ─── 1. TOP HUD (Desktop & Tablet): Status & Coordinates (Top Left) ─── */}
      <div
        className="des4-hero-top-left"
        onPointerDown={(e) => handlePointerDown('statusHud', e)}
        onPointerMove={(e) => handlePointerMove('statusHud', e)}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          cursor: isCreativeMode ? 'grab' : 'default',
          touchAction: 'none',
          transform: `translate(${mousePos.x * 24 + dragPositions.statusHud.x}px, ${mousePos.y * 24 + dragPositions.statusHud.y}px)`,
          transition: dragTargetRef.current?.key === 'statusHud' ? 'none' : 'transform 0.15s ease-out',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(12px)',
            border: isCreativeMode ? '2px dashed #fe3c01' : '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: 14,
            padding: '8px 14px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            userSelect: 'none',
            animation: isCreativeMode ? 'none' : 'floatGentle 4.5s ease-in-out infinite',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px #10b981',
                display: 'inline-block',
                animation: 'pulseLive 2s infinite',
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#111827',
                fontFamily: 'var(--font-inter)',
              }}
            >
              Available for Projects
            </span>
          </div>
          <span
            style={{
              fontSize: 10,
              fontWeight: 500,
              color: '#6b7280',
              fontFamily: 'monospace',
              letterSpacing: '0.02em',
            }}
          >
            Da Nang • 16.0544° N, 108.2022° E
          </span>
        </div>
      </div>

      {/* ─── 2. TOP RIGHT (Desktop & Tablet): Avatar Sketch Card (Image 2) ─── */}
      <div
        className="des4-hero-top-right"
        onPointerDown={(e) => handlePointerDown('avatarHud', e)}
        onPointerMove={(e) => handlePointerMove('avatarHud', e)}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          cursor: isCreativeMode ? 'grab' : 'pointer',
          touchAction: 'none',
          transform: `translate(${mousePos.x * -24 + dragPositions.avatarHud.x}px, ${mousePos.y * -24 + dragPositions.avatarHud.y}px)`,
          transition: dragTargetRef.current?.key === 'avatarHud' ? 'none' : 'transform 0.15s ease-out',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(16px)',
            border: isCreativeMode ? '2px dashed #fe3c01' : '1.5px solid #111111',
            borderRadius: 18,
            padding: '8px 14px',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            userSelect: 'none',
            animation: isCreativeMode ? 'none' : 'floatInverse 4.8s ease-in-out infinite',
            transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05) rotate(2deg)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1) rotate(0deg)')}
          title="Lê Văn Đạt (Dat Le) - Technical Artisan"
        >
          {/* Preserved Avatar Line-Art Sketch (Image 2) */}
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: '50%',
              background: '#f3f4f6',
              border: '1.5px solid #111',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <img
              src="/assets/custom-sticker.svg"
              alt="Dat Le Sketch Avatar"
              style={{ width: '88%', height: '88%', objectFit: 'contain', pointerEvents: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-outfit)',
                fontWeight: 900,
                fontSize: 13,
                letterSpacing: '-0.02em',
                color: '#000000',
              }}
            >
              DAT LE
            </span>
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 10.5,
                fontWeight: 600,
                color: '#6366f1',
                letterSpacing: '0.02em',
              }}
            >
              Technical Artisan
            </span>
          </div>
        </div>
      </div>

      {/* ─── MOBILE HUD: Rendered above headline on screens <= 640px ─── */}
      <div className="des4-hero-mobile-hud">
        {/* Mobile Status Pill */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: 100,
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#10b981',
              display: 'inline-block',
              animation: 'pulseLive 2s infinite',
            }}
          />
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#111827',
              fontFamily: 'var(--font-inter)',
            }}
          >
            Available • Da Nang
          </span>
        </div>

        {/* Mobile Avatar Badge */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.94)',
            border: '1.5px solid #111111',
            borderRadius: 100,
            padding: '4px 10px 4px 6px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: '#f3f4f6',
              border: '1px solid #111',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <img
              src="/assets/custom-sticker.svg"
              alt="Dat Le"
              style={{ width: '88%', height: '88%', objectFit: 'contain' }}
            />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-outfit)',
              fontWeight: 900,
              fontSize: 11,
              color: '#000000',
            }}
          >
            DAT LE
          </span>
        </div>
      </div>

      {/* ─── 3. MAIN CENTRAL KINETIC TYPOGRAPHY ─── */}
      <div
        className="des4-hero-headline"
        onPointerDown={(e) => handlePointerDown('headline', e)}
        onPointerMove={(e) => handlePointerMove('headline', e)}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          cursor: isCreativeMode ? 'grab' : 'default',
          touchAction: isCreativeMode ? 'none' : 'auto',
          userSelect: isCreativeMode ? 'none' : 'auto',
          outline: isCreativeMode ? '2px dashed rgba(254, 60, 1, 0.6)' : 'none',
          outlineOffset: 12,
          borderRadius: 24,
          transform: `perspective(1000px) rotateX(${mousePos.y * -4}deg) rotateY(${mousePos.x * 4}deg) translate(${dragPositions.headline.x}px, ${dragPositions.headline.y}px)`,
          transition: dragTargetRef.current?.key === 'headline' ? 'none' : 'transform 0.15s ease-out',
        }}
      >
        {/* Line 1: "ENGINEERING" + Claude Code Mascot */}
        <div className="des4-hero-row" style={{ gap: '0.03em', position: 'relative' }}>
          <span
            style={{ display: 'inline-block', transition: 'transform 0.25s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px) rotate(-3deg)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0) rotate(0)')}
          >
            ENGINEER
          </span>

          {/* Official Claude Code Pixel Mascot (Clawd) */}
          <div
            onPointerDown={(e) => handlePointerDown('pixelMonster', e)}
            onPointerMove={(e) => handlePointerMove('pixelMonster', e)}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              margin: '0 0.04em',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isCreativeMode ? 'grab' : 'pointer',
              touchAction: 'none',
              animation: isCreativeMode ? 'none' : 'pixelBob 3s ease-in-out infinite',
              transform: `translate(${dragPositions.pixelMonster.x}px, ${dragPositions.pixelMonster.y}px)`,
              transition: dragTargetRef.current?.key === 'pixelMonster' ? 'none' : 'transform 0.15s ease-out',
            }}
            title="Official Claude Code Mascot (Click me!)"
          >
            <PixelMonster size="0.68em" />
          </div>

          <span
            style={{ display: 'inline-block', transition: 'transform 0.25s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px) rotate(3deg)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0) rotate(0)')}
          >
            ING
          </span>
        </div>

        {/* Line 2: "LOGIC," + Vertical "DAT LE" Gradient Pillar (Image 4) + "CRAFTING" */}
        <div
          className="des4-hero-row"
          style={{
            gap: '0.05em',
            marginTop: '0.02em',
          }}
        >
          <span
            style={{
              color: '#0b1dff',
              display: 'inline-block',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            LOGIC
          </span>
          <span
            style={{
              color: '#fe3c01',
              display: 'inline-block',
              transform: 'translateY(-0.15em)',
              marginLeft: '-0.02em',
              fontWeight: 900,
            }}
          >
            ,
          </span>

          {/* Vertical "DAT LE" Gradient Typography */}
          <div
            onPointerDown={(e) => handlePointerDown('datLePillar', e)}
            onPointerMove={(e) => handlePointerMove('datLePillar', e)}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              writingMode: 'vertical-rl',
              transform: `rotate(180deg) translate(${dragPositions.datLePillar.x}px, ${dragPositions.datLePillar.y}px)`,
              fontSize: '0.15em',
              fontFamily: 'var(--font-outfit)',
              fontWeight: 900,
              letterSpacing: '0.24em',
              lineHeight: 1,
              padding: '4px 6px',
              borderRadius: 6,
              background: 'linear-gradient(180deg, #9333ea 0%, #ec4899 50%, #fe3c01 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 6px rgba(236, 72, 153, 0.35))',
              cursor: isCreativeMode ? 'grab' : 'pointer',
              touchAction: 'none',
              transition: dragTargetRef.current?.key === 'datLePillar' ? 'none' : 'transform 0.3s ease',
              margin: '0 0.02em',
              userSelect: 'none',
            }}
            onMouseEnter={(e) => {
              if (!isCreativeMode) e.currentTarget.style.transform = 'rotate(180deg) scale(1.22)';
            }}
            onMouseLeave={(e) => {
              if (!isCreativeMode) e.currentTarget.style.transform = 'rotate(180deg) scale(1)';
            }}
            title="DAT LE - Signature Brand Mark"
          >
            DAT LE
          </div>

          <span
            style={{
              color: '#000000',
              display: 'inline-block',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px) rotate(2deg)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0) rotate(0)')}
          >
            CRAFTING
          </span>
        </div>

        {/* Line 3: "DIGITAL EXPERIENCES." */}
        <div
          className="des4-hero-row"
          style={{
            gap: '0.04em',
            marginTop: '0.04em',
          }}
        >
          <span
            style={{
              color: '#000000',
              display: 'inline-block',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            DIGITAL
          </span>

          <span
            style={{
              color: '#0b1dff',
              display: 'inline-block',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px) rotate(-2deg)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0) rotate(0)')}
          >
            EXPERIENCES
          </span>

          <span style={{ color: '#fe3c01', fontWeight: 900 }}>.</span>
        </div>
      </div>

      {/* ─── 4. REFINED CALL TO ACTION / PLAYGROUND CONTROLS ─── */}
      <div
        style={{
          marginTop: 'clamp(20px, 4vw, 36px)',
          zIndex: 20,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {/* Primary CTA: Explore Work */}
        <button
          onClick={scrollToWork}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#000000',
            color: '#ffffff',
            padding: '12px clamp(20px, 3.5vw, 28px)',
            borderRadius: 100,
            cursor: 'pointer',
            border: 'none',
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(13px, 1.8vw, 14px)',
            fontWeight: 700,
            letterSpacing: '0.02em',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.18)',
            transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
            userSelect: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.18)';
          }}
        >
          <span>Explore Works</span>
          <ArrowDown size={14} style={{ color: '#fe3c01' }} />
        </button>

        {/* Secondary CTA: Interactive Playground Mode Toggle */}
        <button
          onClick={() => setIsCreativeMode(!isCreativeMode)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            background: isCreativeMode ? '#fe3c01' : 'rgba(0, 0, 0, 0.05)',
            color: isCreativeMode ? '#ffffff' : '#111827',
            padding: '11px clamp(16px, 2.5vw, 22px)',
            borderRadius: 100,
            cursor: 'pointer',
            border: isCreativeMode ? '1px solid #fe3c01' : '1px solid rgba(0, 0, 0, 0.1)',
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(12px, 1.6vw, 13px)',
            fontWeight: 700,
            transition: 'all 0.25s ease',
            userSelect: 'none',
          }}
          onMouseEnter={(e) => {
            if (!isCreativeMode) {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.transform = 'scale(1.03)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isCreativeMode) {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
          title={isCreativeMode ? 'Tắt chế độ kéo thả' : 'Bật chế độ kéo thả tự do các phần tử'}
        >
          <Wand2 size={13} style={{ color: isCreativeMode ? '#ffffff' : '#fe3c01' }} />
          <span>{isCreativeMode ? 'Creative Mode: ON' : 'Playground'}</span>
        </button>

        {/* Reset button when Creative Mode is active */}
        {isCreativeMode && (
          <button
            onClick={resetPositions}
            style={{
              background: '#090a0f',
              color: '#00f2fe',
              border: '1px solid rgba(0, 242, 254, 0.4)',
              padding: '9px 16px',
              borderRadius: 100,
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            title="Reset positions"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* ─── 5. RESPONSIVE TECH MATRIX CHIPS ─── */}
      <div className="des4-hero-chips-container">
        {/* Chip 1: Fullstack & AI */}
        <div
          className="des4-hero-chip-left"
          onPointerDown={(e) => handlePointerDown('techChip1', e)}
          onPointerMove={(e) => handlePointerMove('techChip1', e)}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            cursor: isCreativeMode ? 'grab' : 'default',
            touchAction: 'none',
            transform: `translate(${mousePos.x * 20 + dragPositions.techChip1.x}px, ${mousePos.y * 20 + dragPositions.techChip1.y}px)`,
            transition: dragTargetRef.current?.key === 'techChip1' ? 'none' : 'transform 0.15s ease-out',
          }}
        >
          <div
            style={{
              background: '#0a0d14',
              color: '#ffffff',
              border: isCreativeMode ? '2px dashed #fe3c01' : '1px solid rgba(255, 255, 255, 0.16)',
              borderRadius: 100,
              padding: '7px 16px',
              fontSize: 'clamp(10.5px, 1.4vw, 12px)',
              fontWeight: 800,
              letterSpacing: '0.04em',
              fontFamily: 'var(--font-inter)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              userSelect: 'none',
              animation: isCreativeMode ? 'none' : 'floatGentle 5.2s ease-in-out infinite',
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Layers size={13} style={{ color: '#00f2fe' }} />
              <Cpu size={13} style={{ color: '#fe3c01' }} />
            </div>
            <span>FULLSTACK &amp; AI SYSTEMS</span>
          </div>
        </div>

        {/* Chip 2: React 19 & Spring Boot */}
        <div
          className="des4-hero-chip-right"
          onPointerDown={(e) => handlePointerDown('techChip2', e)}
          onPointerMove={(e) => handlePointerMove('techChip2', e)}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            cursor: isCreativeMode ? 'grab' : 'default',
            touchAction: 'none',
            transform: `translate(${mousePos.x * -20 + dragPositions.techChip2.x}px, ${mousePos.y * -20 + dragPositions.techChip2.y}px)`,
            transition: dragTargetRef.current?.key === 'techChip2' ? 'none' : 'transform 0.15s ease-out',
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              color: '#111827',
              border: isCreativeMode ? '2px dashed #fe3c01' : '1.5px solid #000000',
              borderRadius: 100,
              padding: '7px 16px',
              fontSize: 'clamp(10.5px, 1.4vw, 12px)',
              fontWeight: 800,
              letterSpacing: '0.04em',
              fontFamily: 'var(--font-inter)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              userSelect: 'none',
              animation: isCreativeMode ? 'none' : 'floatInverse 5s ease-in-out infinite',
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Code2 size={13} style={{ color: '#0b1dff' }} />
              <Terminal size={13} style={{ color: '#10b981' }} />
            </div>
            <span>REACT 19 • SPRING BOOT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
