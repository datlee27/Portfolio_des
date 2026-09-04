// Design 4 Data — Integrated with real portfolio data for Dat Le (Lê Văn Đạt)
import { portfolioData } from '../../../../portfolioData';

export const siteMeta = {
  name: portfolioData.personal.name,
  shortName: portfolioData.personal.shortName,
  title: 'Dat Le - Technical Artisan & Fullstack Developer',
  tagline: portfolioData.personal.heroSubtext,
  bio: portfolioData.personal.bio,
  identityStatement: portfolioData.personal.identityStatement,
  location: 'Da Nang, Vietnam',
  email: portfolioData.contact.links.find((l) => l.type === 'email')?.value.toLowerCase() || 'lvd27012004@gmail.com',
  emailHref: portfolioData.contact.links.find((l) => l.type === 'email')?.href || 'mailto:lvd27012004@gmail.com',
  github: portfolioData.contact.links.find((l) => l.type === 'github')?.href || 'https://github.com/datlee27',
  facebook: portfolioData.contact.links.find((l) => l.type === 'facebook')?.href || 'https://www.facebook.com/le.van.at.760768',
  year: '2026',
  badge: 'DL*',
  badgeYear: '/26',
  status: portfolioData.personal.status,
  coordinates: portfolioData.personal.coordinates,
  avatarUrl: portfolioData.personal.avatarUrl,
};

export const heroData = {
  firstName: 'Dat',
  lastName: 'Le',
  fullName: 'DAT LEE',
  role: portfolioData.personal.title,
  subtitle: 'Turning Creative Chaos into Reality',
  subtext: portfolioData.personal.heroSubtext,
  stickers: [
    {
      id: 'sticker-avatar',
      src: portfolioData.personal.avatarUrl,
      alt: 'Dat Le Profile',
      isAvatar: true,
    },
    {
      id: 'sticker-star',
      src: 'https://framerusercontent.com/images/CrQdgMKOAf5N4duSXjc76KKJlw.png?width=43&height=45',
      alt: 'Star badge',
    },
    {
      id: 'sticker-face',
      src: 'https://framerusercontent.com/images/z7iqm9BwewMwg1PC3K9MnyaC7JE.png?width=56&height=45',
      alt: 'Cute face',
    },
    {
      id: 'sticker-flower',
      src: 'https://framerusercontent.com/images/n3VTfiXUGql3C0TJIFvXgs8Ko.png?width=46&height=45',
      alt: 'Flower',
    },
    {
      id: 'sticker-gif1',
      src: 'https://framerusercontent.com/images/Z0oPD4aqeRrqmX19aQu0j7wCDiA.gif?width=90&height=45',
      alt: 'Motion Gif',
    },
    {
      id: 'sticker-gif2',
      src: 'https://framerusercontent.com/images/xfnsTlzEew5abOSsoTwi2MDXM4.gif?width=60&height=45',
      alt: 'Sparkle Gif',
    },
    {
      id: 'sticker-gif3',
      src: 'https://framerusercontent.com/images/eyywHU5EahGjcyhpTfFeFWC2m20.gif?width=75&height=45',
      alt: 'Eye Gif',
    },
  ],
};

export const introData = {
  textParts: [
    { text: 'Dat Le is a ', highlight: false },
    { text: 'Fullstack Developer', highlight: true, color: '#fe3c01' },
    { text: ' & ', highlight: false },
    { text: 'Technical Artisan', highlight: true, color: '#0b1dff' },
    { text: ' who builds ', highlight: false },
    { text: 'Scalable Systems,', highlight: true, color: '#ff6200' },
    { text: ' Clean Architectures,', highlight: true, color: '#8bc200' },
    { text: ' Interactive UI,', highlight: true, color: '#ff75f6' },
    { text: ' and ', highlight: false },
    { text: 'AI & Hardware Solutions', highlight: true, color: '#45ff08' },
    { text: ' into cohesive ', highlight: false },
    { text: 'digital experiences.', highlight: true, italic: true },
    { text: ' He handles projects ', highlight: false },
    { text: 'End-to-End,', highlight: true, color: '#fe3c01' },
    { text: ' turning complex technical ideas into ', highlight: false },
    { text: 'realities.', highlight: true, italic: true, color: '#0b1dff' },
  ],
  bio: portfolioData.personal.bio,
  identityStatement: portfolioData.personal.identityStatement,
};

export const showreelData = {
  title: 'SHOWREEL',
  videoUrl: 'https://video.gumlet.io/69a9abbd06a15537d02701a5/69db6a96e556529568a85399/main.mp4',
  posterGif: 'https://framerusercontent.com/images/jOQ3WSvHY482zYegmuEP1iYjc.gif?width=1196&height=674',
};

const defaultProjectImages = [
  'https://res.cloudinary.com/ddwt6nl7s/image/upload/v1775903083/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2026-04-11_lu%CC%81c_17.23.35_z4qpji.png',
  'https://res.cloudinary.com/ddwt6nl7s/image/upload/v1775904892/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2026-04-11_lu%CC%81c_17.52.52_cb9myu.png',
  'https://res.cloudinary.com/ddwt6nl7s/image/upload/v1764500651/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-11-30_lu%CC%81c_18.03.15_drt2kr.png',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80',
];

