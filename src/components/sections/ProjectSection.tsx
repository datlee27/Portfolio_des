import React from 'react';
import styles from './ProjectSection.module.css';
import TitleChip from '../shared/TitleChip';
import ProjectCard, { ProjectCardData } from '../shared/ProjectCard';
import { portfolioProjects } from '../../data/homeData';

export interface ProjectSectionProps {
  onSelectProject?: (project: ProjectCardData) => void;
  projects?: ProjectCardData[];
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({
  onSelectProject,
  projects = portfolioProjects,
}) => {
  return (
    <section className={styles.projectsWrapper} id="projects">
      <TitleChip label="Projects" variant="Blue" rotation="-2deg" />

      <h2 className={styles.sectionTitle}>
        Projects that<br />tell stories
      </h2>

      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => onSelectProject && onSelectProject(project)}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
