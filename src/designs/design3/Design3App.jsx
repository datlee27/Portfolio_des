import { useState } from 'react';
import styled from 'styled-components';
import { Design3GlobalStyle } from './styles/design3Styles';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import d3Projects from './data/d3Projects';
import ServicesSection from './components/ServicesSection';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
import FooterSection from './components/FooterSection';
import DockD3 from './components/DockD3';
import ProjectModalD3 from './components/ProjectModalD3';

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: #f5f3ea;
`;

export default function Design3App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenProject = (project) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <Design3GlobalStyle />
      <MainContainer>
        <HeroSection onOpenProject={handleOpenProject} projects={d3Projects} />
        <AboutSection />
        <ProjectsSection onOpenProject={handleOpenProject} />
        <ServicesSection />
        <ReviewsSection />
        <FAQSection />
        <FooterSection />

        <DockD3 />

        {selectedProject && (
          <ProjectModalD3
            project={selectedProject}
            onClose={handleCloseProject}
          />
        )}
      </MainContainer>
    </>
  );
}
