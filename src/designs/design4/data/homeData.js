// Design 4 — Complete Data extracted from yanxinzhang.com

export const siteMeta = {
  name: 'YanXin Zhang',
  shortName: 'yx',
  title: 'YanXin Zhang - Turning Creative Chaos into Reality',
  tagline: 'Turning Creative Chaos into Reality',
  bio: 'Multidisciplinary experiential designer and creative lead who blends art direction, branding, 2D/3D motion, and UI/UX into cohesive visual storytelling.',
  location: 'Singapore (+65)',
  email: 'hello@yanxinzhang.com',
  altEmail: 'hi@yanxinzhang.com',
  year: '2026',
  badge: 'YX*',
  badgeYear: '/26',
};

export const heroData = {
  firstName: 'YanXin',
  lastName: 'Zhang',
  role: 'Multidisciplinary Experiential Designer & Creative Lead',
  subtitle: 'Turning Creative Chaos into Reality',
  stickers: [
    {
      id: 'sticker-1',
      src: 'https://framerusercontent.com/images/51CetPzSFpvaraczTEtCz0jCo.png?width=1366&height=1000',
      alt: '3D Render',
      className: 'hero-sticker-main',
    },
    {
      id: 'sticker-star',
      src: 'https://framerusercontent.com/images/CrQdgMKOAf5N4duSXjc76KKJlw.png?width=43&height=45',
      alt: 'Star badge',
      className: 'hero-sticker-star',
    },
    {
      id: 'sticker-face',
      src: 'https://framerusercontent.com/images/z7iqm9BwewMwg1PC3K9MnyaC7JE.png?width=56&height=45',
      alt: 'Cute face',
      className: 'hero-sticker-face',
    },
    {
      id: 'sticker-flower',
      src: 'https://framerusercontent.com/images/n3VTfiXUGql3C0TJIFvXgs8Ko.png?width=46&height=45',
      alt: 'Flower',
      className: 'hero-sticker-flower',
    },
    {
      id: 'sticker-gif1',
      src: 'https://framerusercontent.com/images/Z0oPD4aqeRrqmX19aQu0j7wCDiA.gif?width=90&height=45',
      alt: 'Motion Gif',
      className: 'hero-sticker-gif1',
    },
    {
      id: 'sticker-gif2',
      src: 'https://framerusercontent.com/images/xfnsTlzEew5abOSsoTwi2MDXM4.gif?width=60&height=45',
      alt: 'Sparkle Gif',
      className: 'hero-sticker-gif2',
    },
    {
      id: 'sticker-gif3',
      src: 'https://framerusercontent.com/images/eyywHU5EahGjcyhpTfFeFWC2m20.gif?width=75&height=45',
      alt: 'Eye Gif',
      className: 'hero-sticker-gif3',
    },
  ],
};

export const introData = {
  textParts: [
    { text: 'YanXin Zhang is a ', highlight: false },
    { text: 'multidisciplinary designer', highlight: true, color: '#fe3c01' },
    { text: ' and ', highlight: false },
    { text: 'creative lead', highlight: true, color: '#0b1dff' },
    { text: ' who blends ', highlight: false },
    { text: 'Art Direction,', highlight: true, color: '#ff6200' },
    { text: ' Brand Systems,', highlight: true, color: '#8bc200' },
    { text: ' Motion,', highlight: true, color: '#ff75f6' },
    { text: ' and ', highlight: false },
    { text: 'Interactive Design', highlight: true, color: '#45ff08' },
    { text: ' into cohesive ', highlight: false },
    { text: 'visual storytelling.', highlight: true, italic: true },
    { text: ' Leads projects ', highlight: false },
    { text: 'End-to-End,', highlight: true, color: '#fe3c01' },
    { text: ' from discovery to implementation, guiding teams while staying hands-on, with a deep love for turning ideas into ', highlight: false },
    { text: 'realities.', highlight: true, italic: true, color: '#0b1dff' },
  ],
};

export const showreelData = {
  title: 'SHOWREEL',
  videoUrl: 'https://video.gumlet.io/69a9abbd06a15537d02701a5/69db6a96e556529568a85399/main.mp4',
  posterGif: 'https://framerusercontent.com/images/jOQ3WSvHY482zYegmuEP1iYjc.gif?width=1196&height=674',
};

