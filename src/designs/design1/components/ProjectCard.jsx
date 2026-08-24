import styled from 'styled-components';

const CardWrapper = styled.div`
  position: absolute;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
  z-index: 10;
  user-select: none;

  &:hover {
    transform: scale(1.08) translateY(-4px);
    z-index: 20;
  }

  &:hover .card-thumb {
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.6);
  }
`;

const Thumbnail = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.25);
  transition: box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const ProjectName = styled.p`
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  margin-top: 8px;
  text-shadow:
    0 2px 8px rgba(0, 0, 0, 0.8),
    0 1px 2px rgba(0, 0, 0, 0.9);
  white-space: nowrap;
  letter-spacing: -0.2px;
`;

export default function ProjectCard({ project, onClick }) {
  const style = { ...project.position };

  return (
    <CardWrapper style={style} onClick={() => onClick(project)}>
      <Thumbnail className="card-thumb">
        <img src={project.thumbnail} alt={project.name} loading="lazy" />
      </Thumbnail>
      <ProjectName>{project.name}</ProjectName>
    </CardWrapper>
  );
}
