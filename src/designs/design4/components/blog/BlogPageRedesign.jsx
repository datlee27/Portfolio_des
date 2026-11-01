import React, { useState, useEffect } from 'react';
import './blog.css';

import { SITE, TAGS, POSTS, THEMES } from './blogData';
import { usePortfolio } from '@/context/PortfolioContext';
import BlogHeader from './BlogHeader';
import BlogTagFilter from './BlogTagFilter';
import BlogPostList from './BlogPostList';
import BlogDrawer from './BlogDrawer';
import BlogFooter from './BlogFooter';

/**
 * BlogPageRedesign — parent component
 *
 * Manages all blog-level state and composes child components.
 * Light mode (white bg) is the default.
 */
export default function BlogPageRedesign() {
  const { posts } = usePortfolio();
  const allPosts = posts && posts.length > 0 ? posts : POSTS;
  const [isDark, setIsDark] = useState(false);
  const [activeTag, setActiveTag] = useState('tất cả');
  const [query, setQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});

  const theme = isDark ? THEMES.dark : THEMES.light;

  /* Always start at top when entering blog (no scroll restoration) */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, 20);
      return () => clearTimeout(timer);
    }
  }, []);

  /* ESC to close drawer */
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') setSelectedPost(null);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    if (selectedPost) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = orig || '';
      };
    }
  }, [selectedPost]);

  /* ── Filtering ──────────────────────────────────────────────────── */
  const q = query.trim().toLowerCase();
  const filteredPosts = allPosts.filter((p) => {
    const matchesTag = activeTag === 'tất cả' || p.tag === activeTag;
    const matchesQuery =
      q === '' ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q);
    return matchesTag && matchesQuery;
  });

  /* ── Handlers ───────────────────────────────────────────────────── */
  function clearFilters() {
    setActiveTag('tất cả');
    setQuery('');
  }

  function toggleLike(id) {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  /* ── Render ─────────────────────────────────────────────────────── */
  return (
    <div
      className="blog-page"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <div className="blog-page-inner">
        <BlogHeader
          siteName={SITE.name}
          intro={SITE.intro}
          isDark={isDark}
          theme={theme}
          onToggleTheme={() => setIsDark(!isDark)}
        />

        {/* Intro — separate from header for cleaner layout */}
        <p className="blog-intro" style={{ color: theme.muted }}>
          {SITE.intro}
        </p>

        <BlogTagFilter
          tags={TAGS}
          activeTag={activeTag}
          onSelectTag={setActiveTag}
          query={query}
          onQueryChange={setQuery}
          theme={theme}
          isDark={isDark}
        />

        <BlogPostList
          posts={filteredPosts}
          isDark={isDark}
          theme={theme}
          likedPosts={likedPosts}
          onToggleLike={toggleLike}
          onSelectPost={setSelectedPost}
          onClearFilters={clearFilters}
        />

        <BlogFooter siteName={SITE.name} theme={theme} />
      </div>

      <BlogDrawer
        post={selectedPost}
        theme={theme}
        likedPosts={likedPosts}
        onClose={() => setSelectedPost(null)}
        onToggleLike={toggleLike}
        isAdmin={false}
      />
    </div>
  );
}
