import React, { createContext, useState, useEffect, useCallback } from 'react';
import { featuredProjects as defaultProjects, siteMeta as defaultSiteMeta, defaultJourney } from '../designs/design4/data/homeData';
import { POSTS as defaultPosts } from '../designs/design4/components/blog/blogData';
import staticPortfolioData from '../../portfolioData.json';
import api from '../services/api';

const defaultSkills = staticPortfolioData?.skills || [];

const REALTIME_CHANNEL_NAME = 'portfolio_realtime_sync_channel';

// Singleton BroadcastChannel reference for cross-tab realtime synchronization
let syncChannel = null;
if (typeof window !== 'undefined' && typeof window.BroadcastChannel === 'function') {
  try {
    syncChannel = new BroadcastChannel(REALTIME_CHANNEL_NAME);
  } catch (e) {
    console.warn('[RealtimeSync] BroadcastChannel not supported:', e);
  }
}

/**
 * Dispatch realtime sync event across all browser tabs and in-process subscribers
 */
export function notifyRealtimeSync(type, data) {
  const payload = { type, data, timestamp: Date.now() };
  if (syncChannel) {
    try {
      syncChannel.postMessage(payload);
    } catch (e) {
      console.warn('[RealtimeSync] BroadcastChannel postMessage error:', e);
    }
  }
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(new CustomEvent('portfolio_realtime_event', { detail: payload }));
    } catch {}
  }
}

const PortfolioContext = createContext({
  projects: defaultProjects,
  personal: defaultSiteMeta,
  posts: defaultPosts,
  skills: defaultSkills,
  experience: defaultJourney,
  loading: false,
  isOffline: false,
  isApiConnected: false,
  lastSynced: null,
  reloadPortfolio: () => {},
  updateProjects: () => {},
  updatePersonal: () => {},
  updatePosts: () => {},
  updateSkills: () => {},
  updateExperience: () => {},
  resetToDefaults: () => {},
});

const accentColors = ['#fe3c01', '#2563eb', '#059669', '#9333ea', '#d97706', '#0284c7'];

export function isProjectMatch(p, targetId, targetTitle) {
  if (!p) return false;
  const pIdStr = String(p.id ?? '').trim();
  const targetIdStr = String(targetId ?? '').trim();

  // 1. Direct string match
  if (pIdStr && targetIdStr && pIdStr === targetIdStr) return true;

  // 2. Normalized leading zero match: "01" matches "1"
  const normP = pIdStr.replace(/^0+/, '');
  const normTarget = targetIdStr.replace(/^0+/, '');
  if (normP && normTarget && normP === normTarget) return true;

  // 3. Fallback title match (case-insensitive, trimmed)
  if (p.title && targetTitle) {
    const t1 = p.title.trim().toLowerCase();
    const t2 = targetTitle.trim().toLowerCase();
    if (t1 && t2 && t1 === t2) return true;
  }

  return false;
}

