import React, { useState, useEffect } from 'react';
import { clientsData } from '../data/homeData';

export default function ClientsSection() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto rotation when not dragging or hovering
  useEffect(() => {
    if (isDragging || isHovered) return;
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.35) % 360);
    }, 25);
    return () => clearInterval(interval);
  }, [isDragging, isHovered]);

  // Drag / Touch handlers
  const handleStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setStartRotation(rotation);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    setRotation(startRotation + deltaX * 0.45);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  const count = clientsData.length;

  // Responsive dimensions calculation
  let cardWidth = 280;
  let cardHeight = 180;
  let radius = 400;

  if (windowWidth < 600) {
    cardWidth = 180;
    cardHeight = 120;
    radius = 210;
  } else if (windowWidth < 900) {
    cardWidth = 220;
    cardHeight = 145;
    radius = 300;
  }

  return (
    <section
      id="d4-clients"
      style={{
        padding: '60px 0',
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
            fontSize: 'clamp(40px, 9vw, 140px)',
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: '#ffffff',
            margin: '0 0 16px 0',
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
            marginBottom: 40,
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: '#fe3c01', fontWeight: 700 }}>* </span>
          Teams, brands and projects built with high precision.
        </p>

        {/* 3D Cylinder Rotating Stage */}
        <div
          onMouseDown={(e) => handleStart(e.clientX)}
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseUp={handleEnd}
          onMouseLeave={() => {
            handleEnd();
            setIsHovered(false);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onTouchEnd={handleEnd}
          style={{
            perspective: 1200,
            width: '100%',
            height: windowWidth < 600 ? 260 : 360,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            cursor: isDragging ? 'grabbing' : 'grab',
            touchAction: 'none',
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
                    borderRadius: windowWidth < 600 ? 14 : 20,
                    overflow: 'hidden',
                    background: '#151515',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: windowWidth < 600 ? 12 : 24,
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: 'hidden',
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
                  {/* Background Image preview */}
                  {client.previewImg && (
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
                        opacity: 0.55,
                      }}
                    />
                  )}

                  {/* Dark gradient overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.75) 100%)',
                    }}
                  />

                  {/* Name Tag */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      fontFamily: 'var(--font-outfit)',
                      fontSize: windowWidth < 600 ? 16 : 22,
                      fontWeight: 800,
                      color: '#ffffff',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.02em',
                      textAlign: 'center',
                    }}
                  >
                    {client.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Drag / Swipe Hint */}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 12,
              color: '#888888',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            ← Swipe / Drag to rotate →
          </span>
        </div>
      </div>
    </section>
  );
}
