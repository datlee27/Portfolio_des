import React, { useState, useEffect } from 'react';
import { featuredProjects } from '../data/homeData';
import FooterSection from './FooterSection';
import PDFViewer from './PDFViewer';
import SkillsSection from './SkillsSection';
import ProjectModalD4 from './ProjectModalD4';

export default function Des4WorkPage({ onGoHome }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.style.overflow = '';
  }, []);

  const categories = [
    { key: 'ALL', label: 'All Projects', count: featuredProjects.length },
    {
      key: 'FULLSTACK',
      label: 'FullStack',
      count: featuredProjects.filter((p) =>
        p.tags.some((t) => ['FullStack', 'Spring Boot', 'Java', 'MySQL'].includes(t))
      ).length,
    },
    {
      key: 'FRONTEND',
      label: 'React & UI',
      count: featuredProjects.filter((p) =>
        p.tags.some((t) => ['React', 'TypeScript', 'Vite', 'Tailwind CSS'].includes(t))
      ).length,
    },
    {
      key: 'AI_IOT',
      label: 'AI & Hardware',
      count: featuredProjects.filter((p) =>
        p.tags.some((t) => ['AI', 'Arduino', 'IoT', 'Sensors'].includes(t))
      ).length,
    },
    {
      key: 'SKILLS',
      label: '⚡ Skills & Stack',
      count: 'TECH',
      isSkills: true,
    },
    {
      key: 'CV',
      label: '📄 CV / Resume',
      count: 'PDF',
      isSpecial: true,
    },
  ];

  const filteredProjects = featuredProjects.filter((project) => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'FULLSTACK') {
      return project.tags.some((t) => ['FullStack', 'Spring Boot', 'Java', 'MySQL'].includes(t));
    }
    if (selectedCategory === 'FRONTEND') {
      return project.tags.some((t) => ['React', 'TypeScript', 'Vite', 'Tailwind CSS'].includes(t));
    }
    if (selectedCategory === 'AI_IOT') {
      return project.tags.some((t) => ['AI', 'Arduino', 'IoT', 'Sensors'].includes(t));
    }
    return true;
  });

  return (
    <div className="des4-work-page-wrapper">
      {/* ─── Hero Header ─── */}
      <div className="des4-work-header-section">
        <div className="des4-container">
          {/* Breadcrumb / Back Link */}
          <div style={{ marginBottom: 28 }}>
            <button
              onClick={onGoHome}
              className="des4-work-back-btn"
            >
              ← Back to Overview
            </button>
          </div>

          {/* Title & Count */}
          <div className="des4-work-title-row">
            <h1 className="des4-work-main-title">
              {selectedCategory === 'CV' ? (
                <>
                  Curriculum Vitae<span style={{ color: '#fe3c01' }}>*</span>
                </>
              ) : (
                <>
                  Selected Works<span style={{ color: '#fe3c01' }}>*</span>
                </>
              )}
            </h1>
            <span className="des4-work-count-badge">
              {selectedCategory === 'CV' ? '(CV / RESUME PREVIEW)' : '(06 PROJECTS)'}
            </span>
          </div>

          {/* Editorial Subtitle */}
          <p className="des4-work-sub-description">
            {selectedCategory === 'CV'
              ? 'Preview and download the complete curriculum vitae, professional background, technical competencies, and architectural experience of Dat Le.'
              : 'A comprehensive archive of production web applications, decoupled enterprise backends, AI integration pipelines, and IoT embedded systems crafted by Dat Le.'}
          </p>

          {/* Filter / Navigation Pills */}
          <div className="des4-work-filters-bar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => {
                    if (cat.key === 'SKILLS') {
                      const el = document.getElementById('d4-skills');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      setSelectedCategory(cat.key);
                    }
                  }}
                  className={`des4-work-filter-pill ${isActive ? 'is-active' : ''}`}
                  style={
                    cat.isSpecial && !isActive
                      ? {
                        borderColor: '#fe3c01',
                        color: '#fe3c01',
                        background: 'rgba(254, 60, 1, 0.05)',
                      }
                      : cat.isSkills
                        ? {
                          borderColor: 'rgba(37, 255, 141, 0.4)',
                          color: '#25ff8d',
                          background: 'rgba(37, 255, 141, 0.05)',
                        }
                        : {}
                  }
                >
                  <span>{cat.label}</span>
                  <span className="des4-work-filter-count">
                    {typeof cat.count === 'number'
                      ? cat.count.toString().padStart(2, '0')
                      : cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Content Area: Either CV Preview or Projects Grid ─── */}
      <div className="des4-work-grid-section">
        <div className="des4-container">
          {selectedCategory === 'CV' ? (
            /* CV PDF Viewer Preview */
            <div style={{ padding: '10px 0 30px 0' }}>
              <PDFViewer
                pdfUrl="/sample-cv.pdf"
                title="Dat Le – Curriculum Vitae (Resume)"
                downloadName="DatLe_CV.pdf"
              />
            </div>
          ) : (
            /* 6 Projects Grid */
            <div className="des4-work-projects-grid">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="des4-work-card"
                >
                  {/* Media Container */}
                  <div
                    className="des4-work-card-media"
                    onClick={() => setSelectedProject(project)}
                    style={{ cursor: 'pointer' }}
                    title={`View ${project.title} Case Study`}
                  >
                    {/* Status Pill */}
                    {project.status && (
                      <div
                        className="des4-work-card-status"
                        style={{
                          background: project.status === 'Latest' ? '#fe3c01' : '#0f172a',
                        }}
                      >
                        {project.status}
                      </div>
                    )}

                    {/* Project Index */}
                    <div className="des4-work-card-index">
                      {project.code}
                    </div>

                    <img
                      src={project.image}
                      alt={project.title}
                      className="des4-work-card-img"
                      loading="lazy"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="des4-work-card-body">
                    <div className="des4-work-card-top-info">
                      <span
                        className="des4-work-card-accent-code"
                        style={{ color: project.accentColor || '#fe3c01' }}
                      >
                        {project.client || 'Digital Product'}
                      </span>
                      <h3
                        className="des4-work-card-title"
                        onClick={() => setSelectedProject(project)}
                        style={{ cursor: 'pointer', transition: 'color 0.2s ease' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#fe3c01')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                        title={`View ${project.title} Case Study`}
                      >
                        {project.title}
                      </h3>
                      <p className="des4-work-card-desc">
                        {project.description}
                      </p>
                    </div>

                    <div className="des4-work-card-bottom-info">
                      {/* Tech Tags */}
                      <div className="des4-work-tags-list">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="des4-work-tag-pill">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="des4-work-card-actions">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="des4-work-btn-primary"
                          style={{
                            cursor: 'pointer',
                            border: 'none',
                            outline: 'none',
                          }}
                        >
                          Details ↗
                        </button>

                        {project.deploy && (
                          <a
                            href={project.deploy}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="des4-work-btn-secondary"
                          >
                            Live Demo ↗
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="des4-work-btn-secondary"
                          >
                            GitHub Code ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── Skills & Technical Capabilities Section (Moved to /work) ─── */}
      <SkillsSection />

      {/* ─── Footer Section ─── */}
      <FooterSection />

      {/* macOS TitleBar Project Details Modal */}
      {selectedProject && (
        <ProjectModalD4
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

