import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PageTransition — Premium Horizontal Interlaced Strip Transition
 *
 * Dual-Gate Readiness Architecture:
 *   Phase 1 (Sweep In): 5 horizontal black & orange strips sweep in (0.55s) with subpixel overlap.
 *   Phase 2 (Hold & Ready Gate):
 *     - Minimum hold duration (500ms) guarantees the animation is never rushed, even on 0ms load.
 *     - Waits for destination page to signal readiness (data loaded, DOM painted, fonts ready).
 *     - If network is slow, displays subtle pulsing indicator so the user knows it's fetching.
 *     - Failsafe safety timeout (3500ms) prevents any lockup.
 *   Phase 3 (Sweep Out & Reveal): Strips sweep to opposite edges (0.55s), revealing the fully ready page.
 */

const STRIP_COUNT = 5;
const ENTER_DURATION = 0.38;
const MIN_HOLD_DURATION = 200; // ms: snappy & responsive, eliminates sluggish wait
const EXIT_DURATION = 0.38;
const STAGGER = 0.026;
const SAFETY_TIMEOUT = 2400; // ms: failsafe for slow network

const STRIP_COLORS = [
  '#0d1117',
  '#fe3c01',
  '#0d1117',
  '#fe3c01',
  '#0d1117',
];

const TARGET_LABELS = {
  main: 'home // engineering logic & craft',
  work: 'work // selected projects & systems',
  blog: 'blog // chạng vạng • notes',
  about: 'about // technical artisan & philosophy',
  lab: 'lab // creative digital experiments',
};

const EASING = [0.22, 1, 0.36, 1]; // Smooth out-cubic fast-in-slow-out physics

