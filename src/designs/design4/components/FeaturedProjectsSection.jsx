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
            maxWidth: 480,
            marginBottom: 64,
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: '#fe3c01', fontWeight: 700 }}>* </span>
          Ideas that survived the jump from the brain to the screen. Multi-disciplinary work carried from concept to completion.
        </p>

        {/* Project List */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 0.8fr',
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
                  background: project.accentColor === '#fe3c01' ? '#a3e635' : '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {/* Case study badge if present */}
                {project.hasCaseStudy && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 20,
                      left: 20,
                      zIndex: 10,
                      background: '#fe3c01',
                      color: '#ffffff',
                      fontFamily: 'var(--font-inter)',
                      fontSize: 12,
                      fontWeight: 700,
                      padding: '6px 14px',
                      borderRadius: 100,
                    }}
                  >
                    Case Study
                  </div>
                )}

                {project.videoUrl ? (
                  <video
                    src={project.videoUrl}
                    poster={project.poster}
                    muted
                    loop
                    autoPlay
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>

              {/* Right Info */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  minHeight: 220,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-outfit)',
                      fontSize: 'clamp(24px, 2.5vw, 36px)',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      color: '#000000',
                      margin: '0 0 8px 0',
                    }}
                  >
                    {project.title}
                  </h3>
                  <div
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: 14,
                      color: '#666666',
                      marginBottom: 24,
                    }}
                  >
                    {project.client}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  {/* Tags */}
                  <div
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: 12,
                      lineHeight: 1.6,
                      color: '#888888',
                      maxWidth: 240,
                    }}
                  >
                    {project.tags.join('\n')}
                  </div>

                  {/* Circle Arrow Button */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: '#000000',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, background 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.15)';
                      e.currentTarget.style.background = '#fe3c01';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.background = '#000000';
                    }}
                  >
                    ↗
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
