import React, { useState } from 'react';

/**
 * PixelMonster / Claude Code Mascot
 * Faithfully recreates the authentic official Anthropic Claude Code CLI mascot:
 * - Terracotta / Peach retro pixel sprite (#ff9e79)
 * - Rectangular body with extended side hands/claws
 * - Two vertical slit eyes
 * - 4 distinct downward-stepping legs
 */
export default function PixelMonster({ size = 48, className = '', style = {} }) {
  const [isWobbling, setIsWobbling] = useState(false);
  const [speechBubble, setSpeechBubble] = useState(null);

  const phrases = [
    "I'm Clawd, Claude Code's mascot! 👾",
    'Coding at the speed of thought ⚡',
    'Ready to ship with Dat Le! 🚀',
    'Claude 3.7 & 3.8 ready ✨',
    'Clean code only! 🦀',
  ];

  const handleClick = (e) => {
    e.stopPropagation();
    setIsWobbling(true);
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setSpeechBubble(randomPhrase);
    setTimeout(() => setIsWobbling(false), 500);
    setTimeout(() => setSpeechBubble(null), 2500);
  };

  // Color tokens matching the official Anthropic Claude Code mascot:
  const O = '#ff9e79'; // Anthropic Claude signature peach / terracotta
  const K = '#000000'; // Eyes & outline
  const _ = null;      // Transparent

  // 17 cols x 8 rows pixel grid — official Claude Code CLI mascot
  const pixelGrid = [
    // 0: Top of head (cols 2..14)
    [_, _, O, O, O, O, O, O, O, O, O, O, O, O, O, _, _],
    // 1: Forehead (cols 2..14)
    [_, _, O, O, O, O, O, O, O, O, O, O, O, O, O, _, _],
    // 2: Arms start & Eyes top (Arms at 0..1 and 15..16; Eyes at 5 and 11)
    [O, O, O, O, O, K, O, O, O, O, O, K, O, O, O, O, O],
    // 3: Arms & Eyes bottom
    [O, O, O, O, O, K, O, O, O, O, O, K, O, O, O, O, O],
    // 4: Lower body (cols 2..14)
    [_, _, O, O, O, O, O, O, O, O, O, O, O, O, O, _, _],
    // 5: Body base (cols 2..14)
    [_, _, O, O, O, O, O, O, O, O, O, O, O, O, O, _, _],
    // 6: 4 Legs (cols 3, 5, 11, 13)
    [_, _, _, O, _, O, _, _, _, _, _, O, _, O, _, _, _],
    // 7: 4 Legs bottom
    [_, _, _, O, _, O, _, _, _, _, _, O, _, O, _, _, _],
  ];

  return (
    <div
      className={`pixel-monster-container ${className}`}
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: 'pointer',
        userSelect: 'none',
        transform: isWobbling ? 'scale(1.28) rotate(-6deg)' : 'scale(1)',
        transition: 'transform 0.22s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        ...style,
      }}
      title="Official Claude Code Mascot (Click me!)"
    >
      {/* Speech Bubble on click */}
      {speechBubble && (
        <div
          style={{
            position: 'absolute',
            bottom: '115%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#090a0f',
            color: '#ff9e79',
            border: '1.5px solid #ff9e79',
            padding: '5px 12px',
            borderRadius: 8,
            fontSize: 11,
            fontWeight: 800,
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 24px rgba(255, 158, 121, 0.3)',
            zIndex: 40,
            pointerEvents: 'none',
            animation: 'fadeInUp 0.2s ease-out',
            fontFamily: 'monospace',
          }}
        >
          {speechBubble}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid #090a0f',
            }}
          />
        </div>
      )}

      {/* SVG Pixel Matrix */}
      <svg
        width={size}
        height={typeof size === 'number' ? Math.round((size * 8) / 17) : undefined}
        viewBox="0 0 17 8"
        style={{
          display: 'block',
          aspectRatio: '17 / 8',
          imageRendering: 'pixelated',
          shapeRendering: 'crispEdges',
          filter: 'drop-shadow(0 2px 8px rgba(254, 60, 1, 0.35)) drop-shadow(0 0 1px rgba(0, 0, 0, 0.85))',
        }}
      >
        {pixelGrid.map((row, y) =>
          row.map((color, x) => {
            if (!color) return null;
            return <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={color} />;
          })
        )}
      </svg>
    </div>
  );
}
