import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiBox, FiEdit3, FiMousePointer, FiArrowRight } from 'react-icons/fi';

const floatAnim = keyframes`
  0%, 100% { transform: translateY(0) rotate(var(--rot, 0deg)); }
  50% { transform: translateY(-6px) rotate(calc(var(--rot, 0deg) + 1.5deg)); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(0.8); }
`;

const HeroWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 800px;
  background-image: url('/assets/hero-background.png');
  background-size: cover;
  background-position: center;
  overflow: hidden;
  user-select: none;
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  @media (max-width: 1024px) {
    min-height: 720px;
  }

  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
    padding: 24px 16px 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

// Top Centered Logo
const TopLogo = styled.div`
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: 900;
  letter-spacing: -0.5px;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 30;

  @media (max-width: 768px) {
    position: static;
    transform: none;
    text-align: center;
    margin-bottom: 20px;
  }
`;

// Profile Card (Left side, ~160px from top, 32px from left)
const ProfileCardAnchor = styled.div`
  position: absolute;
  top: 140px;
  left: 32px;
  z-index: 40;

  @media (max-width: 1024px) {
    top: 90px;
    left: 24px;
  }

  @media (max-width: 768px) {
    position: static;
    margin-bottom: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const ProfileCard = styled.div`
  width: ${props => (props.$expanded ? '330px' : '254px')};
  height: ${props => (props.$expanded ? '200px' : '48px')};
  border-radius: ${props => (props.$expanded ? '20px' : '100px')};
  padding: ${props => (props.$expanded ? '18px 20px 16px' : '6px 16px 6px 8px')};
  background: ${props => (props.$expanded ? 'rgba(255, 255, 255, 0.24)' : 'rgba(255, 255, 255, 0.2)')};
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  border: 1px solid ${props => (props.$expanded ? 'rgba(255, 255, 255, 0.48)' : 'rgba(255, 255, 255, 0.38)')};
  box-shadow: ${props => (props.$expanded ? '0 16px 40px rgba(0, 0, 0, 0.22)' : '0 4px 18px rgba(0, 0, 0, 0.12)')};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  
  transition: 
    width 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    height 0.48s cubic-bezier(0.16, 1, 0.3, 1),
    border-radius 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    padding 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    background 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.4s ease;
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
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
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
    background-color: #34c75a;
    box-shadow: 0 0 8px #34c75a;
    animation: ${pulse} 2s infinite ease-in-out;
  }
`;

const DesignerName = styled.span`
  font-size: 12.5px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
`;

const CardEyesBox = styled.div`
  display: flex;
  gap: 4px;
  opacity: ${props => (props.$expanded ? '1' : '0')};
  transform: ${props => (props.$expanded ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.8)')};
  pointer-events: ${props => (props.$expanded ? 'auto' : 'none')};
  transition: 
    opacity 0.35s ease ${props => (props.$expanded ? '0.08s' : '0s')},
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${props => (props.$expanded ? '0.08s' : '0s')};
`;

const CardEye = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const CardPupil = styled.div`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #111827;
  position: absolute;
  transition: transform 0.06s linear;
`;

const CardExpandedBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
  opacity: ${props => (props.$expanded ? '1' : '0')};
  transform: ${props => (props.$expanded ? 'translateY(0)' : 'translateY(-12px)')};
  max-height: ${props => (props.$expanded ? '140px' : '0')};
  pointer-events: ${props => (props.$expanded ? 'auto' : 'none')};
  transition: 
    opacity 0.4s ease ${props => (props.$expanded ? '0.12s' : '0s')},
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${props => (props.$expanded ? '0.12s' : '0s')},
    max-height 0.48s cubic-bezier(0.16, 1, 0.3, 1);
`;

const CardBio = styled.p`
  font-size: 13px;
  line-height: 1.45;
  color: #ffffff;
  font-weight: 500;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  margin: 0;
`;

const CardSkills = styled.span`
  font-size: 11.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

// Centered Heading Group (~556px wide on desktop)
const HeadingWrapper = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 620px;
  text-align: center;
  z-index: 20;

  @media (max-width: 1024px) {
    max-width: 520px;
    top: 48%;
  }

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    left: auto;
    transform: none;
    margin: 40px auto;
    max-width: 100%;
  }
`;

const HeadingTitle = styled.h1`
  font-size: clamp(44px, 5.8vw, 84px);
  font-weight: 900;
  line-height: 0.94;
  letter-spacing: -0.04em;
  color: #ffffff;
  text-transform: uppercase;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.25);
  margin: 0;
`;

// Tilted Title Chips
const Chip = styled.div`
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px 8px 12px;
  border-radius: 14px;
  background: ${props => props.$bg || '#ffffff'};
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.22), 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 15;
  transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.25s ease;
  animation: ${floatAnim} 4s ease-in-out infinite;

  --rot: ${props => props.$rot || '0deg'};
  transform: rotate(var(--rot));

  &:hover {
    transform: scale(1.12) rotate(calc(var(--rot) - 3deg)) !important;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.3);
    z-index: 25;
  }

  span.label {
    font-size: 15px;
    font-weight: 800;
    color: #1f2937;
    white-space: nowrap;
    letter-spacing: -0.01em;
  }

  /* Paperclip Loop */
  &::before {
    content: '';
    position: absolute;
    top: -18px;
    left: 19px;
    width: 16px;
    height: 32px;
    border: 3.5px solid ${props => props.$clipColor || '#84cc16'};
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    z-index: 1;
  }
`;

const ChipIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.$color || '#84cc16'};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 2;
  flex-shrink: 0;
