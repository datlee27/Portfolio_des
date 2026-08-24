import React, { useState } from 'react';
import styles from './styles/homePage.module.css';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectSection from './components/sections/ProjectSection';
import ServicesSection from './components/sections/ServicesSection';
import ReviewsSection from './components/sections/ReviewsSection';
import FAQSection from './components/sections/FAQSection';
import FooterSection from './components/sections/FooterSection';
import DockNavigation from './components/shared/DockNavigation';
import ProjectPopup from './components/shared/ProjectPopup';
import ContactPopup from './components/shared/ContactPopup';
import { ProjectCardData } from './components/shared/ProjectCard';
import { portfolioProjects } from './data/homeData';

export const HomePage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectCardData | null>(null);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  const handleOpenContact = () => {
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  const handleOpenProject = (project: ProjectCardData) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const handleOpenDefaultProject = () => {
    if (portfolioProjects.length > 0) {
      setSelectedProject(portfolioProjects[0]);
    }
  };

  return (
    <div className={styles.homePageWrapper}>
      <main className={styles.mainContent}>
        {/* Hero Section */}
        <HeroSection
          onStartProject={handleOpenContact}
          onOpenProjectStack={handleOpenDefaultProject}
        />

        {/* About Section */}
        <AboutSection onStartProject={handleOpenContact} />

        {/* Projects Section */}
        <ProjectSection onSelectProject={handleOpenProject} />

        {/* Services Section */}
        <ServicesSection />

        {/* Reviews Section */}
        <ReviewsSection />

        {/* FAQs Section */}
        <FAQSection />

        {/* Footer Section */}
        <FooterSection onOpenContact={handleOpenContact} />
      </main>

      {/* Floating macOS Dock Navigation */}
      <DockNavigation
        onOpenNotes={() => {
          const el = document.getElementById('about');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenPhotos={() => {
          const el = document.getElementById('projects');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenFinder={() => {
          const el = document.getElementById('services');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenMail={handleOpenContact}
      />

      {/* Project Case Study Modal */}
      <ProjectPopup
        project={selectedProject}
        onClose={handleCloseProject}
      />

      {/* Contact Inquiry Modal */}
      <ContactPopup
        isOpen={isContactOpen}
        onClose={handleCloseContact}
      />
    </div>
  );
};

export default HomePage;
