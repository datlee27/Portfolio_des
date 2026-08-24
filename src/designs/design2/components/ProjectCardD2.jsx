import styled from 'styled-components';
import { FiArrowUpRight, FiImage } from 'react-icons/fi';

const CardContainer = styled.article`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: #12141c;
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.35s ease;
  group: true;

  grid-column: ${props => (props.$isFeatured ? 'span 2' : 'span 1')};
  min-height: 420px;

  @media (max-width: 960px) {
    grid-column: span 1 !important;
    min-height: 380px;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(99, 102, 241, 0.45);
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(99, 102, 241, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 260px;
  overflow: hidden;
  background: #181b26;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
  }

  ${CardContainer}:hover img {
    transform: scale(1.05);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(18, 20, 28, 0.1) 0%,
    rgba(18, 20, 28, 0.3) 50%,
    rgba(18, 20, 28, 0.95) 100%
  );
  pointer-events: none;
`;

const TopBadges = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
`;

const CategoryBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  padding: 4px 10px;
  border-radius: 100px;
  background: rgba(10, 11, 15, 0.75);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
`;

const GalleryCount = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 100px;
  background: rgba(10, 11, 15, 0.75);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #94a3b8;
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #12141c;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const ProjectTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #f8fafc;
  letter-spacing: -0.02em;
  line-height: 1.25;
  transition: color 0.2s ease;

  ${CardContainer}:hover & {
    color: #a5b4fc;
  }
`;

const ArrowIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 16px;
  flex-shrink: 0;
  transition: all 0.25s ease;

  ${CardContainer}:hover & {
    background: #6366f1;
    border-color: #6366f1;
    color: #ffffff;
    transform: translate(2px, -2px);
  }
`;

const ProjectDesc = styled.p`
  font-size: 13.5px;
  line-height: 1.55;
  color: #94a3b8;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 4px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

const MetaItem = styled.span`
  font-size: 12px;
  color: #64748b;

  strong {
    color: #cbd5e1;
    font-weight: 500;
  }
`;

export default function ProjectCardD2({ project, index, onOpen }) {
  // Let 1st and 4th card be featured spans
  const isFeatured = index === 0 || index === 3;

  return (
    <CardContainer $isFeatured={isFeatured} onClick={() => onOpen(project)}>
      <ImageContainer>
        <img
          src={project.gallery?.[0] || project.thumbnail}
          alt={project.name}
          loading="lazy"
        />
        <ImageOverlay />
        <TopBadges>
          <CategoryBadge>{project.type}</CategoryBadge>
          <GalleryCount>
            <FiImage /> {project.gallery?.length || 1} Shots
          </GalleryCount>
        </TopBadges>
      </ImageContainer>

      <CardContent>
        <HeaderRow>
          <ProjectTitle>{project.name}</ProjectTitle>
          <ArrowIcon>
            <FiArrowUpRight />
          </ArrowIcon>
        </HeaderRow>

        <ProjectDesc>{project.description}</ProjectDesc>

        <MetaRow>
          <MetaItem>
            Client: <strong>{project.client}</strong>
          </MetaItem>
          <MetaItem>
            Year: <strong>{project.year}</strong>
          </MetaItem>
        </MetaRow>
      </CardContent>
    </CardContainer>
  );
}
