import React from 'react';
import { motion } from 'framer-motion';

/**
 * ScrollAnimation
 *
 * Directional scroll reveal animation wrapper powered by Framer Motion.
 * Supports direction: 'left' | 'right' | 'up' | 'down'
 * Supports viewport triggers and custom transitions.
 */
export function ScrollAnimation({
  children,
  direction = 'up',
  viewport = { amount: 0.35, margin: '0px 0px -50px 0px' },
  transition = { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  className = '',
  style = {},
  ...props
}) {
  const getInitial = () => {
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -80 };
      case 'right':
        return { opacity: 0, x: 80 };
      case 'down':
        return { opacity: 0, y: -60 };
      case 'up':
      default:
        return { opacity: 0, y: 60 };
    }
  };

  const getAnimate = () => {
    return { opacity: 1, x: 0, y: 0 };
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: false, ...viewport }}
      transition={transition}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default ScrollAnimation;