`;

// 3 Chips Positioned relative to Heading
const ChipUIUX = styled(Chip)`
  top: -32px;
  right: -110px;
  --rot: 10deg;
  background: #eefdc8;

  @media (max-width: 1024px) {
    right: -40px;
    top: -28px;
  }

  @media (max-width: 768px) {
    top: -24px;
    right: -10px;
    transform: scale(0.85) rotate(var(--rot));
  }
`;

const ChipIllustration = styled(Chip)`
  top: 36%;
  right: -130px;
  --rot: 6deg;
  background: #fedcdd;

  @media (max-width: 1024px) {
    right: -50px;
  }

  @media (max-width: 768px) {
    top: 30%;
    right: -10px;
    transform: scale(0.85) rotate(var(--rot));
  }
`;

const Chip3D = styled(Chip)`
  top: 65%;
  left: -120px;
  --rot: -10deg;
  background: #e2dcfd;

  @media (max-width: 1024px) {
    left: -40px;
  }

  @media (max-width: 768px) {
    top: 60%;
    left: -10px;
    transform: scale(0.85) rotate(var(--rot));
  }
`;

// Bottom Area (~40px from bottom edge)
const BottomArea = styled.div`
  position: absolute;
  bottom: 40px;
  left: 0;
  width: 100%;
  padding: 0 48px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  z-index: 30;

  @media (max-width: 1024px) {
    padding: 0 24px;
    bottom: 24px;
  }

  @media (max-width: 768px) {
    position: static;
    padding: 0;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
`;

// Bottom-Left Supporting Sentence
const BottomLeftText = styled.div`
  max-width: 320px;
  font-size: 19px;
  font-weight: 700;
  line-height: 1.25;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);

  span.sub {
    font-style: italic;
    font-weight: 500;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`;

// Bottom-Right Stacked Project Card Preview
const ProjectStackAnchor = styled.div`
  position: relative;
  width: 290px;
  height: 80px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const SmoothProjectDeck = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 290px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 40;
  cursor: pointer;
`;

const StackCardItem = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.42);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  gap: 14px;
  align-items: center;
  cursor: pointer;
  
  transition: 
    transform 0.48s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.38s ease,
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.35s ease;

  /* Card 1 (Top / ABC1) */
  &.card-1 {
    z-index: 3;
    transform: ${props => (props.$expanded ? 'translateY(-172px) scale(1)' : 'translateY(-14px) scale(0.92)')};
    opacity: ${props => (props.$expanded ? '1' : '0.65')};
    transition-delay: ${props => (props.$expanded ? '0.04s' : '0s')};
  }

  /* Card 2 (Middle / ABC2) */
  &.card-2 {
    z-index: 4;
    transform: ${props => (props.$expanded ? 'translateY(-86px) scale(1)' : 'translateY(-7px) scale(0.96)')};
    opacity: ${props => (props.$expanded ? '1' : '0.82')};
    transition-delay: ${props => (props.$expanded ? '0.02s' : '0s')};
  }

  /* Card 3 (Bottom / ABC3) */
  &.card-3 {
    z-index: 5;
    transform: translateY(0) scale(1);
    opacity: 1;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.32);
    border-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0 14px 38px rgba(0, 0, 0, 0.22);
  }

  img {
    width: 52px;
    height: 52px;
    border-radius: 10px;
    object-fit: cover;
    border: 1px solid rgba(255, 255, 255, 0.4);
    flex-shrink: 0;
  }
`;

const CardDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CardTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10.5px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.85);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const CardTitle = styled.span`
  font-size: 18px;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -0.02em;
  line-height: 1.2;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
`;

const CaseStudyLink = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 2px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const projectsData = [
  {
    id: 'abc1',
    name: 'ABC1',
    tool: 'FIGMA',
    year: '2026',
    thumbnail: '/assets/project-abc1.png',
    subtitle: 'Cherry Bomb Nutrition Label & Brand',
    description: 'A punchy, retro-pop packaging and brand identity design with vibrant typography and playful nutritional iconography.',
    client: 'Sunoma Sip Co.',
    type: 'Branding',
    className: 'card-1'
  },
  {
    id: 'abc2',
    name: 'ABC2',
    tool: 'FIGMA',
    year: '2026',
    thumbnail: '/assets/project-abc2.png',
    subtitle: 'Laptop in Lavender Botanical Oasis',
    description: 'An atmospheric e-commerce and editorial showcase for botanical wellness and creative computing.',
    client: 'Lavender Studio',
    type: 'Website Design',
    className: 'card-2'
  },
  {
    id: 'abc3',
    name: 'ABC3',
    tool: 'FIGMA',
    year: '2026',
    thumbnail: '/assets/project-abc3.png',
    subtitle: 'Catalyzing Innovation for People With Autism',
    description: 'An empathetic, highly accessible digital brand experience and website designed in Figma for assistive neurodiversity tech.',
    client: 'Autism Foundation',
    type: 'Branding & Website',
    className: 'card-3'
  }
];

