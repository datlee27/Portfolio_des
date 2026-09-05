import React, { useState } from 'react';

/**
 * LogoLoop - High Performance Marquee Component
 * Supports horizontal/vertical continuous loop, hover deceleration,
 * edge gradient fade-out masks, and custom card styling.
 */
export default function LogoLoop({
  logos = [],
  speed = 180,
  direction = 'left',
  gap = 36,
  hoverSpeed = 0,
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor = '#090a0f',
  ariaLabel = 'Skills marquee',
  onLogoHover = () => {},
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate items for seamless continuous looping
  const items = [...logos, ...logos, ...logos];

  const duration = Math.max(10, (logos.length * 150) / (speed || 180));
  const animDirection = direction === 'right' ? 'reverse' : 'normal';

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        padding: '16px 0',
        userSelect: 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left/Right Edge Fade Out Mask overlays */}
      {fadeOut && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '12%',
              maxWidth: 120,
              zIndex: 3,
              background: `linear-gradient(to right, ${fadeOutColor} 0%, transparent 100%)`,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '12%',
              maxWidth: 120,
              zIndex: 3,
              background: `linear-gradient(to left, ${fadeOutColor} 0%, transparent 100%)`,
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Marquee Track Container */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: `${gap}px`,
          width: 'max-content',
          animation: `des4MarqueeLoop ${duration}s linear infinite ${animDirection}`,
          animationPlayState: isHovered && hoverSpeed === 0 ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {items.map((item, index) => {
          const itemColor = item.color || '#fe3c01';
          return (
            <div
              key={`${item.title || index}-${index}`}
              onMouseEnter={() => onLogoHover(item)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 22px',
                borderRadius: 100,
                background: 'rgba(255, 255, 255, 0.03)',
                border: `1.5px solid rgba(255, 255, 255, 0.1)`,
                backdropFilter: 'blur(8px)',
                cursor: 'pointer',
                transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
                transform: scaleOnHover ? 'scale(1)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (scaleOnHover) {
                  e.currentTarget.style.transform = 'scale(1.15) translateY(-4px)';
                  e.currentTarget.style.borderColor = itemColor;
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = `0 12px 30px ${itemColor}40`;
                }
              }}
              onMouseLeave={(e) => {
                if (scaleOnHover) {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {/* Icon Node or Image */}
              {item.node ? (
                <span
                  style={{
                    fontSize: 24,
                    color: itemColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    filter: `drop-shadow(0 2px 8px ${itemColor}80)`,
                  }}
                >
                  {item.node}
                </span>
              ) : item.src ? (
                <img
                  src={item.src}
                  alt={item.alt || item.title}
                  style={{ height: 28, width: 'auto', display: 'block' }}
                />
              ) : null}

              {/* Title & Tag */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-outfit)',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#ffffff',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.1,
                  }}
                >
                  {item.title}
                </span>
                {item.category && (
                  <span
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: 10,
                      fontWeight: 600,
                      color: itemColor,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      marginTop: 2,
                    }}
                  >
                    {item.category}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
