import React from 'react';
import { SiReact, SiSpringboot, SiClaude, SiTypescript } from 'react-icons/si';
import { FaLayerGroup, FaArrowRight, FaBolt } from 'react-icons/fa6';
import { TbCpu, TbSparkles, TbCode } from 'react-icons/tb';

export default function IntroSection() {
  const pillars = [
    {
      id: 'fullstack',
      tag: '01 / ARCHITECTURE',
      title: 'Fullstack Systems & Clean Code',
      desc: 'Architecting scalable cloud backends with Spring Boot, Node.js and robust databases, coupled with dynamic, resilient React 19 & TypeScript frontend applications.',
      icons: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SiReact size={22} style={{ color: '#61dafb' }} title="React 19" />
          <SiSpringboot size={20} style={{ color: '#6db33f' }} title="Spring Boot" />
          <SiTypescript size={18} style={{ color: '#3178c6' }} title="TypeScript" />
        </div>
      ),
      badge: 'End-to-End Engineering',
      badgeColor: '#0b1dff',
    },
    {
      id: 'ai-solutions',
      tag: '02 / INTELLIGENCE',
      title: 'Applied AI & Smart Solutions',
      desc: 'Integrating real-world AI pipelines, OCR computer vision, and automated workflows into tangible products like P2P EV rental platforms and intelligent agents.',
      icons: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SiClaude size={20} style={{ color: '#d97706' }} title="Claude AI" />
          <TbCpu size={22} style={{ color: '#8b5cf6' }} title="Intelligent Systems" />
          <TbSparkles size={20} style={{ color: '#fe3c01' }} title="AI Automation" />
        </div>
      ),
      badge: 'Practical AI Integration',
      badgeColor: '#fe3c01',
    },
    {
      id: 'craft',
      tag: '03 / ARTISANSHIP',
      title: 'Tactile UI & Interaction Craft',
      desc: 'Obsessed with fluid micro-interactions, responsive typography, and brutalist digital aesthetics that transform complex software into memorable experiences.',
      icons: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FaLayerGroup size={18} style={{ color: '#10b981' }} title="Design Systems" />
          <TbCode size={22} style={{ color: '#ec4899' }} title="Creative Engineering" />
          <FaBolt size={18} style={{ color: '#ffe815' }} title="60 FPS Performance" />
        </div>
      ),
      badge: 'Bespoke Digital Craft',
      badgeColor: '#10b981',
    },
  ];

  return (
    <section id="d4-intro" className="des4-intro-wrapper">
      <div className="des4-container" style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Section Category Tag */}
        <div className="des4-intro-header-tag">
          <span style={{ color: '#fe3c01', fontSize: 16, fontWeight: 900 }}>*</span>
          <span>Core Narrative • Lê Văn Đạt (Dat Le)</span>
        </div>

        {/* Narrative Editorial Statement */}
        <p className="des4-intro-narrative">
          Dat Le is a{' '}
          <span className="des4-intro-tag">
            Fullstack Developer
          </span>{' '}
          and{' '}
          <span className="des4-intro-tag">
            Technical Artisan
          </span>{' '}
          based in Da Nang, Vietnam. He builds{' '}
          <span className="des4-intro-serif" style={{ color: '#fe3c01' }}>
            Clean Architectures,
          </span>{' '}
          <span className="des4-intro-serif" style={{ color: '#0b1dff' }}>
            Scalable Backends,
          </span>{' '}
          and{' '}
          <span className="des4-intro-serif" style={{ color: '#10b981' }}>
            Tactile Interactive UI
          </span>{' '}
          into cohesive, production-grade digital experiences. He leads projects{' '}
          <span className="des4-intro-serif" style={{ color: '#8b5cf6' }}>
            End-to-End
          </span>{' '}
          — from discovery to production deployment — ensuring every product is backed by technical rigor and thoughtful design.
        </p>

        {/* 3 Core Engineering Pillars Cards (Replaces old showreel/video player) */}
        <div className="des4-intro-pillars-grid">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="des4-intro-pillar-card">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span className="des4-intro-pillar-tag">{pillar.tag}</span>
                  {pillar.icons}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-outfit)',
                    fontSize: 20,
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: '#000000',
                    margin: '0 0 12px 0',
                    lineHeight: 1.3,
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: '#4b5563',
                    margin: 0,
                  }}
                >
                  {pillar.desc}
                </p>
              </div>

              <div
                style={{
                  marginTop: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 16,
                  borderTop: '1px solid #e5e7eb',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: pillar.badgeColor,
                  }}
                >
                  {pillar.badge}
                </span>
                <span style={{ color: '#9ca3af', fontSize: 13 }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
