import React from 'react';
import styles from './ProjectCard.module.css';

export interface ProjectCardData {
  id: string;
  name: string;
  subtitle?: string;
  description?: string;
  client?: string;
  year?: string;
  type?: string;
  tool?: string;
  clipColor?: string;
  rot?: string;
  thumbnail: string;
  gallery?: string[];
  link?: string;
}

export interface ProjectCardProps {
  project: ProjectCardData;
  onClick?: () => void;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
  className = '',
}) => {
  const clipColor = project.clipColor || '#3b82f6';
  const rotation = project.rot || '0deg';

  return (
    <article
      className={`${styles.projectCard} ${className}`}
      style={{ transform: `rotate(${rotation})` }}
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
      <div
        className={styles.paperclip}
        style={{ borderColor: clipColor }}
      />

      <div className={styles.windowHeader}>
        <div className={styles.trafficDots}>
          <span className={`${styles.dot} ${styles.dotRed}`} />
          <span className={`${styles.dot} ${styles.dotYellow}`} />
          <span className={`${styles.dot} ${styles.dotGreen}`} />
        </div>
      </div>

      <div className={styles.imageContainer}>
        <img
          src={project.thumbnail}
          alt={project.name}
          className={styles.thumbnail}
          loading="lazy"
        />
      </div>

      <div className={styles.cardBottom}>
        <h3 className={styles.projectName}>{project.name}</h3>
        <span className={styles.projectMeta}>
          {project.type} · {project.tool} {project.year}
        </span>
      </div>
    </article>
  );
};

export default ProjectCard;
