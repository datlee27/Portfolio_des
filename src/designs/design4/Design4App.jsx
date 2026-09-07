import React, { useState, useEffect } from 'react';
import './styles/design4.css';
import CornerNav from './components/CornerNav';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import FeaturedProjectsSection from './components/FeaturedProjectsSection';
import WhatIDoSection from './components/WhatIDoSection';
import Spiral3DSlider from './components/Spiral3DSlider';
import BlogSection from './components/BlogSection';
import FooterSection from './components/FooterSection';
import Des4LabView from './components/Des4LabView';
import Des4WorkPage from './components/Des4WorkPage';

export default function Design4App() {
  // Determine initial view from URL path
  const [activeView, setActiveView] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/work' || path.startsWith('/work/')) return 'work';
      if (path === '/lab' || path.startsWith('/lab/')) return 'lab';
    }
    return 'main';
  });

  // Client-side router navigation helper
  const navigateTo = (view, path) => {
    setActiveView(view);
    if (typeof window !== 'undefined') {
      window.history.pushState({ view }, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Listen to browser Back/Forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/work' || path.startsWith('/work/')) {
        setActiveView('work');
      } else if (path === '/lab' || path.startsWith('/lab/')) {
        setActiveView('lab');
      } else {
        setActiveView('main');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title based on current view
  useEffect(() => {
    if (activeView === 'work') {
      document.title = 'Work – Dat Le Selected Projects';
    } else if (activeView === 'lab') {
      document.title = 'Lab – Dat Le Design Experiments';
    } else {
      document.title = 'Dat Le – Engineering Logic, Crafting Digital Experiences';
    }
  }, [activeView]);

  return (
    <div className="des4-root">
      {/* Fixed Corner Anchors: dl*, work, blog, about, lab */}
      <CornerNav
        activeView={activeView}
        onOpenWork={() => navigateTo('work', '/work')}
        onOpenLab={() => navigateTo('lab', '/lab')}
        onGoHome={() => navigateTo('main', '/')}
      />

      {activeView === 'work' ? (
        /* Dedicated Work Page (/work) with 6 Projects & Footer */
        <Des4WorkPage onGoHome={() => navigateTo('main', '/')} />
      ) : activeView === 'lab' ? (
        /* Lab View (/lab) */
        <Des4LabView onBack={() => navigateTo('main', '/')} />
      ) : (
        /* Main Des4 Flow (/) */
        <>
          {/* 1. Hero: the chaos of making sh*t real */}
          <HeroSection />

          {/* 2. Intro: Statement & Core Technical Pillars */}
          <IntroSection />

          {/* 3. Featured Work: Marquee + 6 Real Project Rows */}
          <FeaturedProjectsSection />

          {/* 5. What I Do: Vibrant Orange Section with 3D Blender Screen */}
          <WhatIDoSection />

          {/* 6. Interactive WebGL Spiral 3D Gallery (Experience & Visual Archive) */}
          <Spiral3DSlider />

          {/* 7. Articles & Journal / Blog Section */}
          <BlogSection />

          {/* 8. Footer: Let's talk & Giant DL* /26 Emblem */}
          <FooterSection />
        </>
      )}
    </div>
  );
}


