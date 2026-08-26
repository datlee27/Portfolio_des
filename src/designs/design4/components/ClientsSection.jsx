import React, { useState, useEffect, useRef } from 'react';
import { clientsData } from '../data/homeData';

export default function ClientsSection() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoRotateRef = useRef(null);

  // Auto rotation when not dragging or hovering
  useEffect(() => {
    if (isDragging || isHovered) return;
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.35) % 360);
    }, 25);
    return () => clearInterval(interval);
  }, [isDragging, isHovered]);

  // Drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartRotation(rotation);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setRotation(startRotation + deltaX * 0.35);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const count = clientsData.length;
  // Card dimensions and exact cylinder radius calculation:
  // For 8 cards to sit flush without intersecting, R must be > (cardWidth / 2) / tan(22.5deg)
  // cardWidth = 300px => minimum R = 150 / 0.4142 = 362.1px.
  // We use cardWidth = 290px and radius = 420px for a clean, non-overlapping gap!
  const cardWidth = 290;
  const cardHeight = 190;
  const radius = 420;

  return (
    <section
      id="d4-clients"
      style={{
        padding: '160px 40px 180px',
        background: '#000000',
        color: '#ffffff',
        overflow: 'hidden',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <div className="des4-container">
        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-outfit)',
            fontSize: 'clamp(54px, 10vw, 150px)',
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: '#ffffff',
            margin: '0 0 24px 0',
          }}
        >
          clients<span style={{ color: '#fe3c01' }}>*</span>
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 14,
            fontWeight: 500,
            color: '#888888',
            maxWidth: 480,
            marginBottom: 90,
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: '#fe3c01', fontWeight: 700 }}>* </span>
          Teams, brands and people who trusted the process.
        </p>

        {/* 3D Cylinder Rotating Stage */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            handleMouseUp();
            setIsHovered(false);
          }}
          onMouseEnter={() => setIsHovered(true)}
          style={{
            perspective: 1600,
            width: '100%',
            height: 440,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: cardWidth,
              height: cardHeight,
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotation}deg)`,
              transition: isDragging ? 'none' : isHovered ? 'transform 0.3s ease-out' : 'none',
            }}
          >
            {clientsData.map((client, idx) => {
              const angle = (360 / count) * idx;

              return (
                <div
                  key={client.id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: cardWidth,
                    height: cardHeight,
                    borderRadius: 22,
                    overflow: 'hidden',
                    background: '#151515',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 24,
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: 'hidden', // Hides the back side of cylinder to avoid overlap!
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#fe3c01';
                    e.currentTarget.style.boxShadow = '0 24px 60px rgba(254,60,1,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.7)';
                  }}
                >
                  {/* Background Video / Image preview */}
                  {client.previewVideo ? (
                    <video
                      src={client.previewVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.6,
                      }}
                    />
                  ) : client.previewImg ? (
                    <img
                      src={client.previewImg}
                      alt={client.name}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.6,
                      }}
                    />
                  ) : null}

                  {/* Dark gradient overlay for clear logo contrast */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)',
                    }}
                  />

                  {/* Client Logo */}
                  <img
                    src={client.logo}
                    alt={client.name}
                    style={{
                      maxWidth: '82%',
                      maxHeight: '60%',
                      objectFit: 'contain',
                      position: 'relative',
                      zIndex: 2,
                      filter: 'brightness(0) invert(1)',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Drag Hint
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 12,
              color: '#666666',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            ← Drag to rotate cylinder →
          </span>
        </div> */}
      </div>
    </section>
  );
}
