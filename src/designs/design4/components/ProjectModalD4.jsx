import React, { useEffect } from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

export default function ProjectModalD4({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Prevent body scrolling ONLY when modal is actively open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow || '';
    };
  }, [project, onClose]);

  if (!project) return null;

  const projectTitle = project.title || project.name || 'Untitled Project';
  const projectSubtitle = project.subtitle || project.code || 'Selected Project';
  const projectClient = project.client || 'Personal / Open-Source';
  const projectYear = project.year || '2025 – 2026';
  const projectType = project.type || project.tags?.[0] || 'Fullstack Web Application';
  const projectCredits = Array.isArray(project.tags)
    ? project.tags.join(', ')
    : project.credits || 'React, Vite, Node.js';
  const projectDescription = project.description || project.summary || '';
  const projectCover = project.image || project.coverImage || '';
  const liveUrl = project.deploy || project.liveUrl || '';
  const githubUrl = project.github || project.githubUrl || '';

  return (
    <div
      className="des4-project-modal-overlay"
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
        animation: 'des4ModalFadeIn 0.25s ease-out forwards',
      }}
      onClick={onClose}
    >
      <div
        className="des4-project-modal-window"
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
          style={{
            overflowY: 'auto',
            padding: '36px 40px',
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

          {/* Project Media / Gallery */}
          {projectCover && (
            <div style={{ marginTop: 24 }}>
              <div
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#71717a',
                  marginBottom: 12,
                }}
              >
                Project Preview & Interface
              </div>
              <img
                src={projectCover}
                alt={projectTitle}
                style={{
                  width: '100%',
                  borderRadius: 14,
                  objectFit: 'cover',
                  display: 'block',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                }}
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>

      {/* Global CSS Keyframes for smooth animations */}
      <style>{`
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
      `}</style>
    </div>
  );
}
