import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiMail, FiArrowUpRight, FiCheck } from 'react-icons/fi';
import profile from '../../../data/profile';

const NavWrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 80;
  transition: background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease;
  background: ${props => (props.$scrolled ? 'rgba(10, 11, 15, 0.85)' : 'transparent')};
  backdrop-filter: ${props => (props.$scrolled ? 'blur(16px)' : 'none')};
  -webkit-backdrop-filter: ${props => (props.$scrolled ? 'blur(16px)' : 'none')};
  border-bottom: 1px solid ${props => (props.$scrolled ? 'rgba(255, 255, 255, 0.08)' : 'transparent')};
`;

const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 14px 16px;
  }
`;

const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  cursor: pointer;
`;

const LogoBox = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 16px;
  color: white;
  letter-spacing: -0.5px;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
`;

const BrandName = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #f3f4f6;
  letter-spacing: -0.3px;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #10b981;
  font-weight: 500;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #10b981;
    box-shadow: 0 0 8px #10b981;
    animation: pulse 2s infinite ease-in-out;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.85); }
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 28px;

  @media (max-width: 820px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-size: 14px;
  font-weight: 500;
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.2s ease;
  position: relative;

  &:hover {
    color: #f9fafb;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: #6366f1;
    transition: width 0.25s ease;
    border-radius: 2px;
  }

  &:hover::after {
    width: 100%;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CopyButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #e5e7eb;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.25);
    color: #ffffff;
    transform: translateY(-1px);
  }

  @media (max-width: 640px) {
    padding: 8px 12px;
    font-size: 12px;
  }
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 100px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(79, 70, 229, 0.5);
    filter: brightness(1.1);
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <NavWrapper $scrolled={scrolled}>
      <NavContainer>
        <Brand href="#work">
          <LogoBox>DL</LogoBox>
          <BrandText>
            <BrandName>{profile.name}</BrandName>
            <StatusBadge>Available for Q1/Q2</StatusBadge>
          </BrandText>
        </Brand>

        <NavLinks>
          <NavLink href="#work">Selected Works</NavLink>
          <NavLink href="#about">About & Vision</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </NavLinks>

        <Actions>
          <CopyButton onClick={handleCopyEmail}>
            {copied ? (
              <>
                <FiCheck style={{ color: '#10b981' }} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <FiMail />
                <span>{profile.email}</span>
              </>
            )}
          </CopyButton>

          <PrimaryButton href="#contact">
            Let's Talk <FiArrowUpRight />
          </PrimaryButton>
        </Actions>
      </NavContainer>
    </NavWrapper>
  );
}
