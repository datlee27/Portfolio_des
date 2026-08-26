import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiBox, FiFolder, FiMail } from 'react-icons/fi';
import d3Projects from '../../design3/data/d3Projects';
import profile from '../../../data/profile';
import ProjectModalD3 from '../../design3/components/ProjectModalD3';

// Floating animations
const floatAnim = keyframes`
  0%, 100% { transform: translateY(0) rotate(var(--rot, 0deg)); }
  50% { transform: translateY(-8px) rotate(calc(var(--rot, 0deg) + 2deg)); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(0.8); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.96) translateY(12px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-image: url('/assets/hero-background.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow: hidden;
  user-select: none;
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px 40px 100px;

  @media (max-width: 768px) {
    padding: 24px 16px 100px;
  }
`;

/* Top Header Bar */
const TopHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  z-index: 50;
  position: relative;
`;

/* Back to overview button */
const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #ffffff;
  padding: 8px 18px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  transition: all 0.25s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.75);
    border-color: rgba(255, 255, 255, 0.7);
    transform: translateY(-2px);
  }
`;

/* Profile Pill (Top Left) */
const ProfileCard = styled.div`
  width: ${props => (props.$expanded ? '330px' : '254px')};
  height: ${props => (props.$expanded ? '210px' : '48px')};
  border-radius: ${props => (props.$expanded ? '20px' : '100px')};
  padding: ${props => (props.$expanded ? '18px 20px 16px' : '6px 16px 6px 8px')};
  background: ${props => (props.$expanded ? 'rgba(255, 255, 255, 0.28)' : 'rgba(255, 255, 255, 0.2)')};
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  border: 1px solid ${props => (props.$expanded ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.38)')};
  box-shadow: ${props => (props.$expanded ? '0 16px 40px rgba(0, 0, 0, 0.25)' : '0 4px 18px rgba(0, 0, 0, 0.12)')};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
`;

const ProfileTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: ${props => (props.$expanded ? '44px' : '36px')};
`;

const ProfileLeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AvatarImg = styled.img`
  width: ${props => (props.$expanded ? '42px' : '36px')};
  height: ${props => (props.$expanded ? '42px' : '36px')};
  border-radius: 50%;
  object-fit: cover;
  border: ${props => (props.$expanded ? '1.5px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.8)')};
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
`;

const BadgeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  white-space: nowrap;
`;

const Status = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10.5px;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

  &::before {
    content: '';
    width: 6.5px;
    height: 6.5px;
    border-radius: 50%;
    background-color: #22c55e;
    box-shadow: 0 0 8px #22c55e;
    display: inline-block;
    animation: ${pulse} 2s infinite ease-in-out;
  }
`;

const Name = styled.span`
  font-size: 12px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
`;

const ExpandedDetails = styled.div`
  opacity: ${props => (props.$expanded ? 1 : 0)};
  transform: ${props => (props.$expanded ? 'translateY(0)' : 'translateY(8px)')};
  transition: opacity 0.35s ease, transform 0.35s ease;
  transition-delay: ${props => (props.$expanded ? '0.1s' : '0s')};
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 12px;
`;

const Bio = styled.p`
  font-size: 12px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const LocationText = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
`;

/* Top Right Actions (Eyes & Start Project) */
const TopRightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const EyesWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  padding: 6px 12px;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
`;

const Eye = styled.div`
  width: 22px;
  height: 22px;
  background: #ffffff;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
`;

const Pupil = styled.div`
  width: 9px;
  height: 9px;
  background: #000000;
  border-radius: 50%;
  transform: translate(${props => props.$x}px, ${props => props.$y}px);
  transition: transform 0.05s linear;
`;

const StartProjectBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #111827;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 100px;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
  transition: all 0.25s ease;

  &:hover {
    background: #000000;
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
  }
`;

/* Center Giant Headline */
const CenterHeadline = styled.div`
  text-align: center;
  margin: auto 0;
  position: relative;
  z-index: 20;
  padding: 40px 0;
