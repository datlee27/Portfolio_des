import React, { createContext, useState, useEffect, useCallback } from 'react';
import { featuredProjects as defaultProjects, siteMeta as defaultSiteMeta } from '../designs/design4/data/homeData';
import { POSTS as defaultPosts } from '../designs/design4/components/blog/blogData';
import staticPortfolioData from '../../portfolioData.json';
import api from '../services/api';

const defaultSkills = staticPortfolioData?.skills || [];

const PortfolioContext = createContext({
  projects: defaultProjects,
  personal: defaultSiteMeta,
  posts: defaultPosts,
  skills: defaultSkills,
  loading: false,
  isOffline: false,
  isApiConnected: false,
  lastSynced: null,
  reloadPortfolio: () => {},
  updateProjects: () => {},
  updatePersonal: () => {},
  updatePosts: () => {},
  updateSkills: () => {},
  resetToDefaults: () => {},
});

const accentColors = ['#fe3c01', '#2563eb', '#059669', '#9333ea', '#d97706', '#0284c7'];

// Map API project object to frontend project object
export function mapApiProject(p, idx) {
  const tags = Array.isArray(p.tags) ? p.tags : (p.tags || '').split(',').map((t) => t.trim()).filter(Boolean);
  return {
    id: p.id || String(idx + 1),
    project_code: p.project_code || `0${idx + 1}`,
    code: p.project_code ? `(${String(p.project_code).padStart(2, '0')})` : `(0${idx + 1})`,
    title: p.title,
    description: p.description || '',
    client: tags.slice(0, 2).join(' / ') || 'Production App',
    clientCode: `(PR0${idx + 1})`,
    tags,
    github: p.github_url || p.github || '',
    deploy: p.deploy_url || p.deploy || '',
    status: p.status || 'Latest',
    image: p.image_url || p.image || defaultProjects[idx % defaultProjects.length]?.image || '',
    accentColor: accentColors[idx % accentColors.length],
    hasCaseStudy: Boolean(p.deploy_url || p.deploy || p.github_url || p.github),
  };
}

// Map API post object to frontend post object
export function mapApiPost(p, idx) {
  const matchedDefault = defaultPosts.find(
    (dp) =>
      dp.slug === p.slug ||
      dp.title?.toLowerCase().trim() === p.title?.toLowerCase().trim() ||
      dp.id === Number(p.id)
  );

  return {
    id: p.id || p.post_id || idx + 1,
    post_id: p.post_id || `post-${p.id || idx + 1}`,
    slug: p.slug || `post-${p.id || idx + 1}`,
    title: p.title,
    excerpt: p.excerpt || matchedDefault?.excerpt || '',
    content: p.content || matchedDefault?.content || '',
    author: p.author || 'Lê Văn Đạt',
    date: p.published_date || p.date || matchedDefault?.date || '2026-08-12',
    readTime: p.read_time ? `${p.read_time} min read` : '5 min read',
    image: p.image_url || p.image || matchedDefault?.media?.items?.[0] || '',
    tag: p.tag || matchedDefault?.tag || 'suy ngẫm',
    likes: parseInt(p.total_likes, 10) || matchedDefault?.likes || 12,
    comments: matchedDefault?.comments || [],
    media: matchedDefault?.media || (p.image_url ? { type: 'image', items: [p.image_url] } : null),
  };
}

