import React from 'react';
import styles from './StatsCard.module.css';

export interface StatsCardProps {
  number: string;
  title: string;
  description: string;
  rotation?: string;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  number,
  title,
  description,
  rotation = '0deg',
  className = '',
}) => {
  return (
    <article
      className={`${styles.statsCard} ${className}`}
      style={{ transform: `rotate(${rotation})` }}
    >
      <span className={styles.pushpin} />
      <span className={styles.cornerTab} />
      <span className={styles.statNumber}>{number}</span>
      <h3 className={styles.statTitle}>{title}</h3>
      <p className={styles.statDesc}>{description}</p>
    </article>
  );
};

export default StatsCard;
