import React, { useState, useEffect, useCallback, useRef } from 'react';
import './styles/design4.css';
// Common / Shared Layout Components
import CornerNav from './components/common/CornerNav';
import PageTransition from './components/common/PageTransition';
import FooterSection from './components/common/FooterSection';

// Home Page Sections
import HeroSection from './components/home/HeroSection';
import IntroSection from './components/home/IntroSection';
import FeaturedProjectsSection from './components/home/FeaturedProjectsSection';
import WhatIDoSection from './components/home/WhatIDoSection';
import Spiral3DSlider from './components/home/Spiral3DSlider';

// Dedicated Page Views
import WorkPage from './components/work/WorkPage';
import BlogPageRedesign from './components/blog/BlogPageRedesign';
import AboutPage from './components/about/AboutPage';
import LabPage from './components/lab/LabPage';

// Common Utilities
import ScrollEase from '../../components/common/ScrollEase';
import ScrollBlurByAki from '../../components/common/ScrollBlurByAki';
import { usePortfolio } from '@/context/PortfolioContext';

export default function Design4App() {
  const { loading: portfolioLoading } = usePortfolio();
  const [isPageReady, setIsPageReady] = useState(true);
  const isTransitioningRef = useRef(false);

  // Determine initial view from URL path
  const [activeView, setActiveView] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/work' || path.startsWith('/work/')) return 'work';
      if (path === '/blog' || path.startsWith('/blog/')) return 'blog';
      if (path === '/about' || path.startsWith('/about/')) return 'about';
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
    // Guard: Prevent triggering a new transition while one is already active (bulletproof against synchronous spam clicks)
    if (isTransitioningRef.current || transition.isActive) return;

    // Don't transition if already on the target view
    if (view === activeView) {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    isTransitioningRef.current = true;
    setIsPageReady(false);
    setTransition({
      isActive: true,
      targetView: view,
      targetPath: path,
      targetHash: targetHash || null,
    });
  }, [activeView, transition.isActive]);

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
    isTransitioningRef.current = false;
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
      isTransitioningRef.current = false;
      const path = window.location.pathname;
      if (path === '/work' || path.startsWith('/work/')) {
        setActiveView('work');
      } else if (path === '/blog' || path.startsWith('/blog/')) {
        setActiveView('blog');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else if (path === '/about' || path.startsWith('/about/')) {
        setActiveView('about');
      } else if (path === '/lab' || path.startsWith('/lab/')) {
        setActiveView('lab');
      } else {
        setActiveView('main');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Target Page Readiness Gate:
  // Ensures destination page has mounted, double RAF paint pass completed, fonts loaded, and data fetched
  useEffect(() => {
    if (!transition.isActive) {
      setIsPageReady(true);
      return;
    }

    // Only verify readiness once midpoint has swapped activeView to targetView
    if (transition.targetView && activeView !== transition.targetView) {
      return;
    }

    let isMounted = true;

    const checkReady = async () => {
      try {
        if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
      } catch {
        // Fallback if document.fonts API is not available
      }

      // Double requestAnimationFrame ensures browser has completed DOM layout & paint pass
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!isMounted) return;

          // If portfolio data is still actively loading over network, wait until ready
          if (portfolioLoading) {
            const pollInterval = setInterval(() => {
              if (!portfolioLoading) {
                clearInterval(pollInterval);
                if (isMounted) setIsPageReady(true);
              }
            }, 50);

            // Safety limit: if API takes > 3s, release gate anyway
            setTimeout(() => {
              clearInterval(pollInterval);
              if (isMounted) setIsPageReady(true);
            }, 3000);
          } else {
            setIsPageReady(true);
          }
        });
      });
    };

    checkReady();

    return () => {
      isMounted = false;
    };
  }, [transition.isActive, transition.targetView, activeView, portfolioLoading]);

  // Update document title and ensure body scroll is unlocked based on current view
  useEffect(() => {
    document.body.style.overflow = '';
    if (activeView === 'blog') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.title = 'Blog – Tech Notes';
    } else if (activeView === 'work') {
      document.title = 'Work – Projects';
    } else if (activeView === 'about') {
      document.title = 'About – Dat Lee';
    } else if (activeView === 'lab') {
      document.title = 'Lab – Design Experiments';
    } else {
      document.title = 'DatLee | Portfolio';
    }
  }, [activeView]);

  return (
    <div className="des4-root">
      {/* ─── Horizontal Interlaced Black & Orange Strip Preload & Transition ─── */}
      <PageTransition
        isActive={transition.isActive}
        targetView={transition.targetView || activeView}
        isTargetReady={isPageReady}
        onMidpoint={handleTransitionMidpoint}
        onComplete={handleTransitionComplete}
      />

      {/* Fixed Corner Anchors: dl*, work, blog, about, lab */}
      <CornerNav
        activeView={activeView}
        onOpenWork={() => navigateWithTransition('work', '/work')}
        onOpenBlog={() => navigateWithTransition('blog', '/blog')}
        onOpenAbout={() => navigateWithTransition('about', '/about')}
        onOpenLab={() => navigateWithTransition('lab', '/lab')}
        onGoHome={() => navigateWithTransition('main', '/')}
      />

      {/* Smooth inertia scroll with snappy response (intensity 40) */}
      {(activeView === 'main' || activeView === 'work' || activeView === 'about') && <ScrollEase intensity={40} />}

      {/* Lightweight progressive edge blur on Home page (2-layer GPU accelerated) */}
      {activeView === 'main' && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: '70px',
              zIndex: 90,
              pointerEvents: 'none',
            }}
          >
            <ScrollBlurByAki direction="top" blur={8} quality="low" />
          </div>

          <div
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              height: '70px',
              zIndex: 90,
              pointerEvents: 'none',
            }}
          >
            <ScrollBlurByAki direction="bottom" blur={8} quality="low" />
          </div>
        </>
      )}

      {activeView === 'work' ? (
        /* Dedicated Work Page (/work) with 6 Projects & Footer */
        <WorkPage onGoHome={() => navigateWithTransition('main', '/')} />
      ) : activeView === 'blog' ? (
        /* Dedicated Blog Page — "chạng vạng" redesign */
        <BlogPageRedesign />
      ) : activeView === 'about' ? (
        /* Dedicated About Page (/about) */
        <AboutPage onGoHome={() => navigateWithTransition('main', '/')} />
      ) : activeView === 'lab' ? (
        /* Lab View (/lab) */
        <LabPage onBack={() => navigateWithTransition('main', '/')} />
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
