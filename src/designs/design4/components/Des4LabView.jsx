import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  Wifi,
  Search,
  SlidersHorizontal,
  Volume2,
  Folder,
  FileText,
  Terminal as TerminalIcon,
  Mail,
  ExternalLink,
  X,
  Check,
  Globe,
  Sun,
  Laptop,
  Send,
  Sparkles,
  ArrowRight,
  Maximize2,
  Minimize2,
  Layers,
  Code2,
} from 'lucide-react';
import { featuredProjects, siteMeta } from '../data/homeData';
import profile from '../../../data/profile';
import ProjectModalD4 from './ProjectModalD4';

/* ─── macOS Traffic Light Buttons ─── */
function TrafficLightsGroup({ onClose }) {
  return (
    <TrafficDots>
      <button
        type="button"
        className="traffic-dot red"
        title="Close window (Đóng)"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        onPointerDown={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        className="traffic-dot yellow"
        title="Minimize (Thu nhỏ / Đóng)"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        onPointerDown={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        className="traffic-dot green"
        title="Zoom / Close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        onPointerDown={(e) => e.stopPropagation()}
      />
    </TrafficDots>
  );
}

/* ─── macOS Battery Indicator ─── */
function MacOSBattery({ percentage = 100 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600 }}>
      <span>{percentage}%</span>
      <div
        style={{
          width: 22,
          height: 11,
          borderRadius: 3,
          border: '1px solid rgba(255, 255, 255, 0.75)',
          padding: 1,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: '#22c55e',
            borderRadius: 1.5,
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: -3,
            top: 2.5,
            width: 1.5,
            height: 4,
            background: 'rgba(255, 255, 255, 0.75)',
            borderRadius: '0 1px 1px 0',
          }}
        />
      </div>
    </div>
  );
}

/* ─── Sample Creative Shots / Experiments Data ─── */
const CREATIVE_SHOTS = [
  {
    id: 'potato',
    name: 'Potato.mp4',
    type: 'video',
    src: 'https://framerusercontent.com/images/X8myVwtMo16ZEsQelWClzF74xPw.jpg',
    thumb: 'https://framerusercontent.com/images/X8myVwtMo16ZEsQelWClzF74xPw.jpg',
    title: '3D Procedural Texture & Light Simulation',
  },
  {
    id: 'z08',
    name: 'Z08.gif',
    type: 'gif',
    src: 'https://framerusercontent.com/images/Spt7teMP6KDHT08iHgXYdOgs.png',
    thumb: 'https://framerusercontent.com/images/Spt7teMP6KDHT08iHgXYdOgs.png',
    title: 'Character Animation & Dynamic Rigidbodies',
  },
  {
    id: 'uber-ride',
    name: 'UberRide.mp4',
    type: 'video',
    src: 'https://framerusercontent.com/images/tns9BIsxi9ZPfJlYFmiaiglW50.jpg',
    thumb: 'https://framerusercontent.com/images/tns9BIsxi9ZPfJlYFmiaiglW50.jpg',
    title: 'Kinetic Typography & Micro-interactions',
  },
  {
    id: 'r02',
    name: 'R02.gif',
    type: 'gif',
    src: 'https://framerusercontent.com/images/9wOFWrQGVxJzMXcPZuQobyXiM.jpg',
    thumb: 'https://framerusercontent.com/images/9wOFWrQGVxJzMXcPZuQobyXiM.jpg',
    title: 'Cyberpunk UI HUD & Particle Trails',
  },
  {
    id: 'byte-events',
    name: 'ByteEvents.gif',
    type: 'gif',
    src: 'https://framerusercontent.com/images/5mZU8QfD43IH1oX4kuDcGYBDNCM.jpg',
    thumb: 'https://framerusercontent.com/images/5mZU8QfD43IH1oX4kuDcGYBDNCM.jpg',
    title: 'Event-Driven Real-time Animation',
  },
  {
    id: 'purple-cat',
    name: 'PurpleCat.jpg',
    type: 'image',
    src: 'https://framerusercontent.com/images/8qIPmYi49ztFkAtaqMoUOA5gZ90.png',
    thumb: 'https://framerusercontent.com/images/8qIPmYi49ztFkAtaqMoUOA5gZ90.png',
    title: 'Vector Character Concept Art',
  },
];

