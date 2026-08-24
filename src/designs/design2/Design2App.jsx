import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import AboutBento from './components/AboutBento';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import ProjectModalD2 from './components/ProjectModalD2';

const Design2GlobalStyle = createGlobalStyle`
  html, body {
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background: #090a0f;
    color: #f8fafc;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  /* Custom scrollbar for Design 2 */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #090a0f;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(99, 102, 241, 0.5);
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #090a0f;
  background-image: 
    radial-gradient(at 10% 10%, rgba(99, 102, 241, 0.08) 0px, transparent 50%),
    radial-gradient(at 90% 90%, rgba(139, 92, 246, 0.06) 0px, transparent 50%);
  position: relative;
  overflow-x: hidden;
`;

export default function Design2App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenProject = (project) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <Design2GlobalStyle />
      <PageWrapper>
        <Navbar />
        <main>
          <Hero />
          <BentoGrid onOpenProject={handleOpenProject} />
          <AboutBento />
          <ExperienceSection />
        </main>
        <ContactSection />

        {selectedProject && (
          <ProjectModalD2
            project={selectedProject}
            onClose={handleCloseProject}
            onChangeProject={setSelectedProject}
          />
        )}
      </PageWrapper>
    </>
  );
}