const accentColors = ['#fe3c01', '#0b1dff', '#8bc200', '#ff75f6', '#45ff08', '#ff6200'];

export const featuredProjects = portfolioData.projects.map((proj, idx) => ({
  id: proj.id,
  code: `(0${idx + 1})`,
  title: proj.title,
  description: proj.description,
  client: proj.tags.slice(0, 2).join(' / '),
  clientCode: `(PR0${idx + 1})`,
  tags: proj.tags,
  github: proj.github,
  deploy: proj.deploy,
  status: proj.status,
  image: proj.image && proj.image.startsWith('http') ? proj.image : defaultProjectImages[idx % defaultProjectImages.length],
  accentColor: accentColors[idx % accentColors.length],
  hasCaseStudy: Boolean(proj.deploy || proj.github),
}));

export const whatIDoData = {
  heading: 'what i do',
  subheading:
    'I approach software engineering through clean architecture and intuitive user experiences, combining full-stack code, databases, AI logic, and hardware to build real-world digital products.',
  columns: [
    {
      num: '(01)',
      title: 'web & fullstack',
      subtitle: 'development',
      description: portfolioData.skills.find((s) => s.category.includes('WEB'))?.items.join(', ') || 'Java, JS, HTML5, CSS3, Spring, TypeScript, C#',
      items: (portfolioData.skills.find((s) => s.category.includes('WEB'))?.items || []).map((item, i) => `(01.0${i + 1}) ${item}`),
      color: '#fe3c01',
    },
    {
      num: '(02)',
      title: 'data & api',
      subtitle: 'engineering',
      description: portfolioData.skills.find((s) => s.category.includes('DATA'))?.items.join(', ') || 'SQL, RESTful, Swagger',
      items: (portfolioData.skills.find((s) => s.category.includes('DATA'))?.items || []).map((item, i) => `(02.0${i + 1}) ${item}`),
      color: '#0b1dff',
    },
    {
      num: '(03)',
      title: 'ai, iot &',
      subtitle: 'tools',
      description: 'Arduino, Sensors, Motors, LM Studio, Figma, Git, Vite',
      items: [
        ...(portfolioData.skills.find((s) => s.category.includes('AI'))?.items || []).map((item, i) => `(03.0${i + 1}) ${item}`),
        ...(portfolioData.skills.find((s) => s.category.includes('HARDWARE'))?.items || []).map((item, i) => `(03.0${i + 3}) ${item}`),
        ...(portfolioData.skills.find((s) => s.category.includes('TOOLS'))?.items || []).map((item, i) => `(03.0${i + 6}) ${item}`),
      ],
      color: '#45ff08',
    },
  ],
};

export const clientsData = [
  {
    id: 1,
    name: 'Dev Roadmap',
    logo: 'https://framerusercontent.com/images/VMqAbr6Irn7p1aOpL6oC1E9RgiE.png?width=400&height=156',
    previewImg: 'https://res.cloudinary.com/ddwt6nl7s/image/upload/v1775903083/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2026-04-11_lu%CC%81c_17.23.35_z4qpji.png',
    bg: '#fe3c01',
  },
  {
    id: 2,
    name: 'IELTS Writing',
    logo: 'https://framerusercontent.com/images/0a9eC0DsSdgltwG6NFXIJwEwpk.png?width=400&height=156',
    previewImg: 'https://res.cloudinary.com/ddwt6nl7s/image/upload/v1775904892/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2026-04-11_lu%CC%81c_17.52.52_cb9myu.png',
    bg: '#0b1dff',
  },
  {
    id: 3,
    name: 'P2P EV Rental',
    logo: 'https://framerusercontent.com/images/NVzY0swVhyTo6Ei9PcXQKF2I.png?width=400&height=156',
    previewImg: 'https://res.cloudinary.com/ddwt6nl7s/image/upload/v1764500651/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-11-30_lu%CC%81c_18.03.15_drt2kr.png',
    bg: '#8bc200',
  },
  {
    id: 4,
    name: 'AI LMS',
    logo: 'https://framerusercontent.com/images/nLJFcAvaw9vlG6tMIIEXtoB188.png?width=400&height=156',
    previewImg: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80',
    bg: '#ffe815',
  },
  {
    id: 5,
    name: 'Smart Recycle Bin',
    logo: 'https://framerusercontent.com/images/IDoUjTdGKievQsFbVuZtYlLXesE.png?width=400&height=156',
    previewImg: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
    bg: '#ff75f6',
  },
  {
    id: 6,
    name: 'Fruit Shop',
    logo: 'https://framerusercontent.com/images/bYmLoWn0jWW4AePUOixjU54juUQ.png?width=400&height=156',
    previewImg: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
    bg: '#45ff08',
  },
  {
    id: 7,
    name: 'FPT University',
    logo: 'https://framerusercontent.com/images/HzluPjZZ97kEySqSSvE0vMrVog.png?width=400&height=156',
    previewImg: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
    bg: '#ff6200',
  },
  {
    id: 8,
    name: 'Phan Chau Trinh',
    logo: 'https://framerusercontent.com/images/v8I6SIsDNsHaPX5yny09Dqupi3s.png?width=400&height=156',
    previewImg: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    bg: '#e3091d',
  },
];

export const experienceData = portfolioData.experience;
export const blogPostsData = portfolioData.blogPosts;
export const contactData = portfolioData.contact;
