import React, { useEffect } from 'react';
import styles from './ProjectPopup.module.css';
import { ProjectCardData } from './ProjectCard';

export interface ProjectPopupProps {
  project: ProjectCardData | null;
  onClose: () => void;
}

export const ProjectPopup: React.FC<ProjectPopupProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div
        className={styles.windowContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.titleBar}>
          <div className={styles.trafficLights}>
            <button
              type="button"
              className={`${styles.trafficLight} ${styles.closeLight}`}
              onClick={onClose}
              aria-label="Close Case Study"
            />
            <button
              type="button"
              className={`${styles.trafficLight} ${styles.minLight}`}
              onClick={onClose}
              aria-label="Minimize"
            />
            <button
              type="button"
              className={`${styles.trafficLight} ${styles.maxLight}`}
              aria-label="Maximize"
            />
          </div>
          <span className={styles.titleBarText}>
            {project.name} – Case Study
          </span>
          <div style={{ width: 40 }} />
        </div>

        <div className={styles.content}>
          <h2 id="popup-title" className={styles.projectTitle}>
            {project.name}
          </h2>
          {project.subtitle && (
            <p className={styles.projectSubtitle}>{project.subtitle}</p>
          )}

          <div className={styles.tagRow}>
            {project.type && <span className={styles.tag}>{project.type}</span>}
            {project.tool && <span className={styles.tag}>{project.tool}</span>}
            {project.year && <span className={styles.tag}>Year: {project.year}</span>}
            {project.client && <span className={styles.tag}>Client: {project.client}</span>}
          </div>

          <p className={styles.description}>{project.description}</p>

          <div className={styles.gallery}>
            {project.gallery && project.gallery.length > 0 ? (
              project.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${project.name} preview ${i + 1}`}
                  className={styles.galleryImage}
                  loading="lazy"
                />
              ))
            ) : (
              <img
                src={project.thumbnail}
                alt={project.name}
                className={styles.galleryImage}
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPopup;
