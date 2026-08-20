import { useState } from 'react';
import styled from 'styled-components';
import { FaInstagram, FaBehance } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const DockContainer = styled.div`
  position: fixed;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  pointer-events: auto;
`;

const DockBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.25),
    0 1px 3px rgba(0, 0, 0, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.4);
`;

const Divider = styled.div`
  width: 1px;
  height: 30px;
  background: rgba(255, 255, 255, 0.3);
  margin: 0 2px;
`;

const DockItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 10px);
  background: rgba(20, 20, 24, 0.88);
  backdrop-filter: blur(12px);
  color: #f5f5f7;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  opacity: ${props => (props.$visible ? 1 : 0)};
  transform: translateY(${props => (props.$visible ? '0' : '4px')});
  transition: opacity 0.15s ease, transform 0.15s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: rgba(20, 20, 24, 0.88);
  }
`;

const DockIcon = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
  overflow: hidden;
  border: none;
  cursor: pointer;
  background: ${props => props.$bg || 'transparent'};
  color: ${props => props.$color || 'white'};
  font-size: 22px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);

  &:hover {
    transform: translateY(-8px) scale(1.15);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.3);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function DockItem({ label, children, onClick, href, bg, color }) {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <DockItemWrapper
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Tooltip $visible={hovered}>{label}</Tooltip>
      <DockIcon onClick={handleClick} $bg={bg} $color={color}>
        {children}
      </DockIcon>
    </DockItemWrapper>
  );
}

export default function Dock({ onOpenAbout, onOpenNotes }) {
  return (
    <DockContainer>
      <DockBar>
        <DockItem label="About Me" onClick={onOpenAbout} bg="#f5f5f5">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face"
            alt="About Me"
          />
        </DockItem>

        <DockItem
          label="Notes"
          onClick={onOpenNotes}
          bg="linear-gradient(135deg, #fbbf24, #f59e0b)"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
              fill="rgba(255,255,255,0.2)"
            />
            <polyline points="14 2 14 8 20 8" />
            <line x1="8" y1="13" x2="16" y2="13" />
            <line x1="8" y1="17" x2="13" y2="17" />
          </svg>
        </DockItem>

        <Divider />

        <DockItem
          label="Instagram"
          href="https://www.instagram.com/"
          bg="linear-gradient(135deg, #833AB4, #E1306C, #F77737)"
        >
          <FaInstagram />
        </DockItem>

        <DockItem label="X" href="https://x.com/" bg="#111">
          <FaXTwitter />
        </DockItem>

        <DockItem label="Behance" href="https://www.behance.net/" bg="#0057ff">
          <FaBehance />
        </DockItem>
      </DockBar>
    </DockContainer>
  );
}