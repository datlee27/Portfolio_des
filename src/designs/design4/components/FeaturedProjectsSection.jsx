import React, { useState } from 'react';
import { Eye, ExternalLink, ArrowUpRight } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import ScrollBaseAnimation from '@/components/ui/scroll-text-marque';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { featuredProjects } from '../data/homeData';
import ProjectModalD4 from './ProjectModalD4';

export default function FeaturedProjectsSection({ onOpenWork }) {
  const [selectedProject, setSelectedProject] = useState(null);
  return (
    <section
      id="d4-work"
      style={{
        padding: '50px 0 60px',
        background: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Giant Smooth Marquee Header */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          marginBottom: 24,
        }}
      >
        <ScrollBaseAnimation
          delay={200}
          baseVelocity={-0.6}
          clasname="font-bold tracking-[-0.04em] leading-none"
          style={{
            fontFamily: 'var(--font-outfit)',
            fontSize: 'clamp(40px, 9vw, 130px)',
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
            marginBottom: 36,
            lineHeight: 1.6,
          }}
        >
          <span style={{ color: '#fe3c01', fontWeight: 700 }}>* </span>
          Real-world products and open-source applications built with clean code, modern tech stacks, and user-centric experience.
        </p>

        {/* Project List */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {featuredProjects.map((project, idx) => (
            <ScrollAnimation
              key={project.id}
              direction={idx % 2 === 0 ? 'left' : 'right'}
              viewport={{ amount: 0.2, margin: '0px 0px -40px 0px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%' }}
            >
              <div className="des4-project-row">
              {/* Left Media Card */}
              <div
                style={{
                  borderRadius: 20,
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
                  width: '100%',
                }}
                onClick={() => setSelectedProject(project)}
                title={`View ${project.title} Case Study`}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {/* Status Badge */}
                {project.status && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 14,
                      left: 14,
                      zIndex: 10,
                      background: project.status === 'Latest' ? '#fe3c01' : '#000000',
                      color: '#ffffff',
                      fontFamily: 'var(--font-inter)',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '4px 12px',
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
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: project.accentColor, fontFamily: 'var(--font-inter)' }}>
                      {project.code}
                    </span>
                    <h3
                      onClick={() => setSelectedProject(project)}
                      title={`View ${project.title} Case Study`}
                      style={{
                        fontFamily: 'var(--font-outfit)',
                        fontSize: 'clamp(20px, 2.2vw, 32px)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: '#000000',
                        margin: 0,
                        cursor: 'pointer',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#fe3c01')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#000000')}
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
                      margin: '8px 0 16px 0',
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
                      gap: 6,
                      marginBottom: 16,
                    }}
                  >
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontFamily: 'var(--font-inter)',
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '4px 10px',
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                        background: '#000000',
                        color: '#ffffff',
                        border: '1.5px solid #000000',
                        fontFamily: 'var(--font-inter)',
                        fontSize: 13,
                        fontWeight: 600,
                        minHeight: 44,
                        padding: '8px 18px',
                        borderRadius: 100,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        touchAction: 'manipulation',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#fe3c01';
                        e.currentTarget.style.borderColor = '#fe3c01';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#000000';
                        e.currentTarget.style.borderColor = '#000000';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Eye size={14} />
                      <span>View Details</span>
                      <ArrowUpRight size={14} style={{ opacity: 0.7 }} />
                    </button>

                    {project.deploy && (
                      <a
                        href={project.deploy}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                          background: '#ffffff',
                          color: '#000000',
                          border: '1.5px solid #000000',
                          fontFamily: 'var(--font-inter)',
                          fontSize: 13,
                          fontWeight: 600,
                          minHeight: 44,
                          padding: '8px 18px',
                          borderRadius: 100,
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                          touchAction: 'manipulation',
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
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
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
                          justifyContent: 'center',
                          gap: 6,
                          background: '#ffffff',
                          color: '#000000',
                          border: '1.5px solid #e4e4e7',
                          fontFamily: 'var(--font-inter)',
                          fontSize: 13,
                          fontWeight: 600,
                          minHeight: 44,
                          padding: '8px 18px',
                          borderRadius: 100,
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                          touchAction: 'manipulation',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#f4f4f5';
                          e.currentTarget.style.borderColor = '#000000';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#ffffff';
                          e.currentTarget.style.borderColor = '#e4e4e7';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <SiGithub size={14} />
                        <span>GitHub Code</span>
                        <ArrowUpRight size={14} style={{ opacity: 0.7 }} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        ))}
        </div>

        {/* View All Selected Works Button */}
        {onOpenWork && (
          <div style={{ marginTop: 52, display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={onOpenWork}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '16px 36px',
                borderRadius: 100,
                background: '#07080b',
                color: '#ffffff',
                border: '1.5px solid rgba(0, 0, 0, 0.1)',
                fontFamily: 'var(--font-outfit)',
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: '0.02em',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fe3c01';
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 18px 40px rgba(254, 60, 1, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#07080b';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
              }}
            >
              <span>Explore All Selected Works & Case Studies</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* macOS TitleBar Project Details Modal */}
      {selectedProject && (
        <ProjectModalD4
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