export default function HeroSection({ onOpenProject }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [isDeckExpanded, setIsDeckExpanded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const pupilStyle = {
    transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`
  };

  return (
    <HeroWrapper ref={heroRef} id="hero">
      {/* Top Logo */}
      <TopLogo>CREATIE®</TopLogo>

      {/* Profile Availability Card (Left side, ~160px from top, 32px from left) */}
      <ProfileCardAnchor
        onMouseEnter={() => setIsProfileExpanded(true)}
        onMouseLeave={() => setIsProfileExpanded(false)}
      >
        <ProfileCard $expanded={isProfileExpanded}>
          <ProfileTopRow $expanded={isProfileExpanded}>
            <ProfileLeftGroup>
              <AvatarImg
                src="/assets/avatar.png"
                alt="DATLE"
                $expanded={isProfileExpanded}
                onError={(e) => {
                  e.currentTarget.src = '/assets/avatar-cap.png';
                }}
              />
              {!isProfileExpanded && (
                <BadgeInfo>
                  <Status>Available for work</Status>
                  <DesignerName>DATLE - PRODUCT DESIGNER</DesignerName>
                </BadgeInfo>
              )}
            </ProfileLeftGroup>

            <CardEyesBox $expanded={isProfileExpanded}>
              <CardEye>
                <CardPupil style={pupilStyle} />
              </CardEye>
              <CardEye>
                <CardPupil style={pupilStyle} />
              </CardEye>
            </CardEyesBox>
          </ProfileTopRow>

          <CardExpandedBody $expanded={isProfileExpanded}>
            <BadgeInfo>
              <Status>Available for work</Status>
              <DesignerName>DATLE - PRODUCT DESIGNER</DesignerName>
            </BadgeInfo>

            <CardBio>
              I design clean websites, landing pages, and product interfaces that look sharper, feel clearer, and convert better.
            </CardBio>

            <CardSkills>UI/UX Design · Framer · Web Design</CardSkills>
          </CardExpandedBody>
        </ProfileCard>
      </ProfileCardAnchor>

      {/* Centered Heading Group with 3 Tilted Title Chips */}
      <HeadingWrapper>
        <HeadingTitle>
          Design that<br />makes<br />people<br />look twice
        </HeadingTitle>

        {/* Chip 1: UI/UX Design (+10° top-right) */}
        <ChipUIUX $rot="10deg" $clipColor="#84cc16">
          <ChipIcon $color="#84cc16">
            <FiMousePointer />
          </ChipIcon>
          <span className="label">UI/UX Design</span>
        </ChipUIUX>

        {/* Chip 2: Illustration (+6° mid-right) */}
        <ChipIllustration $rot="6deg" $clipColor="#ec4899">
          <ChipIcon $color="#ec4899">
            <FiEdit3 />
          </ChipIcon>
          <span className="label">Illustration</span>
        </ChipIllustration>

        {/* Chip 3: 3D Design (-10° bottom-left) */}
        <Chip3D $rot="-10deg" $clipColor="#8b5cf6">
          <ChipIcon $color="#8b5cf6">
            <FiBox />
          </ChipIcon>
          <span className="label">3D Design</span>
        </Chip3D>
      </HeadingWrapper>

      {/* Bottom Area (~40px from bottom edge) */}
      <BottomArea>
        {/* Bottom-Left Supporting Sentence */}
        <BottomLeftText>
          — Not just visuals.<br />
          <span className="sub">i make digital things look alive</span>
        </BottomLeftText>

        {/* Bottom-Right Stacked Project-Card Preview */}
        <ProjectStackAnchor>
          <SmoothProjectDeck
            onMouseEnter={() => setIsDeckExpanded(true)}
            onMouseLeave={() => setIsDeckExpanded(false)}
          >
            {projectsData.map((p) => (
              <StackCardItem
                key={p.id}
                className={p.className}
                $expanded={isDeckExpanded}
                onClick={() => onOpenProject && onOpenProject(p)}
              >
                <img src={p.thumbnail} alt={p.name} />
                <CardDetails>
                  <CardTopRow>
                    <span>{p.tool}</span>
                    <span>{p.year}</span>
                  </CardTopRow>
                  <CardTitle>{p.name}</CardTitle>
                  <CaseStudyLink>
                    VIEW CASE STUDY <FiArrowRight />
                  </CaseStudyLink>
                </CardDetails>
              </StackCardItem>
            ))}
          </SmoothProjectDeck>
        </ProjectStackAnchor>
      </BottomArea>
    </HeroWrapper>
  );
}
