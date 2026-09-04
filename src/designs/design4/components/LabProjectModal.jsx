import React from 'react';

export default function LabProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          color: '#000000',
          borderRadius: 24,
          maxWidth: 640,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 32,
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            border: 'none',
            background: '#f4f4f5',
            borderRadius: '50%',
            width: 36,
            height: 36,
            fontSize: 16,
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          ✕
        </button>

        {project.coverImage && (
          <img
            src={project.coverImage}
            alt={project.title}
            style={{ width: '100%', borderRadius: 16, height: 260, objectFit: 'cover', marginBottom: 20 }}
          />
        )}

        <h2 style={{ fontFamily: 'var(--font-outfit)', fontSize: 28, fontWeight: 800, margin: '0 0 8px 0' }}>
          {project.title}
        </h2>

        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: '#666666', marginBottom: 20 }}>
          {project.subtitle}
        </p>

        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 15, lineHeight: 1.6, color: '#333333', marginBottom: 24 }}>
          {project.summary}
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 20px',
                borderRadius: 100,
                background: '#fe3c01',
                color: '#ffffff',
                fontFamily: 'var(--font-inter)',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Live Demo ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 20px',
                borderRadius: 100,
                background: '#000000',
                color: '#ffffff',
                fontFamily: 'var(--font-inter)',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
