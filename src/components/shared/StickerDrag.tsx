import React, { useState, useRef } from 'react';
import styles from './StickerDrag.module.css';

export interface StickerDragProps {
  src: string;
  alt?: string;
  initialX?: number | string;
  initialY?: number | string;
  width?: number | string;
  height?: number | string;
  rotation?: string;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const StickerDrag: React.FC<StickerDragProps> = ({
  src,
  alt = 'Sticker',
  initialX = 0,
  initialY = 0,
  width = 60,
  height = 'auto',
  rotation = '0deg',
  opacity = 0.9,
  className = '',
  style = {},
}) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ mouseX: 0, mouseY: 0, startX: 0, startY: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: offset.x,
      startY: offset.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.mouseX;
    const dy = e.clientY - dragStart.current.mouseY;
    setOffset({
      x: dragStart.current.startX + dx,
      y: dragStart.current.startY + dy,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setIsDragging(false);
  };

  return (
    <div
      className={`${styles.stickerDrag} ${isDragging ? styles.dragging : ''} ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        left: typeof initialX === 'number' ? `${initialX}px` : initialX,
        top: typeof initialY === 'number' ? `${initialY}px` : initialY,
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        opacity,
        transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotation}) ${isDragging ? 'scale(1.1)' : 'scale(1)'}`,
        transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        ...style,
      }}
    >
      <img src={src} alt={alt} className={styles.stickerImage} draggable={false} />
    </div>
  );
};

export default StickerDrag;
