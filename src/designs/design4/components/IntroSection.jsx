import React, { useState, useEffect } from 'react';
import { SiReact, SiSpringboot, SiClaude, SiMysql } from 'react-icons/si';
import { FaPlay, FaPause } from 'react-icons/fa6';
import { TbActivity, TbClock, TbSun } from 'react-icons/tb';

export default function IntroSection() {
  // 1. Music Player State
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);

  // 2. System Pulse Node Simulator State
  const [activeNode, setActiveNode] = useState('react');
  const [packetTrigger, setPacketTrigger] = useState(0);

  // 3. Live Da Nang Clock State
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    {
      id: 'react',
      name: 'React 19 & TS',
      icon: <SiReact size={20} style={{ color: '#61dafb' }} />,
      color: '#61dafb',
      log: 'Frontend: Hydrated 60 FPS tactile UI components & state hooks',
    },
    {
      id: 'spring',
      name: 'Spring Boot',
      icon: <SiSpringboot size={20} style={{ color: '#6db33f' }} />,
      color: '#6db33f',
      log: 'Core API: Dispatched non-blocking microservices & JWT auth',
    },
    {
      id: 'ai',
      name: 'Claude AI',
      icon: <SiClaude size={20} style={{ color: '#d97706' }} />,
      color: '#d97706',
      log: 'Intelligence: Real-time OCR vision analysis & LLM prompt reasoning',
    },
    {
      id: 'db',
      name: 'Cloud MySQL',
      icon: <SiMysql size={24} style={{ color: '#00758f' }} />,
      color: '#00758f',
      log: 'Database: Persistent relational storage with sub-millisecond pooling',
    },
  ];

  const handleNodeClick = (id) => {
    setActiveNode(id);
    setPacketTrigger((prev) => prev + 1);
  };

  return (
    <section id="d4-intro" className="des4-intro-wrapper">
      <div className="des4-container" style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Section Category Tag */}
        <div className="des4-intro-header-tag">
          <span style={{ color: '#fe3c01', fontSize: 16, fontWeight: 900 }}>*</span>
          <span>Craft &amp; Architecture • Lê Văn Đạt</span>
        </div>

        {/* Short, Punchy Editorial Narrative (No Text Clutter) */}
        <p className="des4-intro-narrative">
          Dat Le is a{' '}
          <span className="des4-intro-tag">
            Fullstack Developer
          </span>{' '}
          and{' '}
          <span className="des4-intro-tag">
            Technical Artisan
          </span>{' '}
          based in Da Nang, Vietnam. He builds{' '}
          <span className="des4-intro-serif" style={{ color: '#fe3c01' }}>
            Clean Architectures,
          </span>{' '}
          <span className="des4-intro-serif" style={{ color: '#0b1dff' }}>
            Scalable Backends,
          </span>{' '}
          and{' '}
          <span className="des4-intro-serif" style={{ color: '#10b981' }}>
            Tactile UI
          </span>{' '}
          into cohesive, production-ready digital products.
        </p>

        {/* ─── VISUAL INTERACTIVE BENTO GRID (Zero Boring Text Blocks) ─── */}
        <div className="des4-visual-bento">

          {/* ─── BENTO CARD 1: Interactive System Pulse Simulator (Large) ─── */}
          <div
            className="des4-bento-card"
            style={{
              background: '#090d16',
              border: '1px solid #1e293b',
              padding: '24px 28px',
              color: '#ffffff',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 260,
            }}
          >
            <div>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <TbActivity size={18} style={{ color: '#00f2fe' }} />
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#94a3b8',
                    }}
                  >
                    Interactive System Pulse
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: 'monospace',
                    color: '#10b981',
                    background: 'rgba(16, 185, 129, 0.12)',
                    padding: '4px 10px',
                    borderRadius: 100,
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                  }}
                >
                  LIVE SIMULATOR
                </span>
              </div>

              {/* Node Switcher Graph */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                {nodes.map((node) => {
                  const isSelected = activeNode === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => handleNodeClick(node.id)}
                      style={{
                        background: isSelected ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                        border: isSelected ? `2px solid ${node.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: 12,
                        padding: '12px 8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 8,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? `0 8px 24px ${node.color}33` : 'none',
                        transform: isSelected ? 'translateY(-2px)' : 'none',
                      }}
                      title="Click node to pulse data"
                    >
                      {node.icon}
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: isSelected ? '#ffffff' : '#94a3b8',
                          fontFamily: 'var(--font-inter)',
                          textAlign: 'center',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {node.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Neon Connection Beam */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 3,
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  marginBottom: 16,
                }}
              >
                <div
                  key={packetTrigger}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '35%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, #00f2fe, #fe3c01, transparent)',
                    borderRadius: 4,
                    animation: 'dataPulseGlow 1.4s ease-in-out infinite',
                  }}
                />
              </div>
            </div>

            {/* Live Packet Log Console */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: 10,
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'monospace',
                fontSize: 11.5,
              }}
            >
              <span style={{ color: '#10b981', fontWeight: 900 }}>&gt;</span>
              <span style={{ color: '#cbd5e1' }}>
                {nodes.find((n) => n.id === activeNode)?.log}
              </span>
            </div>
          </div>

          {/* ─── BENTO CARD 2: Lo-Fi Coding Vibe Player (Cassette) ─── */}
          <div
            className="des4-bento-card"
            style={{
              background: 'linear-gradient(135deg, #111827, #0b0f17)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '24px 26px',
              color: '#ffffff',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 260,
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>🎧</span>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: '#ff9e79',
                    textTransform: 'uppercase',
                  }}
                >
                  Coding Audio Deck
                </span>
              </div>

              {/* Play / Pause Toggle Button */}
              <button
                onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: isPlayingMusic ? '#fe3c01' : '#1e293b',
                  color: '#ffffff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: isPlayingMusic ? '0 0 16px rgba(254, 60, 1, 0.5)' : 'none',
                  transition: 'all 0.25s ease',
                }}
                title={isPlayingMusic ? 'Pause Music' : 'Play Music'}
              >
                {isPlayingMusic ? <FaPause size={12} /> : <FaPlay size={12} style={{ marginLeft: 2 }} />}
              </button>
            </div>

            {/* Cassette Tape Spools & Spectrum */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '18px 0',
                background: 'rgba(0, 0, 0, 0.35)',
                borderRadius: 14,
                border: '1px solid rgba(255, 255, 255, 0.05)',
                margin: '14px 0',
              }}
            >
              {/* Left Spool */}
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  border: '3px dashed #ff9e79',
                  animation: isPlayingMusic ? 'tapeSpin 3s linear infinite' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#ff9e79' }} />
              </div>

              {/* Jumping Audio Equalizer Spectrum */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 32 }}>
                {[
                  'audioWave1', 'audioWave3', 'audioWave2', 'audioWave4',
                  'audioWave1', 'audioWave2', 'audioWave3', 'audioWave1',
                  'audioWave4', 'audioWave2', 'audioWave1', 'audioWave3',
                ].map((wave, i) => (
                  <div
                    key={i}
                    style={{
                      width: 4,
                      background: 'linear-gradient(180deg, #00f2fe, #ff9e79)',
                      borderRadius: 4,
                      animation: isPlayingMusic ? `${wave} ${0.6 + (i % 4) * 0.2}s ease-in-out infinite alternate` : 'none',
                      height: isPlayingMusic ? undefined : 6,
                    }}
                  />
                ))}
              </div>

              {/* Right Spool */}
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  border: '3px dashed #00f2fe',
                  animation: isPlayingMusic ? 'tapeSpin 3s linear infinite' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#00f2fe' }} />
              </div>
            </div>

            {/* Track Meta */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-inter)', color: '#ffffff' }}>
                  Midnight in Da Nang
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace' }}>
                  Lo-Fi Coding Session • 24/7 Stream
                </div>
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontFamily: 'monospace',
                  color: isPlayingMusic ? '#25ff8d' : '#94a3b8',
                  fontWeight: 700,
                }}
              >
                {isPlayingMusic ? '● PLAYING' : '❚❚ PAUSED'}
              </span>
            </div>
          </div>

          {/* ─── BENTO CARD 3: Live Da Nang Developer Station (Wide Span) ─── */}
          <div
            className="des4-bento-card"
            style={{
              gridColumn: '1 / -1',
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              padding: '20px 26px',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
            }}
          >
            {/* Live Clock */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: '#111827',
                  color: '#00f2fe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <TbClock size={20} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Local Time (GMT+7)
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: 18, fontWeight: 900, color: '#0f172a' }}>
                  {currentTime || '12:00:00 PM'}
                </div>
              </div>
            </div>

            {/* Da Nang Location & Weather */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: '#fef3c7',
                  color: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <TbSun size={20} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Base Station
                </div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 14, fontWeight: 800, color: '#0f172a' }}>
                  Da Nang, VN • 28°C Sunny ☀️
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  padding: '8px 16px',
                  borderRadius: 100,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#10b981',
                    boxShadow: '0 0 8px #10b981',
                    animation: 'pulseLive 2s infinite',
                  }}
                />
                <span style={{ fontSize: 11, fontWeight: 800, fontFamily: 'monospace', color: '#0f172a' }}>
                  60 FPS SMOOTH
                </span>
              </div>

              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  padding: '8px 16px',
                  borderRadius: 100,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{ color: '#6366f1', fontSize: 12 }}>⚡</span>
                <span style={{ fontSize: 11, fontWeight: 800, fontFamily: 'monospace', color: '#0f172a' }}>
                  ZERO LAG ARCHITECTURE
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
