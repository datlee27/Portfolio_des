import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiBox, FiFolder } from 'react-icons/fi';
import d3Projects from '../../design3/data/d3Projects';
import profile from '../../../data/profile';
import ProjectModalD3 from '../../design3/components/ProjectModalD3';

/* ─── Pointer Drag Hook for Free Canvas Movement ─── */
function usePointerDrag() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ mouseX: 0, mouseY: 0, startX: 0, startY: 0, hasMoved: false });

  const onPointerDown = useCallback((e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: offset.x,
      startY: offset.y,
      hasMoved: false,
    };
  }, [offset]);

  const onPointerMove = useCallback((e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragRef.current.mouseX;
    const dy = e.clientY - dragRef.current.mouseY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      dragRef.current.hasMoved = true;
    }
    setOffset({
      x: dragRef.current.startX + dx,
      y: dragRef.current.startY + dy,
    });
  }, [isDragging]);

  const onPointerUp = useCallback((e) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    setIsDragging(false);
  }, []);

  return { offset, isDragging, onPointerDown, onPointerMove, onPointerUp, dragRef };
}

/* ─── Draggable Wrapper Component ─── */
function DraggableItem({ children, style, onDoubleClick, onClick }) {
  const { offset, isDragging, onPointerDown, onPointerMove, onPointerUp, dragRef } = usePointerDrag();

  const handleClick = (e) => {
    if (!dragRef.current.hasMoved && onClick) {
      onClick(e);
    }
  };

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      style={{
        position: 'absolute',
        ...style,
        transform: `translate(${offset.x}px, ${offset.y}px) ${style?.transform || ''} ${isDragging ? 'scale(1.1)' : 'scale(1)'}`,
        transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
        userSelect: 'none',
        zIndex: isDragging ? 100 : (style?.zIndex || 25),
      }}
    >
      {children}
    </div>
  );
}

