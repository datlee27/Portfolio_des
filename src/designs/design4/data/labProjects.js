import { portfolioData } from '../../../../portfolioData';

export const labProjects = portfolioData.projects.map((p) => ({
  id: p.id,
  title: p.title,
  subtitle: p.tags.join(' • '),
  year: p.status || '2025',
  client: 'Personal Project',
  role: 'Fullstack Dev',
  category: p.tags[0] || 'Web',
  coverImage: p.image,
  summary: p.description,
  githubUrl: p.github,
  liveUrl: p.deploy,
  tags: p.tags,
}));

export default labProjects;
