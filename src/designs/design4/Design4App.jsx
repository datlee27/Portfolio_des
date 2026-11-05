import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import './styles/design4.css';
// Common / Shared Layout Components
import CornerNav from './components/common/CornerNav';
import PageTransition from './components/common/PageTransition';
import FooterSection from './components/common/FooterSection';
import PortfolioChatbot from './components/common/PortfolioChatbot';
import PencilCursor from './components/common/PencilCursor';

// Home Page Sections
import HeroSection from './components/home/HeroSection';
import IntroSection from './components/home/IntroSection';
import FeaturedProjectsSection from './components/home/FeaturedProjectsSection';
import WhatIDoSection from './components/home/WhatIDoSection';
import Spiral3DSlider from './components/home/Spiral3DSlider';

// Dedicated Page Views (Lazy loaded for optimal initial bundle size)
const WorkPage = lazy(() => import('./components/work/WorkPage'));
const BlogPageRedesign = lazy(() => import('./components/blog/BlogPageRedesign'));
const AboutPage = lazy(() => import('./components/about/AboutPage'));
const LabPage = lazy(() => import('./components/lab/LabPage'));

// Common Utilities
import ScrollEase from '../../components/common/ScrollEase';
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
          window.lenis.scrollTo(0, { immediate: true, force: true });
          window.lenis.resize();
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
    if (typeof window !== 'undefined' && window.lenis) {
      window.lenis.resize();
    }
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
    const updateThemeColor = (color) => {
      document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
        meta.setAttribute('content', color);
      });
      document.documentElement.style.backgroundColor = color;
      document.body.style.backgroundColor = color;
    };

    if (activeView === 'blog') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.title = 'Blog – Tech Notes';
      updateThemeColor('#0E0F12');
    } else if (activeView === 'work') {
      document.title = 'Work – Projects';
      updateThemeColor('#F6F4EF');
    } else if (activeView === 'about') {
      document.title = 'About – Dat Lee';
      updateThemeColor('#F6F4EF');
    } else if (activeView === 'lab') {
      document.title = 'Lab – Design Experiments';
      updateThemeColor('#FFFFFF');
    } else {
      document.title = 'Dat Lee | Fullstack Developer & Technical Artisan';
      updateThemeColor('#F6F4EF');
    }
  }, [activeView]);

  // Global asset preloader: Pre-cache critical visual assets during idle time to eliminate scroll jank
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const criticalMedia = [
      '/assets/gallery/pin-13.jpg',
      '/assets/gallery/pin-3.jpg',
      '/assets/gallery/pin-4.jpg',
      '/assets/gallery/pin-5.jpg',
      '/assets/gallery/pin-11.jpg',
      '/assets/gallery/pin-12.jpg',
      '/assets/gallery/pin-2.jpg',
      '/images/clothesline/photo1.webp',
      '/images/clothesline/photo3.webp',
      '/images/clothesline/photo4.webp',
      '/images/clothesline/photo5.webp',
      '/assets/lab/me.jpg',
      '/assets/lab/photo.jpg',
    ];

    const preload = () => {
      // 1. Preload critical images
      criticalMedia.forEach((src) => {
        const img = new Image();
        img.src = src;
      });

      // 2. Pre-fetch lazy page chunks into browser cache for zero-latency transitions
      import('./components/work/WorkPage');
      import('./components/blog/BlogPageRedesign');
      import('./components/about/AboutPage');
      import('./components/lab/LabPage');
    };

    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(preload, { timeout: 1800 });
    } else {
      setTimeout(preload, 300);
    }
  }, []);

  return (
    <div className="des4-root">
      {/* ─── Framer-inspired Interactive Pencil Cursor ─── */}
      <PencilCursor />

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

      {/* AI Chatbot Assistant: active on home, work, about; strictly hidden on /blog and /lab */}
      <PortfolioChatbot activeView={activeView} />

      {/* Smooth inertia scroll with snappy response (intensity 40) */}
      {(activeView === 'main' || activeView === 'work' || activeView === 'about') && <ScrollEase intensity={40} />}

      {/* Zero-jank progressive edge feather gradient on Home page (GPU-free, 120 FPS constant) */}
      {activeView === 'main' && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: '48px',
              background: 'linear-gradient(to bottom, #F6F4EF 0%, rgba(246, 244, 239, 0) 100%)',
              zIndex: 90,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              height: '48px',
              background: 'linear-gradient(to top, #F6F4EF 0%, rgba(246, 244, 239, 0) 100%)',
              zIndex: 90,
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      <Suspense fallback={null}>
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

            {/* 8. Footer: Let's talk & Giant DL* /26 Emblem */}
            <FooterSection />
          </>
        )}
      </Suspense>
    </div>
  );
}
