import React from 'react';
import ScrollBaseAnimation from '@/components/ui/scroll-text-marque';
import { featuredProjects } from '../data/homeData';

export default function FeaturedProjectsSection() {
  return (
    <section
      id="d4-work"
      style={{
        padding: '100px 0 160px',
        background: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Giant Smooth Marquee Header */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          marginBottom: 40,
        }}
      >
        <ScrollBaseAnimation
          delay={200}
          baseVelocity={-0.6}
          clasname="font-bold tracking-[-0.04em] leading-none"
          style={{
            fontFamily: 'var(--font-outfit)',
            fontSize: 'clamp(54px, 10vw, 140px)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: '#000000',
            textTransform: 'lowercase',
          }}
        >
          featured work<span style={{ color: '#fe3c01', marginLeft: 8, marginRight: 24 }}>*</span>
        </ScrollBaseAnimation>
      </div>

      <div className="des4-container">
        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 14,
            fontWeight: 500,
            color: '#000000',
            maxWidth: 540,
            marginBottom: 64,
            lineHeight: 1.6,
          }}
        >
          <span style={{ color: '#fe3c01', fontWeight: 700 }}>* </span>
          Real-world products and open-source applications built with clean code, modern tech stacks, and user-centric experience.
        </p>

        {/* Project List */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(300px, 1.2fr) 1fr',
                gap: 48,
                padding: '48px 0',
                borderTop: '1px solid #e0e0e0',
                alignItems: 'center',
              }}
            >
              {/* Left Media Card */}
              <div
                style={{
                  borderRadius: 24,
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: '16/10',
                  background: '#f4f4f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
                onClick={() => {
                  const targetUrl = project.deploy || project.github;
                  if (targetUrl) window.open(targetUrl, '_blank', 'noopener,noreferrer');
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {/* Status Badge */}
                {project.status && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 20,
                      left: 20,
                      zIndex: 10,
                      background: project.status === 'Latest' ? '#fe3c01' : '#000000',
                      color: '#ffffff',
                      fontFamily: 'var(--font-inter)',
                      fontSize: 12,
                      fontWeight: 700,
                      padding: '6px 14px',
                      borderRadius: 100,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {project.status}
                  </div>
                )}

                <img
                  src={project.image}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Right Info */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  minHeight: 240,
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: project.accentColor, fontFamily: 'var(--font-inter)' }}>
                      {project.code}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-outfit)',
                        fontSize: 'clamp(22px, 2.2vw, 32px)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: '#000000',
                        margin: 0,
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: '#444444',
                      margin: '12px 0 20px 0',
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tags Pill List */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8,
                      marginBottom: 24,
                    }}
                  >
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontFamily: 'var(--font-inter)',
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '4px 12px',
                          borderRadius: 20,
                          background: '#f4f4f5',
                          color: '#333333',
                          border: '1px solid #e4e4e7',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links Action Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {project.deploy && (
                      <a
                        href={project.deploy}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          background: '#000000',
                          color: '#ffffff',
                          fontFamily: 'var(--font-inter)',
                          fontSize: 13,
                          fontWeight: 600,
                          padding: '10px 18px',
                          borderRadius: 100,
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#fe3c01';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#000000';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        Live Demo ↗
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          background: '#ffffff',
                          color: '#000000',
                          border: '1.5px solid #000000',
                          fontFamily: 'var(--font-inter)',
                          fontSize: 13,
                          fontWeight: 600,
                          padding: '8px 16px',
                          borderRadius: 100,
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#f4f4f5';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#ffffff';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        GitHub Code ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
