import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * ScrollEase - Premium Smooth Inertia Glide (Powered by Lenis Engine)
 *
 * Implements buttery smooth momentum scrolling, exponential decay gliding,
 * and zero-stutter frame rate independence across all displays (60Hz/120Hz/144Hz).
 *
 * Honors the Framer ScrollEase API while resolving discrete wheel jitter.
 */
export default function ScrollEase({
  duration = 1.2,
  intensity = 75,
  wheelMultiplier = 1.15,
}) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
    if (prefersReducedMotion) return;

    // Scale duration based on intensity:
    // intensity 70-80 -> duration ~1.2s - 1.4s for luxurious gliding feel
    const computedDuration = duration * (0.6 + (intensity / 100) * 0.8);

    const lenis = new Lenis({
      duration: computedDuration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential gliding curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: wheelMultiplier,
      touchMultiplier: 1.5,
      autoResize: true,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    let rafId = 0;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Disable CSS scroll-behavior: smooth to prevent micro-lag conflicts
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      window.lenis = null;
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    };
  }, [duration, intensity, wheelMultiplier]);

  return null;
}
