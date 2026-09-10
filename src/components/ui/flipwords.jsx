'use client';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const FlipWords = ({
  words,
  duration = 2600,
  className = '',
  colors,
  style = {},
}) => {
  const [index, setIndex] = useState(0);

  // Unstoppable, continuous infinite loop
  useEffect(() => {
    if (!words || words.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  const currentWord = words[index] || words[0] || '';
  const activeColor = colors ? colors[index] : undefined;

  return (
    <span
      className="inline-block relative"
      style={{
        verticalAlign: 'baseline',
        position: 'relative',
        display: 'inline-block',
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 15,
            mass: 0.8,
          }}
          exit={{
            opacity: 0,
            y: -25,
            x: 20,
            filter: 'blur(8px)',
            scale: 1.3,
            position: 'absolute',
            top: 0,
            left: 0,
            transition: {
              type: 'spring',
              stiffness: 200,
              damping: 20,
              duration: 0.35,
            },
          }}
          className={cn(
            'z-10 inline-block relative text-left px-1',
            className
          )}
          style={{
            ...style,
            color: activeColor || style.color,
            transition: 'color 0.3s ease',
          }}
          key={currentWord}
        >
          {currentWord.split(' ').map((word, wordIndex) => (
            <motion.span
              key={word + wordIndex}
              initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                delay: wordIndex * 0.2,
                duration: 0.35,
                type: 'spring',
                stiffness: 120,
                damping: 12,
              }}
              className="inline-block whitespace-nowrap"
            >
              {word.split('').map((letter, letterIndex) => (
                <motion.span
                  key={word + letterIndex}
                  initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    delay: wordIndex * 0.2 + letterIndex * 0.04,
                    duration: 0.28,
                    type: 'spring',
                    stiffness: 140,
                    damping: 14,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              <span className="inline-block">&nbsp;</span>
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default FlipWords;
