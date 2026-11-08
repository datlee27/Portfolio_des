import React, { useState, useEffect } from 'react';
import { ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

function formatVideoUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  // Cloudinary video transformation: automatically deliver as MP4 with f_auto,q_auto
  if (trimmed.includes('res.cloudinary.com') && trimmed.includes('/video/upload/')) {
    let converted = trimmed;
    if (!converted.includes('/video/upload/f_auto') && !converted.includes('/video/upload/q_auto')) {
      converted = converted.replace('/video/upload/', '/video/upload/f_auto,q_auto/');
    }
    // Apple MOV containers often use HEVC (hvc1) which breaks standard Chromium browsers.
    // Cloudinary automatically transcodes to universal H.264 MP4 when requesting .mp4 extension!
    converted = converted.replace(/\.mov$/i, '.mp4');
    return converted;
  }
  return trimmed;
}

function getEmbedVideo(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  const ytMatch = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
  if (ytMatch) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0`,
    };
  }
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?([0-9]+)/i);
  if (vimeoMatch) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
    };
  }
  return {
    type: 'html5',
    url: formatVideoUrl(trimmed),
    rawUrl: trimmed,
  };
}

export default function ProjectModalD4({ project, onClose }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  // Only reset slide to 0 when project ID genuinely changes
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [project?.id]);

  const projectTitle = project?.title || project?.name || 'Untitled Project';
  const projectSubtitle = project?.subtitle || project?.code || 'Selected Project';
  const projectClient = project?.client || 'Personal / Open-Source';
  const projectYear = project?.year || '2025 – 2026';
  const projectTags = Array.isArray(project?.tags) ? project.tags : [];
  const projectType = project?.type || projectTags[0] || 'Fullstack Web Application';
  const projectCredits = projectTags.length > 0
    ? projectTags.join(', ')
    : project?.credits || 'React, Vite, Node.js';
  const projectDescription = project?.description || project?.summary || '';
  const projectCover =
    project?.image ||
    project?.image_url ||
    project?.coverImage ||
    'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80';
  const liveUrl = project?.deploy || project?.liveUrl || '';
  const githubUrl = project?.github || project?.githubUrl || '';

  // Extract body images (up to 6)
  let rawBodyImages = [];
  if (Array.isArray(project?.body_images)) {
    rawBodyImages = project.body_images;
  } else if (typeof project?.body_images === 'string' && project.body_images.startsWith('[')) {
    try {
      rawBodyImages = JSON.parse(project.body_images);
    } catch {
      rawBodyImages = [];
    }
  } else if (typeof project?.body_images === 'string' && project.body_images.trim().length > 0) {
    rawBodyImages = project.body_images.split(',').map((s) => s.trim()).filter(Boolean);
  } else if (Array.isArray(project?.images)) {
    rawBodyImages = project.images;
  }
  const bodyImages = (Array.isArray(rawBodyImages) ? rawBodyImages : [])
    .filter((img) => typeof img === 'string' && img.trim().length > 0)
    .slice(0, 6);

  // Extract video demo safely
  const rawVideo = project?.video_demo || project?.video_url || project?.video || '';
  const videoDemo = typeof rawVideo === 'string' ? rawVideo.trim() : '';

  // Combine into slides list: [Cover Image, ...Body Images, Video Demo (if any)]
  const slides = project ? [
    ...(projectCover ? [{ type: 'image', url: projectCover, label: 'Ảnh đại diện (Cover)' }] : []),
    ...bodyImages.map((img, i) => ({
      type: 'image',
      url: img,
      label: `Ảnh chi tiết (${i + 1}/${bodyImages.length})`,
    })),
    ...(videoDemo ? [{ type: 'video', url: videoDemo, label: 'Video Demo' }] : []),
  ] : [];

  // Clamp current index safely
  const safeCurrentIndex = slides.length > 0
    ? Math.min(Math.max(0, currentSlideIndex), slides.length - 1)
    : 0;
  const currentSlide = slides[safeCurrentIndex] || slides[0] || { type: 'image', url: projectCover, label: 'Ảnh đại diện' };

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (slides.length > 1) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          setCurrentSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Stop Lenis smooth scroll so it cannot hijack wheel events or scroll the background page
    if (window.lenis) {
      window.lenis.stop();
    }

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalBodyOverflow || '';
      document.documentElement.style.overflow = originalHtmlOverflow || '';
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, [project, slides.length, onClose]);

  if (!project) return null;

  // Mouse Drag handlers for desktop Swiper
  const handleMouseDown = (e) => {
    if (slides.length <= 1) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    if (dragOffset < -45) {
      setCurrentSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
    } else if (dragOffset > 45) {
      setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Touch Swipe handlers for mobile Swiper
  const handleTouchStart = (e) => {
    if (slides.length <= 1) return;
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - dragStartX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    if (dragOffset < -45) {
      setCurrentSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
    } else if (dragOffset > 45) {
      setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <div
      className="des4-project-modal-overlay"
      data-lenis-prevent="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        overscrollBehavior: 'contain',
        animation: 'des4ModalFadeIn 0.25s ease-out forwards',
      }}
      onClick={onClose}
    >
      <div
        className="des4-project-modal-window"
        data-lenis-prevent="true"
        role="dialog"
        aria-modal="true"
        aria-labelledby="des4-project-modal-title"
        style={{
          width: '100%',
          maxWidth: 860,
          maxHeight: '88vh',
          background: '#ffffff',
          color: '#111827',
          borderRadius: 20,
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overscrollBehavior: 'contain',
          animation: 'des4ModalScaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* macOS TitleBar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 18px',
            background: '#f4f4f5',
            borderBottom: '1px solid #e4e4e7',
            userSelect: 'none',
            flexShrink: 0,
          }}
        >
          {/* macOS 3 Traffic Light Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={onClose}
              title="Close"
              aria-label="Close project modal"
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: '#ff5f57',
                border: '1px solid rgba(0,0,0,0.15)',
                cursor: 'pointer',
                padding: 0,
                outline: 'none',
                transition: 'transform 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
            <button
              onClick={onClose}
              title="Minimize"
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: '#ffbd2e',
                border: '1px solid rgba(0,0,0,0.15)',
                cursor: 'pointer',
                padding: 0,
                outline: 'none',
                transition: 'transform 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
            <button
              title="Maximize"
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: '#28ca42',
                border: '1px solid rgba(0,0,0,0.15)',
                cursor: 'pointer',
                padding: 0,
                outline: 'none',
                transition: 'transform 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </div>

          {/* Centered TitleBar Text */}
          <span
            style={{
              fontFamily: 'monospace, system-ui',
              fontSize: 13,
              fontWeight: 700,
              color: '#3f3f46',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '65%',
            }}
          >
            Preview – {projectTitle}
          </span>

          {/* Right Placeholder for Balance */}
          <div style={{ width: 44 }} />
        </div>

        {/* Modal Scrollable Body */}
        <div
          className="des4-project-modal-body"
          data-lenis-prevent="true"
          style={{
            flex: '1 1 auto',
            minHeight: 0,
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            padding: '36px 40px',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Subtitle Badge */}
          <div style={{ marginBottom: 8 }}>
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 12,
                fontWeight: 700,
                color: '#fe3c01',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {projectSubtitle}
            </span>
          </div>

          {/* H1 Project Name */}
          <h1
            id="des4-project-modal-title"
            style={{
              fontFamily: 'var(--font-outfit)',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#09090b',
              margin: '0 0 16px 0',
            }}
          >
            {projectTitle}
          </h1>

          {/* Metadata Grid (2-Column) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px 24px',
              padding: '20px 24px',
              background: '#f8fafc',
              borderRadius: 14,
              border: '1px solid #e2e8f0',
              marginBottom: 24,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#64748b',
                  marginBottom: 4,
                }}
              >
                Client / Context
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#0f172a',
                }}
              >
                {projectClient}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#64748b',
                  marginBottom: 4,
                }}
              >
                Year
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#0f172a',
                }}
              >
                {projectYear}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#64748b',
                  marginBottom: 4,
                }}
              >
                Project Type
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#0f172a',
                }}
              >
                {projectType}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#64748b',
                  marginBottom: 4,
                }}
              >
                Credits & Technologies
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#0f172a',
                }}
              >
                {projectCredits}
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexWrap: 'wrap',
              marginBottom: 28,
            }}
          >
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 22px',
                  borderRadius: 100,
                  background: '#fe3c01',
                  color: '#ffffff',
                  fontFamily: 'var(--font-inter)',
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(254, 60, 1, 0.35)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(254, 60, 1, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(254, 60, 1, 0.35)';
                }}
              >
                <ExternalLink size={14} />
                <span>Live Demo</span>
                <ArrowUpRight size={13} />
              </a>
            )}

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 22px',
                  borderRadius: 100,
                  background: '#09090b',
                  color: '#ffffff',
                  fontFamily: 'var(--font-inter)',
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#27272a')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#09090b')}
              >
                <SiGithub size={14} />
                <span>GitHub Code</span>
                <ArrowUpRight size={13} />
              </a>
            )}
          </div>

          {/* Divider */}
          <div
            style={{
              width: '100%',
              height: 1,
              background: '#e4e4e7',
              margin: '28px 0',
            }}
          />

          {/* Description */}
          {projectDescription && (
            <div style={{ marginBottom: 32 }}>
              <h3
                style={{
                  fontFamily: 'var(--font-outfit)',
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#09090b',
                  marginBottom: 10,
                }}
              >
                About The Project
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: '#3f3f46',
                  margin: 0,
                }}
              >
                {projectDescription}
              </p>
            </div>
          )}

          {/* Project Media / Gallery Swiper */}
          {slides.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#71717a',
                  }}
                >
                  Project Preview & Interface
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {slides.length > 1 && (
                    <span
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#fe3c01',
                      }}
                    >
                      {safeCurrentIndex + 1} / {slides.length} mục
                    </span>
                  )}
                </div>
              </div>

              {/* Main Swiper Viewport */}
              <div
                className="des4-swiper-viewport"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  minHeight: 280,
                  maxHeight: 520,
                  borderRadius: 14,
                  overflow: 'hidden',
                  background: '#09090b',
                  boxShadow: '0 14px 40px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.08)',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  touchAction: 'pan-y',
                  cursor: isDragging ? 'grabbing' : slides.length > 1 ? 'grab' : 'default',
                }}
              >
                {/* Horizontal Sliding Track */}
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    transform: `translateX(calc(-${safeCurrentIndex * 100}% + ${dragOffset}px))`,
                    transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    willChange: 'transform',
                  }}
                >
                  {slides.map((s, idx) => (
                    <div
                      key={idx}
                      style={{
                        flex: '0 0 100%',
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        background: '#09090b',
                      }}
                    >
                      {s.type === 'image' ? (
                        <img
                          src={s.url}
                          alt={`${projectTitle} - ${s.label}`}
                          draggable={false}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'top center',
                            display: 'block',
                            pointerEvents: 'none',
                          }}
                          loading={idx === 0 ? 'eager' : 'lazy'}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80';
                          }}
                        />
                      ) : (
                        (() => {
                          const videoInfo = getEmbedVideo(s.url);
                          if (videoInfo?.type === 'youtube' || videoInfo?.type === 'vimeo') {
                            return (
                              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                <iframe
                                  src={videoInfo.embedUrl}
                                  title="Project Video Demo"
                                  style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    border: 0,
                                  }}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              </div>
                            );
                          }
                          const safeVideoUrl = videoInfo?.url || s.url;
                          return (
                            <video
                              controls
                              playsInline
                              preload="metadata"
                              onError={(e) => {
                                console.warn('[ProjectModalD4] Video load notice:', safeVideoUrl, e);
                              }}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                display: 'block',
                                background: '#000',
                              }}
                            >
                              <source src={safeVideoUrl} type="video/mp4" />
                              {s.url && s.url !== safeVideoUrl && (
                                <source src={s.url} type="video/quicktime" />
                              )}
                              Trình duyệt của bạn không hỗ trợ phát trực tiếp định dạng video này.
                            </video>
                          );
                        })()
                      )}
                    </div>
                  ))}
                </div>

                {/* Top Overlay Badge */}
                {slides.length > 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      padding: '4px 10px',
                      borderRadius: 100,
                      background: 'rgba(0, 0, 0, 0.65)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      color: '#ffffff',
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      pointerEvents: 'none',
                      zIndex: 10,
                    }}
                  >
                    {currentSlide.type === 'video'
                      ? '🎥 Video Demo'
                      : safeCurrentIndex === 0
                      ? '⭐ Ảnh đại diện'
                      : `📷 Ảnh chi tiết #${safeCurrentIndex}`}
                  </div>
                )}

                {/* Navigation Arrows (if > 1 slide) */}
                {slides.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
                      }}
                      title="Ảnh trước"
                      aria-label="Previous slide"
                      style={{
                        position: 'absolute',
                        left: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10,
                        transition: 'transform 0.15s ease, background 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.12)';
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.85)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                      }}
                    >
                      <ChevronLeft size={22} />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
                      }}
                      title="Ảnh tiếp theo"
                      aria-label="Next slide"
                      style={{
                        position: 'absolute',
                        right: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10,
                        transition: 'transform 0.15s ease, background 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.12)';
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.85)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                      }}
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}
              </div>

              {/* Dots Pagination ở dưới cùng (theo đúng yêu cầu của người dùng) */}
              {slides.length > 1 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '10px 14px',
                    marginTop: 12,
                    background: '#f8fafc',
                    borderRadius: 100,
                    border: '1px solid #e2e8f0',
                    width: 'fit-content',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  {slides.map((s, idx) => {
                    const isActive = idx === safeCurrentIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentSlideIndex(idx)}
                        title={s.label}
                        aria-label={`Chuyển đến ${s.label}`}
                        style={{
                          width: isActive ? 26 : 8,
                          height: 8,
                          borderRadius: 999,
                          border: 'none',
                          padding: 0,
                          background: isActive ? '#fe3c01' : '#cbd5e1',
                          cursor: 'pointer',
                          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                          boxShadow: isActive ? '0 2px 8px rgba(254, 60, 1, 0.45)' : 'none',
                          outline: 'none',
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Global CSS Keyframes for smooth animations */}
      <style>{`
        @keyframes des4SlideFade {
          from { opacity: 0.4; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes des4ModalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes des4ModalScaleIn {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(18px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
          .des4-project-modal-body {
            overscroll-behavior: contain;
            scrollbar-width: thin;
            scrollbar-color: #cbd5e1 transparent;
          }
          .des4-project-modal-body::-webkit-scrollbar {
            width: 7px;
          }
          .des4-project-modal-body::-webkit-scrollbar-track {
            background: transparent;
          }
          .des4-project-modal-body::-webkit-scrollbar-thumb {
            background-color: #cbd5e1;
            border-radius: 9999px;
          }
          .des4-project-modal-body::-webkit-scrollbar-thumb:hover {
            background-color: #94a3b8;
          }
          @media (max-width: 640px) {
            .des4-project-modal-body {
              padding: 24px 18px !important;
            }
            .des4-project-modal-window {
              max-height: 94vh !important;
              border-radius: 14px !important;
            }
          }
        `}</style>
    </div>
  );
}
