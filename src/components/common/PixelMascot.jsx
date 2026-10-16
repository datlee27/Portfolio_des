import React from 'react';

/**
 * PixelMascot — Editorial Paper & Ink Animated Pixel Mascot
 * Equipped with subtle retro idle animations:
 * - Gentle floating bobbing
 * - Antenna signal blinking
 * - Eye blinking / glitch pulse
 * - Hover bounce interaction
 */
export default function PixelMascot({ mood = '404', size = 96, className = '' }) {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <style>{`
        @keyframes pixelFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes antennaPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.2;
          }
        }
        @keyframes eyeBlink {
          0%, 94%, 100% {
            transform: scaleY(1);
          }
          97% {
            transform: scaleY(0.1);
          }
        }
        @keyframes earWiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-3deg);
          }
          75% {
            transform: rotate(3deg);
          }
        }
        .pixel-mascot-wrapper {
          animation: pixelFloat 3.2s ease-in-out infinite;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .pixel-mascot-wrapper:hover {
          transform: scale(1.1) translateY(-4px) !important;
        }
        .pixel-antenna-tip {
          animation: antennaPulse 1.8s steps(2, start) infinite;
        }
        .pixel-eyes {
          transform-origin: 12px 10px;
          animation: eyeBlink 4s ease-in-out infinite;
        }
      `}</style>

      <div className="pixel-mascot-wrapper">
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          shapeRendering="crispEdges"
          style={{
            imageRendering: 'pixelated',
            display: 'block',
          }}
        >
          {/* Antenna Tip with Pulse */}
          <rect className="pixel-antenna-tip" x="11" y="1" width="2" height="2" fill="#111111" />
          <rect x="11" y="3" width="2" height="2" fill="rgba(17, 17, 17, 0.4)" />

          {/* Head Outer Shell */}
          <rect x="5" y="5" width="14" height="1" fill="#111111" />
          <rect x="4" y="6" width="16" height="1" fill="#111111" />
          <rect x="3" y="7" width="18" height="9" fill="#F6F4EF" />
          <rect x="4" y="16" width="16" height="1" fill="#111111" />
          <rect x="5" y="17" width="14" height="1" fill="#111111" />

          {/* Side Borders */}
          <rect x="3" y="7" width="1" height="9" fill="#111111" />
          <rect x="20" y="7" width="1" height="9" fill="#111111" />

          {/* Ears / Antennas */}
          <rect x="2" y="8" width="1" height="3" fill="#111111" />
          <rect x="21" y="8" width="1" height="3" fill="#111111" />

          {/* Inner CRT Screen Frame */}
          <rect x="5" y="7" width="14" height="8" fill="#111111" />
          <rect x="6" y="8" width="12" height="6" fill="#F6F4EF" />

          {/* Eyes Group with Blink Animation */}
          <g className="pixel-eyes">
            {mood === '404' && (
              // Confused o_O
              <g fill="#111111">
                {/* Left Eye: big O */}
                <rect x="7" y="9" width="3" height="3" fill="#111111" />
                <rect x="8" y="10" width="1" height="1" fill="#F6F4EF" />
                {/* Right Eye: small dot */}
                <rect x="14" y="10" width="2" height="2" fill="#111111" />
                {/* Wavy mouth */}
                <rect x="10" y="12" width="4" height="1" fill="#111111" />
              </g>
            )}

            {mood === '400' && (
              // Warning ! _ !
              <g fill="#111111">
                <rect x="8" y="9" width="2" height="2" fill="#111111" />
                <rect x="8" y="12" width="2" height="1" fill="#111111" />

                <rect x="14" y="9" width="2" height="2" fill="#111111" />
                <rect x="14" y="12" width="2" height="1" fill="#111111" />

                {/* Mouth */}
                <rect x="11" y="13" width="2" height="1" fill="#111111" />
              </g>
            )}

            {mood === '403' && (
              // Restricted [ - - ]
              <g fill="#111111">
                <rect x="7" y="10" width="3" height="1" fill="#111111" />
                <rect x="14" y="10" width="3" height="1" fill="#111111" />
                <rect x="11" y="11" width="2" height="2" fill="#111111" />
                <rect x="11" y="13" width="2" height="1" fill="#111111" />
              </g>
            )}

            {mood === '500' && (
              // Dizzy @ _ @
              <g fill="#111111">
                <rect x="7" y="9" width="3" height="1" fill="#111111" />
                <rect x="9" y="10" width="1" height="2" fill="#111111" />
                <rect x="7" y="11" width="2" height="1" fill="#111111" />

                <rect x="14" y="9" width="3" height="1" fill="#111111" />
                <rect x="14" y="10" width="1" height="2" fill="#111111" />
                <rect x="15" y="11" width="2" height="1" fill="#111111" />

                <rect x="11" y="12" width="2" height="1" fill="#111111" />
              </g>
            )}

            {mood === 'crash' && (
              // Knocked out x _ x
              <g fill="#111111">
                <rect x="7" y="9" width="1" height="1" fill="#111111" />
                <rect x="9" y="9" width="1" height="1" fill="#111111" />
                <rect x="8" y="10" width="1" height="1" fill="#111111" />
                <rect x="7" y="11" width="1" height="1" fill="#111111" />
                <rect x="9" y="11" width="1" height="1" fill="#111111" />

                <rect x="14" y="9" width="1" height="1" fill="#111111" />
                <rect x="16" y="9" width="1" height="1" fill="#111111" />
                <rect x="15" y="10" width="1" height="1" fill="#111111" />
                <rect x="14" y="11" width="1" height="1" fill="#111111" />
                <rect x="16" y="11" width="1" height="1" fill="#111111" />

                <rect x="10" y="12" width="1" height="1" fill="#111111" />
                <rect x="11" y="13" width="2" height="1" fill="#111111" />
                <rect x="13" y="12" width="1" height="1" fill="#111111" />
              </g>
            )}

            {mood === 'offline' && (
              // Sleeping - _ -
              <g fill="#111111">
                <rect x="7" y="10" width="3" height="1" fill="#111111" />
                <rect x="14" y="10" width="3" height="1" fill="#111111" />
                <rect x="11" y="12" width="2" height="1" fill="#111111" />

                <rect x="18" y="4" width="3" height="1" fill="#111111" />
                <rect x="19" y="5" width="1" height="1" fill="#111111" />
                <rect x="18" y="6" width="3" height="1" fill="#111111" />
              </g>
            )}
          </g>

          {/* Neck */}
          <rect x="11" y="18" width="2" height="1" fill="#111111" />

          {/* Body Base */}
          <rect x="8" y="19" width="8" height="2" fill="#111111" />
          <rect x="7" y="21" width="10" height="1" fill="#111111" />
          <rect x="8" y="22" width="2" height="1" fill="#111111" />
          <rect x="14" y="22" width="2" height="1" fill="#111111" />
        </svg>
      </div>
    </div>
  );
}
