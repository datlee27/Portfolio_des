import { useState } from 'react';
import styled from 'styled-components';
import { FiMail, FiCheck, FiArrowUp, FiArrowUpRight } from 'react-icons/fi';
import { FaInstagram, FaBehance } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import profile from '../../../data/profile';

const SectionWrapper = styled.footer`
  max-width: 1280px;
  margin: 0 auto;
  padding: 60px 24px 40px;

  @media (max-width: 768px) {
    padding: 40px 16px 30px;
  }
`;

const CTAContainer = styled.div`
  position: relative;
  border-radius: 32px;
  padding: 70px 48px;
  background: linear-gradient(135deg, #181a26 0%, #10121a 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 60px;

  @media (max-width: 640px) {
    padding: 40px 20px;
  }
`;

const GlowEffect = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 250px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%);
  filter: blur(60px);
  pointer-events: none;
`;

const CTAPretilte = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #a5b4fc;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 12px;
  z-index: 1;
`;

const CTATitle = styled.h2`
  font-size: clamp(32px, 5vw, 54px);
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.03em;
  max-width: 700px;
  line-height: 1.15;
  margin-bottom: 20px;
  z-index: 1;
`;

const CTADesc = styled.p`
  font-size: 16px;
  color: #94a3b8;
  max-width: 520px;
  line-height: 1.6;
  margin-bottom: 36px;
  z-index: 1;
`;

const ActionButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 1;
`;

const MainEmailButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  border-radius: 100px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(79, 70, 229, 0.4);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(79, 70, 229, 0.6);
    filter: brightness(1.1);
  }
`;

const CopyEmailBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #f1f5f9;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const BottomBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const Copyright = styled.p`
  font-size: 13px;
  color: #64748b;
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const BackToTop = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #94a3b8;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }
`;

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SectionWrapper id="contact">
      <CTAContainer>
        <GlowEffect />
        <CTAPretilte>Get in touch</CTAPretilte>
        <CTATitle>Have an ambitious project in mind? Let's build it.</CTATitle>
        <CTADesc>
          Currently accepting select brand identity, art direction, and editorial photography commissions worldwide.
        </CTADesc>

        <ActionButtonGroup>
          <MainEmailButton href={`mailto:${profile.email}`}>
            <FiMail /> Send an Email <FiArrowUpRight />
          </MainEmailButton>

          <CopyEmailBtn onClick={handleCopy}>
            {copied ? (
              <>
                <FiCheck style={{ color: '#10b981' }} />
                <span>Email Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <FiMail />
                <span>Copy Email ({profile.email})</span>
              </>
            )}
          </CopyEmailBtn>
        </ActionButtonGroup>
      </CTAContainer>

      <BottomBar>
        <Copyright>
          © {new Date().getFullYear()} {profile.name}. All rights reserved. Crafted with React & Styled Components.
        </Copyright>

        <SocialLinks>
          <SocialIcon
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
          >
            <FaInstagram />
          </SocialIcon>
          <SocialIcon
            href="https://www.behance.net/"
            target="_blank"
            rel="noopener noreferrer"
            title="Behance"
          >
            <FaBehance />
          </SocialIcon>
          <SocialIcon
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="X (Twitter)"
          >
            <FaXTwitter />
          </SocialIcon>
        </SocialLinks>

        <BackToTop onClick={scrollToTop}>
          Back to Top <FiArrowUp />
        </BackToTop>
      </BottomBar>
    </SectionWrapper>
  );
}
