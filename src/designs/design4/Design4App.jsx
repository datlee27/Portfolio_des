import React, { useEffect } from 'react';
import './styles/design4.css';
import CornerNav from './components/CornerNav';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import ShowreelSection from './components/ShowreelSection';
import FeaturedProjectsSection from './components/FeaturedProjectsSection';
import WhatIDoSection from './components/WhatIDoSection';
import ClientsSection from './components/ClientsSection';
import FooterSection from './components/FooterSection';

export default function Design4App() {
  useEffect(() => {
    document.title = 'YanXin Zhang - Turning Creative Chaos into Reality';
  }, []);

  return (
    <div className="des4-root">
      {/* 4 Fixed Corner Anchors: yx*, work, about, lab */}
      <CornerNav />

      {/* 1. Hero: the chaos of making sh*t real */}
      <HeroSection />

      {/* 2. Intro: Statement with 3D stickers & .FINAL_FINAL badge */}
      <IntroSection />

      {/* 3. Showreel: Colorful Bento Grid & Video Player */}
      <ShowreelSection />

      {/* 4. Featured Work: Marquee + 4 Project Rows */}
      <FeaturedProjectsSection />

      {/* 5. What I Do: Vibrant Orange Section with 3D Blender Screen */}
      <WhatIDoSection />

      {/* 6. Clients: Deep Black 3D Rotating Carousel */}
      <ClientsSection />

      {/* 7. Footer: Let's talk & Giant YX* /26 Emblem */}
      <FooterSection />
    </div>
  );
}
