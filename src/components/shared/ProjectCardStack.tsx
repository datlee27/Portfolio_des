import React from 'react';
import styles from './ProjectCardStack.module.css';

export interface ProjectCardStackProps {
  onClick?: () => void;
  className?: string;
}

export const ProjectCardStack: React.FC<ProjectCardStackProps> = ({
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`${styles.stackContainer} ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className={`${styles.stackedCard} ${styles.card3}`}>
        <div className={styles.thumbnailBox}>
          <img src="/assets/N2w6GD9OJ32bkpXkfMSCXEAtsY.png" alt="Stack 3" className={styles.thumbnailImg} />
        </div>
        <div className={styles.contentBox}>
          <h4 className={styles.stackTitle}>Brand Identity Kit</h4>
          <span className={styles.stackSubtitle}>Free Design File</span>
        </div>
      </div>

      <div className={`${styles.stackedCard} ${styles.card2}`}>
        <div className={styles.thumbnailBox}>
          <img src="/assets/2y9hWY2pBjaONGzPRqdv67woE.png" alt="Stack 2" className={styles.thumbnailImg} />
        </div>
        <div className={styles.contentBox}>
          <h4 className={styles.stackTitle}>SaaS Dashboard UI</h4>
          <span className={styles.stackSubtitle}>Figma Community</span>
        </div>
      </div>

      <div className={`${styles.stackedCard} ${styles.card1}`}>
        <div className={styles.thumbnailBox}>
          <img src="/assets/Be455u4BRYelSl1NS32A0tLSZU.png" alt="Stack 1" className={styles.thumbnailImg} />
        </div>
        <div className={styles.contentBox}>
          <h4 className={styles.stackTitle}>Projects That Tell Stories</h4>
          <span className={styles.stackSubtitle}>Explore Free Design Files</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardStack;