export default function PageTransition({
  isActive,
  targetView = 'main',
  isTargetReady = true,
  onMidpoint,
  onComplete,
}) {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'entering' | 'holding' | 'exiting'
  const [minHoldDone, setMinHoldDone] = useState(false);
  const [showSlowLoader, setShowSlowLoader] = useState(false);
  const hasTriggeredExit = useRef(false);

  // Stop Lenis during transition to avoid scroll jumps
  useEffect(() => {
    if (isActive && phase !== 'idle') {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.stop();
      }
    } else {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
    }
  }, [isActive, phase]);

  // When transition becomes active, start entering sweep
  useEffect(() => {
    if (isActive && phase === 'idle') {
      setPhase('entering');
      setMinHoldDone(false);
      setShowSlowLoader(false);
      hasTriggeredExit.current = false;
    }
  }, [isActive, phase]);

  // When hold begins, initiate timers
  useEffect(() => {
    if (phase !== 'holding') return;

    // 1. Minimum hold timer (guarantees animation completeness)
    const minTimer = setTimeout(() => {
      setMinHoldDone(true);
    }, MIN_HOLD_DURATION);

    // 2. Slow network indicator timer (shows if network holds > 650ms)
    const slowTimer = setTimeout(() => {
      setShowSlowLoader(true);
    }, 650);

    // 3. Failsafe safety timeout
    const safetyTimer = setTimeout(() => {
      if (!hasTriggeredExit.current) {
        hasTriggeredExit.current = true;
        setPhase('exiting');
      }
    }, SAFETY_TIMEOUT);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(slowTimer);
      clearTimeout(safetyTimer);
    };
  }, [phase]);

  // Dual-Condition Gate: Check both Minimum Hold AND Target Page Readiness
  useEffect(() => {
    if (phase === 'holding' && minHoldDone && isTargetReady && !hasTriggeredExit.current) {
      hasTriggeredExit.current = true;
      setPhase('exiting');
    }
  }, [phase, minHoldDone, isTargetReady]);

  // Callback when enter sweep finishes
  const handleEnterComplete = useCallback(() => {
    setPhase('holding');
    if (onMidpoint) onMidpoint();
  }, [onMidpoint]);

  // Callback when exit sweep finishes
  const handleExitComplete = useCallback(() => {
    hasTriggeredExit.current = false;
    setMinHoldDone(false);
    setPhase('idle');
    if (onComplete) onComplete();
  }, [onComplete]);

  if (!isActive && phase === 'idle') return null;

  const targetLabel = TARGET_LABELS[targetView] || 'portfolio // digital craft';

  return (
    <AnimatePresence>
      {(phase === 'entering' || phase === 'holding' || phase === 'exiting') && (
        <div
          key="page-transition-overlay"
          data-page-transition="overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            pointerEvents: 'all',
            overflow: 'hidden',
          }}
          aria-hidden={phase === 'idle'}
        >
          {/* ─── 5 Horizontal Alternating Black & Orange Strips with Subpixel Overlap ─── */}
          {Array.from({ length: STRIP_COUNT }).map((_, i) => {
            const fromRight = i % 2 === 1;
            // Overlap by 2px to eliminate subpixel hairline gaps on Retina displays
            const stripHeight = `calc(${100 / STRIP_COUNT}% + 2px)`;
            const enterDelay = i * STAGGER;
            const exitDelay = (STRIP_COUNT - 1 - i) * (STAGGER * 0.75);

            const enterInitialX = fromRight ? '101%' : '-101%';
            const exitTargetX = fromRight ? '-103%' : '103%';

            return (
              <motion.div
                key={`strip-${i}`}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: `${(100 / STRIP_COUNT) * i}%`,
                  height: stripHeight,
                  background: STRIP_COLORS[i],
                  willChange: 'transform',
                }}
                initial={{ x: enterInitialX }}
                animate={
                  phase === 'exiting'
                    ? {
                        x: exitTargetX,
                        transition: {
                          duration: EXIT_DURATION,
                          delay: exitDelay,
                          ease: EASING,
                        },
                      }
                    : {
                        x: '0%',
                        transition: {
                          duration: ENTER_DURATION,
                          delay: enterDelay,
                          ease: EASING,
                        },
                      }
                }
                onAnimationComplete={() => {
                  // Only fire midpoint when the last strip finishes entering
                  if (phase === 'entering' && i === STRIP_COUNT - 1) {
                    handleEnterComplete();
                  }
                  // Only fire complete when the first strip finishes exiting
                  if (phase === 'exiting' && i === 0) {
                    handleExitComplete();
                  }
                }}
              />
            );
          })}

          {/* ─── Center Logo & Brand Identity (Visible during Hold & Reveal) ─── */}
          <AnimatePresence>
            {(phase === 'holding' || phase === 'exiting') && (
              <motion.div
                key="center-identity"
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={
                  phase === 'exiting'
                    ? {
                        opacity: 0,
                        scale: 1.25,
                        filter: 'blur(8px)',
                        transition: { duration: 0.28, ease: EASING },
                      }
                    : {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                      }
                }
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 20,
                  pointerEvents: 'none',
                }}
              >
                {/* dl* Brand Logo */}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'flex-start',
                    fontFamily: 'var(--font-outfit)',
                    fontSize: 'clamp(56px, 12vw, 104px)',
                    fontWeight: 900,
                    letterSpacing: '-0.04em',
                    color: '#ffffff',
                    lineHeight: 1,
                    userSelect: 'none',
                    textShadow: '0 10px 40px rgba(0, 0, 0, 0.7)',
                  }}
                >
                  dl
                  <motion.span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '0.42em',
                      height: '0.42em',
                      marginTop: '0.04em',
                      marginLeft: '0.02em',
                      flexShrink: 0,
                      transformOrigin: 'center center',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.4,
                      ease: 'linear',
                    }}
                  >
                    <svg
                      viewBox="0 0 100 100"
                      width="100%"
                      height="100%"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g stroke="#fe3c01" strokeWidth="18" strokeLinecap="round">
                        <line x1="50" y1="14" x2="50" y2="86" />
                        <line x1="18.8" y1="32" x2="81.2" y2="68" />
                        <line x1="18.8" y1="68" x2="81.2" y2="32" />
                      </g>
                    </svg>
                  </motion.span>
                </span>

                {/* Subtitle destination badge */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 0.85, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.3 }}
                  style={{
                    marginTop: 18,
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: 'clamp(11px, 2.2vw, 13px)',
                    fontWeight: 500,
                    color: 'rgba(255, 255, 255, 0.8)',
                    letterSpacing: '0.12em',
                    textTransform: 'lowercase',
                    background: 'rgba(255, 255, 255, 0.08)',
                    padding: '6px 16px',
                    borderRadius: 100,
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                  }}
                >
                  {targetLabel}
                </motion.div>

                {/* Slow Network Indicator: gentle pulsing dots when hold exceeds 650ms */}
                {showSlowLoader && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      marginTop: 14,
                    }}
                  >
                    {[0, 1, 2].map((dotIdx) => (
                      <motion.span
                        key={dotIdx}
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          background: '#fe3c01',
                        }}
                        animate={{
                          opacity: [0.3, 1, 0.3],
                          scale: [0.85, 1.25, 0.85],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          delay: dotIdx * 0.2,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
