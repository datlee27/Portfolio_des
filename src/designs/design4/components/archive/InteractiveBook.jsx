import React, { useState, useRef } from 'react';
import { BookOpen, RotateCcw, FileText } from 'lucide-react';

// Default sample pages with technical artisan sketches and designs
const DEFAULT_BOOK_PAGES = [
  // Front Cover
  {
    type: 'cover',
    title: 'DAT LE',
    subtitle: 'ENGINEERING & DESIGN ARCHIVES',
    edition: 'Vol. IV • Da Nang, VN',
    bg: '#0f172a',
    textColor: '#f8fafc',
    accentColor: '#fe3c01',
  },
  // Page 1 (Inside Front Cover / Left spread 1)
  {
    type: 'sketch',
    title: '01 / ARCHITECTURE',
    heading: 'Clean Systems',
    body: 'Decoupled domain models, Spring Boot event pipelines, sub-millisecond query caches.',
    stamp: 'SYSTEM_APPROVED',
    bg: '#fdfbf7',
    textColor: '#1e293b',
  },
  // Page 2 (Right spread 1)
  {
    type: 'code',
    title: '02 / INTERACTION',
    heading: 'Fluid React 19',
    body: 'Tactile spring mechanics, low-latency pointer capture, and hardware-accelerated shaders.',
    stamp: '60_FPS_VERIFIED',
    bg: '#ffffff',
    textColor: '#0f172a',
  },
  // Page 3 (Left spread 2)
  {
    type: 'blueprint',
    title: '03 / INTELLIGENCE',
    heading: 'Applied AI Agents',
    body: 'Context engineering, vision OCR inference, and automated human-in-the-loop workflows.',
    stamp: 'CLAUDE_SYNAPSE',
    bg: '#f8fafc',
    textColor: '#0f172a',
  },
  // Page 4 (Right spread 2)
  {
    type: 'statement',
    title: '04 / ETHOS',
    heading: 'Tactile Craft',
    body: '“Code is modern clay. The real magic happens in the messy prototyping between imagination and execution.”',
    stamp: 'PROTOTYPE_LAB',
    bg: '#fafafa',
    textColor: '#18181b',
  },
  // Back Cover
  {
    type: 'back',
    title: 'DAT LE',
    subtitle: 'Portfolio Archives • 2026',
    edition: 'Handcrafted with React & CSS',
    bg: '#0f172a',
    textColor: '#94a3b8',
    accentColor: '#fe3c01',
  },
];

