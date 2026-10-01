import React, { useState, useEffect, useRef } from 'react';

/**
 * AdminMacModal - Reusable Draggable macOS-style Window Modal for Admin Dashboard
 * 
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {function} onClose - Callback invoked to close the modal
 * @param {string} title - Main title text of the modal
 * @param {string} [prefix='Editor — '] - Prefix shown before the title (e.g. 'Editor — ', 'Preview — ', 'Cảnh Báo — ')
 * @param {number|string} [maxWidth=640] - Maximum width of the modal window
 * @param {React.ReactNode} children - Content inside the modal (form, body, footer, etc.)
 * @param {boolean} [danger=false] - Optional styling for destructive action modals (e.g. Delete confirm)
 */
export default function AdminMacModal({
  isOpen,
  onClose,
  title,
  prefix = 'Editor — ',
  maxWidth = 640,
  children,
  danger = false,
}) {
  // Draggable Window State
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 });

  // Reset position whenever modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setPosition({ x: 0, y: 0 });
      setIsDragging(false);
    }
  }, [isOpen]);

  // Handle Escape key to close modal & lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Drag Handlers on TitleBar
  const handlePointerDown = (e) => {
    // Ignore clicks on buttons (traffic lights, etc.) or interactive inputs
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('a')) {
      return;
    }

    // Only allow primary mouse button (left click)
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y,
    };

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;

    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    let newX = dragRef.current.initialX + dx;
    let newY = dragRef.current.initialY + dy;

    // Viewport bounding: keep titlebar visible within window bounds
    const maxOffsetW = Math.max(window.innerWidth / 2 - 80, 100);
    const maxOffsetH = Math.max(window.innerHeight / 2 - 60, 100);
    newX = Math.max(-maxOffsetW, Math.min(newX, maxOffsetW));
    newY = Math.max(-maxOffsetH, Math.min(newY, maxOffsetH));

    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // Double click TitleBar resets window position back to center
  const handleDoubleClickTitleBar = (e) => {
    if (e.target.closest('button')) return;
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      className="admin-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Draggable Window Container */}
      <div
        className="admin-mac-draggable-wrapper"
        style={{
          width: '100%',
          maxWidth,
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: isDragging ? 'none' : 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`admin-modal admin-mac-window ${danger ? 'admin-mac-window--danger' : ''} ${isDragging ? 'is-dragging' : ''}`}
          style={{ width: '100%', maxWidth: '100%' }}
        >
          {/* macOS Window TitleBar (Drag Handle) */}
          <div
            className={`admin-mac-titlebar ${isDragging ? 'is-dragging' : ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onDoubleClick={handleDoubleClickTitleBar}
            title="Kéo thả để di chuyển cửa sổ (Nhấp đúp để đưa về giữa)"
          >
            {/* macOS 3 Traffic Light Buttons */}
            <div className="admin-mac-traffic-lights">
              <button
                type="button"
                onClick={onClose}
                className="admin-mac-dot admin-mac-dot--close"
                title="Đóng (Esc)"
                aria-label="Đóng cửa sổ"
              />
              <button
                type="button"
                onClick={onClose}
                className="admin-mac-dot admin-mac-dot--minimize"
                title="Thu nhỏ"
                aria-label="Thu nhỏ cửa sổ"
              />
              <button
                type="button"
                className="admin-mac-dot admin-mac-dot--zoom"
                title="Toàn màn hình"
                aria-label="Mở rộng cửa sổ"
                tabIndex={-1}
              />
            </div>

            {/* Centered TitleBar Text */}
            <div className="admin-mac-title-text" title={`${prefix}${title}`}>
              {danger && <span className="admin-mac-danger-badge">!</span>}
              <span className="admin-mac-prefix">{prefix}</span>
              <span className="admin-mac-title">{title}</span>
            </div>

            {/* Right Placeholder for Optical Balance */}
            <div className="admin-mac-placeholder" aria-hidden="true" />
          </div>

          {/* Modal Window Content */}
          {children}
        </div>
      </div>
    </div>
  );
}
