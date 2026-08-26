import { useState } from 'react';
import styled from 'styled-components';
import { FiLayout, FiMinimize2 } from 'react-icons/fi';

const FloatingContainer = styled.aside`
  position: fixed;
  top: 28px;
  right: 36px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  user-select: none;

  @media (max-width: 640px) {
    top: auto;
    bottom: 20px;
    right: 16px;
  }
`;

const SwitcherPill = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 6px;
  background: rgba(15, 17, 23, 0.85);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 100px;
  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.45),
    0 2px 6px rgba(0, 0, 0, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.15);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`;

const SwitchButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 100px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  background: ${props =>
    props.$active
      ? 'linear-gradient(135deg, #4f46e5, #7c3aed)'
      : 'transparent'};
  color: ${props => (props.$active ? '#ffffff' : '#94a3b8')};
  box-shadow: ${props =>
    props.$active ? '0 4px 14px rgba(99, 102, 241, 0.4)' : 'none'};

  &:hover {
    color: #ffffff;
    background: ${props =>
      props.$active
        ? 'linear-gradient(135deg, #4f46e5, #7c3aed)'
        : 'rgba(255, 255, 255, 0.08)'};
  }

  span.icon {
    font-size: 14px;
  }
`;

const MinimizedButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(15, 17, 23, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  transition: all 0.2s ease;

  &:hover {
    background: #6366f1;
    color: #ffffff;
    transform: scale(1.08);
  }
`;

const CollapseToggle = styled.button`
  background: transparent;
  border: none;
  color: #64748b;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 4px;
  font-size: 13px;
  transition: all 0.2s ease;

  &:hover {
    color: #cbd5e1;
    background: rgba(255, 255, 255, 0.1);
  }
`;

export default function DesignSwitcher({ currentDesign, onSelectDesign }) {
  const [minimized, setMinimized] = useState(false);

  if (minimized) {
    return (
      <FloatingContainer>
        <MinimizedButton
          onClick={() => setMinimized(false)}
          title="Open Design Switcher"
        >
          <FiLayout />
        </MinimizedButton>
      </FloatingContainer>
    );
  }

  return (
    <FloatingContainer>
      <SwitcherPill>
        <SwitchButton
          $active={currentDesign === 'des1'}
          onClick={() => onSelectDesign('des1')}
          title="Switch to Design 1: macOS Desktop (/des1)"
        >
          <span className="icon">🍏</span>
          <span>Design 1</span>
        </SwitchButton>

        <SwitchButton
          $active={currentDesign === 'des2'}
          onClick={() => onSelectDesign('des2')}
          title="Switch to Design 2: Modern Bento Grid (/des2)"
        >
          <span className="icon">✨</span>
          <span>Design 2</span>
        </SwitchButton>

        <SwitchButton
          $active={currentDesign === 'des3'}
          onClick={() => onSelectDesign('des3')}
          title="Switch to Design 3: Creatie® Framer (/des3)"
        >
          <span className="icon">🎨</span>
          <span>Design 3</span>
        </SwitchButton>

        <SwitchButton
          $active={currentDesign === 'des4'}
          onClick={() => onSelectDesign('des4')}
          title="Switch to Design 4: YanXin Zhang (/des4)"
        >
          <span className="icon">⚡</span>
          <span>Design 4</span>
        </SwitchButton>

        <CollapseToggle
          onClick={() => setMinimized(true)}
          title="Minimize Switcher"
        >
          <FiMinimize2 />
        </CollapseToggle>
      </SwitcherPill>
    </FloatingContainer>
  );
}
