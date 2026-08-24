import styled from 'styled-components';
import { FiArrowDown, FiStar } from 'react-icons/fi';
import profile from '../../../data/profile';

const HeroSection = styled.section`
  position: relative;
  padding: 80px 24px 60px;
  max-width: 1280px;
  margin: 0 auto;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 40px 16px 40px;
  }
`;

const BackgroundGlow = styled.div`
  position: absolute;
  top: -150px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 70%);
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 960px;
`;

const TagBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 100px;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.25);
  color: #a5b4fc;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 24px;
  backdrop-filter: blur(8px);
`;

const MainHeadline = styled.h1`
  font-size: clamp(38px, 6vw, 68px);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: #ffffff;
  margin-bottom: 24px;

  span.gradient-text {
    background: linear-gradient(135deg, #a5b4fc 0%, #c084fc 50%, #f472b6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(16px, 2vw, 20px);
  line-height: 1.6;
  color: #94a3b8;
  max-width: 720px;
  margin-bottom: 40px;
`;

const CTARow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 60px;
`;

const PrimaryCTA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  border-radius: 100px;
  background: #ffffff;
  color: #090a0f;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.15);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(255, 255, 255, 0.25);
    background: #f1f5f9;
  }
`;

const SecondaryCTA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    color: #ffffff;
    transform: translateY(-2px);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 100%;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 16px;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StatNumber = styled.span`
  font-size: clamp(26px, 3.5vw, 36px);
  font-weight: 800;
  color: #f8fafc;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
`;

const StatLabel = styled.span`
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
`;

export default function Hero() {
  return (
    <HeroSection>
      <BackgroundGlow />
      <ContentWrapper>
        <TagBadge>
          <FiStar /> Visual Director & Editorial Photographer
        </TagBadge>

        <MainHeadline>
          Capturing the <span className="gradient-text">unspoken poetry</span> between light and form.
        </MainHeadline>

        <Subtitle>
          {profile.bio[0]} {profile.bio[1]}
        </Subtitle>

        <CTARow>
          <PrimaryCTA href="#work">
            Explore Selected Works <FiArrowDown />
          </PrimaryCTA>
          <SecondaryCTA href="#about">
            About & Creative Vision
          </SecondaryCTA>
        </CTARow>

        <StatsGrid>
          <StatItem>
            <StatNumber>8+ Years</StatNumber>
            <StatLabel>Creative Direction & Design</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>15+ Shoots</StatNumber>
            <StatLabel>Commercial & Brand Films</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>8,500+</StatNumber>
            <StatLabel>Weekly Newsletter Readers</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>NYC</StatNumber>
            <StatLabel>Based in Brooklyn & Worldwide</StatLabel>
          </StatItem>
        </StatsGrid>
      </ContentWrapper>
    </HeroSection>
  );
}
