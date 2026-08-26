import React from 'react';

export default function HeroSection() {
  return (
    <section
      id="top"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px 20px',
        background: '#ffffff',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Centered Typography Collage */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-outfit)',
          fontWeight: 900,
          fontSize: 'clamp(64px, 12vw, 150px)',
          lineHeight: 0.92,
          letterSpacing: '-0.04em',
          color: '#000000',
        }}
      >
        {/* Line 1: "the chaos," */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.04em' }}>
          <span>th</span>

          {/* Orange Smiley Cube */}
          <div
            style={{
              width: '0.65em',
              height: '0.65em',
              background: '#ff6200',
              borderRadius: '0.14em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.35em',
              boxShadow: '0 4px 12px rgba(255,98,0,0.3)',
              transform: 'translateY(-0.02em)',
              color: '#ffffff',
            }}
          >
            👾
          </div>

          <span style={{ color: '#a3821a', marginLeft: '0.04em' }}>ch</span>

          {/* iPhone Camera Lenses Graphic */}
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
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: '0.18em', height: '0.18em', borderRadius: '50%', background: '#111', border: '1px solid #777' }} />
            <div style={{ width: '0.18em', height: '0.18em', borderRadius: '50%', background: '#111', border: '1px solid #777' }} />
            <div style={{ width: '0.18em', height: '0.18em', borderRadius: '50%', background: '#111', border: '1px solid #777' }} />
            <div style={{ width: '0.08em', height: '0.08em', borderRadius: '50%', background: '#ffaa00', alignSelf: 'center', justifySelf: 'center' }} />
          </div>

          <span>os</span>
          <span style={{ color: '#25ff8d' }}>,</span>
        </div>

        {/* Line 2: "of" with rotated name & pencil */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.1em', marginTop: '-0.05em' }}>
          <span>o</span>

          {/* Vertical YANXIN ZHANG text */}
          <div
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              fontSize: '0.12em',
              fontFamily: 'var(--font-outfit)',
              fontWeight: 800,
              letterSpacing: '0.18em',
              color: '#000000',
              lineHeight: 1,
            }}
          >
            YANXINZHANG
          </div>

          {/* Red Pencil */}
          <div
            style={{
              width: '0.08em',
              height: '0.9em',
              background: '#e3091d',
              borderRadius: '0.04em 0.04em 0.08em 0.08em',
              transform: 'rotate(-12deg)',
              boxShadow: '2px 4px 10px rgba(0,0,0,0.15)',
              position: 'relative',
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
          <span>m</span>

          {/* Green Vinyl Record */}
          <div
            style={{
              width: '0.7em',
              height: '0.7em',
              borderRadius: '50%',
              background: '#00d66c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(0,214,108,0.4)',
              border: '2px solid rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                width: '0.24em',
                height: '0.24em',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid #111',
              }}
            />
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
              boxShadow: '3px 4px 12px rgba(0,0,0,0.2)',
              marginLeft: '0.04em',
            }}
          >
            dieter rams
          </div>

          {/* Blue Wave */}
          <div style={{ color: '#0b1dff', fontSize: '0.8em', margin: '0 0.04em' }}>~</div>

          {/* Red vertical bar */}
          <div
            style={{
              width: '0.12em',
              height: '0.65em',
              background: '#fe3c01',
              borderRadius: '0.04em',
            }}
          />
        </div>

        {/* Line 4: "real" */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.02em', marginTop: '-0.05em' }}>
          <span style={{ color: '#0b1dff' }}>r</span>

          {/* Glossy 3D Inflatable Balloon 'e' */}
          <span
            style={{
              color: '#6e1d3b',
              background: 'radial-gradient(circle at 35% 30%, #a83d64 0%, #4a1024 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 4px 8px rgba(110,29,59,0.3))',
              display: 'inline-block',
              transform: 'scale(1.05)',
            }}
          >
            e
          </span>

          <span style={{ color: '#ffe815' }}>a</span>
          <span>l</span>
        </div>
      </div>
    </section>
  );
}
