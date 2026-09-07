import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

// Default sample photos stored locally with fallback to Framer CDN
const DEFAULT_PHOTOS = [
  {
    id: 1,
    title: 'Post-it Brainstorm',
    subtitle: 'Iterative prototypes & messy ideation',
    src: '/images/clothesline/photo1.png',
    fallbackSrc: 'https://framerusercontent.com/images/C6p09vLh49q0WPgOef4V7TUBgEg.png?width=1200&height=600',
    t: 0.12, // 12% along the wire
  },
  {
    id: 2,
    title: 'In The Elements',
    subtitle: 'Observation, texture, and field research',
    src: '/images/clothesline/photo2.png',
    fallbackSrc: 'https://framerusercontent.com/images/AqWlfbJga6pA8kddv07uVzPsqdE.png?width=900&height=1200',
    t: 0.31, // 31% along the wire
  },
  {
    id: 3,
    title: 'Artisan Workshop',
    subtitle: 'Where digital engineering meets tactile craft',
    src: '/images/clothesline/photo3.png',
    fallbackSrc: 'https://framerusercontent.com/images/8ntZg49nxKYsJnGQ66vctVPaPo.png?width=1200&height=1200',
    t: 0.50, // 50% dead center
  },
  {
    id: 4,
    title: 'Denim & Architecture',
    subtitle: 'Raw materiality and spatial proportion',
    src: '/images/clothesline/photo4.png',
    fallbackSrc: 'https://framerusercontent.com/images/SdEmNHumLS0EHWsG6x8g0CWHxKw.png?width=899&height=1199',
    t: 0.69, // 69% along the wire
  },
  {
    id: 5,
    title: 'Light & Shadows',
    subtitle: 'Quiet contrasts and atmospheric stillness',
    src: '/images/clothesline/photo5.jpg',
    fallbackSrc: 'https://framerusercontent.com/images/tiketPH2eVOgFb1uzQG4NawdMGo.jpg?width=906&height=1200',
    t: 0.88, // 88% along the wire
  },
];

const BINDER_CLIP_LOCAL = '/images/clothesline/clip.png';
const BINDER_CLIP_FALLBACK = 'https://framerusercontent.com/images/U9eXOl3LNm2e6HGQ8jzhLdIn8BM.png?width=736&height=736';

