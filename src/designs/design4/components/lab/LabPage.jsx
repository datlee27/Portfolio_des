import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion';
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
  Play,
  Film,
  Image as ImageIcon,
  Compass,
  Trash2,
} from 'lucide-react';
import { featuredProjects, siteMeta } from '../../data/homeData';
import ProjectModalD4 from '../common/ProjectModalD4';
import NotesModalContent from './NotesModalContent';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/* ─── DATA: INTERACTIVE DESKTOP FILES (YANXIN LAB STYLE) ─── */
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const DESKTOP_ITEMS = [
  {
    id: 'potato',
    name: 'Potato.mp4',
    type: 'video',
    src: '/assets/lab/potato.jpg',
    thumb: '/assets/lab/potato.jpg',
    title: '3D Procedural Texture & Light Simulation',
    category: 'Motion R&D',
    defaultPos: { x: 50, y: 70 },
  },
  {
    id: 'render-module',
    name: 'RenderModule.jpg',
    type: 'image',
    src: '/assets/lab/render-module.jpg',
    thumb: '/assets/lab/render-module.jpg',
    title: 'Procedural Terrain & Shading Architecture',
    category: '3D Graphics',
    defaultPos: { x: 210, y: 80 },
  },
  {
    id: 'uber-ride',
    name: 'UberRide.mp4',
    type: 'video',
    src: '/assets/lab/uber-ride.jpg',
    thumb: '/assets/lab/uber-ride.jpg',
    title: 'Kinetic Typography & Micro-interactions',
    category: 'Interaction',
    defaultPos: { x: 370, y: 65 },
  },
  {
    id: 'z08',
    name: 'Z08.gif',
    type: 'gif',
    src: '/assets/lab/z08.png',
    thumb: '/assets/lab/z08.png',
    title: 'Character Animation & Dynamic Rigidbodies',
    category: 'Animation',
    defaultPos: { x: 70, y: 260 },
  },
  {
    id: 'byte-events',
    name: 'ByteEvents.gif',
    type: 'gif',
    src: '/assets/lab/byte-events.jpg',
    thumb: '/assets/lab/byte-events.jpg',
    title: 'Event-Driven Real-time Animation Stream',
    category: 'Visual R&D',
    defaultPos: { x: 230, y: 275 },
  },
  {
    id: 'r02',
    name: 'R02.gif',
    type: 'gif',
    src: '/assets/lab/r02.jpg',
    thumb: '/assets/lab/r02.jpg',
    title: 'Cyberpunk UI HUD & Particle Trails',
    category: 'UI Concept',
    defaultPos: { x: 390, y: 260 },
  },
  {
    id: 'purple-cat',
    name: 'PurpleCat.jpg',
    type: 'image',
    src: '/assets/lab/purple-cat.png',
    thumb: '/assets/lab/purple-cat.png',
    title: 'Vector Character Concept Art',
    category: 'Illustration',
    defaultPos: { x: 130, y: 455 },
  },
  {
    id: 'dev-roadmap',
    name: 'DevRoadmap.tsx',
    type: 'project',
    src: '/assets/lab/dev-roadmap.png',
    thumb: '/assets/lab/dev-roadmap.png',
    title: 'Dev Roadmap Tracking System (React 19 + Spring Boot)',
    category: 'Featured Project',
    defaultPos: { x: 290, y: 465 },
  },
];

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

