import React from 'react';
import styles from './WaveButton.module.css';
import { FiArrowUpRight } from 'react-icons/fi';

export interface WaveButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  showArrow?: boolean;
}

export const WaveButton: React.FC<WaveButtonProps> = ({
  children = 'Start a Project',
  onClick,
  href,
  className = '',
  showArrow = true,
}) => {
  const content = (
    <>
      <div className={styles.waveFill} />
      <span className={styles.buttonText}>
        {children}
        {showArrow && <FiArrowUpRight className={styles.arrowIcon} size={18} />}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${styles.waveButton} ${className}`}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`${styles.waveButton} ${className}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default WaveButton;