export default function ClotheslineGallery({
  photos = DEFAULT_PHOTOS,
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const viewportRef = useRef(null);

  const [containerWidth, setContainerWidth] = useState(1440);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeModalPhoto, setActiveModalPhoto] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Drag physics tracking
  const dragRef = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  });

  // Measure container width and adjust to window/container size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth || window.innerWidth;
        setContainerWidth(w);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Keyboard escape for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModalPhoto(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Stage dimensions based on screen width
  const stageWidth = useMemo(() => {
    // Allows full screen stretch on desktop, with minimum width for smooth dragging on smaller screens
    return Math.max(containerWidth, 1280);
  }, [containerWidth]);

  const isMobile = containerWidth < 768;
  const stageHeight = isMobile ? 420 : 480;
  const yStart = isMobile ? 25 : 35;
  const yMid = isMobile ? 210 : 250;

  // Exact Bernstein Bezier formula for quadratic curve:
  // Control point is chosen so the vertex hits yMid at t = 0.5:
  // y(t) = yStart + 4 * t * (1 - t) * (yMid - yStart)
  const wireCurveData = useMemo(() => {
    const controlY = 2 * yMid - yStart;
    const pathD = `M -30 ${yStart} Q ${stageWidth / 2} ${controlY} ${stageWidth + 30} ${yStart}`;

    const deltaY = yMid - yStart;

    // Calculate exact (x, y) and tangent angle for each photo
    const calculatedPhotos = photos.map((item) => {
      const t = item.t;
      const x = stageWidth * t;
      // Exact y on the Bezier curve
      const y = yStart + 4 * t * (1 - t) * deltaY;

      // Tangent slope dy/dx = (4 * (1 - 2*t) * deltaY) / stageWidth
      const slope = (4 * (1 - 2 * t) * deltaY) / stageWidth;
      const naturalAngle = (Math.atan(slope) * 180) / Math.PI;

      return {
        ...item,
        x,
        y,
        naturalAngle,
        hoverAngle: naturalAngle > 0 ? naturalAngle + 12 : naturalAngle - 12,
      };
    });

    return { pathD, calculatedPhotos };
  }, [stageWidth, yStart, yMid, photos]);

  // Mouse / Touch Drag Handlers for horizontal pan on desktop & mobile
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    dragRef.current = {
      isDown: true,
      startX: e.clientX,
      scrollLeft: viewportRef.current ? viewportRef.current.scrollLeft : 0,
      hasMoved: false,
    };
    setIsDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch { }
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current.isDown || !viewportRef.current) return;
    const deltaX = e.clientX - dragRef.current.startX;
    if (Math.abs(deltaX) > 5) {
      dragRef.current.hasMoved = true;
    }
    viewportRef.current.scrollLeft = dragRef.current.scrollLeft - deltaX;
  };

  const handlePointerUp = (e) => {
    dragRef.current.isDown = false;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch { }
  };

  const handleCardClick = useCallback((item) => {
    if (!dragRef.current.hasMoved) {
      setActiveModalPhoto(item);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`des4-clothesline-fullwidth-wrapper ${className}`}
      style={style}
    >
      {/* Draggable & Scrollable Viewport */}
      <div
        ref={viewportRef}
        className={`des4-clothesline-pan-viewport ${isDragging ? 'is-dragging' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="des4-clothesline-pan-stage"
          style={{
            width: stageWidth,
            height: stageHeight,
          }}
        >
          {/* Mathematically Exact SVG Hanging Wire */}
          <svg
            className="des4-clothesline-pan-svg"
            style={{ width: stageWidth, height: stageHeight }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ambient wire drop shadow */}
            <path
              d={wireCurveData.pathD}
              stroke="rgba(0, 0, 0, 0.12)"
              strokeWidth="4"
              transform="translate(0, 3)"
            />
            {/* Realistic metallic steel wire */}
            <path
              d={wireCurveData.pathD}
              stroke="#64748b"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Top highlight beam */}
            <path
              d={wireCurveData.pathD}
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>

          {/* 5 Polaroid Cards Hanging from the Wire */}
          {wireCurveData.calculatedPhotos.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const currentAngle = isHovered ? item.hoverAngle : item.naturalAngle;
            const scale = isHovered ? 1.18 : 1;

            return (
              <div
                key={item.id || index}
                className="des4-clothesline-pin-anchor"
                style={{
                  left: item.x,
                  top: item.y,
                  zIndex: isHovered ? 50 : 10 + index,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleCardClick(item)}
                title="Click to zoom preview"
              >
                {/* 
                  The entire card + clip rotates around (0, 0)
                  which is the EXACT POINT where the wire touches the clip loop!
                */}
                <div
                  className="des4-clothesline-swing-group"
                  style={{
                    transform: `rotate(${currentAngle}deg) scale(${scale})`,
                    transformOrigin: '0 0',
                    transition: isDragging
                      ? 'none'
                      : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  }}
                >
                  {/* Golden Binder Clip (Centering the top loop directly on y=0) */}
                  <div className="des4-clothesline-clip-holder">
                    <img
                      src={BINDER_CLIP_LOCAL}
                      onError={(e) => {
                        e.currentTarget.src = BINDER_CLIP_FALLBACK;
                      }}
                      alt="Binder Clip"
                      className="des4-clothesline-clip-img"
                      draggable={false}
                    />
                  </div>

                  {/* Classic Polaroid Card Clamped by the Clip */}
                  <div
                    className={`des4-clothesline-polaroid-frame ${isHovered ? 'is-hovered' : ''}`}
                  >
                    <div className="des4-clothesline-polaroid-inner">
                      <img
                        src={item.src}
                        onError={(e) => {
                          if (item.fallbackSrc) e.currentTarget.src = item.fallbackSrc;
                        }}
                        alt={item.title}
                        className="des4-clothesline-photo-img"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Swipe / Drag interactive hint */}
      <div className="des4-clothesline-drag-indicator">
        <span className="des4-clothesline-drag-pill">
          ↔ Kéo ngang hoặc vuốt để xem toàn bộ dây ảnh
        </span>
      </div>

      {/* Interactive Lightbox Modal */}
      {activeModalPhoto && (
        <div
          className="des4-clothesline-modal-backdrop"
          onClick={() => setActiveModalPhoto(null)}
        >
          <div
            className="des4-clothesline-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="des4-clothesline-modal-close"
              onClick={() => setActiveModalPhoto(null)}
              aria-label="Close"
            >
              <IoCloseOutline size={26} />
            </button>

            <div className="des4-clothesline-modal-card">
              <img
                src={activeModalPhoto.src}
                onError={(e) => {
                  if (activeModalPhoto.fallbackSrc) {
                    e.currentTarget.src = activeModalPhoto.fallbackSrc;
                  }
                }}
                alt={activeModalPhoto.title}
                className="des4-clothesline-modal-img"
              />
              <div className="des4-clothesline-modal-footer">
                <div className="des4-clothesline-modal-title">
                  {activeModalPhoto.title}
                </div>
                <div className="des4-clothesline-modal-sub">
                  {activeModalPhoto.subtitle}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