// Kiểm tra trạng thái hiển thị công khai (Public) của dự án
export function isProjectPublic(p) {
  if (!p) return false;
  if (p.is_public === false || p.is_public === 0 || p.is_public === '0' || p.is_public === 'false') {
    return false;
  }
  if (p.is_published === false || p.is_published === 0 || p.is_published === '0' || p.is_published === 'false') {
    return false;
  }
  if (p.visible === false || p.visible === 0 || p.visible === '0' || p.visible === 'false') {
    return false;
  }
  return true;
}

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
  let hasExplicitBody = false;

  if (Array.isArray(p.body_images)) {
    bodyImages = p.body_images;
    hasExplicitBody = true;
  } else if (typeof p.body_images === 'string' && p.body_images.trim().startsWith('[')) {
    try {
      bodyImages = JSON.parse(p.body_images);
      hasExplicitBody = true;
    } catch {
      bodyImages = [];
    }
  } else if (typeof p.body_images === 'string' && p.body_images.trim().length > 0) {
    bodyImages = p.body_images.split(',').map((s) => s.trim()).filter(Boolean);
    hasExplicitBody = true;
  } else if (Array.isArray(p.images)) {
    bodyImages = p.images;
    hasExplicitBody = true;
  }

  // Only fallback to defaultProjects if body_images was NEVER provided (undefined)
  if (!hasExplicitBody) {
    const matchedDefault = defaultProjects.find((dp) => isProjectMatch(dp, p.id, p.title));
    if (matchedDefault && Array.isArray(matchedDefault.body_images)) {
      bodyImages = matchedDefault.body_images;
    }
  }

  bodyImages = (Array.isArray(bodyImages) ? bodyImages : [])
    .filter((img) => typeof img === 'string' && img.trim().length > 0)
    .slice(0, 6);

  const videoDemo = (p.video_demo || p.video_url || p.video || '').trim();
  const isPublic = isProjectPublic(p);

  return {
    id: p.id || String(idx + 1),
    project_code: (p.project_code && String(p.project_code).trim()) || `0${idx + 1}`,
    code: (p.project_code && String(p.project_code).trim()) ? `(${String(p.project_code).padStart(2, '0')})` : `(0${idx + 1})`,
    title: (p.title && p.title.trim()) || defaultProjects[idx % defaultProjects.length]?.title || `Dự án ${idx + 1}`,
    description: p.description || '',
    client: tags.slice(0, 2).join(' / ') || 'Production App',
    clientCode: `(PR0${idx + 1})`,
    tags,
    github: p.github_url || p.github || '',
    github_url: p.github_url || p.github || '',
    deploy: p.deploy_url || p.deploy || '',
    deploy_url: p.deploy_url || p.deploy || '',
    status: p.status || 'Latest',
    is_public: isPublic,
    sort_order: p.sort_order !== undefined ? Number(p.sort_order) : idx + 1,
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

  // 5. Experience / Journey: check localStorage override -> fallback to defaultJourney
  const [experience, setExperience] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_experience_override');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return defaultJourney;
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

  // Setters with persistent offline storage & cross-tab realtime dispatch
  const updateProjects = useCallback((newProjects) => {
    const normalized = (newProjects || []).map((p, idx) => mapApiProject(p, idx));
    setProjects(normalized);
    try {
      localStorage.setItem('portfolio_projects_override', JSON.stringify(normalized));
    } catch (e) {
      console.warn('Failed to cache projects in localStorage:', e);
    }
    notifyRealtimeSync('projects', normalized);
  }, []);

  const updatePersonal = useCallback((newPersonal) => {
    setPersonal((prev) => {
      const merged = { ...prev, ...newPersonal };
      try {
        localStorage.setItem('portfolio_personal_override', JSON.stringify(merged));
      } catch (e) {
        console.warn('Failed to cache personal in localStorage:', e);
      }
      notifyRealtimeSync('personal', merged);
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
    notifyRealtimeSync('posts', normalized);
  }, []);

  const updateSkills = useCallback((newSkills) => {
    setSkills(newSkills);
    try {
      localStorage.setItem('portfolio_skills_override', JSON.stringify(newSkills));
    } catch (e) {
      console.warn('Failed to cache skills in localStorage:', e);
    }
    notifyRealtimeSync('skills', newSkills);
  }, []);

  const updateExperience = useCallback((newExperience) => {
    const normalized = (newExperience || []).map((exp, idx) => ({
      id: exp.id || `exp-${idx + 1}`,
      place: (exp.place || exp.company || '').trim(),
      company: (exp.company || exp.place || '').trim(),
      role: (exp.role || exp.title || '').trim(),
      title: (exp.title || exp.role || '').trim(),
      period: (exp.period || '').trim(),
      description: (exp.description || '').trim(),
    }));
    setExperience(normalized);
    try {
      localStorage.setItem('portfolio_experience_override', JSON.stringify(normalized));
    } catch (e) {
      console.warn('Failed to cache experience in localStorage:', e);
    }
    notifyRealtimeSync('experience', normalized);
  }, []);

  // Revert back to original hardcoded files
  const resetToDefaults = useCallback(() => {
    try {
      localStorage.removeItem('portfolio_projects_override');
      localStorage.removeItem('portfolio_personal_override');
      localStorage.removeItem('portfolio_posts_override');
      localStorage.removeItem('portfolio_skills_override');
      localStorage.removeItem('portfolio_experience_override');
    } catch {}
    const defaultNormProjects = defaultProjects.map((p, idx) => mapApiProject(p, idx));
    setProjects(defaultNormProjects);
    setPersonal(defaultSiteMeta);
    setPosts(defaultPosts);
    setSkills(defaultSkills);
    setExperience(defaultJourney);
    notifyRealtimeSync('reset', null);
  }, []);

  // Rehydrate state from localStorage overrides
  const syncFromLocalStorage = useCallback(() => {
    try {
      // 1. Projects
      const savedProj = localStorage.getItem('portfolio_projects_override');
      if (savedProj) {
        const parsed = JSON.parse(savedProj);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed.map((p, idx) => mapApiProject(p, idx)));
        }
      }

      // 2. Personal
      const savedPersonal = localStorage.getItem('portfolio_personal_override');
      if (savedPersonal) {
        const parsed = JSON.parse(savedPersonal);
        if (parsed && typeof parsed === 'object') {
          setPersonal((prev) => ({ ...defaultSiteMeta, ...prev, ...parsed }));
        }
      }

      // 3. Posts
      const savedPosts = localStorage.getItem('portfolio_posts_override');
      if (savedPosts) {
        const parsed = JSON.parse(savedPosts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPosts(parsed.map((p, idx) => mapApiPost(p, idx)));
        }
      }

      // 4. Skills
      const savedSkills = localStorage.getItem('portfolio_skills_override');
      if (savedSkills) {
        const parsed = JSON.parse(savedSkills);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSkills(parsed);
        }
      }

      // 5. Experience
      const savedExp = localStorage.getItem('portfolio_experience_override');
      if (savedExp) {
        const parsed = JSON.parse(savedExp);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setExperience(parsed);
        }
      }
    } catch (e) {
      console.warn('[RealtimeSync] Failed to rehydrate from localStorage:', e);
    }
  }, []);

  // Realtime multi-channel subscriber (BroadcastChannel + StorageEvent + WindowEvent + Tab Focus)
  useEffect(() => {
    const handleSyncMessage = (msg) => {
      if (!msg) return;
      const { type, data } = msg;
      if (type === 'projects') {
        if (Array.isArray(data)) {
          setProjects(data.map((p, idx) => mapApiProject(p, idx)));
        } else {
          syncFromLocalStorage();
        }
      } else if (type === 'personal') {
        if (data && typeof data === 'object') {
          setPersonal((prev) => ({ ...defaultSiteMeta, ...prev, ...data }));
        } else {
          syncFromLocalStorage();
        }
      } else if (type === 'posts') {
        if (Array.isArray(data)) {
          setPosts(data.map((p, idx) => mapApiPost(p, idx)));
        } else {
          syncFromLocalStorage();
        }
      } else if (type === 'skills') {
        if (Array.isArray(data)) {
          setSkills(data);
        } else {
          syncFromLocalStorage();
        }
      } else if (type === 'experience') {
        if (Array.isArray(data)) {
          setExperience(data);
        } else {
          syncFromLocalStorage();
        }
      } else if (type === 'reset') {
        setProjects(defaultProjects.map((p, idx) => mapApiProject(p, idx)));
        setPersonal(defaultSiteMeta);
        setPosts(defaultPosts);
        setSkills(defaultSkills);
        setExperience(defaultJourney);
      } else {
        syncFromLocalStorage();
      }
    };

    // 1. BroadcastChannel (Cross-Tab instant sync < 1ms)
    if (syncChannel) {
      syncChannel.onmessage = (event) => {
        handleSyncMessage(event?.data);
      };
    }

    // 2. Storage event listener (other tabs fallback)
    const handleStorage = (e) => {
      if (!e.key || e.key.startsWith('portfolio_')) {
        syncFromLocalStorage();
      }
    };
    window.addEventListener('storage', handleStorage);

    // 3. Custom window event (same-tab in-process dispatch)
    const handleCustomSync = (e) => {
      handleSyncMessage(e?.detail);
    };
    window.addEventListener('portfolio_realtime_event', handleCustomSync);

    // 4. Tab visibility change & focus (when user switches back to portfolio tab)
    const handleVisibility = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        syncFromLocalStorage();
      }
    };
    window.addEventListener('focus', syncFromLocalStorage);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('portfolio_realtime_event', handleCustomSync);
      window.removeEventListener('focus', syncFromLocalStorage);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [syncFromLocalStorage]);

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

        // When API succeeds, live database is the single source of truth
        if (Array.isArray(portRes.data.projects) && portRes.data.projects.length > 0) {
          const validProjects = portRes.data.projects.filter(
            (p) => p && typeof p.title === 'string' && p.title.trim().length > 0
          );
          if (validProjects.length > 0) {
            const mapped = validProjects.map(mapApiProject);
            setProjects(mapped);
            try {
              localStorage.setItem('portfolio_projects_override', JSON.stringify(mapped));
            } catch {}
          }
        }

        if (Array.isArray(portRes.data.skills) && portRes.data.skills.length > 0) {
          setSkills(portRes.data.skills);
          try {
            localStorage.setItem('portfolio_skills_override', JSON.stringify(portRes.data.skills));
          } catch {}
        }

        if (Array.isArray(portRes.data.experience) && portRes.data.experience.length > 0) {
          const mappedExp = portRes.data.experience.map((exp, idx) => ({
            id: exp.id || `exp-${idx + 1}`,
            place: exp.company || exp.place || '',
            company: exp.company || exp.place || '',
            role: exp.title || exp.role || '',
            title: exp.title || exp.role || '',
            period: exp.period || '',
            description: exp.description || '',
          }));
          setExperience(mappedExp);
          try {
            localStorage.setItem('portfolio_experience_override', JSON.stringify(mappedExp));
          } catch {}
        }

        if (portRes.data.personal) {
          setPersonal((prev) => {
            const merged = {
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
              cvUrl: portRes.data.personal.cv_url || prev.cvUrl || prev.cv_url,
              cv_url: portRes.data.personal.cv_url || prev.cv_url || prev.cvUrl,
            };
            try {
              localStorage.setItem('portfolio_personal_override', JSON.stringify(merged));
            } catch {}
            return merged;
          });
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
        experience,
        loading,
        isOffline,
        isApiConnected,
        lastSynced,
        setSkills,
        updateSkills,
        setExperience,
        updateExperience,
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