export default function InteractiveBook({
  width = 240,
  height = 330,
  frontCover,
  backCover,
  innerPages,
  borderRadius = 8,
  className = '',
  style = {},
}) {
  // Combine custom image props if provided, otherwise use rich default artisan pages
  const rawPages = (frontCover || innerPages?.length || backCover)
    ? [frontCover, ...(innerPages || []), backCover].filter(Boolean)
    : DEFAULT_BOOK_PAGES;

  const allPages = rawPages.length % 2 === 0 ? rawPages : [...rawPages, null];

  const leafPairs = [];
  for (let i = 0; i < allPages.length; i += 2) {
    leafPairs.push([allPages[i], allPages[i + 1]]);
  }

  const totalLeaves = leafPairs.length;
  const [flippedCount, setFlippedCount] = useState(0);
  const [isBookClosed, setIsBookClosed] = useState(true);
  const isAnimatingRef = useRef(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    if (flippedCount === 0) {
      setIsBookClosed(false);
    }

    if (flippedCount < totalLeaves) {
      setFlippedCount((prev) => prev + 1);
      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 700);
    } else {
      // Reached the end: flip all back sequentially
      for (let i = totalLeaves - 1; i >= 0; i--) {
        setTimeout(() => {
          setFlippedCount(i);
          if (i === 0) {
            setIsBookClosed(true);
            isAnimatingRef.current = false;
          }
        }, (totalLeaves - 1 - i) * 120);
      }
    }
  };

  // Render a single page face (either image or stylized artisan page)
  const renderPageFace = (pageData, isLeft = false) => {
    if (!pageData) {
      return (
        <div style={{ width: '100%', height: '100%', background: '#f8fafc' }} />
      );
    }

    // If page is an image URL string or object with src
    if (typeof pageData === 'string' || pageData.src) {
      const src = typeof pageData === 'string' ? pageData : pageData.src;
      return (
        <img
          src={src}
          alt="Page"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          draggable={false}
        />
      );
    }

    // Default rich artisan editorial page layout
    return (
      <div
        className={`des4-book-page-content ${isLeft ? 'is-left' : 'is-right'}`}
        style={{
          background: pageData.bg || '#ffffff',
          color: pageData.textColor || '#0f172a',
        }}
      >
        {pageData.type === 'cover' ? (
          <div className="des4-book-cover-layout">
            <div className="des4-book-cover-top">
              <span className="des4-book-cover-star">★</span>
              <span className="des4-book-cover-tag">{pageData.edition}</span>
            </div>
            <div className="des4-book-cover-center">
              <h2 className="des4-book-cover-title">{pageData.title}</h2>
              <div className="des4-book-cover-rule" />
              <p className="des4-book-cover-sub">{pageData.subtitle}</p>
            </div>
            <div className="des4-book-cover-bottom">
              <span className="des4-book-cover-badge">TAP TO OPEN ↗</span>
            </div>
          </div>
        ) : pageData.type === 'back' ? (
          <div className="des4-book-back-layout">
            <div className="des4-book-cover-top">
              <span className="des4-book-cover-star">★</span>
            </div>
            <div className="des4-book-back-center">
              <div className="des4-book-back-barcode">||| | |||| | ||| |||| |</div>
              <div className="des4-book-back-sub">{pageData.subtitle}</div>
              <div className="des4-book-back-tag">{pageData.edition}</div>
            </div>
            <div className="des4-book-back-bottom">
              <span className="des4-book-cover-badge">CLOSE ↺</span>
            </div>
          </div>
        ) : (
          <div className="des4-book-inner-layout">
            <div className="des4-book-inner-header">
              <span className="des4-book-inner-num">{pageData.title}</span>
              <span className="des4-book-inner-stamp">{pageData.stamp}</span>
            </div>
            <div className="des4-book-inner-body">
              <h4 className="des4-book-inner-heading">{pageData.heading}</h4>
              <p className="des4-book-inner-text">{pageData.body}</p>
            </div>
            <div className="des4-book-inner-footer">
              <div className="des4-book-inner-dots">•••••</div>
              <span className="des4-book-inner-page-no">
                {isLeft ? 'P.L' : 'P.R'}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`des4-interactive-book-wrapper ${className}`}
      style={{
        ...style,
        perspective: 2500,
      }}
      onClick={handleClick}
      title="Click book to turn page"
    >
      {/* 3D Book Container */}
      <div
        className="des4-interactive-book-stage"
        style={{
          width,
          height,
          transform: isBookClosed ? 'translateX(0px)' : `translateX(${width / 2}px)`,
          transition: 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isBookClosed
            ? '0 20px 40px -8px rgba(0, 0, 0, 0.35), 0 6px 16px rgba(0, 0, 0, 0.18)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Soft realistic shadow beneath the open spreads */}
        {!isBookClosed && (
          <div
            className="des4-book-spread-shadow"
            style={{
              position: 'absolute',
              inset: 0,
              width: width * 2,
              left: -width,
              boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.35)',
              borderRadius,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
        )}

        {/* Leaves (Pairs of Pages) */}
        {leafPairs.map(([frontData, backData], index) => {
          const isFlipped = index < flippedCount;
          const isFlipping = index === flippedCount - 1;
          const zOffset = isFlipped ? index * 0.4 : (totalLeaves - index) * 0.4;
          const zIndex = isFlipping ? 100 : isFlipped ? index : totalLeaves - index;

          return (
            <div
              key={index}
              className="des4-book-leaf"
              style={{
                position: 'absolute',
                inset: 0,
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
                zIndex,
                transform: `rotateY(${isFlipped ? -180 : 0}deg) translateZ(${zOffset}px)`,
                transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform',
              }}
            >
              {/* Front Face (Right Page when closed, flips over to the left) */}
              <div
                className="des4-book-face des4-book-face-front"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  borderRadius: `0px ${borderRadius}px ${borderRadius}px 0px`,
                  overflow: 'hidden',
                }}
              >
                {renderPageFace(frontData, false)}
                {/* Book Spine crease shadow */}
                <div className="des4-book-spine-crease-left" />
              </div>

              {/* Back Face (Left Page when flipped open) */}
              <div
                className="des4-book-face des4-book-face-back"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg) translateZ(0.01px)',
                  borderRadius: `${borderRadius}px 0px 0px ${borderRadius}px`,
                  overflow: 'hidden',
                }}
              >
                {renderPageFace(backData, true)}
                {/* Book Spine crease shadow on the right side */}
                <div className="des4-book-spine-crease-right" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtle Micro-Interaction Hint */}
      <div className="des4-book-turn-hint">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          {isBookClosed ? (
            <>
              <BookOpen size={14} style={{ color: '#fe3c01' }} />
              <span>Click to open journal</span>
            </>
          ) : flippedCount >= totalLeaves ? (
            <>
              <RotateCcw size={13} style={{ color: '#fe3c01' }} />
              <span>Click to close book</span>
            </>
          ) : (
            <>
              <FileText size={13} style={{ color: '#fe3c01' }} />
              <span>Page {flippedCount + 1} of {totalLeaves} (Click to flip)</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
}
