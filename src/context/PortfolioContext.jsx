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
export function mapApiProject(p, idx = 0) {
  const tags = Array.isArray(p.tags) ? p.tags : (p.tags || '').split(',').map((t) => t.trim()).filter(Boolean);
  
  // Resolve image with fallback for missing or broken relative paths like "/assets/img/..."
  const rawImage = (p.image_url || p.image || '').trim();
  const fallbackImage =
    defaultProjects[idx % defaultProjects.length]?.image ||
    'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80';
  const isInvalidAsset = rawImage.startsWith('/assets/img/');
  const finalImage = !rawImage || isInvalidAsset ? fallbackImage : rawImage;

  // Resolve body_images safely (up to 6 images)
  let bodyImages = [];
  if (Array.isArray(p.body_images)) {
    bodyImages = p.body_images;
  } else if (typeof p.body_images === 'string' && p.body_images.trim().startsWith('[')) {
    try {
      bodyImages = JSON.parse(p.body_images);
    } catch {
      bodyImages = [];
    }
  } else if (typeof p.body_images === 'string' && p.body_images.trim().length > 0) {
    bodyImages = p.body_images.split(',').map((s) => s.trim()).filter(Boolean);
  } else if (Array.isArray(p.images)) {
    bodyImages = p.images;
  }

  // Fallback to defaultProjects if body_images is empty
  if (bodyImages.length === 0) {
    const matchedDefault = defaultProjects.find(
      (dp) => (dp.id && dp.id === p.id) || (dp.title && dp.title.toLowerCase().trim() === (p.title || '').toLowerCase().trim())
    ) || defaultProjects[idx % defaultProjects.length];
    if (matchedDefault && Array.isArray(matchedDefault.body_images) && matchedDefault.body_images.length > 0) {
      bodyImages = matchedDefault.body_images;
    }
  }

  bodyImages = (Array.isArray(bodyImages) ? bodyImages : [])
    .filter((img) => typeof img === 'string' && img.trim().length > 0)
    .slice(0, 6);

  const videoDemo = (p.video_demo || p.video_url || p.video || '').trim();

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
    github_url: p.github_url || p.github || '',
    deploy: p.deploy_url || p.deploy || '',
    deploy_url: p.deploy_url || p.deploy || '',
    status: p.status || 'Latest',
    image: finalImage,
    image_url: finalImage,
    body_images: bodyImages,
    video_demo: videoDemo,
    video_url: videoDemo,
    accentColor: accentColors[idx % accentColors.length],
    hasCaseStudy: Boolean(p.deploy_url || p.deploy || p.github_url || p.github),
  };
}

// Map API post object to frontend post object
export function mapApiPost(p, idx) {
  const normalize = (s) =>
    (s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]/g, '');

  const pNorm = normalize(p.slug || p.title);

  const matchedDefault = defaultPosts.find(
    (dp) =>
      (dp.slug && p.slug && dp.slug === p.slug) ||
      (dp.title && p.title && dp.title.toLowerCase().trim() === p.title.toLowerCase().trim()) ||
      (pNorm && (normalize(dp.slug) === pNorm || normalize(dp.title) === pNorm)) ||
      (dp.id && p.id && Number(dp.id) === Number(p.id))
  );

  const parsedTotalLikes = parseInt(p.total_likes, 10);
  let safeLikes = 0;
  if (typeof p.likes === 'number' && !isNaN(p.likes)) {
    safeLikes = p.likes;
  } else if (!isNaN(parsedTotalLikes) && parsedTotalLikes > 0) {
    safeLikes = parsedTotalLikes;
  } else if (matchedDefault?.likes) {
    safeLikes = matchedDefault.likes;
  } else {
    safeLikes = 12;
  }

  let safeComments = [];
  if (Array.isArray(p.comments) && p.comments.length > 0) {
    safeComments = p.comments;
  } else if (Array.isArray(matchedDefault?.comments) && matchedDefault.comments.length > 0) {
    safeComments = matchedDefault.comments;
  }

  return {
    id: p.id || p.post_id || idx + 1,
    post_id: p.post_id || `post-${p.id || idx + 1}`,
    slug: p.slug || matchedDefault?.slug || `post-${p.id || idx + 1}`,
    title: p.title,
    excerpt: p.excerpt || matchedDefault?.excerpt || '',
    content: p.content || matchedDefault?.content || '',
    author: p.author || 'Lê Văn Đạt',
    date: p.published_date || p.date || matchedDefault?.date || '2026-08-12',
    readTime: p.read_time ? `${p.read_time} min read` : (matchedDefault?.readTime || '5 min read'),
    image: p.image_url || p.image || matchedDefault?.media?.items?.[0] || '',
    tag: p.tag || matchedDefault?.tag || 'suy ngẫm',
    likes: safeLikes,
    comments: safeComments,
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
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p, idx) => mapApiProject(p, idx));
        }
      }
    } catch {}
    return defaultProjects.map((p, idx) => mapApiProject(p, idx));
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

  // 3. Posts: check localStorage override -> fallback to defaultPosts (with normalization)
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_posts_override');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p, idx) => mapApiPost(p, idx));
        }
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
    const normalized = (newProjects || []).map((p, idx) => mapApiProject(p, idx));
    setProjects(normalized);
    try {
      localStorage.setItem('portfolio_projects_override', JSON.stringify(normalized));
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
    const normalized = (newPosts || []).map((p, idx) => mapApiPost(p, idx));
    setPosts(normalized);
    try {
      localStorage.setItem('portfolio_posts_override', JSON.stringify(normalized));
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
