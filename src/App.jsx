import { useState } from 'react';
import styled, { css } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import AboutModal from './components/AboutModal';
import NotesModal from './components/NotesModal';
import Dock from './components/Dock';
import projects from './data/projects';

const Desktop = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #0f1115;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Ambient blurred backdrop so the sides blend seamlessly with image colors
const AmbientBackdrop = styled.div`
  position: absolute;
  inset: -20px;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(40px) brightness(0.65) saturate(130%);
    transform: scale(1.1);
    transition: filter 0.4s ease;
    ${props => props.$isBlurred && css`
      filter: blur(60px) brightness(0.5);
    `}
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0) 30%,
      rgba(0, 0, 0, 0.4) 100%
    );
  }
`;

// Main crisp image displayed in full (not cropped)
const CenterImageWrapper = styled.div`
  position: relative;
  z-index: 2;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  img {
    max-height: 100vh;
    max-width: 100vw;
    height: 100%;
    width: auto;
    object-fit: contain;
    object-position: center;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
    transition: filter 0.4s ease, transform 0.4s ease;
    ${props => props.$isBlurred && css`
      filter: blur(12px) brightness(0.85);
      transform: scale(0.98);
    `}
  }
`;

const GrainOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  background-size: 128px 128px;
  pointer-events: none;
  z-index: 3;
`;

const CardsLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 5;
  transition: opacity 0.35s ease, transform 0.35s ease;
  opacity: ${props => (props.$hide ? 0 : 1)};
  pointer-events: ${props => (props.$hide ? 'none' : 'auto')};
  transform: ${props => (props.$hide ? 'scale(0.96)' : 'scale(1)')};
`;

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const openProject = (project) => {
    setSelectedProject(project);
    setActiveModal('project');
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedProject(null);
  };

  return (
    <>
      <GlobalStyles />
      <Desktop>
        <AmbientBackdrop $isBlurred={Boolean(activeModal)}>
          <img src="/bg.jpg" alt="Ambient Backdrop" />
        </AmbientBackdrop>

        <CenterImageWrapper $isBlurred={Boolean(activeModal)}>
          <img src="/bg.jpg" alt="Portfolio Collage" />
        </CenterImageWrapper>

        <GrainOverlay />

        <CardsLayer $hide={Boolean(activeModal)}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={openProject}
            />
          ))}
        </CardsLayer>

        <Dock
          onOpenAbout={() => setActiveModal('about')}
          onOpenNotes={() => setActiveModal('notes')}
        />

        {activeModal === 'project' && selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}

        {activeModal === 'about' && (
          <AboutModal onClose={closeModal} />
        )}

        {activeModal === 'notes' && (
          <NotesModal onClose={closeModal} />
        )}
      </Desktop>
    </>
  );
}

export default App;