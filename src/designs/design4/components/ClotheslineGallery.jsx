import React, { useState, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

// Default sample images matching the Framer Clothesline Gallery link provided by user
const DEFAULT_CLOTHESLINE_PHOTOS = [
  {
    id: 1,
    title: 'Post-it Brainstorm',
    subtitle: 'Iterative prototypes & messy ideation',
    src: 'https://framerusercontent.com/images/C6p09vLh49q0WPgOef4V7TUBgEg.png?width=1200&height=600',
    aspectRatio: '1200 / 600',
    baseRotate: 22,
    hoverRotate: 34,
    hoverY: 12,
    hoverScale: 1.2,
    position: {
      left: '12%',
      top: '80px',
    },
    clipOffset: {
      top: '-18px',
      left: '50%',
    },
  },
  {
    id: 2,
    title: 'In The Elements',
    subtitle: 'Observation, texture, and field research',
    src: 'https://framerusercontent.com/images/AqWlfbJga6pA8kddv07uVzPsqdE.png?width=900&height=1200',
    aspectRatio: '900 / 1200',
    baseRotate: 10,
    hoverRotate: -4,
    hoverY: 12,
    hoverScale: 1.2,
    position: {
      left: '31%',
      top: '185px',
    },
    clipOffset: {
      top: '-18px',
      left: '50%',
    },
  },
  {
    id: 3,
    title: 'Artisan Workshop',
    subtitle: 'Where digital engineering meets tactile craft',
    src: 'https://framerusercontent.com/images/8ntZg49nxKYsJnGQ66vctVPaPo.png?width=1200&height=1200',
    aspectRatio: '1200 / 1200',
    baseRotate: -1,
    hoverRotate: 12,
    hoverY: 12,
    hoverScale: 1.2,
    position: {
      left: '50%',
      top: '240px',
    },
    clipOffset: {
      top: '-18px',
      left: '50%',
    },
  },
  {
    id: 4,
    title: 'Denim & Architecture',
    subtitle: 'Raw materiality and spatial proportion',
    src: 'https://framerusercontent.com/images/SdEmNHumLS0EHWsG6x8g0CWHxKw.png?width=899&height=1199',
    aspectRatio: '899 / 1199',
    baseRotate: -11,
    hoverRotate: -22,
    hoverY: 12,
    hoverScale: 1.2,
    position: {
      left: '69%',
      top: '185px',
    },
    clipOffset: {
      top: '-18px',
      left: '50%',
    },
  },
  {
    id: 5,
    title: 'Light & Shadows',
    subtitle: 'Quiet contrasts and atmospheric stillness',
    src: 'https://framerusercontent.com/images/tiketPH2eVOgFb1uzQG4NawdMGo.jpg?width=906&height=1200',
    aspectRatio: '906 / 1200',
    baseRotate: -22,
    hoverRotate: -34,
    hoverY: 12,
    hoverScale: 1.2,
    position: {
      left: '88%',
      top: '80px',
    },
    clipOffset: {
      top: '-18px',
      left: '50%',
    },
  },
];

const BINDER_CLIP_URL = 'https://framerusercontent.com/images/U9eXOl3LNm2e6HGQ8jzhLdIn8BM.png?width=736&height=736';

export default function ClotheslineGallery({
  photos = DEFAULT_CLOTHESLINE_PHOTOS,
  className = '',
  style = {},
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeModalPhoto, setActiveModalPhoto] = useState(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalPhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`des4-clothesline-wrapper ${className}`} style={style}>
      {/* Scrollable Viewport for Mobile / Centered for Desktop */}
      <div className="des4-clothesline-viewport">
        <div className="des4-clothesline-stage">
          {/* Hanging Clothesline Curved Wire (SVG) */}
          <svg
            className="des4-clothesline-wire-svg"
            viewBox="0 0 1326 303.5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* Subtle soft shadow of the wire */}
            <path
              d="M 1326 2 C 1326 169.618 1029.165 305.5 663 305.5 C 296.835 305.5 0 169.618 0 2"
              stroke="rgba(0, 0, 0, 0.08)"
              strokeWidth="2.5"
              fill="transparent"
            />
            {/* Main metallic wire */}
            <path
              d="M 1326 0 C 1326 167.618 1029.165 303.5 663 303.5 C 296.835 303.5 0 167.618 0 0"
              stroke="#94a3b8"
              strokeWidth="2"
              fill="transparent"
            />
          </svg>

          {/* 5 Hanging Polaroid Cards with Binder Clips */}
          {photos.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const currentRotate = isHovered ? item.hoverRotate : item.baseRotate;
            const currentScale = isHovered ? item.hoverScale : 1;
            const currentY = isHovered ? item.hoverY : 0;

            return (
              <div
                key={item.id || index}
                className="des4-clothesline-pin-group"
                style={{
                  left: item.position.left,
                  top: item.position.top,
                  zIndex: isHovered ? 40 : 10 + index,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActiveModalPhoto(item)}
                title="Click to preview photo"
              >
                {/* Physical Card Container with Spring Transitions */}
                <div
                  className="des4-clothesline-card-pivot"
                  style={{
                    transform: `translate(-50%, 0) rotate(${currentRotate}deg) translateY(${currentY}px) scale(${currentScale})`,
                  }}
                >
                  {/* Golden Metallic Binder Clip clamping onto the top of the photo */}
                  <img
                    src={BINDER_CLIP_URL}
                    alt="binder clip"
                    className="des4-clothesline-clip-img"
                    style={{
                      top: item.clipOffset.top,
                      left: item.clipOffset.left,
                    }}
                    draggable={false}
                  />

                  {/* Classic White Polaroid Frame */}
                  <div className={`des4-clothesline-polaroid ${isHovered ? 'is-hovered' : ''}`}>
                    <div className="des4-clothesline-photo-container">
                      <img
                        src={item.src}
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

      {/* Swipe cue on mobile screens */}
      <div className="des4-clothesline-mobile-cue">
        <span>↔ Swipe to explore hanging gallery</span>
      </div>

      {/* Interactive Lightbox Modal when clicking a photo */}
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
              aria-label="Close photo preview"
            >
              <IoCloseOutline size={26} />
            </button>

            <div className="des4-clothesline-modal-card">
              <img
                src={activeModalPhoto.src}
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
