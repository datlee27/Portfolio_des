import React, { useRef, useEffect } from 'react';

/**
 * ScrollBaseAnimation / ScrollTextMarquee
 * Smooth, elegant infinite marquee text that scrolls gently horizontally
 * and reacts subtly to scroll speed without being too fast.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to marquee
 * @param {number} [props.baseVelocity=-0.8] - Base speed (negative = left, positive = right)
 * @param {number} [props.delay=0] - Delay before starting in ms
 * @param {string} [props.clasname=''] - Additional CSS classes
 * @param {Object} [props.style={}] - Inline styles
 */
export default function ScrollBaseAnimation({
  children,
  baseVelocity = -0.8,
  delay = 0,
  clasname = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const xRef = useRef(0);
  const prevScrollY = useRef(0);
  const scrollVelocity = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationFrameId;
    let lastTime = performance.now();

    // Subtle scroll listener for velocity
    const handleScroll = () => {
      const currentScrollY = window.scrollY || window.pageYOffset;
      const delta = currentScrollY - prevScrollY.current;
      prevScrollY.current = currentScrollY;
      // Gentle boost on scroll
      scrollVelocity.current = Math.max(-3, Math.min(3, delta * 0.04));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    prevScrollY.current = window.scrollY || window.pageYOffset;

    const loop = (currentTime) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Smooth decay of extra scroll speed
      scrollVelocity.current *= 0.94;

      // Gentle movement (slow and readable)
      const currentSpeed = baseVelocity + scrollVelocity.current;

      // Update X position smoothly
      xRef.current += currentSpeed * delta * 12;

      // Seamless wrap at -50% and 0%
      if (xRef.current <= -50) {
        xRef.current += 50;
      } else if (xRef.current >= 0) {
        xRef.current -= 50;
      }

      if (track) {
        track.style.transform = `translate3d(${xRef.current}%, 0, 0)`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    const timer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(loop);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [baseVelocity, delay]);

  return (
    <div
      ref={containerRef}
      className={clasname}
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%',
        display: 'flex',
        userSelect: 'none',
        ...style,
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'inline-flex',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
        {/* Repeating text items for seamless looping */}
        <span style={{ display: 'inline-flex', paddingRight: '2rem' }}>{children}</span>
        <span style={{ display: 'inline-flex', paddingRight: '2rem' }}>{children}</span>
        <span style={{ display: 'inline-flex', paddingRight: '2rem' }}>{children}</span>
        <span style={{ display: 'inline-flex', paddingRight: '2rem' }}>{children}</span>
      </div>
    </div>
  );
}