export const featuredProjects = [
  {
    id: '01',
    code: '(01)',
    title: 'Jinqiu Jiayuan by ByteDance',
    client: 'ByteDance',
    clientCode: '(BD01)',
    tags: [
      'Art Direction',
      'Experiential Design',
      'Concept Development',
      '2D & 3D Animation',
      'Interactive UI/UX',
    ],
    videoUrl: 'https://video.gumlet.io/69a9abbd06a15537d02701a5/69ae9f95f96956f2b5f90b2f/main.mp4',
    poster: 'https://framerusercontent.com/images/XjwPzi2YSxoT7gtF3dSedIiadM.jpg?width=600&height=403',
    hasCaseStudy: true,
    accentColor: '#fe3c01',
  },
  {
    id: '02',
    code: '(02)',
    title: 'LKY100',
    subtitle: 'Life and Legacy of Lee Kuan Yew',
    client: 'National Heritage Board',
    clientCode: '(NH01)',
    tags: ['Experiential Design', 'Motion Design'],
    image: 'https://framerusercontent.com/images/KStWazohrKWwui4n8wNsyKNqet0.jpg?width=950&height=950',
    hasCaseStudy: false,
    accentColor: '#0b1dff',
  },
  {
    id: '03',
    code: '(03)',
    title: 'Leveling Up Rev Illimité',
    client: 'Rev Illimité',
    clientCode: '(RV01)',
    tags: ['Art Direction', 'Brand Systems', '2D & 3D Animation'],
    videoUrl: 'https://video.gumlet.io/69a9abbd06a15537d02701a5/69df3bcaefd61f7e4bb4ebda/main.mp4',
    poster: 'https://framerusercontent.com/images/IF9MDlNLXKlApwkkWoou4mQMo1w.jpg?width=1920&height=1080',
    hasCaseStudy: true,
    accentColor: '#ff75f6',
  },
  {
    id: '04',
    code: '(04)',
    title: 'Jumbo Signatures',
    client: 'Jumbo Group of Restaurants',
    clientCode: '(JM01)',
    tags: ['Art Direction', 'Brand Systems', 'Print'],
    image: 'https://framerusercontent.com/images/jKSWb8nhDHekUUhy7TU93bZUo.jpg?width=1920&height=1280',
    hasCaseStudy: false,
    accentColor: '#ffe815',
  },
];

export const whatIDoData = {
  heading: 'what i do',
  subheading:
    'I approach design through brand strategy and experience storytelling, using visuals, motion, and interaction to create work that connects.',
  columns: [
    {
      num: '(01)',
      title: 'digital',
      subtitle: 'experiences',
      description:
        'Design and build interactive systems that work. I bridge the gap between high-level strategy and technical reality.',
      items: [
        '(01.01) Brand Identity',
        '(01.02) Experiential Design',
        '(01.03) 2D & 3D Animation',
        '(01.04) Environments & Spatial Design',
        '(01.05) Interactive Installations',
        '(01.06) Touchscreen & Website',
      ],
      color: '#fe3c01',
    },
    {
      num: '(02)',
      title: 'creative',
      subtitle: 'execution',
      description:
        'Turning complex concepts into executable realities through a deep mastery of motion, 3D, and interactive pipelines.',
      items: [
        '(02.01) Art Direction',
        '(02.02) Concept Development',
        '(02.03) Brand Systems',
        '(02.04) Motion Graphics',
        '(02.05) Interactive UI/UX',
        '(02.06) Post-Production',
        '(02.07) 3D Pipelines',
      ],
      color: '#0b1dff',
    },
    {
      num: '(03)',
      title: 'lead &',
      subtitle: 'strategy',
      description:
        'Aligning technical teams with creative vision. I lead designers and developers to ensure the narrative scales.',
      items: [
        '(03.01) Project Pitching & Vision',
        '(03.02) Storytelling & Narrative',
        '(03.03) End-to-end Delivery',
        '(03.04) Team Leadership',
        '(03.05) Technical Feasibility & Strategy',
        '(03.06) Developer Collaboration',
      ],
      color: '#45ff08',
    },
  ],
};

