import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiX, FiArrowLeft, FiArrowRight, FiUser, FiCalendar, FiTag, FiAward } from 'react-icons/fi';
import projects from '../../../data/projects';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(24px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(6, 7, 10, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: ${fadeIn} 0.25s ease-out;

  @media (max-width: 640px) {
    padding: 12px;
  }
`;

const ModalContainer = styled.div`
  width: 100%;
  max-width: 1060px;
  max-height: 90vh;
  background: #0f1118;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(99, 102, 241, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${slideUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 28px;
  background: #151822;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const CategoryTag = styled.span`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  padding: 4px 12px;
  border-radius: 100px;
  background: rgba(99, 102, 241, 0.2);
  border: 1px solid rgba(99, 102, 241, 0.4);
  color: #a5b4fc;
`;

const HeaderNav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NavBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.25);
  }
`;

const CloseBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 8px;

  &:hover {
    background: #ef4444;
    color: #ffffff;
    border-color: #ef4444;
    transform: rotate(90deg);
  }
`;

const ModalContent = styled.div`
  overflow-y: auto;
  padding: 32px 36px 48px;
  flex: 1;

  @media (max-width: 640px) {
    padding: 20px 20px 32px;
  }
`;

const Title = styled.h2`
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 800;
  color: #f8fafc;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
`;

const StoryText = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: #cbd5e1;
  max-width: 820px;
  margin-bottom: 32px;
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 20px 24px;
  background: #141721;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 36px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`;

const MetaBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MetaLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const MetaValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
`;

const GallerySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const GalleryImageCard = styled.div`
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #141721;

  img {
    width: 100%;
    height: auto;
    max-height: 750px;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }
`;

export default function ProjectModalD2({ project, onClose, onChangeProject }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <HeaderLeft>
            <CategoryTag>{project.type}</CategoryTag>
          </HeaderLeft>

          <HeaderNav>
            <NavBtn
              title={`Previous: ${prevProject.name}`}
              onClick={() => onChangeProject(prevProject)}
            >
              <FiArrowLeft />
            </NavBtn>
            <NavBtn
              title={`Next: ${nextProject.name}`}
              onClick={() => onChangeProject(nextProject)}
            >
              <FiArrowRight />
            </NavBtn>
            <CloseBtn onClick={onClose} title="Close (Esc)">
              <FiX />
            </CloseBtn>
          </HeaderNav>
        </ModalHeader>

        <ModalContent>
          <Title>{project.name}</Title>
          <StoryText>{project.description}</StoryText>

          <MetaGrid>
            <MetaBox>
              <MetaLabel>
                <FiUser /> Client
              </MetaLabel>
              <MetaValue>{project.client}</MetaValue>
            </MetaBox>
            <MetaBox>
              <MetaLabel>
                <FiCalendar /> Year
              </MetaLabel>
              <MetaValue>{project.year}</MetaValue>
            </MetaBox>
            <MetaBox>
              <MetaLabel>
                <FiTag /> Type
              </MetaLabel>
              <MetaValue>{project.type}</MetaValue>
            </MetaBox>
            <MetaBox>
              <MetaLabel>
                <FiAward /> Credits
              </MetaLabel>
              <MetaValue>{project.credits}</MetaValue>
            </MetaBox>
          </MetaGrid>

          <GallerySection>
            {project.gallery?.map((imgUrl, i) => (
              <GalleryImageCard key={i}>
                <img
                  src={imgUrl}
                  alt={`${project.name} - View ${i + 1}`}
                  loading="lazy"
                />
              </GalleryImageCard>
            ))}
          </GallerySection>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
}