/* ─── Pointer Drag Hook for Windows (Silky 2D Dragging) ─── */
function useDraggableWindow(initialPos = { x: 0, y: 0 }) {
  const [pos, setPos] = useState(initialPos);
  const dragRef = useRef({ isDragging: false, startX: 0, startY: 0, startPosX: 0, startPosY: 0 });

  const onPointerDown = useCallback((e) => {
    // Only drag from header, ignore buttons, inputs, traffic lights
    if (
      e.target.closest('button') ||
      e.target.closest('input') ||
      e.target.closest('textarea') ||
      e.target.closest('a') ||
      e.target.closest('.traffic-dot')
    ) {
      return;
    }
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startPosX: pos.x,
      startPosY: pos.y,
    };
  }, [pos]);

  const onPointerMove = useCallback((e) => {
    if (!dragRef.current.isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPos({
      x: dragRef.current.startPosX + dx,
      y: dragRef.current.startPosY + dy,
    });
  }, []);

  const onPointerUp = useCallback((e) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    dragRef.current.isDragging = false;
  }, []);

  return { pos, onPointerDown, onPointerMove, onPointerUp };
}

/* ─── Styled Components ─── */
const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('/assets/hero-background.png');
  background-size: cover;
  background-position: center;
  overflow: hidden;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue',
    sans-serif;
  color: #ffffff;
`;

const MenuBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 28px;
  background: rgba(20, 25, 35, 0.45);
  backdrop-filter: blur(35px) saturate(200%);
  -webkit-backdrop-filter: blur(35px) saturate(200%);
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.16);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

const MenuBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MenuBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 12px;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.95);
  font-size: 13px;
  font-weight: ${props => (props.$bold ? '700' : '500')};
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.15s ease;
  font-family: inherit;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 32px;
  left: ${props => props.$left || '12px'};
  background: rgba(30, 32, 40, 0.82);
  backdrop-filter: blur(30px) saturate(220%);
  -webkit-backdrop-filter: blur(30px) saturate(220%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 8px;
  padding: 5px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
  min-width: 210px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const DropdownItem = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 12.5px;
  font-weight: 500;
  text-align: left;
  padding: 5px 12px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-family: inherit;

  &:hover {
    background: #007aff;
    color: #ffffff;
  }
`;

const DropdownDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.12);
  margin: 4px 6px;
`;

/* ─── Desktop Area & Icons ─── */
const DesktopGrid = styled.div`
  position: absolute;
  top: 40px;
  right: 24px;
  bottom: 90px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap-reverse;
  align-content: flex-end;
  gap: 20px 24px;
  z-index: 20;
  pointer-events: auto;
`;

const DesktopIconItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 84px;
  cursor: pointer;
  padding: 6px 4px;
  border-radius: 6px;
  background: ${props => (props.$selected ? 'rgba(0, 122, 255, 0.45)' : 'transparent')};
  border: 1px solid ${props => (props.$selected ? 'rgba(0, 122, 255, 0.8)' : 'transparent')};
  transition: background 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`;

const DesktopIconLabel = styled.span`
  font-size: 11.5px;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.85);
  text-align: center;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.2;
`;

/* ─── macOS Dock ─── */
const DockContainer = styled.nav`
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 900;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 6px 14px 8px;
  background: rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.38);
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35), 0 0 0 0.5px rgba(255, 255, 255, 0.2);
`;

const DockItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: scale(1.22) translateY(-8px);
  }

  &:hover .dock-tooltip {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DockIconImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.25));
  pointer-events: none;
`;

const DockDot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  margin-top: 3px;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
  opacity: ${props => (props.$active ? 1 : 0)};
`;

const DockTooltip = styled.div`
  position: absolute;
  top: -34px;
  background: rgba(20, 22, 28, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 6px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translateY(4px);
  transition: all 0.15s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

/* ─── macOS Realistic Window ─── */
const WindowWrapper = styled.div`
  position: fixed;
  z-index: ${props => props.$zIndex || 100};
  width: ${props => props.$width || '720px'};
  max-width: 94vw;
  max-height: 82vh;
  background: #ffffff;
  color: #111827;
  border-radius: 12px;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: des4WindowFadeIn 0.18s ease-out;
`;

const WindowTitleBar = styled.div`
  height: 38px;
  background: #f1f3f5;
  border-bottom: 1px solid #e2e5e9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const TrafficDots = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 60px;
  z-index: 10;

  & .traffic-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.15);
    transition: transform 0.15s ease, filter 0.15s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    outline: none;
  }

  & .traffic-dot:hover {
    transform: scale(1.15);
    filter: brightness(0.92);
  }

  & .red {
    background: #ff5f57;
  }
  & .yellow {
    background: #febc2e;
  }
  & .green {
    background: #28c840;
  }
