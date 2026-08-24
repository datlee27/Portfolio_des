import React from 'react';
import styles from './TitleChip.module.css';
import { FiPaperclip } from 'react-icons/fi';

export interface TitleChipProps {
  label: string;
  variant?: 'Blue' | 'Pink' | 'Purple' | 'Green' | 'Yellow';
  rotation?: string;
  className?: string;
  showIcon?: boolean;
}

export const TitleChip: React.FC<TitleChipProps> = ({
  label,
  variant = 'Blue',
  rotation = '-2deg',
  className = '',
  showIcon = true,
}) => {
  const variantClass = styles[variant.toLowerCase()] || styles.blue;

  return (
    <div
      className={`${styles.chip} ${variantClass} ${className}`}
      style={{ transform: `rotate(${rotation})` }}
    >
      <span className={styles.pushpin} />
      {showIcon && <FiPaperclip size={15} />}
      <span>{label}</span>
    </div>
  );
};

export default TitleChip;
