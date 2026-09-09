import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Original heart SVG path from BlogIcons
const HEART_PATH =
  'M12 21s-7.5-4.9-10-9.5C.3 7.8 2 4 6 4c2.2 0 3.7 1.3 6 3.8C14.3 5.3 15.8 4 18 4c4 0 5.7 3.8 4 7.5-2.5 4.6-10 9.5-10 9.5z';

const MAX_POOL = 18;
const GRAVITY = -45; // Gentle upward drift in screen coordinates

function createDotPool() {
  const pool = [];
  for (let i = 0; i < MAX_POOL; i++) {
    pool.push({
      id: i,
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      opacity: 0,
      size: 0,
      life: 0,
      maxLife: 0,
    });
  }
  return pool;
}

function activateDots(pool, count, centerX, centerY, speedMultiplier, lifetimeMs) {
  let activated = 0;
  for (let i = 0; i < pool.length && activated < count; i++) {
    if (!pool[i].active) {
      const baseAngle = (Math.PI * 2 * activated) / count;
      const angle = baseAngle + (Math.random() - 0.5) * 0.9;
      const speed = (80 + Math.random() * 140) * speedMultiplier;
      pool[i].active = true;
      pool[i].x = centerX;
      pool[i].y = centerY;
      pool[i].vx = Math.cos(angle) * speed;
      pool[i].vy = Math.sin(angle) * speed - 50; // upward propulsion
      pool[i].opacity = 1;
      pool[i].size = 11 + Math.random() * 5;
      pool[i].life = 0;
      pool[i].maxLife = (lifetimeMs / 1000) * (0.8 + Math.random() * 0.4);
      activated++;
    }
  }
}

// Particle layer rendered via requestAnimationFrame
function IconParticleLayer({ poolRef, running, particleSvg }) {
  const containerRef = useRef(null);
  const nodesRef = useRef([]);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = '';
    nodesRef.current = [];

    const encodedSvg = `data:image/svg+xml,${encodeURIComponent(particleSvg)}`;

    for (let i = 0; i < MAX_POOL; i++) {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = `
        position: absolute;
        pointer-events: none;
        will-change: transform, opacity;
        backface-visibility: hidden;
        opacity: 0;
        left: 0;
        top: 0;
        width: 13px;
        height: 13px;
        background-image: url('${encodedSvg}');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      `;
      container.appendChild(wrapper);
      nodesRef.current.push(wrapper);
    }
  }, [particleSvg]);

  useEffect(() => {
    if (!running) return;

    const tick = (time) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;
      const pool = poolRef.current;
      let anyStillActive = false;

      for (let i = 0; i < pool.length; i++) {
        const p = pool[i];
        const node = nodesRef.current[i];
        if (!node) continue;

        if (!p.active) {
          if (node.style.opacity !== '0') node.style.opacity = '0';
          continue;
        }

        anyStillActive = true;
        p.life += dt;

        if (p.life >= p.maxLife) {
          p.active = false;
          node.style.opacity = '0';
          continue;
        }

        p.vy += GRAVITY * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const progress = p.life / p.maxLife;
        p.opacity = Math.max(0, 1 - progress * progress * progress);
        const s = p.size;
        const scale = Math.max(0.2, 1 - progress * 0.4);

        node.style.width = `${s}px`;
        node.style.height = `${s}px`;
        node.style.transform = `translate3d(${p.x - s / 2}px, ${p.y - s / 2}px, 0) scale(${scale})`;
        node.style.opacity = String(p.opacity);
      }

      if (anyStillActive) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    lastTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [running, poolRef]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'visible',
        zIndex: 10,
      }}
    />
  );
}

// Bouncing counter component
function BounceCounter({ count, color, fontSize = 13 }) {
  const controls = useAnimation();
  const prevCount = useRef(count);

  useEffect(() => {
    if (count !== prevCount.current) {
      prevCount.current = count;
      controls.start({
        scale: [1, 1.3, 1],
        transition: { duration: 0.25, ease: 'easeOut' },
      });
    }
  }, [count, controls]);

  return (
    <motion.span
      animate={controls}
      style={{
        display: 'inline-block',
        fontVariantNumeric: 'tabular-nums',
        color,
        fontSize,
        letterSpacing: '0.02em',
        userSelect: 'none',
        transition: 'color 0.2s ease',
      }}
    >
      {count}
    </motion.span>
  );
}

