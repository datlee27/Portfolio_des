import React, { useState } from 'react';

/**
 * Neubrutalism Light Button Component
 * Extracted and styled after Framer Neubrutalism Light:
 * https://framer.com/m/Neubrutalism-Light-GEQUfl.js@nt58CmMc9d0gphMKD3Hh
 *
 * Characteristics:
 * - Solid Neubrutalism hard drop shadow
 * - Interactive mechanical press physics (translate down-right on hover/active)
 * - Sweeping diagonal moving light beam (shine effect)
 * - Crisp borders and high-contrast typography
 */
export default function NeubrutalismButton({
  onClick,
  children,
  buttonColor = 'rgb(143, 171, 255)', // Framer Neubrutalism default pastel blue
  textColor = '#000000',
  borderColor = '#18181b',
  borderWidth = 1.5,
  borderRadius = 10,
  defaultShadow = '6px 6px 0px 0px #000000',
  hoverShadow = '2px 2px 0px 0px #000000',
  activeShadow = '0px 0px 0px 0px #000000',
  moveLineColor = 'rgba(255, 255, 255, 0.65)',
  lineRotation = 14,
  style = {},
  className = '',
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsActive(false);
        }}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        className={`des4-neubrutalism-btn ${className}`}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          background: buttonColor,
          color: textColor,
          border: `${borderWidth}px solid ${borderColor}`,
          borderRadius: `${borderRadius}px`,
          padding: '12px 24px',
          fontFamily: 'var(--font-inter)',
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '-0.01em',
          cursor: 'pointer',
          outline: 'none',
          overflow: 'hidden',
          textDecoration: 'none',
          userSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
          boxShadow: isActive ? activeShadow : isHovered ? hoverShadow : defaultShadow,
          transform: isActive
            ? 'translate(6px, 6px)'
            : isHovered
            ? 'translate(4px, 4px)'
            : 'translate(0, 0)',
          transition:
            'transform 0.15s cubic-bezier(0.44, 0, 0.56, 1), box-shadow 0.15s cubic-bezier(0.44, 0, 0.56, 1)',
          ...style,
        }}
      >
        {/* Sweeping diagonal light glare reflection */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-30px',
            bottom: '-30px',
            width: '28px',
            background: moveLineColor,
            filter: 'blur(6px)',
            WebkitFilter: 'blur(6px)',
            transform: `rotate(${lineRotation}deg)`,
            pointerEvents: 'none',
            zIndex: 1,
            animation: 'des4NeubrutalismLightSweep 2.5s cubic-bezier(0.44, 0, 0.56, 1) infinite',
          }}
        />

        {/* Foreground Content */}
        <span
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          {children}
        </span>
      </button>

      {/* Global CSS Keyframe for the light beam sweep */}
      <style>{`
        @keyframes des4NeubrutalismLightSweep {
          0% {
            left: -60px;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          75% {
            opacity: 1;
          }
          100% {
            left: calc(100% + 70px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
