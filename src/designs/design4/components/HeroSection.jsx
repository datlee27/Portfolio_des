import React, { useState, useEffect, useRef } from 'react';
import NekoCat from './NekoCat';

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVinylFast, setIsVinylFast] = useState(false);
  const [smileyEmoji, setSmileyEmoji] = useState('👾');
  const [isPlaying, setIsPlaying] = useState(false);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

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
      {/* Interactive Neko Cat Component */}
      <NekoCat
        followCursor={false}
        showToggle={true}
        showLabel={true}
        cat="Classic"
        size="1.25x"
        toggleCorner="bottom-right"
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

      {/* Floating Interactive Stickers with Parallax */}

      {/* 1. Tomato Sticker (Top Left) */}
      <div
        className="des4-hide-mobile"
        style={{
          position: 'absolute',
          top: '18%',
          left: '8%',
          zIndex: 5,
          cursor: 'grab',
          transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div
          style={{
            fontSize: 'clamp(32px, 4.5vw, 64px)',
            filter: 'drop-shadow(0 12px 20px rgba(254,60,1,0.25))',
            animation: 'floatGentle 4s ease-in-out infinite',
            transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.3) rotate(15deg)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1) rotate(0deg)')}
        >
          🍅
        </div>
      </div>

      {/* 2. Interactive Eye Sticker (Top Right) */}
      <div
        className="des4-hide-mobile"
        style={{
          position: 'absolute',
          top: '22%',
          right: '8%',
          zIndex: 5,
          transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#ffffff',
            border: '3px solid #000000',
            boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            animation: 'floatInverse 4.5s ease-in-out infinite',
            cursor: 'pointer',
          }}
          onClick={cycleSmiley}
        >
          {/* Pupil following mouse */}
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#fe3c01',
              transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          />
        </div>
      </div>

      {/* 3. Glowing Badge Pill */}
      <div
        className="des4-hide-mobile"
        style={{
          position: 'absolute',
          bottom: '22%',
          left: '10%',
          zIndex: 5,
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
        }}
      >
        <div
          style={{
            background: '#111111',
            color: '#ffe815',
            padding: '8px 16px',
            borderRadius: 100,
            fontSize: 12,
            fontWeight: 800,
            fontFamily: 'var(--font-inter)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            animation: 'floatGentle 5.5s ease-in-out infinite',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'transform 0.3s ease, background 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.15) rotate(4deg)';
            e.currentTarget.style.background = '#fe3c01';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            e.currentTarget.style.background = '#111';
            e.currentTarget.style.color = '#ffe815';
          }}
        >
          <span>✨</span>
          <span>DATLE.DESIGN</span>
        </div>
      </div>

      {/* Main Dynamic Kinetic Typography Collage */}
      <div
        className="des4-hero-headline"
        style={{
          transform: `perspective(1000px) rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Line 1: "the chaos," */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.04em' }}>
          <span
            style={{ display: 'inline-block', transition: 'transform 0.25s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px) rotate(-4deg)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0) rotate(0)')}
          >
            th
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
            style={{ color: '#a3821a', marginLeft: '0.04em', display: 'inline-block', transition: 'transform 0.25s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            ch
          </span>

          {/* 3D Camera Lenses Cluster */}
          <div
            style={{
              width: '0.65em',
              height: '0.65em',
              background: '#e0e0e0',
              borderRadius: '0.18em',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              padding: '0.08em',
              gap: '0.06em',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2), 0 4px 10px rgba(0,0,0,0.08)',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15) rotate(-8deg)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1) rotate(0deg)')}
          >
            <div style={{ width: '0.18em', height: '0.18em', borderRadius: '50%', background: '#111', border: '1px solid #777' }} />
            <div style={{ width: '0.18em', height: '0.18em', borderRadius: '50%', background: '#111', border: '1px solid #777' }} />
            <div style={{ width: '0.18em', height: '0.18em', borderRadius: '50%', background: '#111', border: '1px solid #777' }} />
            <div style={{ width: '0.08em', height: '0.08em', borderRadius: '50%', background: '#ffaa00', alignSelf: 'center', justifySelf: 'center' }} />
          </div>

          <span
            style={{ display: 'inline-block', transition: 'transform 0.25s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px) rotate(4deg)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0) rotate(0)')}
          >
            os
          </span>
          <span style={{ color: '#25ff8d' }}>,</span>
        </div>

        {/* Line 2: "of" with rotated DAT LE & pencil */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.1em', marginTop: '-0.05em' }}>
          <span
            style={{ display: 'inline-block', transition: 'transform 0.25s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            o
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

          {/* Red Tilted Pencil */}
          <div
            style={{
              width: '0.08em',
              height: '0.9em',
              background: '#e3091d',
              borderRadius: '0.04em 0.04em 0.08em 0.08em',
              transform: `rotate(${mousePos.x * 20 - 12}deg)`,
              boxShadow: '2px 4px 10px rgba(0,0,0,0.15)',
              position: 'relative',
              transition: 'transform 0.1s ease-out',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -6,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '4px solid transparent',
                borderRight: '4px solid transparent',
                borderBottom: '6px solid #ffccaa',
              }}
            />
          </div>
        </div>

        {/* Line 3: "making sh*t" / "mak/gs |" */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.02em', marginTop: '-0.05em' }}>
          <span
            style={{ display: 'inline-block', transition: 'transform 0.25s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            m
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

          <span style={{ color: '#8bc200', transform: 'rotate(10deg)', display: 'inline-block' }}>&lt;</span>
          <span>g</span>
          <span>s</span>

          {/* Dieter Rams Orange Book */}
          <div
            style={{
              width: '0.5em',
              height: '0.75em',
              background: '#ff5500',
              borderRadius: '0.04em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '0.12em',
              fontWeight: 800,
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              letterSpacing: '0.08em',
              boxShadow: '3px 6px 16px rgba(0,0,0,0.22)',
              marginLeft: '0.04em',
              cursor: 'pointer',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(180deg) scale(1.25) translateY(-8px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotate(180deg) scale(1) translateY(0)')}
          >
            dieter rams
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

          {/* Red vertical bar */}
          <div
            style={{
              width: '0.12em',
              height: '0.65em',
              background: '#fe3c01',
              borderRadius: '0.04em',
              animation: 'pulseGlow 2s ease-in-out infinite',
            }}
          />
        </div>

        {/* Line 4: "real" */}
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
            r
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
            a
          </span>
          <span
            style={{
              display: 'inline-block',
              transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px) rotate(6deg)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0) rotate(0)')}
          >
            l
          </span>
        </div>
      </div>

      {/* Floating Sound / Pulse Play Button */}
      <div
        onClick={() => setIsPlaying(!isPlaying)}
        style={{
          marginTop: 'clamp(20px, 4vw, 36px)',
          zIndex: 15,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          background: '#000000',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: 100,
          cursor: 'pointer',
          fontFamily: 'var(--font-inter)',
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.02em',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 14px 40px rgba(254,60,1,0.35)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        }}
      >
        <span
          style={{
            color: '#fe3c01',
            fontSize: 14,
            animation: isPlaying ? 'pulseGlow 1s ease-in-out infinite' : 'none',
          }}
        >
          {isPlaying ? '⏸' : '▶'}
        </span>
        <span>{isPlaying ? 'creative mode: on' : 'play reel'}</span>
      </div>
    </section>
  );
}