export const clientsData = [
  {
    id: 1,
    name: 'ByteDance',
    logo: 'https://framerusercontent.com/images/VMqAbr6Irn7p1aOpL6oC1E9RgiE.png?width=400&height=156',
    previewVideo: 'https://video.gumlet.io/69a9abbd06a15537d02701a5/69a9f62406a15537d02f57cc/main.mp4',
    bg: '#fe3c01',
  },
  {
    id: 2,
    name: 'National Heritage Board',
    logo: 'https://framerusercontent.com/images/0a9eC0DsSdgltwG6NFXIJwEwpk.png?width=400&height=156',
    previewImg: 'https://framerusercontent.com/images/UroXQULTaU62PLU8teHo2Z82mtI.jpg?width=600&height=403',
    bg: '#0b1dff',
  },
  {
    id: 3,
    name: 'Mandai Wildlife Reserve',
    logo: 'https://framerusercontent.com/images/NVzY0swVhyTo6Ei9PcXQKF2I.png?width=400&height=156',
    previewVideo: 'https://video.gumlet.io/69a9abbd06a15537d02701a5/69aea3016fd61f7e4bb55add/main.mp4',
    bg: '#8bc200',
  },
  {
    id: 4,
    name: 'Jumbo Group of Restaurants',
    logo: 'https://framerusercontent.com/images/nLJFcAvaw9vlG6tMIIEXtoB188.png?width=400&height=156',
    previewImg: 'https://framerusercontent.com/images/obk7Ti7nUMhyfX69fexY8uK5l0.jpg?width=600&height=403',
    bg: '#ffe815',
  },
  {
    id: 5,
    name: 'Singapore Institute of Technology',
    logo: 'https://framerusercontent.com/images/IDoUjTdGKievQsFbVuZtYlLXesE.png?width=400&height=156',
    previewImg: 'https://framerusercontent.com/images/ckJ56L2WEjBjJ5dteiOlvXMdc.jpg?width=600&height=403',
    bg: '#ff75f6',
  },
  {
    id: 6,
    name: 'Thermo Fisher Scientific',
    logo: 'https://framerusercontent.com/images/bYmLoWn0jWW4AePUOixjU54juUQ.png?width=400&height=156',
    previewImg: 'https://framerusercontent.com/images/TOWJS5MUqxf0AqCS6k4cyarVzY.jpg?width=600&height=403',
    bg: '#45ff08',
  },
  {
    id: 7,
    name: 'Rev Illimité',
    logo: 'https://framerusercontent.com/images/HzluPjZZ97kEySqSSvE0vMrVog.png?width=400&height=156',
    previewVideo: 'https://framerusercontent.com/assets/MLWPbW1dUQawJLhhun3dBwpgJak.mp4',
    bg: '#ff6200',
  },
  {
    id: 8,
    name: 'Tsui Wah Restaurant',
    logo: 'https://framerusercontent.com/images/v8I6SIsDNsHaPX5yny09Dqupi3s.png?width=400&height=156',
    previewImg: 'https://framerusercontent.com/images/XjwPzi2YSxoT7gtF3dSedIiadM.jpg?width=600&height=403',
    bg: '#e3091d',
  },
];

export const stickerGallery = [
  {
    id: 'gallery-1',
    src: 'https://framerusercontent.com/images/bssDxEIkplBAwpalnxd7jncvrpA.jpg?width=720&height=1024',
    title: 'Visual Experiment #01',
    width: 320,
    rotate: '-3deg',
  },
  {
    id: 'gallery-2',
    src: 'https://framerusercontent.com/images/ScU99IyOsTtb1lxML9872VIoxU.jpg?width=1251&height=928',
    title: 'Render Module',
    width: 380,
    rotate: '2deg',
  },
  {
    id: 'gallery-3',
    src: 'https://framerusercontent.com/images/JOYEDJGngCqgqUqMFY63032jAr4.jpg?width=1200&height=675',
    title: 'Metaspace 3D',
    width: 360,
    rotate: '-1.5deg',
  },
  {
    id: 'gallery-4',
    src: 'https://framerusercontent.com/images/wMsJeUgDAt07Spb9jgbEdL7tifs.jpg?width=1920&height=1280',
    title: 'Botanical 3D',
    width: 340,
    rotate: '3.5deg',
  },
  {
    id: 'gallery-5',
    src: 'https://framerusercontent.com/images/rk7FEMbmcIVV3cz36NBzqcnCmI.jpg?width=620&height=658',
    title: 'Character Design',
    width: 280,
    rotate: '-2deg',
  },
  {
    id: 'gallery-6',
    src: 'https://framerusercontent.com/images/eworU6xoE2plzVUmMOPx9rIp7pY.jpg?width=1024&height=919',
    title: 'Spatial Exploration',
    width: 320,
    rotate: '1deg',
  },
];
