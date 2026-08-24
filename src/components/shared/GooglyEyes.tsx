import React, { useState, useEffect, useRef } from 'react';
import styles from './GooglyEyes.module.css';

export interface GooglyEyesProps {
  className?: string;
  size?: number;
}

export const GooglyEyes: React.FC<GooglyEyesProps> = ({
  className = '',
  size = 28,
}) => {
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - eyeCenterX;
      const dy = e.clientY - eyeCenterY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(Math.hypot(dx, dy) / 15, 6); // Max pupil displacement: 6px

      setPupilPos({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const eyeStyle = { width: `${size}px`, height: `${size}px` };
  const pupilStyle = {
    width: `${size * 0.42}px`,
    height: `${size * 0.42}px`,
    transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)`,
  };

  return (
    <div ref={containerRef} className={`${styles.eyesContainer} ${className}`}>
      <div className={styles.eye} style={eyeStyle}>
        <div className={styles.pupil} style={pupilStyle}>
          <div className={styles.pupilHighlight} />
        </div>
      </div>
      <div className={styles.eye} style={eyeStyle}>
        <div className={styles.pupil} style={pupilStyle}>
          <div className={styles.pupilHighlight} />
        </div>
      </div>
    </div>
  );
};

export default GooglyEyes;
