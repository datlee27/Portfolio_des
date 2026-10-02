import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Eye, ExternalLink, Layers, FileText } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { featuredProjects } from '../../data/homeData';
import { usePortfolio } from '@/context/PortfolioContext';
import FooterSection from '../common/FooterSection';
import PDFViewer from '../common/PDFViewer';
import SkillsSection from './SkillsSection';
import ProjectModalD4 from '../common/ProjectModalD4';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

export default function WorkPage({ onGoHome }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);
  const { projects } = usePortfolio();
  const allProjects = projects && projects.length > 0 ? projects : featuredProjects;

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    document.body.style.overflow = '';
  }, []);

  const categories = [
    { key: 'ALL', label: 'All Projects', count: allProjects.length },
    {
      key: 'FULLSTACK',
      label: 'FullStack',
      count: allProjects.filter((p) =>
        p.tags.some((t) => ['FullStack', 'Spring Boot', 'Java', 'MySQL'].includes(t))
      ).length,
    },
    {
      key: 'FRONTEND',
      label: 'React & UI',
      count: allProjects.filter((p) =>
        p.tags.some((t) => ['React', 'TypeScript', 'Vite', 'Tailwind CSS'].includes(t))
      ).length,
    },
    {
      key: 'AI_IOT',
      label: 'AI & Hardware',
      count: allProjects.filter((p) =>
        p.tags.some((t) => ['AI', 'Arduino', 'IoT', 'Sensors'].includes(t))
      ).length,
    },
    {
      key: 'SKILLS',
      label: 'Skills & Stack',
      icon: Layers,
      count: 'TECH',
      isSkills: true,
    },
    {
      key: 'CV',
      label: 'CV / Resume',
      icon: FileText,
      count: 'PDF',
      isSpecial: true,
    },
  ];

  const filteredProjects = allProjects.filter((project) => {
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
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <ArrowLeft size={14} />
              <span>Back to Overview</span>
            </button>
          </div>

          {/* Title & Count */}
          <div className="des4-work-title-row">
            <h1 className="des4-work-main-title">
              {selectedCategory === 'CV' ? (
                <>
                  curriculum vitae<span style={{ color: '#fe3c01' }}>*</span>
                </>
              ) : (
                <>
                  selected work<span style={{ color: '#fe3c01' }}>*</span>
                </>
              )}
            </h1>
            <span className="des4-work-count-badge">
              {selectedCategory === 'CV' ? '(cv / resume)' : '(06 projects)'}
            </span>
          </div>

          {/* Editorial Subtitle */}
          <p className="des4-work-sub-description">
            {selectedCategory === 'CV'
              ? 'curriculum vitae, background, and verified technical competencies.'
              : 'selected engineering projects, web platforms, and open-source systems.'}
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
                      : cat.isSpecial && isActive
                        ? {
                          borderColor: '#fe3c01',
                          color: '#ffffff',
                          background: '#fe3c01',
                        }
                        : cat.isSkills
                          ? {
                            borderColor: '#cbd5e1',
                            color: '#0f172a',
                            background: '#f8fafc',
                          }
                          : {}
                  }
                >
                  {cat.icon && (
                    <cat.icon
                      size={13}
                      strokeWidth={2}
                      style={{ flexShrink: 0 }}
                    />
                  )}
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
              {filteredProjects.map((project, idx) => (
                <ScrollAnimation
                  key={project.id}
                  direction={idx % 2 === 0 ? 'left' : 'right'}
                  viewport={{ amount: 0.25, margin: '0px 0px -40px 0px' }}
                  style={{ width: '100%' }}
                >
                  <article
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
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                          }}
                        >
                          <Eye size={14} />
                          <span>Details</span>
                          <ArrowUpRight size={13} style={{ opacity: 0.7 }} />
                        </button>

                        {project.deploy && (
                          <a
                            href={project.deploy}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="des4-work-btn-secondary"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
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
                            className="des4-work-btn-secondary"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                          >
                            <SiGithub size={14} />
                            <span>GitHub Code</span>
                            <ArrowUpRight size={13} style={{ opacity: 0.7 }} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollAnimation>
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

