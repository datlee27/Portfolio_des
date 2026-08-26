import React, { useState, useEffect } from 'react';
import { clientsData } from '../data/homeData';

export default function ClientsSection() {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.3) % 360);
    }, 20);
    return () => clearInterval(interval);
  }, [isHovered]);

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
            marginBottom: 100,
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: '#fe3c01', fontWeight: 700 }}>* </span>
          Teams, brands and people who trusted the process.
        </p>

        {/* 3D Cylinder Rotating Stage */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            perspective: 1200,
            width: '100%',
            height: 480,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: 320,
              height: 220,
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotation}deg)`,
              transition: isHovered ? 'transform 0.5s ease-out' : 'none',
            }}
          >
            {clientsData.map((client, idx) => {
              const count = clientsData.length;
              const angle = (360 / count) * idx;
              const radius = 380; // cylinder radius

              return (
                <div
                  key={client.id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 320,
                    height: 220,
                    borderRadius: 24,
                    overflow: 'hidden',
                    background: '#181818',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 24,
                    cursor: 'pointer',
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: 'visible',
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
                        opacity: 0.65,
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
                        opacity: 0.65,
                      }}
                    />
                  ) : null}

                  {/* Dark overlay for contrast */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0,0,0,0.3)',
                    }}
                  />

                  {/* Client Logo */}
                  <img
                    src={client.logo}
                    alt={client.name}
                    style={{
                      maxWidth: '85%',
                      maxHeight: '65%',
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
      </div>
    </section>
  );
}
