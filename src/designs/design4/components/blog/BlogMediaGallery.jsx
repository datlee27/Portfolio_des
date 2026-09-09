import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconChevronLeft,
  IconChevronRight,
  IconMaximize,
  IconPlay,
} from './BlogIcons';

/**
 * BlogMediaGallery
 * Smart media gallery rendered in the blog reader/drawer.
 * - Single image: hero presentation with zoom hint & click-to-expand.
 * - Multiple images: inline interactive carousel with arrows, swipe, dots, and click-to-expand.
 * - Video: responsive player with play control & expand icon.
 */
export default function BlogMediaGallery({ media, onOpenLightbox, theme }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  if (!media || !media.items || media.items.length === 0) return null;

  const items = media.items;
  const isSingle = items.length === 1;
  const isVideo = media.type === 'video';

  const nextSlide = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
    },
    [items.length]
  );

  const prevSlide = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
    },
    [items.length]
  );

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchMove(e) {
    touchEndX.current = e.touches[0].clientX;
  }

  function handleTouchEnd() {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  }

  /* ── 1. Single Media Item ─────────────────────────────────────────── */
  if (isSingle) {
    const item = items[0];
    const isPlaceholder = Array.isArray(item);

    return (
      <div
        className="blog-gallery-single"
        onClick={() => onOpenLightbox && onOpenLightbox(0)}
        role="button"
        tabIndex={0}
        aria-label="Phóng to ảnh"
      >
        {isVideo && !isPlaceholder ? (
          <div className="blog-gallery-video-wrap">
            <video
              src={item}
              controls
              playsInline
              className="blog-gallery-single-video"
            />
          </div>
        ) : isPlaceholder ? (
          <div
            className="blog-gallery-single-placeholder"
            style={{
              background: `linear-gradient(135deg, ${item[0]}, ${item[1]})`,
            }}
          >
            {isVideo && <IconPlay size={36} />}
          </div>
        ) : (
          <div className="blog-gallery-single-image-wrap">
            <img
              src={item}
              alt="Ảnh bài viết"
              className="blog-gallery-single-image"
              loading="lazy"
            />
            <div className="blog-gallery-expand-badge">
              <IconMaximize size={14} />
              <span>Phóng to</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ── 2. Multiple Media Items (Inline Carousel) ───────────────────── */
  const activeItem = items[activeIndex];
  const isPlaceholder = Array.isArray(activeItem);

  return (
    <div
      className="blog-gallery-carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Viewport container */}
      <div
        className="blog-gallery-viewport"
        onClick={() => onOpenLightbox && onOpenLightbox(activeIndex)}
        role="button"
        tabIndex={0}
        aria-label={`Phóng to ảnh ${activeIndex + 1}`}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="blog-gallery-slide"
          >
            {isPlaceholder ? (
              <div
                className="blog-gallery-slide-placeholder"
                style={{
                  background: `linear-gradient(135deg, ${activeItem[0]}, ${activeItem[1]})`,
                }}
              >
                {isVideo && <IconPlay size={32} />}
              </div>
            ) : isVideo ? (
              <video
                src={activeItem}
                controls
                playsInline
                className="blog-gallery-slide-video"
              />
            ) : (
              <img
                src={activeItem}
                alt={`Ảnh ${activeIndex + 1}`}
                className="blog-gallery-slide-image"
                loading="lazy"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Top Badges: Counter & Expand Button */}
        <div className="blog-gallery-top-bar">
          <span className="blog-gallery-counter-badge">
            {activeIndex + 1} / {items.length}
          </span>

          <button
            className="blog-gallery-expand-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenLightbox) onOpenLightbox(activeIndex);
            }}
            aria-label="Phóng to ảnh toàn màn hình"
          >
            <IconMaximize size={14} />
          </button>
        </div>

        {/* Carousel Arrow Controls */}
        <button
          className="blog-gallery-arrow blog-gallery-arrow-prev"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide(e);
          }}
          aria-label="Ảnh trước"
        >
          <IconChevronLeft size={18} />
        </button>

        <button
          className="blog-gallery-arrow blog-gallery-arrow-next"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide(e);
          }}
          aria-label="Ảnh kế tiếp"
        >
          <IconChevronRight size={18} />
        </button>
      </div>

      {/* Bottom Dots Indicator */}
      <div className="blog-gallery-dots">
        {items.map((_, idx) => (
          <button
            key={idx}
            className={`blog-gallery-dot ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Chuyển đến ảnh ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
