import { useState, useMemo } from 'react';
import styled from 'styled-components';
import FilterBar from './FilterBar';
import ProjectCardD2 from './ProjectCardD2';
import projects from '../../../data/projects';

const SectionWrapper = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 24px 80px;

  @media (max-width: 768px) {
    padding: 20px 16px 60px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
`;

const SectionPretitle = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #6366f1;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 800;
  color: #f8fafc;
  letter-spacing: -0.02em;
`;

const SectionDescription = styled.p`
  font-size: 16px;
  color: #94a3b8;
  max-width: 600px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: #12141c;
  border-radius: 16px;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  color: #94a3b8;
`;

export default function BentoGrid({ onOpenProject }) {
  const [activeFilter, setActiveFilter] = useState('All');

  // Extract all unique project types
  const categories = useMemo(() => {
    const types = Array.from(new Set(projects.map((p) => p.type)));
    return ['All', ...types];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((p) => p.type === activeFilter);
  }, [activeFilter]);

  const getCount = (category) => {
    if (category === 'All') return projects.length;
    return projects.filter((p) => p.type === category).length;
  };

  return (
    <SectionWrapper id="work">
      <SectionHeader>
        <SectionPretitle>Selected Portfolio</SectionPretitle>
        <SectionTitle>Featured Works & Series</SectionTitle>
        <SectionDescription>
          A curated collection of atmospheric visual studies, spatial observations, and editorial narratives.
        </SectionDescription>
      </SectionHeader>

      <FilterBar
        categories={categories}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        getCount={getCount}
      />

      {filteredProjects.length > 0 ? (
        <Grid>
          {filteredProjects.map((project, index) => (
            <ProjectCardD2
              key={project.id}
              project={project}
              index={index}
              onOpen={onOpenProject}
            />
          ))}
        </Grid>
      ) : (
        <EmptyState>
          No projects found under the "{activeFilter}" category.
        </EmptyState>
      )}
    </SectionWrapper>
  );
}
