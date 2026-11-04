import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * ScrollAnimation
 *
 * Directional Re-armable Scroll Reveal Animation.
 *
 * Features:
 * 1. High-fidelity entrance animation: Smooth slide (44px) + cinematic ease [0.16, 1, 0.3, 1] over 0.85s.
 * 2. Visual in-view trigger: Activates only once inside the visible screen (-40px), ensuring the user actually sees the motion.
 * 3. Directional Re-arm:
 *    - When scrolling DOWN into the section: Always triggers the entrance animation.
 *    - When scrolling DOWN past the section (exits through top): Stays visible (no disappearing, no flicker, no layout reflow).
 *    - When scrolling UP past the section (exits through bottom): Re-arms off-screen so scrolling down triggers it again.
 * 4. Zero-jank GPU compositing: Only animates transform and opacity on compositor layer.
 */
export function ScrollAnimation({
  children,
  direction = 'up',
  distance = 44,
  delay = 0,
  duration = 0.85,
  ease = [0.16, 1, 0.3, 1],
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  className = '',
  style = {},
  viewport,
  transition,
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respect reduced motion settings
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsVisible(true);
      return;
    }

    // Determine effective rootMargin & threshold (sanitize legacy positive off-screen margins)
    let effectiveMargin = rootMargin;
    if (viewport?.margin) {
      if (
        viewport.margin.includes('120px') ||
        viewport.margin.includes('140px') ||
        viewport.margin.includes('160px')
      ) {
        effectiveMargin = '0px 0px -40px 0px';
      } else {
        effectiveMargin = viewport.margin;
      }
    }
    const effectiveThreshold = viewport?.amount ?? threshold;

    // Check initial position on mount: If element is already above or within the initial screen view
    const initialRect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (initialRect.top < windowHeight - 40 && initialRect.bottom > 0) {
      setIsVisible(true);
    } else if (initialRect.bottom <= 0) {
      // Element is already above the screen on initial load/reload
      setIsVisible(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Element entered visible viewport -> Trigger entrance animation!
          setIsVisible(true);
        } else {
          // Element left viewport -> Check exit direction
          const rootBottom = entry.rootBounds ? entry.rootBounds.bottom : window.innerHeight;
          // If the element exited through the BOTTOM of the viewport (user scrolled UP past it)
          if (entry.boundingClientRect.top >= rootBottom - 50) {
            // Re-arm off-screen so scrolling down will animate it again!
            setIsVisible(false);
          }
          // If the element exited through the TOP of the viewport (user scrolled DOWN past it):
          // We DO NOT reset isVisible! It stays visible, preventing jitter, layout shifts, or disappearing.
        }
      },
      {
        rootMargin: effectiveMargin,
        threshold: effectiveThreshold,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, threshold, viewport]);

  const getInitial = () => {
    const dist = distance || 44;
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -Math.min(dist, 38), y: 0 };
      case 'right':
        return { opacity: 0, x: Math.min(dist, 38), y: 0 };
      case 'down':
        return { opacity: 0, x: 0, y: -dist };
      case 'up':
      default:
        return { opacity: 0, x: 0, y: dist };
    }
  };

  const getAnimate = () => {
    return { opacity: 1, x: 0, y: 0 };
  };

  const activeTransition = transition || {
    duration,
    delay,
    ease,
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={isVisible ? getAnimate() : getInitial()}
      transition={activeTransition}
      className={className}
      style={{
        willChange: 'transform, opacity',
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default ScrollAnimation;
