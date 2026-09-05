import React, { useState, useEffect, useRef } from 'react';
import NekoCat from './NekoCat';

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVinylFast, setIsVinylFast] = useState(false);
  const [smileyEmoji, setSmileyEmoji] = useState('👾');
  const [isCreativeMode, setIsCreativeMode] = useState(false);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Drag positions for Hero elements in Creative Mode
  const [dragPositions, setDragPositions] = useState({
    devMode: { x: 0, y: 0 },
    customSticker: { x: 0, y: 0 },
    colorPalette: { x: 0, y: 0 },
    badge: { x: 0, y: 0 },
    headline: { x: 0, y: 0 },
  });
  const dragTargetRef = useRef(null);

  const handlePointerDown = (key, e) => {
    if (!isCreativeMode) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
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
      } catch (err) {}
      dragTargetRef.current = null;
    }
  };

  const resetPositions = (e) => {
    e.stopPropagation();
    setDragPositions({
      devMode: { x: 0, y: 0 },
      customSticker: { x: 0, y: 0 },
      colorPalette: { x: 0, y: 0 },
      badge: { x: 0, y: 0 },
      headline: { x: 0, y: 0 },
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setMousePos({ x, y });

      // Pupil offset for interactive eye
      setPupilOffset({
        x: Math.max(-6, Math.min(6, x * 8)),
        y: Math.max(-6, Math.min(6, y * 8)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const emojis = ['👾', '😎', '🔥', '✨', '⚡', '👀', '🎨'];
  const cycleSmiley = () => {
    const next = emojis[(emojis.indexOf(smileyEmoji) + 1) % emojis.length];
    setSmileyEmoji(next);
  };

  return (
    <section id="top" ref={heroRef} className="des4-hero-section">
      {/* Interactive Neko Cat - Controlled directly by Creative Mode (No standalone bottom-right pill) */}
      <NekoCat
        followCursor={isCreativeMode}
        showToggle={false}
        rememberChoice={false}
        showLabel={false}
        cat="Socks"
        size="1.25x"
      />

      {/* Ambient background decorative grid/blobs */}
      <div
        className="des4-hide-mobile"
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(254,60,1,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      />
      <div
        className="des4-hide-mobile"
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(11,29,255,0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      />

      {/* Creative Mode Interactive Status Banner */}
      {isCreativeMode && (
        <div
          style={{
            position: 'absolute',
            top: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 30,
            background: 'rgba(254, 60, 1, 0.92)',
            color: '#ffffff',
            padding: '6px 18px',
            borderRadius: 100,
            fontSize: 12,
            fontWeight: 800,
            fontFamily: 'var(--font-inter)',
            boxShadow: '0 8px 24px rgba(254,60,1,0.4)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            animation: 'pulseGlow 2s infinite',
            pointerEvents: 'none',
          }}
        >
          <span>⚡ CREATIVE PLAYGROUND ACTIVE</span>
          <span style={{ opacity: 0.8, fontWeight: 500 }}>|  Kéo thả các phần tử &amp; Neko Cat theo chuột!</span>
        </div>
      )}

      {/* Floating Interactive Stickers with Parallax & Drag */}

      {/* 1. Cyber Terminal Sticker (Top Left) */}
      <div
        className="des4-hide-mobile"
        onPointerDown={(e) => handlePointerDown('devMode', e)}
        onPointerMove={(e) => handlePointerMove('devMode', e)}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          position: 'absolute',
          top: '18%',
          left: '8%',
          zIndex: 5,
          cursor: isCreativeMode ? 'grab' : 'pointer',
          touchAction: 'none',
          transform: `translate(${mousePos.x * 30 + dragPositions.devMode.x}px, ${mousePos.y * 30 + dragPositions.devMode.y}px)`,
          transition: dragTargetRef.current?.key === 'devMode' ? 'none' : 'transform 0.15s ease-out',
        }}
      >
        <div
          style={{
            background: '#0d1117',
            color: '#25ff8d',
            border: isCreativeMode ? '2px dashed #fe3c01' : '2px solid #30363d',
            borderRadius: 12,
            padding: '8px 14px',
            fontFamily: 'monospace',
            fontSize: 'clamp(12px, 1.5vw, 16px)',
            fontWeight: 800,
            boxShadow: isCreativeMode
              ? '0 12px 30px rgba(254,60,1,0.4)'
              : '0 12px 28px rgba(37,255,141,0.2), 0 4px 12px rgba(0,0,0,0.4)',
            animation: isCreativeMode ? 'none' : 'floatGentle 4s ease-in-out infinite',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            userSelect: 'none',
          }}
        >
          <span style={{ color: '#fe3c01', fontWeight: 900 }}>&gt;_</span>
          <span>dev.mode</span>
          <span style={{ width: 8, height: 14, background: '#25ff8d', display: 'inline-block', animation: 'pulseGlow 1s infinite' }} />
          {isCreativeMode && <span style={{ fontSize: 10, color: '#fe3c01', marginLeft: 4 }}>🖐 drag</span>}
        </div>
      </div>

      {/* 2. Interactive Custom SVG Sticker & Color Palette (Top Right) */}
      <div
        className="des4-hide-mobile"
        style={{
          position: 'absolute',
          top: '22%',
          right: '8%',
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        {/* User Custom SVG Sticker */}
        <div
          onPointerDown={(e) => handlePointerDown('customSticker', e)}
          onPointerMove={(e) => handlePointerMove('customSticker', e)}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            width: 64,
            height: 64,
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.18))',
            animation: isCreativeMode ? 'none' : 'floatGentle 4.2s ease-in-out infinite',
            cursor: isCreativeMode ? 'grab' : 'pointer',
            touchAction: 'none',
            userSelect: 'none',
            transform: `translate(${mousePos.x * -25 + dragPositions.customSticker.x}px, ${mousePos.y * -25 + dragPositions.customSticker.y}px)`,
            transition: dragTargetRef.current?.key === 'customSticker' ? 'none' : 'transform 0.15s ease-out',
            outline: isCreativeMode ? '2px dashed #fe3c01' : 'none',
            outlineOffset: 4,
            borderRadius: 12,
          }}
          title={isCreativeMode ? 'Kéo thả phần tử!' : 'Custom Character Sticker'}
        >
          <img src="/assets/custom-sticker.svg" alt="Custom Sticker" style={{ width: '100%', height: '100%', display: 'block', pointerEvents: 'none' }} />
        </div>

        {/* Color Palette Glass Lens */}
        <div
          onPointerDown={(e) => handlePointerDown('colorPalette', e)}
          onPointerMove={(e) => handlePointerMove('colorPalette', e)}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            border: isCreativeMode ? '3px dashed #fe3c01' : '3px solid #000000',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            animation: isCreativeMode ? 'none' : 'floatInverse 4.5s ease-in-out infinite',
            cursor: isCreativeMode ? 'grab' : 'pointer',
            touchAction: 'none',
            userSelect: 'none',
            transform: `translate(${mousePos.x * -20 + dragPositions.colorPalette.x}px, ${mousePos.y * -20 + dragPositions.colorPalette.y}px)`,
            transition: dragTargetRef.current?.key === 'colorPalette' ? 'none' : 'transform 0.15s ease-out',
          }}
          onClick={(e) => {
            if (!isCreativeMode) cycleSmiley();
          }}
          title={isCreativeMode ? 'Kéo thả Color Lens!' : 'Designer Color Lens (Click to change emoji)'}
        >
          {/* Tri-color palette pupil */}
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: 'conic-gradient(#fe3c01 0deg 120deg, #0b1dff 120deg 240deg, #ffe815 240deg 360deg)',
              transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px) rotate(${mousePos.x * 45}deg)`,
              transition: 'transform 0.1s ease-out',
              boxShadow: 'inset 0 0 4px rgba(0,0,0,0.3)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* 3. Glowing Dev & Design Badge Pill */}
      <div
        className="des4-hide-mobile"
        onPointerDown={(e) => handlePointerDown('badge', e)}
        onPointerMove={(e) => handlePointerMove('badge', e)}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          position: 'absolute',
          bottom: '22%',
          left: '10%',
          zIndex: 5,
          cursor: isCreativeMode ? 'grab' : 'pointer',
          touchAction: 'none',
          transform: `translate(${mousePos.x * 20 + dragPositions.badge.x}px, ${mousePos.y * 20 + dragPositions.badge.y}px)`,
          transition: dragTargetRef.current?.key === 'badge' ? 'none' : 'transform 0.15s ease-out',
        }}
      >
        <div
          style={{
            background: isCreativeMode ? '#fe3c01' : '#090a0f',
            color: '#ffffff',
            border: isCreativeMode ? '2px dashed #ffffff' : '1px solid rgba(255,255,255,0.15)',
            padding: '8px 18px',
            borderRadius: 100,
            fontSize: 12,
            fontWeight: 800,
            fontFamily: 'var(--font-inter)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            animation: isCreativeMode ? 'none' : 'floatGentle 5.5s ease-in-out infinite',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            userSelect: 'none',
          }}
        >
          <span style={{ color: isCreativeMode ? '#ffffff' : '#25ff8d' }}>⚡</span>
          <span style={{ letterSpacing: '0.05em' }}>FULLSTACK DEV &amp; UI ARTISAN</span>
          {isCreativeMode && <span style={{ fontSize: 10, opacity: 0.8 }}>🖐 drag</span>}
        </div>
      </div>

      {/* Main Dynamic Kinetic Typography Collage */}
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
          transform: `perspective(1000px) rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg) translate(${dragPositions.headline.x}px, ${dragPositions.headline.y}px)`,
          transition: dragTargetRef.current?.key === 'headline' ? 'none' : 'transform 0.15s ease-out',
        }}
      >
        {/* Line 1: "TURNING," */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.03em' }}>
          <span
            style={{ display: 'inline-block', transition: 'transform 0.25s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px) rotate(-4deg)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0) rotate(0)')}
          >
            tu
          </span>

          {/* Interactive Wobbly Emoji Cube */}
          <div
            onClick={cycleSmiley}
            style={{
              width: '0.65em',
              height: '0.65em',
              background: '#ff6200',
              borderRadius: '0.14em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.35em',
              boxShadow: '0 6px 16px rgba(255,98,0,0.35)',
              transform: 'translateY(-0.02em)',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.25) rotate(12deg)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1) rotate(0deg)')}
            title="Click me!"
          >
            {smileyEmoji}
          </div>

          <span
            style={{ color: '#a3821a', marginLeft: '0.02em', display: 'inline-block', transition: 'transform 0.25s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            rn
          </span>

          <span
            style={{ display: 'inline-block', transition: 'transform 0.25s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px) rotate(4deg)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0) rotate(0)')}
          >
            ing
          </span>
          <span style={{ color: '#fe3c01' }}>,</span>
        </div>

        {/* Line 2: "CREATIVE CHAOS" with rotated DAT LE & Pen Tool */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.06em', marginTop: '-0.05em' }}>
          <span
            style={{ color: '#0b1dff', display: 'inline-block', transition: 'transform 0.25s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            creative
          </span>

          {/* Vertical DAT LE kinetic badge */}
          <div
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontSize: '0.14em',
              fontFamily: 'var(--font-outfit)',
              fontWeight: 900,
              letterSpacing: '0.22em',
              color: '#000000',
              lineHeight: 1,
              padding: '4px 6px',
              borderRadius: 4,
              background: 'linear-gradient(180deg, #fe3c01, #0b1dff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(180deg) scale(1.25)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotate(180deg) scale(1)')}
          >
            DAT LE
          </div>

          <span
            style={{ display: 'inline-block', transition: 'transform 0.25s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px) rotate(-4deg)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0) rotate(0)')}
          >
            chaos
          </span>

          {/* Designer Vector Pen Tool Node */}
          <div
            style={{
              width: '0.45em',
              height: '0.85em',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `rotate(${mousePos.x * 24 - 10}deg)`,
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.15s ease-out',
            }}
            title="UI Vector Pen Tool"
          >
            {/* Pen Tool Nib */}
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '0.18em solid transparent',
                borderRight: '0.18em solid transparent',
                borderBottom: '0.42em solid #fe3c01',
                filter: 'drop-shadow(0 4px 8px rgba(254,60,1,0.35))',
              }}
            />
            {/* Handle / Node Point */}
            <div
              style={{
                width: '0.14em',
                height: '0.3em',
                background: '#111111',
                borderRadius: '0.04em',
                marginTop: '-0.04em',
              }}
            />
          </div>
        </div>

        {/* Line 3: "INTO DIGITAL" with Vinyl, Tech Chip & Vibe Code */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.03em', marginTop: '-0.05em' }}>
          <span
            style={{ display: 'inline-block', transition: 'transform 0.25s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            into
          </span>

          {/* Green Vinyl Record (Interactive Spinning) */}
          <div
            onClick={() => setIsVinylFast(!isVinylFast)}
            style={{
              width: '0.7em',
              height: '0.7em',
              borderRadius: '50%',
              background: '#00d66c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,214,108,0.45)',
              border: '2px solid rgba(0,0,0,0.1)',
              cursor: 'pointer',
              animation: `rotateInfinite ${isVinylFast ? '0.8s' : '4s'} linear infinite`,
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            title="Click to change vinyl spin speed!"
          >
            <div
              style={{
                width: '0.24em',
                height: '0.24em',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid #111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.1em',
              }}
            >
              ♫
            </div>
          </div>

          <span style={{ color: '#8bc200', display: 'inline-block' }}>digi</span>

          {/* 3D React/TS Tech Chip Badge (<tsx/>) */}
          <div
            style={{
              width: '0.7em',
              height: '0.65em',
              background: '#090d16',
              borderRadius: '0.14em',
              border: '2px solid #0b1dff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#61dafb',
              fontSize: '0.28em',
              fontWeight: 900,
              fontFamily: 'monospace',
              boxShadow: '0 4px 16px rgba(11,29,255,0.4)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
              lineHeight: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.25) rotate(-10deg)';
              e.currentTarget.style.borderColor = '#fe3c01';
              e.currentTarget.style.color = '#fe3c01';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.borderColor = '#0b1dff';
              e.currentTarget.style.color = '#61dafb';
            }}
            title="React & TS Code Stack"
          >
            &lt;tsx/&gt;
          </div>

          <span>tal</span>

          {/* Cyber "VIBE CODE" Cassette Badge */}
          <div
            style={{
              width: '0.55em',
              height: '0.75em',
              background: 'linear-gradient(135deg, #161b22, #0d1117)',
              border: '1.5px solid #30363d',
              borderRadius: '0.08em',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#25ff8d',
              fontSize: '0.11em',
              fontWeight: 900,
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              letterSpacing: '0.12em',
              boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
              marginLeft: '0.04em',
              cursor: 'pointer',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'rotate(180deg) scale(1.25) translateY(-8px)';
              e.currentTarget.style.borderColor = '#25ff8d';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'rotate(180deg) scale(1) translateY(0)';
              e.currentTarget.style.borderColor = '#30363d';
            }}
            title="Vibe Code Architecture"
          >
            vibe code
          </div>

          {/* Blue Wave */}
          <div
            style={{
              color: '#0b1dff',
              fontSize: '0.8em',
              margin: '0 0.04em',
              animation: 'floatGentle 3s ease-in-out infinite',
              display: 'inline-block',
            }}
          >
            ~
          </div>
        </div>

        {/* Line 4: "REALITY" */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.02em', marginTop: '-0.05em' }}>
          <span
            style={{
              color: '#0b1dff',
              display: 'inline-block',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px) rotate(-6deg)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0) rotate(0)')}
          >
            real
          </span>

          {/* 3D Glossy Inflatable Balloon 'e' */}
          <span
            style={{
              color: '#6e1d3b',
              background: 'radial-gradient(circle at 35% 30%, #ff5286 0%, #a83d64 45%, #4a1024 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 6px 12px rgba(168,61,100,0.4))',
              display: 'inline-block',
              transform: 'scale(1.08)',
              cursor: 'pointer',
              transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.4)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.35) rotate(10deg)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.08) rotate(0deg)')}
          >
            e
          </span>

          <span
            style={{
              color: '#ffe815',
              display: 'inline-block',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            ity
          </span>
          <span style={{ color: '#fe3c01', fontWeight: 900 }}>.</span>
        </div>
      </div>

      {/* Floating Consolidated Play Reel / Creative Playground Button */}
      <div
        style={{
          marginTop: 'clamp(20px, 4vw, 36px)',
          zIndex: 15,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          onClick={() => setIsCreativeMode(!isCreativeMode)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: isCreativeMode ? '#fe3c01' : '#000000',
            color: '#ffffff',
            padding: '12px 26px',
            borderRadius: 100,
            cursor: 'pointer',
            fontFamily: 'var(--font-inter)',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.02em',
            boxShadow: isCreativeMode
              ? '0 12px 35px rgba(254,60,1,0.5)'
              : '0 10px 30px rgba(0,0,0,0.2)',
            transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            userSelect: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <span
            style={{
              color: isCreativeMode ? '#ffffff' : '#fe3c01',
              fontSize: 14,
              animation: isCreativeMode ? 'pulseGlow 1s ease-in-out infinite' : 'none',
            }}
          >
            {isCreativeMode ? '⚡' : '▶'}
          </span>
          <span>
            {isCreativeMode
              ? 'play reel: CREATIVE MODE ON'
              : 'play reel (Creative Playground & Cat)'}
          </span>
        </div>

        {isCreativeMode && (
          <button
            onClick={resetPositions}
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#25ff8d',
              border: '1px solid rgba(37, 255, 141, 0.4)',
              padding: '10px 16px',
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
              e.currentTarget.style.background = '#000000';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            title="Reset element positions"
          >
            <span>🔄</span> Reset vị trí
          </button>
        )}
      </div>
    </section>
  );
}


