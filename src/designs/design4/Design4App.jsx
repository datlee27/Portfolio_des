import React, { useState, useEffect } from 'react';
import './styles/design4.css';
import CornerNav from './components/CornerNav';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import ShowreelSection from './components/ShowreelSection';
import FeaturedProjectsSection from './components/FeaturedProjectsSection';
import WhatIDoSection from './components/WhatIDoSection';
import ClientsSection from './components/ClientsSection';
import BlogSection from './components/BlogSection';
import FooterSection from './components/FooterSection';
import Des4LabView from './components/Des4LabView';

export default function Design4App() {
  const [activeView, setActiveView] = useState('main'); // 'main' | 'lab'

  useEffect(() => {
    document.title = activeView === 'lab'
      ? 'Lab – Dat Le Design Experiments'
      : 'Dat Le - Turning Creative Chaos into Reality';
  }, [activeView]);

  return (
    <div className="des4-root">
      {/* Fixed Corner Anchors: dl*, work, blog, about, lab */}
      <CornerNav
        activeView={activeView}
        onOpenLab={() => {
          setActiveView('lab');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoHome={() => {
          setActiveView('main');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {activeView === 'lab' ? (
        /* Lab View */
        <Des4LabView
          onBack={() => {
            setActiveView('main');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : (
        /* Main Des4 Flow */
        <>
          {/* 1. Hero: the chaos of making sh*t real */}
          <HeroSection />

          {/* 2. Intro: Statement with 3D stickers & .FINAL_FINAL badge */}
          <IntroSection />

          {/* 3. Showreel: Colorful Bento Grid & Video Player */}
          <ShowreelSection />

          {/* 4. Featured Work: Marquee + 6 Real Project Rows */}
          <FeaturedProjectsSection />

          {/* 5. What I Do: Vibrant Orange Section with 3D Blender Screen */}
          <WhatIDoSection />

          {/* 6. Clients: Deep Black 3D Rotating Carousel */}
          <ClientsSection />

          {/* 7. Articles & Journal / Blog Section */}
          <BlogSection />

          {/* 8. Footer: Let's talk & Giant DL* /26 Emblem */}
          <FooterSection />
        </>
      )}
    </div>
  );
}
