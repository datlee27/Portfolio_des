import styled from 'styled-components';
import profile from '../../../data/profile';

const DockContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 90;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow:
    0 12px 36px rgba(0, 0, 0, 0.25),
    0 2px 6px rgba(0, 0, 0, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.6);

  @media (max-width: 640px) {
    bottom: 12px;
    padding: 6px 10px;
    gap: 8px;
  }
`;

const DockIcon = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
  transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.2s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
  }

  &:hover {
    transform: translateY(-10px) scale(1.18);
    filter: brightness(1.08);
  }

  @media (max-width: 640px) {
    width: 40px;
    height: 40px;
  }
`;

export default function DockD3({ onOpenAbout, onOpenProjects }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <DockContainer>
      <DockIcon
        onClick={() => (onOpenAbout ? onOpenAbout() : scrollTo('about'))}
        title="Notes / About"
      >
        <img
          src="https://framerusercontent.com/images/ZAH3C8amQUigspCjEG1FJWPjI.png?width=180&height=180"
          alt="Notes"
        />
      </DockIcon>

      <DockIcon
        onClick={() => (onOpenProjects ? onOpenProjects() : scrollTo('projects'))}
        title="Photos / Projects"
      >
        <img
          src="https://framerusercontent.com/images/VCIQF7ylF9U0o5QZkTgji0mxx28.png?width=180&height=180"
          alt="Photos"
        />
      </DockIcon>

      <DockIcon
        onClick={() => scrollTo('services')}
        title="Finder / Services"
      >
        <img
          src="https://framerusercontent.com/images/jC3NYM1gkKdVNzokU0ojtj01asg.png?width=180&height=180"
          alt="Finder"
        />
      </DockIcon>

      <DockIcon
        onClick={() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else window.location.href = `mailto:${profile.email}`;
        }}
        title="Mail / Contact"
      >
        <img
          src="https://framerusercontent.com/images/EVSY45U60gTa9UjvovzPTZx7Hw.png?width=180&height=180"
          alt="Mail"
        />
      </DockIcon>
    </DockContainer>
  );
}
