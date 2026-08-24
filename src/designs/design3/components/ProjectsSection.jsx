import styled from 'styled-components';
import { FiPaperclip } from 'react-icons/fi';
import d3Projects from '../data/d3Projects';

const SectionWrapper = styled.section`
  position: relative;
  background-image: url('https://framerusercontent.com/images/2y9hWY2pBjaONGzPRqdv67woE.png');
  background-size: cover;
  background-position: center;
  padding: 100px 32px 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 16px 80px;
  }
`;

const SectionTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border-radius: 12px;
  background: #bbdafe;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  transform: rotate(-2deg);
  margin-bottom: 24px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    right: 14px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #000000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  span {
    font-size: 15px;
    font-weight: 800;
    color: #1e3a8a;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(40px, 7vw, 76px);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #ffffff;
  text-transform: uppercase;
  max-width: 900px;
  line-height: 1;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  margin-bottom: 70px;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 30px;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const MacCard = styled.article`
  position: relative;
  background: #ffffff;
  border-radius: 18px;
  padding: 12px 12px 18px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.35s ease;

  --rot: ${props => props.$rot || '0deg'};
  transform: rotate(var(--rot));

  /* Top paperclip */
  &::before {
    content: '';
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    width: 18px;
    height: 32px;
    border: 3.5px solid ${props => props.$clipColor || '#3b82f6'};
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    z-index: 10;
  }

  &:hover {
    transform: translateY(-10px) scale(1.04) rotate(0deg) !important;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.35);
    z-index: 20;
  }
`;

const WindowHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 8px 10px;
`;

const TrafficDots = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.$bg};
`;

const ImageBox = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 12px;
  overflow: hidden;
  background: #f1f5f9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${MacCard}:hover img {
    transform: scale(1.05);
  }
`;

const CardBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 8px 2px;
`;

const ProjectName = styled.h3`
  font-size: 20px;
  font-weight: 900;
  color: #1f2937;
  letter-spacing: -0.02em;
`;

const ProjectMeta = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export default function ProjectsSection({ onOpenProject }) {
  return (
    <SectionWrapper id="projects">
      <SectionTag>
        <FiPaperclip />
        <span>Projects</span>
      </SectionTag>

      <SectionTitle>
        Projects that<br />tell stories
      </SectionTitle>

      <ProjectsGrid>
        {d3Projects.map((project) => (
          <MacCard
            key={project.id}
            $rot={project.rot}
            $clipColor={project.clipColor}
            onClick={() => onOpenProject(project)}
          >
            <WindowHeader>
              <TrafficDots>
                <Dot $bg="#ff5f56" />
                <Dot $bg="#ffbd2e" />
                <Dot $bg="#27c93f" />
              </TrafficDots>
            </WindowHeader>

            <ImageBox>
              <img src={project.thumbnail} alt={project.name} loading="lazy" />
            </ImageBox>

            <CardBottom>
              <ProjectName>{project.name}</ProjectName>
              <ProjectMeta>{project.type} · {project.tool} {project.year}</ProjectMeta>
            </CardBottom>
          </MacCard>
        ))}
      </ProjectsGrid>
    </SectionWrapper>
  );
}
