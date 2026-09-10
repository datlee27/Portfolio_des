import React, { useState, useEffect, useCallback } from 'react';
import './styles/design4.css';
import CornerNav from './components/CornerNav';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import FeaturedProjectsSection from './components/FeaturedProjectsSection';
import WhatIDoSection from './components/WhatIDoSection';
import Spiral3DSlider from './components/Spiral3DSlider';
import FooterSection from './components/FooterSection';
import Des4LabView from './components/Des4LabView';
import Des4WorkPage from './components/Des4WorkPage';
import BlogPageRedesign from './components/blog/BlogPageRedesign';
import ScrollEase from '../../components/common/ScrollEase';
import ScrollBlurByAki from '../../components/common/ScrollBlurByAki';
import PageTransition from './components/PageTransition';

export default function Design4App() {
  // Determine initial view from URL path
  const [activeView, setActiveView] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/work' || path.startsWith('/work/')) return 'work';
      if (path === '/blog' || path.startsWith('/blog/')) return 'blog';
      if (path === '/lab' || path.startsWith('/lab/')) return 'lab';
    }
    return 'main';
  });

  // Page transition state
  const [transition, setTransition] = useState({
    isActive: false,
    targetView: null,
    targetPath: null,
    targetHash: null,
  });

  // Trigger a page transition with cinematic overlay
  const navigateWithTransition = useCallback((view, path, targetHash) => {
    // Don't transition if already on the target view
    if (view === activeView) {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    setTransition({
      isActive: true,
      targetView: view,
      targetPath: path,
      targetHash: targetHash || null,
    });
  }, [activeView]);

  // Called at the midpoint of the transition — swap content while strips cover the screen
  const handleTransitionMidpoint = useCallback(() => {
    const { targetView, targetPath, targetHash } = transition;
    if (!targetView) return;

    setActiveView(targetView);

    if (typeof window !== 'undefined') {
      const fullPath = targetHash ? `${targetPath}#${targetHash}` : targetPath;
      window.history.pushState({ view: targetView }, '', fullPath);

      if (!targetHash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true });
        }
      }
    }
  }, [transition]);

  // Called when transition fully completes — clean up
  const handleTransitionComplete = useCallback(() => {
    setTransition({
      isActive: false,
      targetView: null,
      targetPath: null,
      targetHash: null,
    });
  }, []);

  // Listen to browser Back/Forward (popstate) — no transition on back/forward
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/work' || path.startsWith('/work/')) {
        setActiveView('work');
      } else if (path === '/blog' || path.startsWith('/blog/')) {
        setActiveView('blog');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else if (path === '/lab' || path.startsWith('/lab/')) {
        setActiveView('lab');
      } else {
        setActiveView('main');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title and ensure body scroll is unlocked based on current view
  useEffect(() => {
    document.body.style.overflow = '';
    if (activeView === 'blog') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.title = 'Threads / Blog – Dat Le Tech Notes';
    } else if (activeView === 'work') {
      document.title = 'Work – Dat Le Selected Projects';
    } else if (activeView === 'lab') {
      document.title = 'Lab – Dat Le Design Experiments';
    } else {
      document.title = 'Dat Le – Engineering Logic, Crafting Digital Experiences';
    }
  }, [activeView]);

  return (
    <div className="des4-root">
      {/* ─── Horizontal Interlaced Black & Orange Strip Preload & Transition ─── */}
      <PageTransition
        isActive={transition.isActive}
        targetView={transition.targetView || activeView}
        onMidpoint={handleTransitionMidpoint}
        onComplete={handleTransitionComplete}
      />

      {/* Fixed Corner Anchors: dl*, work, blog, about, lab */}
      <CornerNav
        activeView={activeView}
        onOpenWork={() => navigateWithTransition('work', '/work')}
        onOpenBlog={() => navigateWithTransition('blog', '/blog')}
        onOpenLab={() => navigateWithTransition('lab', '/lab')}
        onGoHome={() => navigateWithTransition('main', '/')}
      />

      {/* Smooth inertia scroll ONLY on Home and Work pages */}
      {(activeView === 'main' || activeView === 'work') && <ScrollEase intensity={75} />}

      {/* Progressive edge blur ONLY on Home page (Work and others do not have scrollblur) */}
      {activeView === 'main' && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: '80px',
              zIndex: 90,
              pointerEvents: 'none',
            }}
          >
            <ScrollBlurByAki direction="top" blur={16} quality="high" />
          </div>

          <div
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              height: '80px',
              zIndex: 90,
              pointerEvents: 'none',
            }}
          >
            <ScrollBlurByAki direction="bottom" blur={16} quality="high" />
          </div>
        </>
      )}

      {activeView === 'work' ? (
        /* Dedicated Work Page (/work) with 6 Projects & Footer */
        <Des4WorkPage onGoHome={() => navigateWithTransition('main', '/')} />
      ) : activeView === 'blog' ? (
        /* Dedicated Blog Page — "chạng vạng" redesign */
        <BlogPageRedesign />
      ) : activeView === 'lab' ? (
        /* Lab View (/lab) */
        <Des4LabView onBack={() => navigateWithTransition('main', '/')} />
      ) : (
        /* Main Des4 Flow (/) */
        <>
          {/* 1. Hero: the chaos of making sh*t real */}
          <HeroSection />

          {/* 2. Intro: Statement & Core Technical Pillars */}
          <IntroSection />

          {/* 3. Featured Work: Marquee + 6 Real Project Rows */}
          <FeaturedProjectsSection
            onOpenWork={() => navigateWithTransition('work', '/work')}
          />

          {/* 5. What I Do: Vibrant Orange Section with 3D Blender Screen */}
          <WhatIDoSection />

          {/* 6. Interactive WebGL Spiral 3D Gallery (Experience & Visual Archive) */}
          <Spiral3DSlider />

          {/* 7. Articles & Journal / Blog Section (Tạm thời ẩn) */}
          {/* <BlogSection
            onOpenBlog={(post) => {
              const targetHash = post?.slug || (post?.id ? `post-${post.id}` : '');
              navigateWithTransition('blog', '/blog', targetHash);
            }}
          /> */}

          {/* 8. Footer: Let's talk & Giant DL* /26 Emblem */}
          <FooterSection />
        </>
      )}
    </div>
  );
}
