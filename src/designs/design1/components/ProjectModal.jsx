import styled from 'styled-components';
import MacWindow from './MacWindow';

const Content = styled.div`
  padding: 40px 50px;
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
  letter-spacing: -0.5px;
`;

const Description = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: #666;
  margin-bottom: 30px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 40px;
  margin-bottom: 35px;
  padding-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
`;

const InfoItem = styled.div``;

const InfoLabel = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const InfoValue = styled.p`
  font-size: 14px;
  color: #888;
`;

const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const GalleryImage = styled.img`
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <MacWindow title={project.name} width="820px" onClose={onClose}>
      <Content>
        <Title>{project.name}</Title>
        <Description>{project.description}</Description>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Client</InfoLabel>
            <InfoValue>{project.client}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Year</InfoLabel>
            <InfoValue>{project.year}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Project type</InfoLabel>
            <InfoValue>{project.type}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Credits</InfoLabel>
            <InfoValue>{project.credits}</InfoValue>
          </InfoItem>
        </InfoGrid>
        <Gallery>
          {project.gallery.map((img, i) => (
            <GalleryImage key={i} src={img} alt={project.name + ' ' + (i + 1)} loading="lazy" />
          ))}
        </Gallery>
      </Content>
    </MacWindow>
  );
}
