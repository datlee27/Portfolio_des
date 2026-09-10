import React, { createContext, useState, useEffect, useCallback } from 'react';
import { featuredProjects as defaultProjects, siteMeta as defaultSiteMeta } from '../designs/design4/data/homeData';
import { POSTS as defaultPosts } from '../designs/design4/components/blog/blogData';
import api from '../services/api';

const PortfolioContext = createContext({
  projects: defaultProjects,
  personal: defaultSiteMeta,
  posts: defaultPosts,
  loading: false,
  reloadPortfolio: () => {},
});

const accentColors = ['#fe3c01', '#2563eb', '#059669', '#9333ea', '#d97706', '#0284c7'];

// Map API project object to frontend project object
function mapApiProject(p, idx) {
  const tags = Array.isArray(p.tags) ? p.tags : (p.tags || '').split(',').map((t) => t.trim()).filter(Boolean);
  return {
    id: p.id || String(idx + 1),
    code: p.project_code ? `(${p.project_code.padStart(2, '0')})` : `(0${idx + 1})`,
    title: p.title,
    description: p.description || '',
    client: tags.slice(0, 2).join(' / ') || 'Production App',
    clientCode: `(PR0${idx + 1})`,
    tags,
    github: p.github_url || '',
    deploy: p.deploy_url || '',
    status: p.status || 'Latest',
    image: p.image_url || defaultProjects[idx % defaultProjects.length]?.image || '',
    accentColor: accentColors[idx % accentColors.length],
    hasCaseStudy: Boolean(p.deploy_url || p.github_url),
  };
}

// Map API post object to frontend post object
function mapApiPost(p, idx) {
  return {
    id: p.id || p.post_id || idx + 1,
    post_id: p.post_id || `post-${p.id || idx + 1}`,
    slug: p.slug || `post-${p.id || idx + 1}`,
    title: p.title,
    excerpt: p.excerpt || '',
    content: p.content || '',
    author: p.author || 'Lê Văn Đạt',
    date: p.published_date || p.date || 'Gần đây',
    readTime: p.read_time ? `${p.read_time} min read` : '5 min read',
    image: p.image_url || p.image || '',
  };
}

export function PortfolioProvider({ children }) {
  const [projects, setProjects] = useState(defaultProjects);
  const [personal, setPersonal] = useState(defaultSiteMeta);
  const [posts, setPosts] = useState(defaultPosts);
  const [loading, setLoading] = useState(false);

  const fetchLivePortfolio = useCallback(async () => {
    setLoading(true);
    try {
      const [portRes, postsRes] = await Promise.all([
        api.getPortfolio().catch(() => null),
        api.getPosts().catch(() => null),
      ]);

      if (portRes && portRes.success && portRes.data) {
        if (Array.isArray(portRes.data.projects) && portRes.data.projects.length > 0) {
          setProjects(portRes.data.projects.map(mapApiProject));
        }

        if (portRes.data.personal) {
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

      if (postsRes && postsRes.success && Array.isArray(postsRes.data) && postsRes.data.length > 0) {
        setPosts(postsRes.data.map(mapApiPost));
      }
    } catch (err) {
      console.warn('[PortfolioContext] Failed to sync live API data, using static fallback:', err);
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
        loading,
        reloadPortfolio: fetchLivePortfolio,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export { usePortfolio } from './usePortfolio';
export default PortfolioContext;