`;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/* ─── MAIN DES4 LAB VIEW COMPONENT ─── */
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function Des4LabView({ onBack }) {
  // Active window state
  const [activeWindow, setActiveWindow] = useState('finder'); // Default opens Finder
  const [windowZIndex, setWindowZIndex] = useState(150);
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [previewCv, setPreviewCv] = useState(false);

  // Menus & Spotlight
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState('');
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(80);

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState([
    'Last login: ' + new Date().toLocaleDateString() + ' on ttys001',
    'Welcome to Dat Le macOS Portfolio Terminal [v4.2.0]',
    'Type "help" to view available developer commands.',
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  // Live real clock
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const day = days[now.getDay()];
      const month = months[now.getMonth()];
      const date = now.getDate();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      setCurrentTime(`${day} ${month} ${date}  ${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (!e.target.closest('#des4-control-center') && !e.target.closest('#des4-control-btn')) {
        setControlCenterOpen(false);
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // Global keydown (Esc closes modals, Cmd+K / Cmd+Space opens Spotlight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSpotlightOpen(false);
        setControlCenterOpen(false);
        setSelectedPhoto(null);
      }
      if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
        e.preventDefault();
        setSpotlightOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Draggable Window Pos
  const finderDrag = useDraggableWindow({ x: 0, y: 0 });
  const notesDrag = useDraggableWindow({ x: 20, y: 20 });
  const photosDrag = useDraggableWindow({ x: -20, y: 10 });
  const mailDrag = useDraggableWindow({ x: 10, y: -20 });
  const terminalDrag = useDraggableWindow({ x: -10, y: -10 });
  const aboutMacDrag = useDraggableWindow({ x: 0, y: 0 });

  const bringToFront = () => {
    setWindowZIndex((prev) => prev + 1);
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response = '';
    if (cmd === 'help') {
      response = 'Available commands: about, skills, projects, contact, clear, whoami, date, exit';
    } else if (cmd === 'about') {
      response = `Dat Le (Lê Văn Đạt) - Fullstack Software Engineer & UI Artisan based in Da Nang, VN.`;
    } else if (cmd === 'skills') {
      response = 'Core Stack: React 19, TypeScript, Vite, Spring Boot, Java, Node.js, Tailwind, Docker, MySQL, Redis.';
    } else if (cmd === 'projects') {
      response = `Total Projects: ${featuredProjects.length}. Featured: Dev Roadmap Tracker, IELTS Writing Practice, AI IoT Lab.`;
    } else if (cmd === 'contact') {
      response = `Email: ${siteMeta.email} | GitHub: ${siteMeta.github}`;
    } else if (cmd === 'whoami') {
      response = 'datle (admin/architect)';
    } else if (cmd === 'date') {
      response = new Date().toString();
    } else if (cmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (cmd === 'exit') {
      setActiveWindow(null);
      setTerminalInput('');
      return;
    } else {
      response = `zsh: command not found: ${cmd}. Type "help" for options.`;
    }

    setTerminalHistory((prev) => [...prev, `datle@macbook-pro ~ % ${terminalInput}`, response]);
    setTerminalInput('');
  };

  return (
    <Wrapper style={{ filter: `brightness(${brightness}%)` }}>
      {/* ─── macOS Top Menu Bar ─── */}
      <MenuBar>
        <MenuBarLeft>
          {/* Exit Lab Menu Item (plain text like File/Edit, replacing Apple logo) */}
          <MenuButton
            onClick={onBack}
            title="Exit Lab & Return to Overview"
            style={{ fontWeight: 600, padding: '2px 8px' }}
          >
            ← Exit Lab
          </MenuButton>

          {/* Active App Name (Bold) */}
          <span style={{ fontWeight: 700, fontSize: 13, color: '#ffffff', letterSpacing: '-0.01em', marginLeft: 2 }}>
            {activeWindow === 'finder'
              ? 'Finder'
              : activeWindow === 'notes'
              ? 'Notes'
              : activeWindow === 'photos'
              ? 'Photos'
              : activeWindow === 'mail'
              ? 'Mail'
              : activeWindow === 'terminal'
              ? 'Terminal'
              : 'Portfolio'}
          </span>

          {/* Menus */}
          <MenuButton onClick={() => setActiveWindow('finder')}>File</MenuButton>
          <MenuButton onClick={() => setActiveWindow('notes')}>Edit</MenuButton>
          <MenuButton onClick={() => setActiveWindow('photos')}>View</MenuButton>
          <MenuButton onClick={() => onBack()} title="Return to Overview">
            Go
          </MenuButton>
          <MenuButton onClick={() => setActiveWindow('terminal')}>Window</MenuButton>
          <MenuButton onClick={() => setActiveWindow('about-mac')}>Help</MenuButton>
        </MenuBarLeft>

        <MenuBarRight>
          {/* Battery Status */}
          <MacOSBattery percentage={100} />

          {/* Wi-Fi Icon */}
          <Wifi size={14} style={{ cursor: 'pointer', opacity: 0.9 }} title="Wi-Fi: Connected (Da Nang 5G)" />

          {/* Spotlight Search Icon */}
          <Search
            size={13.5}
            style={{ cursor: 'pointer', opacity: 0.9 }}
            onClick={() => setSpotlightOpen(!spotlightOpen)}
            title="Spotlight Search (Cmd+Space)"
          />

          {/* Control Center Toggle */}
          <div
            id="des4-control-btn"
            onClick={(e) => {
              e.stopPropagation();
              setControlCenterOpen(!controlCenterOpen);
            }}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            title="Control Center"
          >
            <SlidersHorizontal size={13.5} style={{ opacity: 0.9 }} />
          </div>

          {/* Real Live Time */}
          <span style={{ fontWeight: 600, letterSpacing: '0.01em', cursor: 'default' }}>
            {currentTime || 'Tue Sep 8  3:20 PM'}
          </span>
        </MenuBarRight>
      </MenuBar>

      {/* ─── Control Center Popover ─── */}
      {controlCenterOpen && (
        <div
          id="des4-control-center"
          style={{
            position: 'absolute',
            top: 36,
            right: 16,
            width: 320,
            background: 'rgba(30, 32, 40, 0.78)',
            backdropFilter: 'blur(35px) saturate(220%)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: 16,
            padding: 16,
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
            zIndex: 1002,
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {/* Quick Switches */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                borderRadius: 12,
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: '#007aff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Wifi size={16} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>Wi-Fi</div>
                <div style={{ fontSize: 10.5, opacity: 0.7 }}>Da Nang 5G</div>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                borderRadius: 12,
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: '#007aff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sun size={16} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>Theme</div>
                <div style={{ fontSize: 10.5, opacity: 0.7 }}>Dark Glass</div>
              </div>
            </div>
          </div>

          {/* Sliders */}
          <div style={{ background: 'rgba(255, 255, 255, 0.12)', borderRadius: 12, padding: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 8, opacity: 0.8 }}>Display Brightness</div>
            <input
              type="range"
              min="50"
              max="120"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#007aff', cursor: 'pointer' }}
            />
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.12)', borderRadius: 12, padding: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 8, opacity: 0.8 }}>Sound Volume</div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#007aff', cursor: 'pointer' }}
            />
          </div>

          {/* Now Playing Widget */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: 12,
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: '#fe3c01',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: 12,
              }}
            >
              DL*
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Engineering Logic, Crafting Experiences
              </div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>Dat Le – Portfolio 2026</div>
            </div>
          </div>
        </div>
      )}

      {/* ─── macOS Spotlight Search Modal ─── */}
      {spotlightOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '18vh',
            background: 'rgba(0, 0, 0, 0.25)',
          }}
          onClick={() => setSpotlightOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 580,
              maxWidth: '90vw',
              background: 'rgba(30, 32, 42, 0.88)',
              backdropFilter: 'blur(35px) saturate(200%)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              borderRadius: 16,
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.65)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Search size={20} style={{ color: '#007aff' }} />
              <input
                type="text"
                autoFocus
                placeholder="Spotlight Search (apps, projects, skills, documents)..."
                value={spotlightQuery}
                onChange={(e) => setSpotlightQuery(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: 18,
                  fontFamily: 'inherit',
                  outline: 'none',
                  width: '100%',
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '2px 8px',
                  borderRadius: 6,
                  color: '#d1d5db',
                }}
              >
                esc
              </span>
            </div>

            {/* Quick Results */}
            <div style={{ padding: '8px 10px', maxHeight: 320, overflowY: 'auto' }}>
              {[
                { name: 'Finder – Projects Archive', type: 'Application', action: () => { setActiveWindow('finder'); setSpotlightOpen(false); } },
                { name: 'Notes – About Dat Le & Architecture', type: 'Notes', action: () => { setActiveWindow('notes'); setSpotlightOpen(false); } },
                { name: 'Photos – Creative Experiments', type: 'Gallery', action: () => { setActiveWindow('photos'); setSpotlightOpen(false); } },
                { name: 'Terminal – Command Center', type: 'Utility', action: () => { setActiveWindow('terminal'); setSpotlightOpen(false); } },
                { name: 'Mail – Contact & Inquiries', type: 'Mail', action: () => { setActiveWindow('mail'); setSpotlightOpen(false); } },
                { name: 'About This Mac / Portfolio Spec', type: 'System', action: () => { setActiveWindow('about-mac'); setSpotlightOpen(false); } },
              ]
                .filter((item) => item.name.toLowerCase().includes(spotlightQuery.toLowerCase()))
                .map((item, idx) => (
                  <div
                    key={idx}
                    onClick={item.action}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 14px',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontSize: 13,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#007aff')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span>{item.name}</span>
                    <span style={{ fontSize: 11, opacity: 0.6 }}>{item.type}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── Desktop Icons Grid (Right Side) ─── */}
      <DesktopGrid>
        <DesktopIconItem
          $selected={selectedDesktopIcon === 'finder'}
          onClick={() => setSelectedDesktopIcon('finder')}
          onDoubleClick={() => setActiveWindow('finder')}
        >
          <img
            src="/assets/jC3NYM1gkKdVNzokU0ojtj01asg.png"
            alt="Projects"
            style={{ width: 48, height: 48, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.35))' }}
          />
          <DesktopIconLabel>Projects</DesktopIconLabel>
        </DesktopIconItem>

        <DesktopIconItem
          $selected={selectedDesktopIcon === 'photos'}
          onClick={() => setSelectedDesktopIcon('photos')}
          onDoubleClick={() => setActiveWindow('photos')}
        >
          <img
            src="/assets/VCIQF7ylF9U0o5QZkTgji0mxx28.png"
            alt="Experiments"
            style={{ width: 48, height: 48, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.35))' }}
          />
          <DesktopIconLabel>Experiments</DesktopIconLabel>
        </DesktopIconItem>

        <DesktopIconItem
          $selected={selectedDesktopIcon === 'notes'}
          onClick={() => setSelectedDesktopIcon('notes')}
          onDoubleClick={() => setActiveWindow('notes')}
        >
          <img
            src="/assets/ZAH3C8amQUigspCjEG1FJWPjI.png"
            alt="About DatLe"
            style={{ width: 48, height: 48, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.35))' }}
          />
          <DesktopIconLabel>About_Me.txt</DesktopIconLabel>
        </DesktopIconItem>

        <DesktopIconItem
          $selected={selectedDesktopIcon === 'resume'}
          onClick={() => setSelectedDesktopIcon('resume')}
          onDoubleClick={() => {
            window.location.href = '/work';
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: '#ffffff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fe3c01',
            }}
          >
            <FileText size={28} />
          </div>
          <DesktopIconLabel>Resume.pdf</DesktopIconLabel>
        </DesktopIconItem>

        <DesktopIconItem
          $selected={selectedDesktopIcon === 'terminal'}
          onClick={() => setSelectedDesktopIcon('terminal')}
          onDoubleClick={() => setActiveWindow('terminal')}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: '#18181b',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#22c55e',
            }}
          >
            <TerminalIcon size={26} />
          </div>
          <DesktopIconLabel>Terminal.app</DesktopIconLabel>
        </DesktopIconItem>
      </DesktopGrid>

      {/* ─── 1. FINDER WINDOW (Projects & Capabilities) ─── */}
      {activeWindow === 'finder' && (
        <WindowWrapper
          $zIndex={windowZIndex}
          $width="820px"
          style={{
            top: 70 + finderDrag.pos.y,
            left: `calc(50% - 410px + ${finderDrag.pos.x}px)`,
          }}
          onClick={bringToFront}
        >
          <WindowTitleBar onPointerDown={finderDrag.onPointerDown} onPointerMove={finderDrag.onPointerMove} onPointerUp={finderDrag.onPointerUp}>
            <TrafficLightsGroup onClose={() => setActiveWindow(null)} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
              Finder – Projects & Engineering Lab
            </span>
            <div style={{ width: 60 }} />
          </WindowTitleBar>

          {/* Finder Layout: Sidebar + Main Content Grid */}
          <div style={{ display: 'flex', height: 480, overflow: 'hidden' }}>
            {/* Sidebar */}
            <div
              style={{
                width: 190,
                background: '#f6f8fa',
                borderRight: '1px solid #e2e5e9',
                padding: '14px 10px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                fontSize: 12.5,
                fontWeight: 600,
                color: '#4b5563',
              }}
            >
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#9ca3af', marginBottom: 6, paddingLeft: 8 }}>
                  Favorites
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 10px',
                    borderRadius: 6,
                    background: '#e0e7ff',
                    color: '#3730a3',
                    cursor: 'pointer',
                  }}
                >
                  <Folder size={14} style={{ color: '#007aff' }} />
                  <span>Projects ({featuredProjects.length})</span>
                </div>
                <div
                  onClick={() => setActiveWindow('photos')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 10px',
                    borderRadius: 6,
                    cursor: 'pointer',
                  }}
                >
                  <Sparkles size={14} style={{ color: '#ec4899' }} />
                  <span>Creative Shots</span>
                </div>
                <div
                  onClick={() => setActiveWindow('notes')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 10px',
                    borderRadius: 6,
                    cursor: 'pointer',
                  }}
                >
                  <FileText size={14} style={{ color: '#f59e0b' }} />
                  <span>Documents</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: '#9ca3af', marginBottom: 6, paddingLeft: 8 }}>
                  Locations
                </div>
                <div
                  onClick={onBack}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 10px',
                    borderRadius: 6,
                    cursor: 'pointer',
                  }}
                >
                  <Globe size={14} style={{ color: '#10b981' }} />
                  <span>Web Overview</span>
                </div>
              </div>
            </div>

            {/* Main File Browser */}
            <div style={{ flex: 1, padding: 20, overflowY: 'auto', background: '#ffffff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#111827' }}>
                  Selected Works ({featuredProjects.length} items)
                </h3>
                <span style={{ fontSize: 11, color: '#6b7280', fontWeight: 600 }}>Double-click to view project</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
                {featuredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: 10,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: '#fafafa',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.08)';
                      e.currentTarget.style.borderColor = '#007aff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{ width: '100%', height: 120, objectFit: 'cover' }}
                    />
                    <div style={{ padding: 12 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#fe3c01', textTransform: 'uppercase' }}>
                        {project.code}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', margin: '2px 0 6px' }}>
                        {project.title}
                      </div>
                      <p style={{ fontSize: 11.5, color: '#6b7280', margin: 0, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {project.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </WindowWrapper>
      )}

      {/* ─── 2. NOTES WINDOW (About Dat Le) ─── */}
      {activeWindow === 'notes' && (
        <WindowWrapper
          $zIndex={windowZIndex}
          $width="740px"
          style={{
            top: 85 + notesDrag.pos.y,
            left: `calc(50% - 370px + ${notesDrag.pos.x}px)`,
          }}
          onClick={bringToFront}
        >
          <WindowTitleBar onPointerDown={notesDrag.onPointerDown} onPointerMove={notesDrag.onPointerMove} onPointerUp={notesDrag.onPointerUp}>
            <TrafficLightsGroup onClose={() => setActiveWindow(null)} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
              Notes – About Dat Le & Technical Artisan
            </span>
            <div style={{ width: 60 }} />
          </WindowTitleBar>

          <div style={{ display: 'flex', height: 460, overflow: 'hidden' }}>
            {/* Notes List */}
            <div
              style={{
                width: 220,
                background: '#f8f9fa',
                borderRight: '1px solid #e5e7eb',
                padding: '12px 8px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <div
                style={{
                  background: '#fffae5',
                  border: '1px solid #fde047',
                  borderRadius: 8,
                  padding: '10px 12px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: '#78350f' }}>01. About Dat Le</div>
                <div style={{ fontSize: 11, color: '#b45309', marginTop: 3 }}>Engineering logic & craftsmanship</div>
              </div>
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  padding: '10px 12px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1f2937' }}>02. Core Architecture</div>
                <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>React 19, Spring Boot, AI</div>
              </div>
            </div>

            {/* Note Editor Body */}
            <div style={{ flex: 1, padding: '24px 30px', overflowY: 'auto', background: '#ffffff', color: '#1f2937' }}>
              <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 8 }}>
                Last edited: Today, 3:15 PM
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 14px 0', color: '#111827' }}>
                Lê Văn Đạt (Dat Le)
              </h2>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#f3f4f6', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600, marginBottom: 16 }}>
                <span>📍 Da Nang, Vietnam</span> • <span>✉️ lvd27012004@gmail.com</span>
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: '#374151', marginBottom: 16 }}>
                Full-stack Developer & Technical Artisan exploring the intersection between robust distributed systems, brutalist aesthetics, and seamless user experiences. Specializing in high-performance web applications, modern React architecture, and clean decoupled services.
              </p>
              <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 10, padding: 14, fontSize: 13 }}>
                <strong>Technical Stack:</strong> React, TypeScript, Spring Boot, Java, Vite, Tailwind CSS, Docker, PostgreSQL, MySQL, Redis, AI Inference Pipelines.
              </div>
            </div>
          </div>
        </WindowWrapper>
      )}

      {/* ─── 3. PHOTOS WINDOW (Creative Experiments) ─── */}
      {activeWindow === 'photos' && (
        <WindowWrapper
          $zIndex={windowZIndex}
          $width="780px"
          style={{
            top: 95 + photosDrag.pos.y,
            left: `calc(50% - 390px + ${photosDrag.pos.x}px)`,
          }}
          onClick={bringToFront}
        >
          <WindowTitleBar onPointerDown={photosDrag.onPointerDown} onPointerMove={photosDrag.onPointerMove} onPointerUp={photosDrag.onPointerUp}>
            <TrafficLightsGroup onClose={() => setActiveWindow(null)} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
              Photos – Creative Experiments & Visual R&D
            </span>
            <div style={{ width: 60 }} />
          </WindowTitleBar>

          <div style={{ padding: 22, maxHeight: 460, overflowY: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
              {CREATIVE_SHOTS.map((shot) => (
                <div
                  key={shot.id}
                  onClick={() => setSelectedPhoto(shot)}
                  style={{
                    borderRadius: 10,
                    overflow: 'hidden',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    background: '#f9fafb',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <img src={shot.thumb} alt={shot.name} style={{ width: '100%', height: 130, objectFit: 'cover' }} />
                  <div style={{ padding: '8px 10px', fontSize: 12, fontWeight: 700, color: '#1f2937' }}>
                    {shot.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </WindowWrapper>
      )}

      {/* ─── 4. MAIL WINDOW (Contact Form) ─── */}
      {activeWindow === 'mail' && (
        <WindowWrapper
          $zIndex={windowZIndex}
          $width="640px"
          style={{
            top: 90 + mailDrag.pos.y,
            left: `calc(50% - 320px + ${mailDrag.pos.x}px)`,
          }}
          onClick={bringToFront}
        >
          <WindowTitleBar onPointerDown={mailDrag.onPointerDown} onPointerMove={mailDrag.onPointerMove} onPointerUp={mailDrag.onPointerUp}>
            <TrafficLightsGroup onClose={() => setActiveWindow(null)} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
              Mail – Compose: New Message to Dat Le
            </span>
            <div style={{ width: 60 }} />
          </WindowTitleBar>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for reaching out! Dat Le will reply shortly.');
              setActiveWindow(null);
            }}
            style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: 8, fontSize: 13 }}>
              <span style={{ width: 60, color: '#9ca3af', fontWeight: 600 }}>To:</span>
              <span style={{ fontWeight: 700, color: '#111827' }}>lvd27012004@gmail.com</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: 8, fontSize: 13 }}>
              <span style={{ width: 60, color: '#9ca3af', fontWeight: 600 }}>From:</span>
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: 8, fontSize: 13 }}>
              <span style={{ width: 60, color: '#9ca3af', fontWeight: 600 }}>Subject:</span>
              <input
                type="text"
                required
                placeholder="Project Inquiry / Collaboration"
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, fontFamily: 'inherit', fontWeight: 600 }}
              />
            </div>

            <textarea
              rows="5"
              required
              placeholder="Hi Dat, I came across your portfolio and would like to discuss..."
              style={{
                width: '100%',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                padding: 12,
                fontSize: 13.5,
                fontFamily: 'inherit',
                outline: 'none',
                resize: 'vertical',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button
                type="button"
                onClick={() => setActiveWindow(null)}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  color: '#4b5563',
                  padding: '8px 18px',
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  background: '#007aff',
                  border: 'none',
                  color: '#ffffff',
                  padding: '8px 20px',
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Send size={13} />
                <span>Send Message</span>
              </button>
            </div>
          </form>
        </WindowWrapper>
      )}

      {/* ─── 5. TERMINAL WINDOW ─── */}
      {activeWindow === 'terminal' && (
        <WindowWrapper
          $zIndex={windowZIndex}
          $width="680px"
          style={{
            top: 110 + terminalDrag.pos.y,
            left: `calc(50% - 340px + ${terminalDrag.pos.x}px)`,
            background: '#18181b',
            color: '#f4f4f5',
          }}
          onClick={bringToFront}
        >
          <WindowTitleBar
            style={{ background: '#27272a', borderBottomColor: '#3f3f46' }}
            onPointerDown={terminalDrag.onPointerDown}
            onPointerMove={terminalDrag.onPointerMove}
            onPointerUp={terminalDrag.onPointerUp}
          >
            <TrafficLightsGroup onClose={() => setActiveWindow(null)} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#e4e4e7' }}>
              datle@macbook-pro: ~ (zsh)
            </span>
            <div style={{ width: 60 }} />
          </WindowTitleBar>

          <div
            style={{
              padding: 16,
              height: 380,
              overflowY: 'auto',
              fontFamily: 'monospace',
              fontSize: 13,
              lineHeight: 1.5,
              background: '#09090b',
            }}
          >
            {terminalHistory.map((line, idx) => (
              <div key={idx} style={{ color: line.startsWith('datle@') ? '#38bdf8' : '#e4e4e7' }}>
                {line}
              </div>
            ))}
            <form onSubmit={handleTerminalSubmit} style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
              <span style={{ color: '#22c55e', marginRight: 8 }}>datle@macbook-pro ~ %</span>
              <input
                type="text"
                autoFocus
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontFamily: 'inherit',
                  fontSize: 13,
                  outline: 'none',
                  flex: 1,
                }}
              />
            </form>
          </div>
        </WindowWrapper>
      )}

      {/* ─── 6. ABOUT THIS MAC DIALOG ─── */}
      {activeWindow === 'about-mac' && (
        <WindowWrapper
          $zIndex={windowZIndex}
          $width="460px"
          style={{
            top: 130 + aboutMacDrag.pos.y,
            left: `calc(50% - 230px + ${aboutMacDrag.pos.x}px)`,
            textAlign: 'center',
          }}
          onClick={bringToFront}
        >
          <WindowTitleBar onPointerDown={aboutMacDrag.onPointerDown} onPointerMove={aboutMacDrag.onPointerMove} onPointerUp={aboutMacDrag.onPointerUp}>
            <TrafficLightsGroup onClose={() => setActiveWindow(null)} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>About This Portfolio</span>
            <div style={{ width: 60 }} />
          </WindowTitleBar>

          <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <Laptop size={48} style={{ color: '#18181b' }} />
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>MacBook Pro 16"</h2>
              <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>macOS Sequoia 15.2 (Portfolio Edition)</div>
            </div>

            <div style={{ width: '100%', background: '#f3f4f6', borderRadius: 10, padding: 14, fontSize: 12.5, textAlign: 'left', lineHeight: 1.6 }}>
              <div><strong>Chip:</strong> Apple M3 Max (Technical Artisan)</div>
              <div><strong>Memory:</strong> 32 GB Unified RAM</div>
              <div><strong>Creator:</strong> Lê Văn Đạt (Dat Le)</div>
              <div><strong>Status:</strong> Active & Ready for Collaboration</div>
            </div>

            <button
              onClick={() => setActiveWindow(null)}
              style={{
                background: '#007aff',
                color: '#ffffff',
                border: 'none',
                borderRadius: 6,
                padding: '6px 20px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Done
            </button>
          </div>
        </WindowWrapper>
      )}

      {/* ─── Photo Lightbox Viewer ─── */}
      {selectedPhoto && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2500,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(15px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 800,
              width: '100%',
              background: '#18181b',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.8)',
            }}
          >
            <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #27272a' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#ffffff' }}>{selectedPhoto.name} – {selectedPhoto.title}</span>
              <button
                onClick={() => setSelectedPhoto(null)}
                style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>
            <img src={selectedPhoto.src} alt={selectedPhoto.name} style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', display: 'block', background: '#09090b' }} />
          </div>
        </div>
      )}

      {/* ─── Project Modal D4 ─── */}
      {selectedProject && (
        <ProjectModalD4
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* ─── macOS Dock ─── */}
      <DockContainer>
        {/* 1. Finder */}
        <DockItem onClick={() => setActiveWindow(activeWindow === 'finder' ? null : 'finder')}>
          <DockTooltip className="dock-tooltip">Finder</DockTooltip>
          <DockIconImg src="/assets/jC3NYM1gkKdVNzokU0ojtj01asg.png" alt="Finder" />
          <DockDot $active={activeWindow === 'finder'} />
        </DockItem>

        {/* 2. Safari (Overview / Home) */}
        <DockItem onClick={onBack}>
          <DockTooltip className="dock-tooltip">Safari (Overview)</DockTooltip>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #007aff, #0051ba)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(0, 122, 255, 0.4)',
            }}
          >
            <Globe size={28} />
          </div>
          <DockDot $active={false} />
        </DockItem>

        {/* 3. Mail */}
        <DockItem onClick={() => setActiveWindow(activeWindow === 'mail' ? null : 'mail')}>
          <DockTooltip className="dock-tooltip">Mail</DockTooltip>
          <DockIconImg src="/assets/EVSY45U60gTa9UjvovzPTZx7Hw.png" alt="Mail" />
          <DockDot $active={activeWindow === 'mail'} />
        </DockItem>

        {/* 4. Notes */}
        <DockItem onClick={() => setActiveWindow(activeWindow === 'notes' ? null : 'notes')}>
          <DockTooltip className="dock-tooltip">Notes</DockTooltip>
          <DockIconImg src="/assets/ZAH3C8amQUigspCjEG1FJWPjI.png" alt="Notes" />
          <DockDot $active={activeWindow === 'notes'} />
        </DockItem>

        {/* 5. Photos */}
        <DockItem onClick={() => setActiveWindow(activeWindow === 'photos' ? null : 'photos')}>
          <DockTooltip className="dock-tooltip">Photos</DockTooltip>
          <DockIconImg src="/assets/VCIQF7ylF9U0o5QZkTgji0mxx28.png" alt="Photos" />
          <DockDot $active={activeWindow === 'photos'} />
        </DockItem>

        {/* 6. Terminal */}
        <DockItem onClick={() => setActiveWindow(activeWindow === 'terminal' ? null : 'terminal')}>
          <DockTooltip className="dock-tooltip">Terminal</DockTooltip>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 12,
              background: '#18181b',
              border: '1px solid rgba(255,255,255,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#22c55e',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            }}
          >
            <TerminalIcon size={26} />
          </div>
          <DockDot $active={activeWindow === 'terminal'} />
        </DockItem>
      </DockContainer>

      {/* Global CSS Keyframes */}
      <style>{`
        @keyframes des4WindowFadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </Wrapper>
  );
}
