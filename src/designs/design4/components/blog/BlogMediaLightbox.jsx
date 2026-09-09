import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconClose, IconChevronLeft, IconChevronRight, IconPlay } from './BlogIcons';

/**
 * Fullscreen Media Lightbox Viewer
 * Allows viewing high-res images/videos full screen with:
 * - Next/Prev buttons
 * - Keyboard shortcuts (ArrowLeft, ArrowRight, Escape)
 * - Mobile touch swipe gestures
 * - Bottom thumbnail strip navigation
 * - Clean borderless close button
 */
export default function BlogMediaLightbox({
  isOpen = false,
  items = [],
  type = 'image',
  initialIndex = 0,
  onClose,
  theme,
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Sync with initialIndex when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setDirection(0);
    }
  }, [isOpen, initialIndex]);

  const total = items.length;

  const goToPrev = useCallback(() => {
    if (total <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  }, [total]);

  const goToNext = useCallback(() => {
    if (total <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, goToPrev, goToNext]);

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Touch swipe handling
  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchMove(e) {
    touchEndX.current = e.touches[0].clientX;
  }

  function handleTouchEnd() {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  }

  if (total === 0) return null;

  const currentItem = items[currentIndex] || items[0];
  const isPlaceholder = Array.isArray(currentItem);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : dir < 0 ? -80 : 0,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 340, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.25 },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring', stiffness: 340, damping: 30 },
        opacity: { duration: 0.15 },
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="blog-lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
        >
        {/* Top bar with counter and borderless close button */}
        <div
          className="blog-lightbox-header"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="blog-lightbox-counter">
            {total > 1 ? `${currentIndex + 1} / ${total}` : ''}
          </div>

          <button
            className="blog-lightbox-close-btn"
            onClick={onClose}
            aria-label="Đóng xem toàn màn hình"
          >
            <IconClose size={20} />
          </button>
        </div>

        {/* Main Stage */}
        <div
          className="blog-lightbox-stage"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Previous Arrow Button */}
          {total > 1 && (
            <button
              className="blog-lightbox-nav-btn blog-lightbox-prev"
              onClick={goToPrev}
              aria-label="Ảnh trước"
            >
              <IconChevronLeft size={22} />
            </button>
          )}

          {/* Media Content with smooth sliding animation */}
          <div className="blog-lightbox-media-wrap">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="blog-lightbox-media-container"
              >
                {type === 'video' && !isPlaceholder ? (
                  <video
                    className="blog-lightbox-video"
                    src={currentItem}
                    controls
                    autoPlay
                    playsInline
                  />
                ) : type === 'video' && isPlaceholder ? (
                  <div
                    className="blog-lightbox-placeholder"
                    style={{
                      background: `linear-gradient(135deg, ${currentItem[0]}, ${currentItem[1]})`,
                    }}
                  >
                    <IconPlay size={48} />
                  </div>
                ) : isPlaceholder ? (
                  <div
                    className="blog-lightbox-placeholder"
                    style={{
                      background: `linear-gradient(135deg, ${currentItem[0]}, ${currentItem[1]})`,
                    }}
                  />
                ) : (
                  <img
                    className="blog-lightbox-image"
                    src={currentItem}
                    alt={`Ảnh ${currentIndex + 1}`}
                    loading="lazy"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Arrow Button */}
          {total > 1 && (
            <button
              className="blog-lightbox-nav-btn blog-lightbox-next"
              onClick={goToNext}
              aria-label="Ảnh tiếp theo"
            >
              <IconChevronRight size={22} />
            </button>
          )}
        </div>

        {/* Bottom Thumbnails Strip (if multiple items) */}
        {total > 1 && (
          <div
            className="blog-lightbox-thumbs-bar"
            onClick={(e) => e.stopPropagation()}
          >
            {items.map((item, idx) => {
              const isActive = idx === currentIndex;
              const isThumbPlaceholder = Array.isArray(item);
              return (
                <button
                  key={idx}
                  className={`blog-lightbox-thumb ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Chuyển đến ảnh ${idx + 1}`}
                >
                  {isThumbPlaceholder ? (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(135deg, ${item[0]}, ${item[1]})`,
                      }}
                    />
                  ) : type === 'video' ? (
                    <div className="blog-lightbox-thumb-video-poster">
                      <IconPlay size={10} />
                    </div>
                  ) : (
                    <img src={item} alt="" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </motion.div>
    )}
  </AnimatePresence>
);
}
