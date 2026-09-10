import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PageTransition — Horizontal Interlaced Black & Orange Strip Transition
 *
 * Flow:
 *   1. IN (Entering): 5 horizontal strips sweep across the screen from alternating sides:
 *      - Strip 0 (Black): from Left
 *      - Strip 1 (Orange): from Right
 *      - Strip 2 (Black): from Left
 *      - Strip 3 (Orange): from Right
 *      - Strip 4 (Black): from Left
 *   2. HOLD:
 *      - Midpoint callback fires → swaps active view behind the strips & resets scroll position to top.
 *      - Center emblem `dl*` appears with subtle scale and the target page name.
 *   3. OUT (Exiting):
 *      - Emblem dissolves and strips sweep out to the opposite edges, revealing the loaded page.
 */

const STRIP_COUNT = 5;
const ENTER_DURATION = 0.5;
const HOLD_DURATION = 0.38;
const EXIT_DURATION = 0.52;
const STAGGER = 0.045;

const stripColors = [
  '#0d1117',
  '#fe3c01',
  '#0d1117',
  '#fe3c01',
  '#0d1117',
];

const VIEW_LABELS = {
  main: 'PORTFOLIO OVERVIEW',
  work: 'SELECTED WORKS',
  blog: 'THREADS & ESSAYS',
  lab: 'EXPERIMENTS LAB',
};

export default function PageTransition({
  isActive,
  targetView = 'main',
  onMidpoint,
  onComplete,
}) {
  const [phase, setPhase] = useState('idle'); // idle | entering | holding | exiting

  useEffect(() => {
    if (isActive && phase === 'idle') {
      setPhase('entering');
    }
  }, [isActive, phase]);

  // Phase transition callbacks
  const handleEnterComplete = useCallback(() => {
    setPhase('holding');

    // Fire midpoint: Parent updates state & resets scroll while veil is 100% covered
    if (onMidpoint) onMidpoint();

    // After brief hold, begin exit sweep
    setTimeout(() => {
      setPhase('exiting');
    }, HOLD_DURATION * 1000);
  }, [onMidpoint]);

  const handleExitComplete = useCallback(() => {
    setPhase('idle');
    if (onComplete) onComplete();
  }, [onComplete]);

  if (!isActive && phase === 'idle') return null;

  const targetLabel = VIEW_LABELS[targetView] || targetView?.toUpperCase() || 'DAT LE STUDIO';

  return (
    <AnimatePresence>
      {(phase === 'entering' || phase === 'holding' || phase === 'exiting') && (
        <div
          key="page-transition-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            pointerEvents: 'all',
            overflow: 'hidden',
          }}
          aria-hidden={phase === 'idle'}
        >
          {/* ─── 5 Horizontal Alternating Black & Orange Strips ─── */}
          {Array.from({ length: STRIP_COUNT }).map((_, i) => {
            const fromRight = i % 2 === 1;
            const stripHeight = `${100 / STRIP_COUNT}%`;
            const enterDelay = i * STAGGER;
            const exitDelay = (STRIP_COUNT - 1 - i) * (STAGGER * 0.8);

            const enterInitialX = fromRight ? '100%' : '-100%';
            const exitTargetX = fromRight ? '-105%' : '105%';

            return (
              <motion.div
                key={`strip-${i}`}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: `${(100 / STRIP_COUNT) * i}%`,
                  height: stripHeight,
                  background: stripColors[i],
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
                          ease: [0.76, 0, 0.24, 1],
                        },
                      }
                    : {
                        x: '0%',
                        transition: {
                          duration: ENTER_DURATION,
                          delay: enterDelay,
                          ease: [0.76, 0, 0.24, 1],
                        },
                      }
                }
                onAnimationComplete={() => {
                  // Only fire midpoint when the last strip finishes entering
                  if (phase === 'entering' && i === STRIP_COUNT - 1) {
                    handleEnterComplete();
                  }
                  // Only fire complete when the last strip finishes exiting
                  if (phase === 'exiting' && i === 0) {
                    handleExitComplete();
                  }
                }}
              />
            );
          })}

          {/* ─── Center Logo & Target Label (Visible during Hold) ─── */}
          <AnimatePresence>
            {(phase === 'holding' || phase === 'exiting') && (
              <motion.div
                key="center-logo"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  phase === 'exiting'
                    ? {
                        opacity: 0,
                        scale: 1.4,
                        filter: 'blur(10px)',
                        transition: { duration: 0.25, ease: [0.76, 0, 0.24, 1] },
                      }
                    : {
                        opacity: 1,
                        scale: 1,
                        filter: 'blur(0px)',
                        transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
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
                    fontFamily: 'var(--font-outfit)',
                    fontSize: 'clamp(54px, 12vw, 100px)',
                    fontWeight: 900,
                    letterSpacing: '-0.04em',
                    color: '#ffffff',
                    lineHeight: 1,
                    userSelect: 'none',
                    textShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
                  }}
                >
                  dl<span style={{ color: '#fe3c01' }}>*</span>
                </span>

                {/* Target page label */}
                {targetLabel && (
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.08, duration: 0.2 },
                    }}
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: 'clamp(11px, 2.5vw, 14px)',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(255, 255, 255, 0.8)',
                      marginTop: 14,
                      textAlign: 'center',
                      padding: '0 16px',
                      maxWidth: '90vw',
                      textShadow: '0 4px 16px rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    {targetLabel}
                  </motion.span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