export function PortfolioProvider({ children }) {
  // 1. Projects: check localStorage override -> fallback to defaultProjects
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_projects_override');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return defaultProjects;
  });

  // 2. Personal info: check localStorage override -> fallback to defaultSiteMeta
  const [personal, setPersonal] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_personal_override');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...defaultSiteMeta, ...parsed };
        }
      }
    } catch {}
    return defaultSiteMeta;
  });

  // 3. Posts: check localStorage override -> fallback to defaultPosts
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_posts_override');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return defaultPosts;
  });

  // 4. Skills: check localStorage override -> fallback to defaultSkills
  const [skills, setSkills] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_skills_override');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return defaultSkills;
  });

  const [loading, setLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(() =>
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );
  const [isApiConnected, setIsApiConnected] = useState(false);
  const [lastSynced, setLastSynced] = useState(null);

  // Monitor online / offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Setters with persistent offline storage
  const updateProjects = useCallback((newProjects) => {
    setProjects(newProjects);
    try {
      localStorage.setItem('portfolio_projects_override', JSON.stringify(newProjects));
    } catch (e) {
      console.warn('Failed to cache projects in localStorage:', e);
    }
  }, []);

  const updatePersonal = useCallback((newPersonal) => {
    setPersonal((prev) => {
      const merged = { ...prev, ...newPersonal };
      try {
        localStorage.setItem('portfolio_personal_override', JSON.stringify(merged));
      } catch (e) {
        console.warn('Failed to cache personal in localStorage:', e);
      }
      return merged;
    });
  }, []);

  const updatePosts = useCallback((newPosts) => {
    setPosts(newPosts);
    try {
      localStorage.setItem('portfolio_posts_override', JSON.stringify(newPosts));
    } catch (e) {
      console.warn('Failed to cache posts in localStorage:', e);
    }
  }, []);

  const updateSkills = useCallback((newSkills) => {
    setSkills(newSkills);
    try {
      localStorage.setItem('portfolio_skills_override', JSON.stringify(newSkills));
    } catch (e) {
      console.warn('Failed to cache skills in localStorage:', e);
    }
  }, []);

  // Revert back to original hardcoded files
  const resetToDefaults = useCallback(() => {
    try {
      localStorage.removeItem('portfolio_projects_override');
      localStorage.removeItem('portfolio_personal_override');
      localStorage.removeItem('portfolio_posts_override');
      localStorage.removeItem('portfolio_skills_override');
    } catch {}
    setProjects(defaultProjects);
    setPersonal(defaultSiteMeta);
    setPosts(defaultPosts);
    setSkills(defaultSkills);
  }, []);

  // Fetch live API data with graceful offline/hardcoded fallback
  const fetchLivePortfolio = useCallback(async () => {
    setLoading(true);
    try {
      const [portRes, postsRes] = await Promise.all([
        api.getPortfolio().catch(() => null),
        api.getPosts().catch(() => null),
      ]);

      let apiSuccess = false;

      // Handle portfolio API response
      if (portRes && portRes.success && portRes.data) {
        apiSuccess = true;

        // Check if user has explicit local override
        const hasProjectOverride = Boolean(localStorage.getItem('portfolio_projects_override'));
        if (!hasProjectOverride && Array.isArray(portRes.data.projects) && portRes.data.projects.length > 0) {
          setProjects(portRes.data.projects.map(mapApiProject));
        }

        const hasSkillOverride = Boolean(localStorage.getItem('portfolio_skills_override'));
        if (!hasSkillOverride && Array.isArray(portRes.data.skills) && portRes.data.skills.length > 0) {
          setSkills(portRes.data.skills);
        }

        const hasPersonalOverride = Boolean(localStorage.getItem('portfolio_personal_override'));
        if (!hasPersonalOverride && portRes.data.personal) {
          setPersonal((prev) => ({
            ...prev,
            ...portRes.data.personal,
            name: portRes.data.personal.name || prev.name,
            title: portRes.data.personal.title || prev.title,
            bio: portRes.data.personal.bio || prev.bio,
            identityStatement: portRes.data.personal.identity_statement || prev.identityStatement,
            tagline: portRes.data.personal.hero_subtext || prev.tagline,
            coordinates: portRes.data.personal.coordinates || prev.coordinates,
            status: portRes.data.personal.status || prev.status,
            avatarUrl: portRes.data.personal.avatar_url || prev.avatarUrl,
          }));
        }
      }

      // Handle blog posts API response
      if (postsRes && postsRes.success && Array.isArray(postsRes.data) && postsRes.data.length > 0) {
        apiSuccess = true;
        const hasPostOverride = Boolean(localStorage.getItem('portfolio_posts_override'));
        if (!hasPostOverride) {
          setPosts(postsRes.data.map(mapApiPost));
        }
      }

      setIsApiConnected(apiSuccess);
      if (apiSuccess) {
        setLastSynced(new Date().toISOString());
      }
    } catch (err) {
      console.warn('[PortfolioContext] Live API sync failed, continuing with cached/static fallback:', err);
      setIsApiConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLivePortfolio();
  }, [fetchLivePortfolio]);

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        personal,
        posts,
        skills,
        loading,
        isOffline,
        isApiConnected,
        lastSynced,
        setSkills,
        updateSkills,
        updateProjects,
        updatePersonal,
        updatePosts,
        resetToDefaults,
        reloadPortfolio: fetchLivePortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export { usePortfolio } from './usePortfolio';
export default PortfolioContext;
