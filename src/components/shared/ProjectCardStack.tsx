import React, { useState } from 'react';
import styles from './ProjectCardStack.module.css';

export interface StackProject {
  id: string;
  name: string;
  tool: string;
  year: string;
  thumbnail: string;
  subtitle: string;
  className: string;
}

export interface ProjectCardStackProps {
  projects?: StackProject[];
  onOpenProject?: (project: StackProject) => void;
  className?: string;
}

const defaultProjects: StackProject[] = [
  {
    id: 'abc1',
    name: 'ABC1',
    tool: 'FIGMA',
    year: '2026',
    thumbnail: '/assets/project-abc1.png',
    subtitle: 'Cherry Bomb Nutrition Label & Brand',
    className: 'card-1',
  },
  {
    id: 'abc2',
    name: 'ABC2',
    tool: 'FIGMA',
    year: '2026',
    thumbnail: '/assets/project-abc2.png',
    subtitle: 'Laptop in Lavender Botanical Oasis',
    className: 'card-2',
  },
  {
    id: 'abc3',
    name: 'ABC3',
    tool: 'FIGMA',
    year: '2026',
    thumbnail: '/assets/project-abc3.png',
    subtitle: 'Projects That Tell Stories',
    className: 'card-3',
  },
];

export const ProjectCardStack: React.FC<ProjectCardStackProps> = ({
  projects = defaultProjects,
  onOpenProject,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`${styles.stackAnchor} ${className}`}>
      <div
        className={styles.deckContainer}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {projects.map((p) => (
          <div
            key={p.id}
            className={`${styles.stackCard} ${
              p.className === 'card-1' ? styles.card1 :
              p.className === 'card-2' ? styles.card2 :
              styles.card3
            } ${isExpanded ? styles.deckExpanded : ''}`}
            onClick={() => onOpenProject?.(p)}
          >
            <img
              src={p.thumbnail}
              alt={p.name}
              className={styles.cardThumb}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className={styles.cardDetails}>
              <div className={styles.cardTopRow}>
                <span>{p.tool}</span>
                <span>{p.year}</span>
              </div>
              <span className={styles.cardTitle}>{p.name}</span>
              <span className={styles.caseStudyLink}>
                VIEW CASE STUDY
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCardStack;