`;

const HeadlineText = styled.h1`
  font-size: clamp(48px, 8.5vw, 118px);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.35);
`;

/* Draggable & Floating Sticky Notes */
const FloatingSticker = styled.div`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  right: ${props => props.$right};
  bottom: ${props => props.$bottom};
  z-index: ${props => props.$zIndex || 25};
  --rot: ${props => props.$rot || '0deg'};
  animation: ${floatAnim} ${props => props.$duration || '5s'} ease-in-out infinite;
  cursor: grab;
  transition: transform 0.2s ease;

  &:active {
    cursor: grabbing;
  }

  &:hover {
    transform: scale(1.1) rotate(calc(var(--rot) + 4deg)) !important;
  }
`;

const PillNote = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 100px;
  background: ${props => props.$bg || 'rgba(255, 255, 255, 0.3)'};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  color: ${props => props.$color || '#111827'};
  font-size: 13.5px;
  font-weight: 800;
  white-space: nowrap;
`;

/* Bottom Row */
const BottomRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  z-index: 40;
  position: relative;
`;

const MissionText = styled.p`
  max-width: 320px;
  font-size: 13.5px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  margin: 0;
  font-weight: 500;
`;

/* macOS Floating Dock */
const Dock = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 60;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.7);
`;

const DockButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 14px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 14px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    transform: translateY(-12px) scale(1.22);
  }
`;

/* Project Card Stack (Bottom Right) */
const StackContainer = styled.div`
  position: relative;
  width: 280px;
  height: 76px;
  cursor: pointer;
`;

const StackCard = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 74px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.45);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  padding: 10px 14px;
  gap: 12px;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  &.card-top {
    z-index: 3;
    transform: ${props => (props.$expanded ? 'translateY(-160px) scale(1)' : 'translateY(-12px) scale(0.92)')};
    opacity: ${props => (props.$expanded ? '1' : '0.65')};
  }

  &.card-mid {
    z-index: 4;
    transform: ${props => (props.$expanded ? 'translateY(-80px) scale(1)' : 'translateY(-6px) scale(0.96)')};
    opacity: ${props => (props.$expanded ? '1' : '0.82')};
  }

  &.card-bot {
    z-index: 5;
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.42);
    border-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  }

  img {
    width: 52px;
    height: 52px;
    border-radius: 10px;
    object-fit: cover;
    border: 1px solid rgba(255, 255, 255, 0.5);
  }
`;

