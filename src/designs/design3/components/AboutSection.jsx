import styled from 'styled-components';
import { FiPaperclip } from 'react-icons/fi';

const SectionWrapper = styled.section`
  position: relative;
  background-color: #f5f3ea;
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  padding: 100px 24px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 16px 40px;
  }
`;

// Pinned section tag
const SectionTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 10px;
  background: #bbdafe;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  transform: rotate(-3deg);
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
    font-size: 14px;
    font-weight: 800;
    color: #1e3a8a;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(36px, 6vw, 68px);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #252525;
  text-transform: uppercase;
  max-width: 840px;
  line-height: 1.05;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: clamp(16px, 2.2vw, 22px);
  font-weight: 500;
  color: #4b5563;
  max-width: 700px;
  line-height: 1.5;
  margin-bottom: 32px;
`;

const StartProjectBadge = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.12);
  color: #1f2937;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  position: relative;
  margin-bottom: 60px;
  transform: rotate(2deg);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  /* Red pushpin */
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 12px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #ef4444;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  }

  &:hover {
    transform: scale(1.08) rotate(0deg);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

const StatsRow = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 1240px;
  flex-wrap: wrap;
  padding: 10px 0;
`;

const StatPolaroid = styled.div`
  position: relative;
  flex: 1;
  min-width: 240px;
  max-width: 290px;
  background: #ffffff;
  border-radius: 16px;
  padding: 30px 24px 28px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
  overflow: hidden;

  --rot: ${props => props.$rot || '0deg'};
  transform: rotate(var(--rot));

  /* Red Pushpin at top left */
  &::before {
    content: '';
    position: absolute;
    top: 14px;
    left: 16px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ef4444;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    z-index: 5;
  }

  /* Neon green decorative corner tab */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 36px;
    height: 36px;
    background: #e0fd72;
    clip-path: polygon(0 0, 100% 0, 100% 100%);
  }

  &:hover {
    transform: translateY(-8px) scale(1.05) rotate(0deg);
    box-shadow: 0 24px 50px rgba(0, 0, 0, 0.14);
    z-index: 10;
  }
`;

const StatNumber = styled.span`
  font-size: 52px;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #1f2937;
  line-height: 1;
  margin-top: 14px;
  margin-bottom: 12px;
`;

const StatTitle = styled.h3`
  font-size: 17px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 8px;
`;

const StatDesc = styled.p`
  font-size: 13.5px;
  line-height: 1.5;
  color: #6b7280;
`;

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      <SectionTag>
        <FiPaperclip />
        <span>About</span>
      </SectionTag>

      <SectionTitle>
        I make designs<br />people remember
      </SectionTitle>

      <Subtitle>
        I design clean websites, apps, and brand systems that help ideas look sharper, feel trusted — and work with purpose.
      </Subtitle>

      <StartProjectBadge href="#contact">
        Start a project
      </StartProjectBadge>

      <StatsRow>
        <StatPolaroid $rot="-3.5deg">
          <StatNumber>8+</StatNumber>
          <StatTitle>Years of Experience</StatTitle>
          <StatDesc>
            Designing websites, apps, and digital products with a clear focus on usability.
          </StatDesc>
        </StatPolaroid>

        <StatPolaroid $rot="2deg">
          <StatNumber>40+</StatNumber>
          <StatTitle>Projects Designed</StatTitle>
          <StatDesc>
            From landing pages to mobile apps, and complete Framer website experiences.
          </StatDesc>
        </StatPolaroid>

        <StatPolaroid $rot="-4deg">
          <StatNumber>12+</StatNumber>
          <StatTitle>Industries explored</StatTitle>
          <StatDesc>
            Worked across SaaS, fintech, AI, agencies, finance, and service businesses.
          </StatDesc>
        </StatPolaroid>

        <StatPolaroid $rot="3deg">
          <StatNumber>100%</StatNumber>
          <StatTitle>Framer Native</StatTitle>
          <StatDesc>
            Responsive Framer websites designed, built, and published.
          </StatDesc>
        </StatPolaroid>
      </StatsRow>
    </SectionWrapper>
  );
}