/* ─── Animations ─── */
const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(0.8); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.96) translateY(12px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

/* ─── Layout ─── */
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
  padding: 44px 40px 100px;

  @media (max-width: 768px) {
    padding: 40px 16px 100px;
  }
`;

/* ─── macOS Top Menu Bar ─── */
const MenuBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 32px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.01em;
`;

const MenuBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MenuBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
`;

const MenuLink = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.15s ease;
  font-family: inherit;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

/* ─── Profile Card (Top Left) ─── */
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

/* ─── Top Right Actions (Eyes + Start Project) ─── */
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

/* ─── Center Headline ─── */
const CenterHeadline = styled.div`
  text-align: center;
  margin: auto 0;
  position: relative;
  z-index: 20;
  padding: 40px 0;
  pointer-events: none;
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

/* ─── Sticky Pill Notes ─── */
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
  pointer-events: none;
`;

/* ─── Bottom Row ─── */
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

/* ─── macOS Dock ─── */
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

/* ─── Project Card Stack ─── */
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
  }
  img {
    width: 52px;
    height: 52px;
    border-radius: 10px;
    object-fit: cover;
    border: 1px solid rgba(255, 255, 255, 0.5);
  }
`;

/* ─── macOS Popup Modal ─── */
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

/* ─── Scattered Desktop Files (Natural scattered positions across canvas) ─── */
const scatteredFiles = [
  {
    id: 'potato',
    name: 'Potato.mp4',
    type: 'video',
    src: 'https://framerusercontent.com/images/iDpKtY2oV6OvljhJW4kHNQGjI.jpg',
    thumb: 'https://framerusercontent.com/images/iDpKtY2oV6OvljhJW4kHNQGjI.jpg',
    pos: { top: '14%', right: '14%' },
  },
  {
    id: 'render-module',
    name: 'RenderModule.jpg',
    type: 'image',
    src: 'https://framerusercontent.com/images/X8myVwtMo16ZEsQelWClzF74xPw.jpg',
    thumb: 'https://framerusercontent.com/images/X8myVwtMo16ZEsQelWClzF74xPw.jpg',
    pos: { top: '15%', right: '5%' },
  },
  {
    id: 'z08',
    name: 'Z08.gif',
    type: 'gif',
    src: 'https://framerusercontent.com/images/Spt7teMP6KDHT08iHgXYdOgs.png',
    thumb: 'https://framerusercontent.com/images/Spt7teMP6KDHT08iHgXYdOgs.png',
    pos: { top: '32%', right: '13%' },
  },
  {
    id: 'uber-ride',
    name: 'UberRide.mp4',
    type: 'video',
    src: 'https://framerusercontent.com/images/tns9BIsxi9ZPfJlYFmiaiglW50.jpg',
    thumb: 'https://framerusercontent.com/images/tns9BIsxi9ZPfJlYFmiaiglW50.jpg',
    pos: { top: '33%', right: '4%' },
  },
  {
    id: 'r02',
    name: 'R02.gif',
    type: 'gif',
    src: 'https://framerusercontent.com/images/9wOFWrQGVxJzMXcPZuQobyXiM.jpg',
    thumb: 'https://framerusercontent.com/images/9wOFWrQGVxJzMXcPZuQobyXiM.jpg',
    pos: { top: '50%', right: '14%' },
  },
  {
    id: 'byte-events',
    name: 'ByteEvents.gif',
    type: 'gif',
    src: 'https://framerusercontent.com/images/5mZU8QfD43IH1oX4kuDcGYBDNCM.jpg',
    thumb: 'https://framerusercontent.com/images/5mZU8QfD43IH1oX4kuDcGYBDNCM.jpg',
    pos: { top: '51%', right: '5%' },
  },
  {
    id: 'purple-cat',
    name: 'PurpleCat.jpg',
    type: 'image',
    src: 'https://framerusercontent.com/images/8qIPmYi49ztFkAtaqMoUOA5gZ90.png',
    thumb: 'https://framerusercontent.com/images/8qIPmYi49ztFkAtaqMoUOA5gZ90.png',
    pos: { top: '68%', right: '14%' },
  },
  {
    id: 'panic-crew',
    name: 'PanicCrew.jpg',
    type: 'image',
    src: 'https://framerusercontent.com/images/hUcPxBgIpauMuzlmdEcZWvFiQMU.jpg',
    thumb: 'https://framerusercontent.com/images/hUcPxBgIpauMuzlmdEcZWvFiQMU.jpg',
    pos: { top: '69%', right: '5%' },
  },
];

/* ─── Scattered Desktop File Icon Component ─── */
function ScatteredFileItem({ file, onPreview }) {
  const typeIcon = file.type === 'video' ? '🎬' : file.type === 'gif' ? '✨' : '🖼️';
  return (
    <DraggableItem
      style={{
        ...file.pos,
        zIndex: 28,
      }}
      onClick={() => onPreview(file)}
      onDoubleClick={() => onPreview(file)}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        width: 80,
        pointerEvents: 'none',
      }}>
        <div style={{
          width: 68,
          height: 52,
          borderRadius: 8,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.45)',
          boxShadow: '0 8px 22px rgba(0,0,0,0.3)',
          position: 'relative',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(10px)',
        }}>
          <img
            src={file.thumb}
            alt={file.name}
            draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <span style={{
            position: 'absolute',
            bottom: 2,
            right: 3,
            fontSize: 10,
          }}>
            {typeIcon}
          </span>
        </div>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          color: '#ffffff',
          textShadow: '0 1px 4px rgba(0,0,0,0.7)',
          textAlign: 'center',
          lineHeight: 1.15,
          maxWidth: 80,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {file.name}
        </span>
      </div>
    </DraggableItem>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/* ─── MAIN COMPONENT ─── */
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function Des4LabView({ onBack }) {
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [stackExpanded, setStackExpanded] = useState(false);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  // Clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      setCurrentTime(`${months[now.getMonth()]} ${now.getDate()}  ${h12}:${m} ${ampm}`);
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  // Googly eyes
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

  const projects = d3Projects.slice(0, 3);

  return (
    <Wrapper>

      {/* ─── macOS Top Menu Bar ─── */}
      <MenuBar>
        <MenuBarLeft>
          <span style={{ fontSize: 16, cursor: 'pointer' }} onClick={onBack} title="Back to Home">🍎</span>
          <MenuLink onClick={onBack} style={{ fontWeight: 800 }}>← Back to Overview</MenuLink>
          <MenuLink onClick={onBack}>Work</MenuLink>
          <MenuLink onClick={() => setActivePopup('notes')}>About</MenuLink>
        </MenuBarLeft>
        <MenuBarRight>
          <span>🔋</span>
          <span>📶</span>
          <span style={{ fontWeight: 600 }}>{currentTime}</span>
        </MenuBarRight>
      </MenuBar>

      {/* ─── Top Row: Profile + Eyes + Start Project ─── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', zIndex: 50, position: 'relative' }}>
        {/* Profile Card */}
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

        {/* Eyes & Start Project */}
        <TopRightActions>
          <EyesWrapper>
            <Eye><Pupil $x={pupilPos.x} $y={pupilPos.y} /></Eye>
            <Eye><Pupil $x={pupilPos.x} $y={pupilPos.y} /></Eye>
          </EyesWrapper>
          <StartProjectBtn onClick={() => setActivePopup('mail')}>
            <span>Start a Project</span>
            <FiBox />
          </StartProjectBtn>
        </TopRightActions>
      </div>

      {/* ─── Draggable Sticky Notes & Icons ─── */}

      {/* 1. Purple: "Not Just Visuals." */}
      <DraggableItem style={{ top: '18%', left: '10%' }}>
        <PillNote $bg="rgba(192, 132, 252, 0.45)" $color="#ffffff">
          <span>📎</span><span>Not Just Visuals.</span>
        </PillNote>
      </DraggableItem>

      {/* 2. Cursor Arrow */}
      <DraggableItem style={{ top: '26%', left: '9%' }}>
        <div style={{ fontSize: 32, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))', pointerEvents: 'none' }}>↖️</div>
      </DraggableItem>

      {/* 3. Cloud */}
      <DraggableItem style={{ top: '17%', left: '30%' }}>
        <div style={{ fontSize: 28, opacity: 0.85, pointerEvents: 'none' }}>☁️</div>
      </DraggableItem>

      {/* 4. Striped Pink Circle */}
      <DraggableItem style={{ top: '22%', right: '22%' }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'repeating-linear-gradient(45deg, #f472b6, #f472b6 4px, #db2777 4px, #db2777 8px)',
          boxShadow: '0 6px 18px rgba(0,0,0,0.25)', pointerEvents: 'none',
        }} />
      </DraggableItem>

      {/* 5. Pink: "I Make Digital Things Look Alive" */}
      <DraggableItem style={{ top: '38%', right: '18%' }}>
        <PillNote $bg="rgba(251, 207, 232, 0.55)" $color="#111827">
          <span>📎</span><span>I Make Digital Things Look Alive</span>
        </PillNote>
      </DraggableItem>

      {/* 6. Red flower */}
      <DraggableItem style={{ top: '48%', right: '24%' }}>
        <div style={{ fontSize: 32, color: '#ef4444', filter: 'drop-shadow(0 4px 12px rgba(239,68,68,0.4))', pointerEvents: 'none' }}>✹</div>
      </DraggableItem>

      {/* 7. Pen Tool */}
      <DraggableItem style={{ bottom: '30%', left: '16%' }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
          border: '1px solid rgba(255,255,255,0.6)', pointerEvents: 'none',
        }}>✒️</div>
      </DraggableItem>

      {/* 8. Green: "UI/UX & Brand Systems" */}
      <DraggableItem style={{ bottom: '25%', left: '22%' }}>
        <PillNote $bg="rgba(187, 247, 208, 0.55)" $color="#111827">
          <span>📎</span><span>UI/UX & Brand Systems</span>
        </PillNote>
      </DraggableItem>

      {/* 9. Lightbulb & Pencil */}
      <DraggableItem style={{ bottom: '26%', right: '26%' }}>
        <div style={{ display: 'flex', gap: 4, fontSize: 28, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))', pointerEvents: 'none' }}>
          <span>💡</span><span>✏️</span>
        </div>
      </DraggableItem>

      {/* ─── 8 Scattered Desktop File Icons (Right Side Area) ─── */}
      {scatteredFiles.map((file) => (
        <ScatteredFileItem
          key={file.id}
          file={file}
          onPreview={setPreviewFile}
        />
      ))}

      {/* ─── Center Headline ─── */}
      <CenterHeadline>
        <HeadlineText>
          <div>DESIGN THAT</div>
          <div>MAKES PEOPLE</div>
          <div>LOOK TWICE</div>
        </HeadlineText>
      </CenterHeadline>

      {/* ─── Bottom Row ─── */}
      <BottomRow>
        <MissionText>
          I design clean websites, apps, and brand systems that help ideas look sharper, feel trusted, and work with purpose.
        </MissionText>

        {/* Project Card Stack */}
        <StackContainer
          onMouseEnter={() => setStackExpanded(true)}
          onMouseLeave={() => setStackExpanded(false)}
          onClick={() => setStackExpanded(!stackExpanded)}
        >
          <StackCard className="card-top" $expanded={stackExpanded} onClick={(e) => { e.stopPropagation(); setSelectedProject(projects[2]); }}>
            <img src={projects[2]?.thumbnail || projects[2]?.image} alt={projects[2]?.name} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 10, fontWeight: 700, opacity: 0.8 }}>FIGMA • 2026</span>
              <span style={{ fontSize: 13, fontWeight: 800 }}>{projects[2]?.name}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#ffe815' }}>VIEW CASE STUDY →</span>
            </div>
          </StackCard>
          <StackCard className="card-mid" $expanded={stackExpanded} onClick={(e) => { e.stopPropagation(); setSelectedProject(projects[1]); }}>
            <img src={projects[1]?.thumbnail || projects[1]?.image} alt={projects[1]?.name} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 10, fontWeight: 700, opacity: 0.8 }}>BRAND • 2026</span>
              <span style={{ fontSize: 13, fontWeight: 800 }}>{projects[1]?.name}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#ffe815' }}>VIEW CASE STUDY →</span>
            </div>
          </StackCard>
          <StackCard className="card-bot" $expanded={stackExpanded} onClick={(e) => { e.stopPropagation(); setSelectedProject(projects[0]); }}>
            <img src={projects[0]?.thumbnail || projects[0]?.image} alt={projects[0]?.name} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 10, fontWeight: 700, opacity: 0.8 }}>FIGMA • 2026</span>
              <span style={{ fontSize: 13, fontWeight: 800 }}>{projects[0]?.name}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#ffe815' }}>VIEW CASE STUDY →</span>
            </div>
          </StackCard>
        </StackContainer>
      </BottomRow>

      {/* ─── macOS Dock ─── */}
      <Dock>
        <DockButton onClick={() => setActivePopup('mail')} title="Mail">
          <img src="https://framerusercontent.com/images/EVSY45U60gTa9UjvovzPTZx7Hw.png?width=180&height=180" alt="Mail" />
        </DockButton>
        <DockButton onClick={() => setActivePopup('notes')} title="Notes">
          <img src="https://framerusercontent.com/images/ZAH3C8amQUigspCjEG1FJWPjI.png?width=180&height=180" alt="Notes" />
        </DockButton>
        <DockButton onClick={() => setActivePopup('photos')} title="Photos">
          <img src="https://framerusercontent.com/images/VCIQF7ylF9U0o5QZkTgji0mxx28.png?width=180&height=180" alt="Photos" />
        </DockButton>
        <DockButton onClick={() => setActivePopup('finder')} title="Finder">
          <img src="https://framerusercontent.com/images/jC3NYM1gkKdVNzokU0ojtj01asg.png?width=180&height=180" alt="Finder" />
        </DockButton>
      </Dock>

      {/* ─── Project Case Study Modal ─── */}
      {selectedProject && (
        <ProjectModalD3 project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      {/* ─── File Preview Modal ─── */}
      {previewFile && (
        <ModalOverlay onClick={() => setPreviewFile(null)}>
          <MacOSWindow $width="750px" onClick={(e) => e.stopPropagation()}>
            <WindowHeader>
              <TrafficDots>
                <span className="red" onClick={() => setPreviewFile(null)} />
                <span className="yellow" onClick={() => setPreviewFile(null)} />
                <span className="green" />
              </TrafficDots>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
                Preview – {previewFile.name}
              </span>
              <div style={{ width: 40 }} />
            </WindowHeader>
            <div style={{ padding: 0, background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 380 }}>
              <img
                src={previewFile.src}
                alt={previewFile.name}
                style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </MacOSWindow>
        </ModalOverlay>
      )}

      {/* ─── Dock Popup Modals (Notes / Photos / Finder / Mail) ─── */}
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
              {activePopup === 'notes' && (
                <div>
                  <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 12px 0' }}>About Dat Le</h3>
                  <p style={{ lineHeight: 1.7, color: '#4b5563', fontSize: 15 }}>{profile.bio.join(' ')}</p>
                  <div style={{ marginTop: 20, padding: 16, background: '#f9fafb', borderRadius: 12, border: '1px solid #e5e7eb' }}>
                    <strong>📍 Location:</strong> {profile.location.name}<br />
                    <strong>✉️ Email:</strong> {profile.email}
                  </div>
                </div>
              )}
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
              {activePopup === 'mail' && (
                <div>
                  <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 8px 0' }}>Start a Project</h3>
                  <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 20 }}>Have an exciting idea? Send a message directly.</p>
                  <form onSubmit={(e) => { e.preventDefault(); alert('Message sent! Thank you.'); setActivePopup(null); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <input type="text" placeholder="Your Name" required style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14 }} />
                    <input type="email" placeholder="Your Email" required style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14 }} />
                    <textarea rows="4" placeholder="Tell me about your project..." required style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14 }} />
                    <button type="submit" style={{ padding: '12px', background: '#111827', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Send Message</button>
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