/* macOS Popup Modal Windows */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: ${fadeIn} 0.25s ease-out;
`;

const MacOSWindow = styled.div`
  width: 100%;
  max-width: ${props => props.$width || '700px'};
  max-height: 85vh;
  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: #111827;
  animation: ${fadeIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`;

const WindowHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
`;

const TrafficDots = styled.div`
  display: flex;
  gap: 8px;

  span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    cursor: pointer;

    &.red { background: #ff5f57; }
    &.yellow { background: #ffbd2e; }
    &.green { background: #28ca42; }
  }
`;

export default function Des4LabView({ onBack }) {
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [stackExpanded, setStackExpanded] = useState(false);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [activePopup, setActivePopup] = useState(null); // 'notes' | 'photos' | 'finder' | 'mail'

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX - innerWidth / 2) / (innerWidth / 2)) * 4;
      const y = ((e.clientY - innerHeight / 2) / (innerHeight / 2)) * 4;
      setPupilPos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = d3Projects.slice(0, 3); // ABC3, ABC2, ABC1

  return (
    <Wrapper>
      {/* Top Header */}
      <TopHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Back Button */}
          <BackButton onClick={onBack}>
            <span>← back to overview</span>
          </BackButton>

          {/* Profile Card Pill */}
          <ProfileCard
            $expanded={profileExpanded}
            onClick={() => setProfileExpanded(!profileExpanded)}
          >
            <ProfileTopRow $expanded={profileExpanded}>
              <ProfileLeftGroup>
                <AvatarImg
                  src={profile.avatar}
                  alt={profile.name}
                  $expanded={profileExpanded}
                />
                <BadgeInfo>
                  <Status>Available for work</Status>
                  <Name>DATLE - PRODUCT DESIGNER</Name>
                </BadgeInfo>
              </ProfileLeftGroup>
            </ProfileTopRow>

            <ExpandedDetails $expanded={profileExpanded}>
              <Bio>{profile.bio[0]}</Bio>
              <LocationText>📍 {profile.location.name}</LocationText>
            </ExpandedDetails>
          </ProfileCard>
        </div>

        {/* Top Right: Eyes & Start Project */}
        <TopRightActions>
          <EyesWrapper>
            <Eye>
              <Pupil $x={pupilPos.x} $y={pupilPos.y} />
            </Eye>
            <Eye>
              <Pupil $x={pupilPos.x} $y={pupilPos.y} />
            </Eye>
          </EyesWrapper>

          <StartProjectBtn onClick={() => setActivePopup('mail')}>
            <span>Start a Project</span>
            <FiBox />
          </StartProjectBtn>
        </TopRightActions>
      </TopHeader>

      {/* Draggable / Floating Sticky Notes */}

      {/* 1. Purple Note: "Not Just Visuals." */}
      <FloatingSticker $top="18%" $left="10%" $rot="-6deg" $duration="5s">
        <PillNote $bg="rgba(192, 132, 252, 0.45)" $color="#ffffff">
          <span>📎</span>
          <span>Not Just Visuals.</span>
        </PillNote>
      </FloatingSticker>

      {/* 2. Cursor Arrow (Blue/Yellow) */}
      <FloatingSticker $top="26%" $left="9%" $rot="-15deg" $duration="4.2s">
        <div style={{ fontSize: 32, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))' }}>
          ↖️
        </div>
      </FloatingSticker>

      {/* 3. Cloud Sticker */}
      <FloatingSticker $top="17%" $left="30%" $rot="4deg" $duration="6s">
        <div style={{ fontSize: 28, opacity: 0.85 }}>☁️</div>
      </FloatingSticker>

      {/* 4. Striped Pink Circle */}
      <FloatingSticker $top="20%" $right="15%" $rot="12deg" $duration="5.5s">
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'repeating-linear-gradient(45deg, #f472b6, #f472b6 4px, #db2777 4px, #db2777 8px)',
            boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
          }}
        />
      </FloatingSticker>

      {/* 5. Pink Note: "I Make Digital Things Look Alive" */}
      <FloatingSticker $top="28%" $right="12%" $rot="6deg" $duration="4.8s">
        <PillNote $bg="rgba(251, 207, 232, 0.55)" $color="#111827">
          <span>📎</span>
          <span>I Make Digital Things Look Alive</span>
        </PillNote>
      </FloatingSticker>

      {/* 6. Red Asterisk/Flower */}
      <FloatingSticker $top="40%" $right="11%" $rot="18deg" $duration="4s">
        <div style={{ fontSize: 32, color: '#ef4444', filter: 'drop-shadow(0 4px 12px rgba(239,68,68,0.4))' }}>
          ✹
        </div>
      </FloatingSticker>

      {/* 7. Pen Tool Icon */}
      <FloatingSticker $bottom="30%" $left="16%" $rot="-12deg" $duration="5.2s">
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
            border: '1px solid rgba(255,255,255,0.6)',
          }}
        >
          ✒️
        </div>
      </FloatingSticker>

      {/* 8. Green Note: "UI/UX & Brand Systems" */}
      <FloatingSticker $bottom="25%" $left="22%" $rot="8deg" $duration="4.6s">
        <PillNote $bg="rgba(187, 247, 208, 0.55)" $color="#111827">
          <span>📎</span>
          <span>UI/UX & Brand Systems</span>
        </PillNote>
      </FloatingSticker>

      {/* 9. Lightbulb & Pencil */}
      <FloatingSticker $bottom="32%" $right="22%" $rot="-8deg" $duration="5s">
        <div
          style={{
            display: 'flex',
            gap: 4,
            fontSize: 28,
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))',
          }}
        >
          <span>💡</span>
          <span>✏️</span>
        </div>
      </FloatingSticker>

      {/* Center Giant Headline */}
      <CenterHeadline>
        <HeadlineText>
          <div>DESIGN THAT</div>
          <div>MAKES PEOPLE</div>
          <div>LOOK TWICE</div>
        </HeadlineText>
      </CenterHeadline>

      {/* Bottom Row */}
      <BottomRow>
        {/* Mission Text (Bottom Left) */}
        <MissionText>
          I design clean websites, apps, and brand systems that help ideas look sharper, feel trusted, and work with purpose.
        </MissionText>

        {/* Project Card Stack (Bottom Right) */}
        <StackContainer
          onMouseEnter={() => setStackExpanded(true)}
          onMouseLeave={() => setStackExpanded(false)}
          onClick={() => setStackExpanded(!stackExpanded)}
        >
          {/* Card 1: ABC1 (Top when expanded) */}
          <StackCard
            className="card-top"
            $expanded={stackExpanded}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProject(projects[2]);
            }}
          >
            <img src={projects[2]?.thumbnail || projects[2]?.image} alt={projects[2]?.name} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 10, fontWeight: 700, opacity: 0.8 }}>FIGMA • 2026</span>
              <span style={{ fontSize: 13, fontWeight: 800 }}>{projects[2]?.name}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#ffe815' }}>VIEW CASE STUDY →</span>
            </div>
          </StackCard>

          {/* Card 2: ABC2 (Mid when expanded) */}
          <StackCard
            className="card-mid"
            $expanded={stackExpanded}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProject(projects[1]);
            }}
          >
            <img src={projects[1]?.thumbnail || projects[1]?.image} alt={projects[1]?.name} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 10, fontWeight: 700, opacity: 0.8 }}>BRAND • 2026</span>
              <span style={{ fontSize: 13, fontWeight: 800 }}>{projects[1]?.name}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#ffe815' }}>VIEW CASE STUDY →</span>
            </div>
          </StackCard>

          {/* Card 3: ABC3 (Bottom / default visible) */}
          <StackCard
            className="card-bot"
            $expanded={stackExpanded}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProject(projects[0]);
            }}
          >
            <img src={projects[0]?.thumbnail || projects[0]?.image} alt={projects[0]?.name} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 10, fontWeight: 700, opacity: 0.8 }}>FIGMA • 2026</span>
              <span style={{ fontSize: 13, fontWeight: 800 }}>{projects[0]?.name}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#ffe815' }}>VIEW CASE STUDY →</span>
            </div>
          </StackCard>
        </StackContainer>
      </BottomRow>

      {/* Floating macOS Dock (Center Bottom - Triggers Popups!) */}
      <Dock>
        <DockButton onClick={() => setActivePopup('mail')} title="Mail / Contact">
          <img src="/assets/mail.png" alt="Mail" onError={(e) => (e.target.src = 'https://framerusercontent.com/images/EVSY45U60gTa9UjvovzPTZx7Hw.png?width=180&height=180')} />
        </DockButton>

        <DockButton onClick={() => setActivePopup('notes')} title="Notes / About">
          <img src="/assets/notes.png" alt="Notes" onError={(e) => (e.target.src = 'https://framerusercontent.com/images/ZAH3C8amQUigspCjEG1FJWPjI.png?width=180&height=180')} />
        </DockButton>

        <DockButton onClick={() => setActivePopup('photos')} title="Photos / Gallery">
          <img src="/assets/photos.png" alt="Photos" onError={(e) => (e.target.src = 'https://framerusercontent.com/images/VCIQF7ylF9U0o5QZkTgji0mxx28.png?width=180&height=180')} />
        </DockButton>

        <DockButton onClick={() => setActivePopup('finder')} title="Finder / Capabilities">
          <img src="/assets/finder.png" alt="Finder" onError={(e) => (e.target.src = 'https://framerusercontent.com/images/jC3NYM1gkKdVNzokU0ojtj01asg.png?width=180&height=180')} />
        </DockButton>
      </Dock>

      {/* Project Modal Case Study */}
      {selectedProject && (
        <ProjectModalD3
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* macOS Dock Popup Modals */}
      {activePopup && (
        <ModalOverlay onClick={() => setActivePopup(null)}>
          <MacOSWindow onClick={(e) => e.stopPropagation()}>
            <WindowHeader>
              <TrafficDots>
                <span className="red" onClick={() => setActivePopup(null)} />
                <span className="yellow" onClick={() => setActivePopup(null)} />
                <span className="green" />
              </TrafficDots>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
                {activePopup === 'notes' && 'Notes – About Dat Le'}
                {activePopup === 'photos' && 'Photos – Creative Gallery'}
                {activePopup === 'finder' && 'Finder – Services & Capabilities'}
                {activePopup === 'mail' && 'Mail – Get in Touch'}
              </span>
              <div style={{ width: 40 }} />
            </WindowHeader>

            <div style={{ padding: '28px 32px', overflowY: 'auto', maxHeight: '70vh' }}>
              {/* Notes Popup */}
              {activePopup === 'notes' && (
                <div>
                  <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 12px 0' }}>About Dat Le</h3>
                  <p style={{ lineHeight: 1.7, color: '#4b5563', fontSize: 15 }}>
                    {profile.bio.join(' ')}
                  </p>
                  <div style={{ marginTop: 20, padding: 16, background: '#f9fafb', borderRadius: 12, border: '1px solid #e5e7eb' }}>
                    <strong>📍 Location:</strong> {profile.location.name} <br />
                    <strong>✉️ Email:</strong> {profile.email}
                  </div>
                </div>
              )}

              {/* Photos Popup */}
              {activePopup === 'photos' && (
                <div>
                  <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 16px 0' }}>Featured Experiments & Shots</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
                    {projects.map((p, i) => (
                      <div key={i} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb', cursor: 'pointer' }} onClick={() => setSelectedProject(p)}>
                        <img src={p.thumbnail || p.image} alt={p.name} style={{ width: '100%', height: 130, objectFit: 'cover' }} />
                        <div style={{ padding: '8px 12px', fontSize: 13, fontWeight: 700 }}>{p.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Finder Popup */}
              {activePopup === 'finder' && (
                <div>
                  <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 16px 0' }}>Services & System Capabilities</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {['01. Brand Strategy & Visual Identity', '02. UI/UX Design & Design Systems', '03. 2D/3D Motion & Interactive Prototyping', '04. End-to-End Creative Direction'].map((s, idx) => (
                      <div key={idx} style={{ padding: '12px 16px', background: '#f3f4f6', borderRadius: 10, fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <FiFolder style={{ color: '#0b1dff' }} />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mail Popup */}
              {activePopup === 'mail' && (
                <div>
                  <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 8px 0' }}>Start a Project</h3>
                  <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 20 }}>
                    Have an exciting idea or need design leadership? Send a message directly.
                  </p>
                  <form onSubmit={(e) => { e.preventDefault(); alert('Message sent! Thank you.'); setActivePopup(null); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <input type="text" placeholder="Your Name" required style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14 }} />
                    <input type="email" placeholder="Your Email" required style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14 }} />
                    <textarea rows="4" placeholder="Tell me about your project..." required style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14 }} />
                    <button type="submit" style={{ padding: '12px', background: '#111827', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
                      Send Message
                    </button>
                  </form>
                </div>
              )}
            </div>
          </MacOSWindow>
        </ModalOverlay>
      )}
    </Wrapper>
  );
}
