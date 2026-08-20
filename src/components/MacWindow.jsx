import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.94) translateY(12px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 15, 20, 0.4);
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  box-shadow: inset 0 0 120px rgba(70, 130, 240, 0.12);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${fadeIn} 0.25s ease-out forwards;
`;

const WindowContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow:
    0 24px 70px rgba(0, 0, 0, 0.4),
    0 4px 16px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  animation: ${scaleIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  width: ${props => props.$width || '800px'};
  max-width: calc(100vw - 40px);
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  padding: 13px 16px;
  background: #ebebeb;
  border-bottom: 1px solid #d8d8d8;
  flex-shrink: 0;
  position: relative;
  user-select: none;
`;

const TrafficLights = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 2;
`;

const TrafficLight = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.12);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  line-height: 1;
  color: rgba(0, 0, 0, 0.6);
  transition: transform 0.12s ease, filter 0.15s ease;

  &.close {
    background: #ff5f57;
    border-color: #e0443e;
  }
  &.minimize {
    background: #ffbd2e;
    border-color: #dea123;
  }
  &.maximize {
    background: #28ca42;
    border-color: #1aac2f;
  }

  &:hover {
    filter: brightness(0.9);
    transform: scale(1.08);
  }

  &:active {
    filter: brightness(0.75);
  }
`;

const TitleText = styled.span`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 13px;
  font-weight: 500;
  color: #4a4a4a;
  white-space: nowrap;
  pointer-events: none;
`;

const ContentArea = styled.div`
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  background: #ffffff;
`;

export default function MacWindow({ title, width, onClose, children }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <WindowContainer $width={width} onClick={(e) => e.stopPropagation()}>
        <TitleBar>
          <TrafficLights>
            <TrafficLight
              className="close"
              title="Close"
              onClick={onClose}
              aria-label="Close window"
            />
            <TrafficLight
              className="minimize"
              title="Minimize"
              onClick={onClose}
              aria-label="Minimize window"
            />
            <TrafficLight
              className="maximize"
              title="Maximize"
              aria-label="Maximize window"
            />
          </TrafficLights>
          {title && <TitleText>{title}</TitleText>}
        </TitleBar>
        <ContentArea>{children}</ContentArea>
      </WindowContainer>
    </Overlay>
  );
}