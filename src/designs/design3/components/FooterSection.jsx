import styled from 'styled-components';
import { FiInstagram, FiMail, FiPhone, FiArrowUpRight } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import profile from '../../../data/profile';

const FooterWrapper = styled.footer`
  position: relative;
  background-color: #f5f3ea;
  padding: 20px 24px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 10px 16px 90px;
  }
`;

const LandscapeContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1340px;
  min-height: 520px;
  border-radius: 36px;
  background-image: url('https://framerusercontent.com/images/02RFtEx03DTNa37qOwrWcR7cP8.png');
  background-size: cover;
  background-position: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 48px;

  @media (max-width: 768px) {
    padding: 30px 20px;
    min-height: 440px;
    border-radius: 24px;
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  z-index: 5;

  @media (max-width: 680px) {
    flex-direction: column;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SocialBtn = styled.a`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  text-decoration: none;
  transition: all 0.25s ease;

  &:hover {
    background: #ffffff;
    color: #1f2937;
    transform: translateY(-3px) scale(1.08);
  }
`;

const TopRightText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.35;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  text-align: right;

  @media (max-width: 680px) {
    text-align: left;
    font-size: 16px;
  }
`;

const BottomContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 5;
  margin-top: 60px;
`;

const FooterHeadline = styled.h2`
  font-size: clamp(42px, 7.5vw, 98px);
  font-weight: 900;
  letter-spacing: -0.04em;
  color: #ffffff;
  text-transform: uppercase;
  line-height: 0.95;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
  margin-bottom: 24px;
`;

const FooterSticker = styled.div`
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  z-index: 6;
  font-size: 13px;
  font-weight: 700;
  color: #1f2937;

  --rot: ${props => props.$rot || '0deg'};
  transform: rotate(var(--rot));

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 12px;
    width: 12px;
    height: 20px;
    border: 2.5px solid ${props => props.$clipColor || '#8b5cf6'};
    border-radius: 6px;
  }
`;

const StickerUI = styled(FooterSticker)`
  top: -24px;
  left: 0;
  --rot: -6deg;
  background: #fedcdd;
`;

const Sticker3D = styled(FooterSticker)`
  bottom: -15px;
  left: 30px;
  --rot: 4deg;
  background: #e2dcfd;
`;

const StickerIll = styled(FooterSticker)`
  top: 40%;
  left: 380px;
  --rot: -5deg;
  background: #e0fd72;

  @media (max-width: 900px) {
    display: none;
  }
`;

const ChatButton = styled.a`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 34px;
  border-radius: 100px;
  background: #ffffff;
  color: #111827;
  font-size: 16px;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
    background: #f9fafb;
  }

  @media (max-width: 680px) {
    position: static;
    margin-top: 20px;
  }
`;

const BottomNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1340px;
  margin-top: 30px;
  padding: 0 10px;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 680px) {
    flex-direction: column;
    align-items: center;
  }
`;

const BrandLogo = styled.span`
  font-size: 16px;
  font-weight: 900;
  letter-spacing: -0.5px;
  color: #252525;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
`;

const NavItem = styled.a`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #4b5563;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.2s ease;

  &:hover {
    color: #111827;
  }
`;

export default function FooterSection() {
  return (
    <FooterWrapper id="contact">
      <LandscapeContainer>
        <TopRow>
          <SocialIcons>
            <SocialBtn
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
            >
              <FiInstagram />
            </SocialBtn>
            <SocialBtn
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              title="X (Twitter)"
            >
              <FaXTwitter />
            </SocialBtn>
            <SocialBtn
              href={`mailto:${profile.email}`}
              title="Email"
            >
              <FiMail />
            </SocialBtn>
            <SocialBtn
              href="tel:+123456789"
              title="Call"
            >
              <FiPhone />
            </SocialBtn>
          </SocialIcons>

          <TopRightText>
            — Have an idea?<br />
            Let's turn it into a sharp digital experience.
          </TopRightText>
        </TopRow>

        <BottomContent>
          <StickerUI $clipColor="#ec4899">
            <span>UI/UX Design</span>
          </StickerUI>

          <StickerIll $clipColor="#84cc16">
            <span>Illustration</span>
          </StickerIll>

          <FooterHeadline>
            Let's build<br />something<br />memorable
          </FooterHeadline>

          <Sticker3D $clipColor="#8b5cf6">
            <span>3D Design</span>
          </Sticker3D>

          <ChatButton href={`mailto:${profile.email}`}>
            Let's chat <FiArrowUpRight />
          </ChatButton>
        </BottomContent>
      </LandscapeContainer>

      <BottomNavigation>
        <BrandLogo>CREATIE®</BrandLogo>
        <NavLinks>
          <NavItem href="#about">About</NavItem>
          <NavItem href="#services">Services</NavItem>
          <NavItem href="#projects">Projects</NavItem>
          <NavItem href="#reviews">Reviews</NavItem>
          <NavItem href="#faqs">FAQs</NavItem>
          <NavItem href="#contact">Contact</NavItem>
        </NavLinks>
      </BottomNavigation>
    </FooterWrapper>
  );
}
