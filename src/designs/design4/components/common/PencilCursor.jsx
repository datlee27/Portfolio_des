import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * PencilCursor — Inspired by Framer Pencil Cursor
 * Source asset: https://framer.com/m/Pencil-cursor-EjfVa5.js@B0KTQaHvKs1RQLwCq6Zv
 *
 * Features:
 * - Subpixel-accurate hotspot locked directly at the pencil tip (x: 2px, y: 39px).
 * - Instantaneous 0ms mouse tracking with spring-damped tilt, scale, and pressure physics.
 * - Gentle tactile tilt & lift when hovering over clickable elements (links, buttons, anchors).
 * - Satisfying pencil pressure bounce on click/pointer-down.
 * - Subtle graphite contact ring on paper click.
 * - Automatic seamless handover to native cursor when entering iframes (AI Chatbox / PDF viewer).
 * - Automatically disabled on touch / mobile devices.
 */
export default function PencilCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOverIframe, setIsOverIframe] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState([]);

  // Direct mouse coordinates for 0-latency tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for tilt, scale, and angle dynamics (recreates Framer spring physics)
  const springRotate = useSpring(0, { damping: 24, stiffness: 360, mass: 0.2 });
  const springScale = useSpring(1, { damping: 20, stiffness: 420, mass: 0.15 });

  // Sizing & hotspot constants:
  // Image is 512x512. At 42px rendered size:
  // tip is at x = 42 * (23.5 / 512) = ~1.93px
  // tip is at y = 42 * (476 / 512) = ~39.05px
  const CURSOR_SIZE = 42;
  const TIP_OFFSET_X = 2;
  const TIP_OFFSET_Y = 39;

  useEffect(() => {
    // Only enable on desktop pointer devices
    const checkPointer = () => {
      const isFine =
        typeof window !== 'undefined' &&
        window.matchMedia('(pointer: fine)').matches &&
        !('ontouchstart' in window);
      setIsEnabled(isFine);
    };

    checkPointer();
    const mql = window.matchMedia('(pointer: fine)');
    mql.addEventListener('change', checkPointer);
    return () => mql.removeEventListener('change', checkPointer);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    // Add CSS class to hide default cursor across all elements
    document.documentElement.classList.add('pencil-cursor-active');

    const handlePointerMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if mouse is entering or within an iframe boundary (e.g. Chatbase AI window, PDF viewer)
      const iframes = document.querySelectorAll('iframe, #chatbase-bubble-window');
      let insideIframe = false;
      for (const el of iframes) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          if (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
          ) {
            insideIframe = true;
            break;
          }
        }
      }

      if (insideIframe) {
        setIsOverIframe(true);
        return;
      } else {
        setIsOverIframe(false);
      }

      if (!isVisible) {
        setIsVisible(true);
      }

      // Check if hovering clickable or interactive elements
      const target = e.target;
      if (target && target instanceof Element) {
        const isClickable = Boolean(
          target.closest('a, button, [role="button"], input, textarea, select, .des4-corner-anchor, [data-cursor-pointer]') ||
          window.getComputedStyle(target).cursor === 'pointer'
        );
        setIsHovering(isClickable);
      }
    };

    const handlePointerDown = (e) => {
      // Don't spawn ripples or lock click if clicking an iframe
      const iframes = document.querySelectorAll('iframe, #chatbase-bubble-window');
      for (const el of iframes) {
        const rect = el.getBoundingClientRect();
        if (
          rect.width > 0 && rect.height > 0 &&
          e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom
        ) {
          setIsOverIframe(true);
          return;
        }
      }

      setIsClicking(true);
      // Spawn a subtle graphite contact dot at the click point
      const id = Date.now() + Math.random();
      setRipples((prev) => [
        ...prev.slice(-4), // keep maximum 5 active ripples
        { id, x: e.clientX, y: e.clientY },
      ]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 400);
    };

    const handlePointerUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // When clicking into an iframe, window loses focus -> smoothly hide custom cursor
    const handleBlur = () => {
      setIsOverIframe(true);
    };

    const handleFocus = () => {
      setIsOverIframe(false);
    };

    // Attach boundary listeners to iframes dynamically as they mount
    const attachIframeBoundary = () => {
      const iframes = document.querySelectorAll('iframe, #chatbase-bubble-window');
      iframes.forEach((el) => {
        if (!el.__pencilListenerAdded) {
          el.__pencilListenerAdded = true;
          el.addEventListener('mouseenter', () => setIsOverIframe(true));
          el.addEventListener('mouseleave', () => setIsOverIframe(false));
        }
      });
    };
    attachIframeBoundary();
    const iframeCheckTimer = setInterval(attachIframeBoundary, 800);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      clearInterval(iframeCheckTimer);
      document.documentElement.classList.remove('pencil-cursor-active');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isEnabled, isVisible, mouseX, mouseY]);

  // Adjust physics springs based on hover & click states
  useEffect(() => {
    if (isClicking) {
      springRotate.set(12); // Presses into paper
      springScale.set(0.92); // Compression under physical pressure
    } else if (isHovering) {
      springRotate.set(-8); // Tilts slightly forward as if ready to write
      springScale.set(1.12); // Slightly lifts up
    } else {
      springRotate.set(0); // Rest position (natural 45-degree angle)
      springScale.set(1);
    }
  }, [isHovering, isClicking, springRotate, springScale]);

  if (!isEnabled) {
    return null;
  }

  const showCursor = isVisible && !isOverIframe;

  return (
    <>
      {/* Global CSS to hide system cursor when pencil is active, but explicitly preserve it inside iframes */}
      <style>{`
        @media (pointer: fine) {
          html.pencil-cursor-active,
          html.pencil-cursor-active *:not(iframe):not(#chatbase-bubble-window):not(#chatbase-bubble-window *),
          html.pencil-cursor-active body,
          html.pencil-cursor-active a,
          html.pencil-cursor-active button {
            cursor: none !important;
          }

          /* Ensure iframes and AI chat window have native system cursor */
          iframe,
          #chatbase-bubble-window,
          #chatbase-bubble-window * {
            cursor: auto !important;
          }
        }

        @keyframes pencilRippleFade {
          0% {
            opacity: 0.6;
            transform: scale(0.6);
          }
          100% {
            opacity: 0;
            transform: scale(2.2);
          }
        }
      `}</style>

      {/* Graphite Contact Dots on Click */}
      {showCursor && ripples.map((r) => (
        <span
          key={r.id}
          style={{
            position: 'fixed',
            left: r.x - 4,
            top: r.y - 4,
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#111111',
            pointerEvents: 'none',
            zIndex: 999998,
            animation: 'pencilRippleFade 0.38s ease-out forwards',
          }}
        />
      ))}

      {/* The Pencil Follower */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: mouseX,
          y: mouseY,
          pointerEvents: 'none',
          zIndex: 9999999, // Above everything
          opacity: showCursor ? 1 : 0,
          transition: 'opacity 0.15s ease-out',
          willChange: 'transform',
        }}
      >
        <motion.div
          style={{
            position: 'relative',
            width: CURSOR_SIZE,
            height: CURSOR_SIZE,
            // Offset so the pencil tip (x: 2px, y: 39px) matches (0, 0) of the parent
            marginLeft: -TIP_OFFSET_X,
            marginTop: -TIP_OFFSET_Y,
            // Rotate and scale strictly pivoted at the pencil tip!
            transformOrigin: `${TIP_OFFSET_X}px ${TIP_OFFSET_Y}px`,
            rotate: springRotate,
            scale: springScale,
          }}
        >
          <img
            src="/pencil-cursor.png"
            alt="Pencil Cursor"
            width={CURSOR_SIZE}
            height={CURSOR_SIZE}
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              pointerEvents: 'none',
              userSelect: 'none',
              filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.16))',
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