/**
 * BlogEmojiLikeButton
 * Minimalist design without outer circles or background discs.
 * Pure heart icon matching original theme colors (theme.accent when liked, theme.muted when unliked).
 * Features particle burst on click from Framer Emoji-Buttons, spring bounce, and count animation.
 */
export default function BlogEmojiLikeButton({
  isLiked = false,
  likeCount = 0,
  onToggleLike,
  theme,
  size = 'default', // 'default' (17px in drawer) | 'compact' (13px in card)
  showLabel = true,
  asDiv = false,
}) {
  const isCompact = size === 'compact';
  const iconSize = isCompact ? 13 : 17;

  const [isHovered, setIsHovered] = useState(false);
  const [particlesRunning, setParticlesRunning] = useState(false);
  const poolRef = useRef(createDotPool());
  const iconControls = useAnimation();

  const accentColor = theme?.accent || '#A8650F';
  const mutedColor = theme?.muted || '#5B6478';
  const currentColor = isLiked ? accentColor : isHovered ? accentColor : mutedColor;

  // SVG for floating heart particles in theme accent color
  const particleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${HEART_PATH}" fill="${accentColor}"/></svg>`;

  const handleClick = useCallback(
    (e) => {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }

      const willBeLiked = !isLiked;

      if (willBeLiked) {
        // Trigger Framer particle burst
        const count = isCompact ? 8 : 14;
        activateDots(poolRef.current, count, iconSize / 2, iconSize / 2, 1, 800);
        setParticlesRunning(true);

        // Spring bounce on heart icon
        iconControls.start({
          scale: [0.75, 1.35, 0.9, 1.08, 1],
          transition: {
            duration: 0.42,
            times: [0, 0.3, 0.6, 0.8, 1],
            type: 'spring',
            stiffness: 350,
            damping: 15,
          },
        });

        // Haptic feedback
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(20);
        }

        setTimeout(() => {
          const anyActive = poolRef.current.some((p) => p.active);
          if (!anyActive) setParticlesRunning(false);
        }, 1000);
      } else {
        // Shrink bounce on unliking
        iconControls.start({
          scale: [0.85, 1.05, 1],
          transition: { duration: 0.22, ease: 'easeOut' },
        });
      }

      if (onToggleLike) onToggleLike();
    },
    [isLiked, iconSize, isCompact, iconControls, onToggleLike]
  );

  const BtnComponent = asDiv ? motion.div : motion.button;

  return (
    <BtnComponent
      className={`blog-emoji-like-wrap ${isCompact ? 'compact' : ''}`}
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      role={asDiv ? 'button' : undefined}
      tabIndex={asDiv ? 0 : undefined}
      aria-label={isLiked ? 'Bỏ thích bài viết' : 'Thích bài viết'}
      aria-pressed={isLiked}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isCompact ? '4px' : '7px',
        background: 'transparent',
        border: 'none',
        padding: 0,
        margin: 0,
        outline: 'none',
        cursor: 'pointer',
        position: 'relative',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* Heart Icon Wrapper with particles */}
      <div
        style={{
          position: 'relative',
          width: iconSize,
          height: iconSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Particle layer floating out from the heart */}
        <IconParticleLayer
          poolRef={poolRef}
          running={particlesRunning}
          particleSvg={particleSvg}
        />

        {/* Bouncing Heart Icon */}
        <motion.span
          animate={iconControls}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: currentColor,
            transition: 'color 0.2s ease',
          }}
        >
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            fill={isLiked ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: 'block' }}
          >
            <path d={HEART_PATH} />
          </svg>
        </motion.span>
      </div>

      {/* Like Count */}
      {showLabel && (
        <BounceCounter
          count={likeCount}
          color={currentColor}
          fontSize={isCompact ? 12 : 13}
        />
      )}
    </BtnComponent>
  );
}
