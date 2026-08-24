import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(16px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: ${fadeIn} 0.25s ease-out;
`;

const WindowContainer = styled.div`
  width: 100%;
  max-width: 860px;
  max-height: 88vh;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${scaleIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
  position: relative;
  user-select: none;
`;

const TrafficLights = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TrafficLight = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  padding: 0;

  &.close { background: #ff5f57; }
  &.min { background: #ffbd2e; }
  &.max { background: #28ca42; }

  &:hover {
    filter: brightness(0.85);
  }
`;

const TitleBarText = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #374151;
`;

const Content = styled.div`
  overflow-y: auto;
  padding: 36px 40px;

  @media (max-width: 640px) {
    padding: 24px 20px;
  }
`;

const Title = styled.h2`
  font-size: clamp(28px, 4vw, 38px);
  font-weight: 900;
  color: #111827;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 18px;
`;

const TagRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

const Tag = styled.span`
  font-size: 12px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 100px;
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #e5e7eb;
`;

const Description = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: #4b5563;
  margin-bottom: 30px;
`;

const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const GalleryImage = styled.img`
  width: 100%;
  border-radius: 14px;
  object-fit: cover;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
`;

export default function ProjectModalD3({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <Overlay onClick={onClose}>
      <WindowContainer onClick={(e) => e.stopPropagation()}>
        <TitleBar>
          <TrafficLights>
            <TrafficLight className="close" onClick={onClose} />
            <TrafficLight className="min" onClick={onClose} />
            <TrafficLight className="max" />
          </TrafficLights>
          <TitleBarText>{project.name} – Case Study</TitleBarText>
          <div style={{ width: 40 }} />
        </TitleBar>

        <Content>
          <Title>{project.name}</Title>
          <Subtitle>{project.subtitle}</Subtitle>

          <TagRow>
            <Tag>{project.type}</Tag>
            <Tag>{project.tool}</Tag>
            <Tag>Year: {project.year}</Tag>
            <Tag>Client: {project.client}</Tag>
          </TagRow>

          <Description>{project.description}</Description>

          <Gallery>
            {project.gallery?.map((img, i) => (
              <GalleryImage key={i} src={img} alt={`${project.name} ${i + 1}`} loading="lazy" />
            ))}
          </Gallery>
        </Content>
      </WindowContainer>
    </Overlay>
  );
}