/* ─── macOS Traffic Light Buttons ─── */
function TrafficLightsGroup({ onClose }) {
  return (
    <TrafficDots>
      <button
        type="button"
        className="traffic-dot red"
        title="Close (Đóng)"
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

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/* ─── DOCK ITEM WITH PROPORTIONAL MAGNIFICATION ─── */
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function DockItem({
  mouseX,
  icon,
  label,
  onClick,
  isActive,
  isBouncing,
  imgScale = 1,
  imgStyle = {},
}) {
  const ref = useRef(null);

  // Distance from mouse to icon center
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Scale smoothly based on cursor proximity (Apple macOS Dock curve)
  const widthSync = useTransform(distance, [-130, 0, 130], [48, 70, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 450, damping: 25 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="dock-item-wrapper"
      onClick={onClick}
      animate={isBouncing ? { y: [0, -20, 0, -10, 0] } : { y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <DockIconImageWrapper
        as={motion.div}
        whileTap={{ scale: 0.88 }}
        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
      >
        {typeof icon === 'string' ? (
          <img
            src={icon}
            alt={label}
            draggable={false}
            style={{
              ...(imgScale !== 1 ? { transform: `scale(${imgScale})` } : {}),
              ...imgStyle,
            }}
          />
        ) : (
          icon
        )}
        <div className="dock-tooltip">{label}</div>
      </DockIconImageWrapper>
      <DockDot $active={isActive} />
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/* ─── STYLED COMPONENTS ─── */
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('/assets/hero-background.png');
  background-size: cover;
  background-position: center;
  overflow: hidden;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Inter',
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
  background: rgba(18, 22, 32, 0.45);
  backdrop-filter: blur(35px) saturate(200%);
  -webkit-backdrop-filter: blur(35px) saturate(200%);
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
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

/* ─── Desktop Canvas for Draggable Items ─── */
const DesktopCanvas = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  bottom: 80px;
  overflow: visible;
  pointer-events: none;
`;

const DraggableCard = styled(motion.div)`
  position: absolute;
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: grab;
  z-index: 10;
  touch-action: none;
  pointer-events: auto;

  &:active {
    cursor: grabbing;
  }
`;

const CardThumbnail = styled.div`
  position: relative;
  width: 134px;
  height: 92px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(20, 20, 25, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35), 0 0 0 0.5px rgba(255, 255, 255, 0.2);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    image-rendering: -webkit-optimize-contrast;
  }

  & .type-badge {
    position: absolute;
    top: 6px;
    left: 6px;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(8px);
    border-radius: 4px;
    padding: 2px 5px;
    font-size: 9px;
    font-weight: 700;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 3px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  & .play-btn {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    opacity: 0.85;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  &:hover .play-btn {
    opacity: 1;
    transform: scale(1.15);
  }
`;

const CardLabelPill = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(18, 20, 26, 0.65);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 3px 10px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  & span {
    font-size: 11px;
    font-weight: 600;
    color: #ffffff;
    white-space: nowrap;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
  }
`;

/* ─── Desktop Right Icons Grid ─── */
const DesktopGrid = styled.div`
  position: absolute;
  top: 42px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  z-index: 20;
  pointer-events: auto;
`;

const DesktopIconItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 80px;
  cursor: pointer;
  padding: 6px 4px;
  border-radius: 8px;
  background: ${props => (props.$selected ? 'rgba(0, 122, 255, 0.4)' : 'transparent')};
  border: 1px solid ${props => (props.$selected ? 'rgba(0, 122, 255, 0.8)' : 'transparent')};
  transition: background 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }

  & img {
    image-rendering: -webkit-optimize-contrast;
  }
`;

const DesktopIconLabel = styled.span`
  font-size: 11.5px;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.85);
  text-align: center;
  max-width: 76px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.2;
`;

/* ─── Ultra-Fluid macOS Dock ─── */
const DockContainer = styled(motion.nav)`
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 900;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 64px;
  padding: 8px 12px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(40px) saturate(190%);
  -webkit-backdrop-filter: blur(40px) saturate(190%);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35), 0 0 0 0.5px rgba(255, 255, 255, 0.25);

  & .dock-item-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    position: relative;
  }

  & .dock-divider {
    width: 1px;
    height: 36px;
    background: rgba(255, 255, 255, 0.35);
    margin: 0 4px;
    align-self: center;
  }
`;

const DockIconImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.25));
    pointer-events: none;
    image-rendering: -webkit-optimize-contrast;
  }

  & .dock-tooltip {
    position: absolute;
    top: -38px;
    background: rgba(20, 22, 28, 0.88);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
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
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
  }

  &:hover .dock-tooltip {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DockDot = styled.div`
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.85);
  opacity: ${props => (props.$active ? 1 : 0)};
  transition: opacity 0.2s ease;
  pointer-events: none;
`;

/* ─── macOS Realistic Framer Window ─── */
const WindowWrapper = styled(motion.div)`
  position: fixed;
  z-index: ${props => props.$zIndex || 100};
  width: ${props => props.$width || '720px'};
  max-width: 94vw;
  max-height: 82vh;
  background: #ffffff;
  color: #111827;
  border-radius: 12px;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  touch-action: none;
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
export default function LabPage({ onBack }) {
  const containerRef = useRef(null);

  // Active window state
  const [activeWindow, setActiveWindow] = useState(null); // Clean desktop by default (Finder closed)
  const [windowZIndex, setWindowZIndex] = useState(150);
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [bouncingApp, setBouncingApp] = useState(null);

  // Dock mouse tracking
  const mouseX = useMotionValue(Infinity);

  // Spotlight & Control Center
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState('');
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(80);

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState([
    'Last login: ' + new Date().toLocaleDateString() + ' on ttys001',
    'Welcome to Dat Le macOS Portfolio Terminal [v4.3.0 - Silk Edition]',
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

  // Global keydown (Esc closes modals, Cmd+Space opens Spotlight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSpotlightOpen(false);
        setControlCenterOpen(false);
        setSelectedMedia(null);
      }
      if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
        e.preventDefault();
        setSpotlightOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const bringToFront = () => {
    setWindowZIndex((prev) => prev + 1);
  };

  const handleAppLaunch = (appName) => {
    setBouncingApp(appName);
    setTimeout(() => setBouncingApp(null), 500);
    setActiveWindow(appName);
    bringToFront();
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response = '';
    if (cmd === 'help') {
      response = 'Available commands: about, skills, projects, contact, clear, whoami, date, exit';
    } else if (cmd === 'about') {
      response = `Dat Le (Lê Văn Đạt) - Fullstack Software Engineer & Technical Artisan.`;
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
    <Wrapper ref={containerRef} style={{ filter: `brightness(${brightness}%)` }}>
      {/* ─── macOS Top Menu Bar ─── */}
      <MenuBar>
        <MenuBarLeft>
          {/* Exit Lab Menu Item (plain text like File/Edit) */}
          <MenuButton
            onClick={onBack}
            title="Exit Lab & Return to Overview"
            style={{ fontWeight: 500, padding: '2px 8px' }}
          >
            Exit Lab
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
          <MenuButton onClick={() => handleAppLaunch('finder')}>File</MenuButton>
          <MenuButton onClick={() => handleAppLaunch('notes')}>Edit</MenuButton>
          <MenuButton onClick={() => handleAppLaunch('photos')}>View</MenuButton>
          {/* <MenuButton onClick={() => onBack()} title="Return to Overview">
            Go
          </MenuButton> */}
          <MenuButton onClick={() => handleAppLaunch('terminal')}>Window</MenuButton>
          <MenuButton onClick={() => handleAppLaunch('about-mac')}>Help</MenuButton>
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

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ─── DESKTOP DRAGGABLE ITEMS CANVAS (YANXIN LAB STYLE) ─── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <DesktopCanvas>
        {DESKTOP_ITEMS.map((item) => (
          <DraggableCard
            key={item.id}
            drag
            dragMomentum={true}
            dragElastic={0.12}
            dragConstraints={containerRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ left: item.defaultPos.x, top: item.defaultPos.y }}
            whileHover={{ scale: 1.05 }}
            whileDrag={{ scale: 1.1, zIndex: 850, cursor: 'grabbing', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onDoubleClick={() => setSelectedMedia(item)}
          >
            <CardThumbnail onClick={() => setSelectedMedia(item)}>
              <img src={item.thumb} alt={item.name} draggable={false} />
              <div className="type-badge">
                {item.type === 'video' ? <Film size={10} /> : <ImageIcon size={10} />}
                <span>{item.type}</span>
              </div>
              {item.type === 'video' && (
                <div className="play-btn">
                  <Play size={12} fill="#ffffff" style={{ marginLeft: 1 }} />
                </div>
              )}
            </CardThumbnail>

            <CardLabelPill onClick={() => setSelectedMedia(item)}>
              <span>{item.name}</span>
            </CardLabelPill>
          </DraggableCard>
        ))}
      </DesktopCanvas>

      {/* ─── Desktop Icons Grid (Right Side) ─── */}
      <DesktopGrid>




        <DesktopIconItem
          $selected={selectedDesktopIcon === 'notes'}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedDesktopIcon('notes')}
          onDoubleClick={() => handleAppLaunch('notes')}
        >
          <img
            src="/assets/notes.png"
            alt="About DatLe"
            style={{ width: 48, height: 48, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.35))' }}
            draggable={false}
          />
          <DesktopIconLabel>About_Me.txt</DesktopIconLabel>
        </DesktopIconItem>

        <DesktopIconItem
          $selected={selectedDesktopIcon === 'resume'}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
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
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedDesktopIcon('terminal')}
          onDoubleClick={() => handleAppLaunch('terminal')}
        >
          <img
            src="/assets/terminal.png"
            alt="Terminal"
            style={{ width: 48, height: 48, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.35))', transform: 'scale(1.27)' }}
            draggable={false}
          />
          <DesktopIconLabel>Terminal.app</DesktopIconLabel>
        </DesktopIconItem>
      </DesktopGrid>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ─── MACOS DRAGGABLE WINDOWS (FRAMER MOTION) ─── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {/* ─── 1. FINDER WINDOW ─── */}
        {activeWindow === 'finder' && (
          <WindowWrapper
            drag
            dragMomentum={false}
            dragElastic={0.04}
            dragConstraints={containerRef}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ type: 'spring', damping: 26, stiffness: 360 }}
            $zIndex={windowZIndex}
            $width="820px"
            style={{
              top: '12%',
              left: 'calc(50% - 410px)',
            }}
            onClick={bringToFront}
          >
            <WindowTitleBar>
              <TrafficLightsGroup onClose={() => setActiveWindow(null)} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
                Finder – Projects & Engineering Lab
              </span>
              <div style={{ width: 60 }} />
            </WindowTitleBar>

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
                      background: 'rgba(0, 122, 255, 0.12)',
                      color: '#007aff',
                      cursor: 'pointer',
                    }}
                  >
                    <Folder size={14} fill="#007aff" />
                    <span>Projects ({featuredProjects.length})</span>
                  </div>
                  <div
                    onClick={() => handleAppLaunch('photos')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '6px 10px',
                      borderRadius: 6,
                      cursor: 'pointer',
                      marginTop: 2,
                    }}
                  >
                    <Sparkles size={14} style={{ color: '#f59e0b' }} />
                    <span>Creative Shots</span>
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
                    <motion.div
                      key={project.id}
                      whileHover={{ scale: 1.02, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedProject(project)}
                      style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: 10,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        background: '#fafafa',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
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
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </WindowWrapper>
        )}

        {/* ─── 2. NOTES WINDOW ─── */}
        {activeWindow === 'notes' && (
          <WindowWrapper
            drag
            dragMomentum={false}
            dragElastic={0.04}
            dragConstraints={containerRef}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ type: 'spring', damping: 26, stiffness: 360 }}
            $zIndex={windowZIndex}
            $width="740px"
            style={{
              top: '14%',
              left: 'calc(50% - 370px)',
            }}
            onClick={bringToFront}
          >
            <WindowTitleBar>
              <TrafficLightsGroup onClose={() => setActiveWindow(null)} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
                Notes – About Dat Le & Technical Artisan
              </span>
              <div style={{ width: 60 }} />
            </WindowTitleBar>

            <NotesModalContent />
          </WindowWrapper>
        )}

        {/* ─── 3. PHOTOS WINDOW ─── */}
        {activeWindow === 'photos' && (
          <WindowWrapper
            drag
            dragMomentum={false}
            dragElastic={0.04}
            dragConstraints={containerRef}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ type: 'spring', damping: 26, stiffness: 360 }}
            $zIndex={windowZIndex}
            $width="780px"
            style={{
              top: '16%',
              left: 'calc(50% - 390px)',
            }}
            onClick={bringToFront}
          >
            <WindowTitleBar>
              <TrafficLightsGroup onClose={() => setActiveWindow(null)} />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
                Photos – Creative Experiments & Visual R&D
              </span>
              <div style={{ width: 60 }} />
            </WindowTitleBar>

            <div style={{ padding: 22, maxHeight: 460, overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
                {DESKTOP_ITEMS.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedMedia(item)}
                    style={{
                      borderRadius: 10,
                      overflow: 'hidden',
                      border: '1px solid #e5e7eb',
                      cursor: 'pointer',
                      background: '#f9fafb',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    }}
                  >
                    <img src={item.thumb} alt={item.name} style={{ width: '100%', height: 130, objectFit: 'cover' }} />
                    <div style={{ padding: '8px 10px', fontSize: 12, fontWeight: 700, color: '#1f2937' }}>
                      {item.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </WindowWrapper>
        )}

        {/* ─── 4. MAIL WINDOW ─── */}
        {activeWindow === 'mail' && (
          <WindowWrapper
            drag
            dragMomentum={false}
            dragElastic={0.04}
            dragConstraints={containerRef}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ type: 'spring', damping: 26, stiffness: 360 }}
            $zIndex={windowZIndex}
            $width="640px"
            style={{
              top: '15%',
              left: 'calc(50% - 320px)',
            }}
            onClick={bringToFront}
          >
            <WindowTitleBar>
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
            drag
            dragMomentum={false}
            dragElastic={0.04}
            dragConstraints={containerRef}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ type: 'spring', damping: 26, stiffness: 360 }}
            $zIndex={windowZIndex}
            $width="680px"
            style={{
              top: '18%',
              left: 'calc(50% - 340px)',
              background: '#18181b',
              color: '#f4f4f5',
            }}
            onClick={bringToFront}
          >
            <WindowTitleBar style={{ background: '#27272a', borderBottomColor: '#3f3f46' }}>
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
            drag
            dragMomentum={false}
            dragElastic={0.04}
            dragConstraints={containerRef}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ type: 'spring', damping: 26, stiffness: 360 }}
            $zIndex={windowZIndex}
            $width="460px"
            style={{
              top: '22%',
              left: 'calc(50% - 230px)',
              textAlign: 'center',
            }}
            onClick={bringToFront}
          >
            <WindowTitleBar>
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
                <div><strong>Chip:</strong> High-Performance M3 Max Architecture</div>
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
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ─── QUICK LOOK / MEDIA LIGHTBOX VIEWER ─── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2500,
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: 860,
                width: '100%',
                background: '#18181b',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.15)',
              }}
            >
              <div
                style={{
                  padding: '12px 18px',
                  background: '#27272a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <TrafficLightsGroup onClose={() => setSelectedMedia(null)} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#ffffff' }}>
                    {selectedMedia.name}
                  </span>
                </div>
              </div>

              <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: '100%',
                    minHeight: 380,
                    maxHeight: '60vh',
                    background: 'radial-gradient(ellipse at center, rgba(39, 39, 42, 0.6) 0%, rgba(15, 15, 18, 0.95) 100%)',
                    borderRadius: 12,
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.name}
                    style={{
                      maxWidth: '92%',
                      maxHeight: '56vh',
                      borderRadius: 8,
                      objectFit: 'contain',
                      imageRendering: '-webkit-optimize-contrast',
                      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
                    }}
                  />
                </div>

                <div
                  style={{
                    marginTop: 18,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>
                      {selectedMedia.title}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: '#e4e4e7',
                          padding: '2px 8px',
                          borderRadius: 4,
                          textTransform: 'uppercase',
                        }}
                      >
                        {selectedMedia.category}
                      </span>
                      <span style={{ fontSize: 11, color: '#71717a' }}>•</span>
                      <span style={{ fontSize: 12, color: '#a1a1aa' }}>
                        File: <strong style={{ color: '#d4d4d8' }}>{selectedMedia.name}</strong>
                      </span>
                      <span style={{ fontSize: 11, color: '#71717a' }}>•</span>
                      <span style={{ fontSize: 12, color: '#a1a1aa' }}>
                        Type: {selectedMedia.type.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {selectedMedia.id === 'dev-roadmap' && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMedia(null);
                        setSelectedProject(featuredProjects[0]);
                      }}
                      style={{
                        background: '#007aff',
                        border: 'none',
                        color: '#ffffff',
                        padding: '7px 16px',
                        borderRadius: 8,
                        fontSize: 12.5,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        boxShadow: '0 4px 12px rgba(0, 122, 255, 0.4)',
                      }}
                    >
                      <ExternalLink size={13} />
                      View Project
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Control Center Popover ─── */}
      <AnimatePresence>
        {controlCenterOpen && (
          <motion.div
            id="des4-control-center"
            initial={{ opacity: 0, scale: 0.94, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -10 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              top: 36,
              right: 16,
              width: 320,
              background: 'rgba(28, 30, 38, 0.82)',
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

            {/* Display Brightness Slider */}
            <div style={{ background: 'rgba(255, 255, 255, 0.12)', borderRadius: 12, padding: '12px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 8, opacity: 0.8 }}>
                <span>Display Brightness</span>
                <span>{brightness}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#007aff', cursor: 'pointer' }}
              />
            </div>

            {/* Sound Volume Slider */}
            <div style={{ background: 'rgba(255, 255, 255, 0.12)', borderRadius: 12, padding: '12px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 8, opacity: 0.8 }}>
                <span>Sound Volume</span>
                <span>{volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#007aff', cursor: 'pointer' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Spotlight Search Modal (⌘Space) ─── */}
      <AnimatePresence>
        {spotlightOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSpotlightOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.45)',
              backdropFilter: 'blur(10px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: '18vh',
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: 600,
                background: 'rgba(30, 32, 40, 0.88)',
                backdropFilter: 'blur(35px) saturate(200%)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: 14,
                boxShadow: '0 30px 70px rgba(0, 0, 0, 0.6)',
                overflow: 'hidden',
                color: '#ffffff',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', gap: 12, borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                <Search size={18} style={{ opacity: 0.6 }} />
                <input
                  type="text"
                  autoFocus
                  placeholder="Spotlight Search (apps, projects, files)..."
                  value={spotlightQuery}
                  onChange={(e) => setSpotlightQuery(e.target.value)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: 16,
                    outline: 'none',
                    flex: 1,
                    fontFamily: 'inherit',
                  }}
                />
                <span style={{ fontSize: 11, opacity: 0.5, border: '1px solid rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: 4 }}>
                  ESC
                </span>
              </div>

              <div style={{ maxHeight: 300, overflowY: 'auto', padding: 8 }}>
                {[
                  { name: 'Finder – Projects', type: 'Application', action: () => handleAppLaunch('finder') },
                  { name: 'Notes – About Dat Le', type: 'Application', action: () => handleAppLaunch('notes') },
                  { name: 'Photos – Creative Experiments', type: 'Application', action: () => handleAppLaunch('photos') },
                  { name: 'Terminal (zsh)', type: 'Developer Tool', action: () => handleAppLaunch('terminal') },
                  { name: 'Mail – Contact', type: 'Application', action: () => handleAppLaunch('mail') },
                  ...DESKTOP_ITEMS.map((item) => ({
                    name: item.name,
                    type: item.category,
                    action: () => setSelectedMedia(item),
                  })),
                ]
                  .filter((item) => item.name.toLowerCase().includes(spotlightQuery.toLowerCase()))
                  .map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        item.action();
                        setSpotlightOpen(false);
                      }}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ─── ULTRA-SMOOTH MAGNIFYING MACOS DOCK ─── */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <DockContainer
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        <DockItem
          mouseX={mouseX}
          icon="/assets/finder.png"
          label="Finder"
          onClick={() => handleAppLaunch('finder')}
          isActive={activeWindow === 'finder'}
          isBouncing={bouncingApp === 'finder'}
        />

        <DockItem
          mouseX={mouseX}
          icon="/assets/mail.png"
          label="Mail"
          onClick={() => handleAppLaunch('mail')}
          isActive={activeWindow === 'mail'}
          isBouncing={bouncingApp === 'mail'}
        />
        <DockItem
          mouseX={mouseX}
          icon="/assets/notes.png"
          label="Notes"
          onClick={() => handleAppLaunch('notes')}
          isActive={activeWindow === 'notes'}
          isBouncing={bouncingApp === 'notes'}
        />
        <DockItem
          mouseX={mouseX}
          icon="/assets/photos.png"
          label="Photos"
          onClick={() => handleAppLaunch('photos')}
          isActive={activeWindow === 'photos'}
          isBouncing={bouncingApp === 'photos'}
        />
        <DockItem
          mouseX={mouseX}
          icon="/assets/terminal.png"
          label="Terminal"
          onClick={() => handleAppLaunch('terminal')}
          isActive={activeWindow === 'terminal'}
          isBouncing={bouncingApp === 'terminal'}
          imgScale={1.27}
        />

        <div className="dock-divider" />

        <DockItem
          mouseX={mouseX}
          icon="/assets/trash.png"
          label="Trash"
          onClick={() => alert('Trash is clean and empty.')}
          isActive={false}
          isBouncing={false}
          imgScale={1.16}
        />
      </DockContainer>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModalD4
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </Wrapper>
  );
}
