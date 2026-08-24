import { ProjectCardData } from '../components/shared/ProjectCard';
import { ServiceItemData } from '../components/shared/ServiceItem';
import { ReviewData } from '../components/shared/ReviewCard';
import { FAQItemData } from '../components/shared/FAQItem';

export const portfolioProjects: ProjectCardData[] = [
  {
    id: 'd1',
    name: 'ABC3',
    subtitle: 'Assistive Neurodiversity Tech & Accessible Interface',
    description: 'An empathetic, highly accessible digital brand experience and website designed in Figma for assistive neurodiversity tech. Features custom high-contrast modes, sensory friendly micro-interactions, and comprehensive component tokens.',
    client: 'Autism Foundation',
    year: '2026',
    type: 'Branding & Website',
    tool: 'Figma',
    clipColor: '#3b82f6', // blue
    rot: '-3deg',
    thumbnail: '/assets/Be455u4BRYelSl1NS32A0tLSZU.png',
    gallery: [
      '/assets/Be455u4BRYelSl1NS32A0tLSZU.png',
      '/assets/2y9hWY2pBjaONGzPRqdv67woE.png',
    ]
  },
  {
    id: 'd2',
    name: 'ABC2',
    subtitle: 'Laptop in Lavender Botanical Oasis Showcase',
    description: 'An atmospheric e-commerce and editorial showcase for botanical wellness and creative computing. Engineered with fluid layout grids, subtle scroll-linked parallax, and bespoke typography hierarchies.',
    client: 'Lavender Studio',
    year: '2026',
    type: 'Website Design',
    tool: 'Figma',
    clipColor: '#ef4444', // red
    rot: '2deg',
    thumbnail: '/assets/2y9hWY2pBjaONGzPRqdv67woE.png',
    gallery: [
      '/assets/2y9hWY2pBjaONGzPRqdv67woE.png',
      '/assets/N2w6GD9OJ32bkpXkfMSCXEAtsY.png',
    ]
  },
  {
    id: 'd3',
    name: 'ABC1',
    subtitle: 'Cherry Bomb Nutrition Label & Retro Pop Brand',
    description: 'A punchy, retro-pop packaging and brand identity design with vibrant typography and playful nutritional iconography. Designed for next-generation ready-to-drink functional beverages.',
    client: 'Sunoma Sip Co.',
    year: '2026',
    type: 'Branding',
    tool: 'Figma',
    clipColor: '#eab308', // yellow
    rot: '-2deg',
    thumbnail: '/assets/jC3NYM1gkKdVNzokU0ojtj01asg.png',
    gallery: [
      '/assets/jC3NYM1gkKdVNzokU0ojtj01asg.png',
      '/assets/Be455u4BRYelSl1NS32A0tLSZU.png',
    ]
  },
  {
    id: 'd4',
    name: 'Wild Pup',
    subtitle: 'Meowho Pet Nutritional Systems',
    description: 'A delightful branding, packaging, and Framer website experience for organic feline and canine superfoods. Features custom illustrations, interactive diet calculator, and animated checkout flow.',
    client: 'Meowho Labs',
    year: '2026',
    type: 'Branding & Website',
    tool: 'Framer',
    clipColor: '#22c55e', // green
    rot: '3deg',
    thumbnail: '/assets/N2w6GD9OJ32bkpXkfMSCXEAtsY.png',
    gallery: [
      '/assets/N2w6GD9OJ32bkpXkfMSCXEAtsY.png',
      '/assets/2y9hWY2pBjaONGzPRqdv67woE.png',
    ]
  },
  {
    id: 'd6',
    name: 'Miro',
    subtitle: 'Coconut Glow & Matcha Functional Drinks',
    description: 'Custom 3D can renders and vibrant typography identity for ready-to-drink functional beverages. Combined tactile photography with crisp vector graphic system.',
    client: 'Miro Beverage Inc.',
    year: '2026',
    type: 'Brand Identity',
    tool: 'Photoshop',
    clipColor: '#8b5cf6', // purple
    rot: '-2.5deg',
    thumbnail: '/assets/02RFtEx03DTNa37qOwrWcR7cP8.png',
    gallery: [
      '/assets/02RFtEx03DTNa37qOwrWcR7cP8.png',
      '/assets/Be455u4BRYelSl1NS32A0tLSZU.png',
    ]
  }
];

export const servicesData: ServiceItemData[] = [
  {
    id: 'web',
    title: 'Website Design',
    bg: '#fedcdd', // pink
    icon: null,
    description: 'High-converting, visually distinct digital web presences tailored for SaaS, e-commerce, design agencies, and innovative tech brands.'
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    bg: '#bbdafe', // blue
    icon: null,
    description: 'User-centered product interfaces, accessible design systems, intuitive wireframing, and interactive clickable prototypes built for rapid engineering execution.'
  },
  {
    id: 'brand',
    title: 'Brand Identity',
    bg: '#f3ea9a', // yellow
    icon: null,
    description: 'Comprehensive visual identity systems including logomarks, typography pairing rules, custom color theory, packaging guidelines, and brand design kits.'
  },
  {
    id: 'framer',
    title: 'Framer Builds',
    bg: '#c7f8d9', // mint green
    icon: null,
    description: 'Pixel-perfect, lightning fast interactive Framer websites featuring custom micro-animations, structured CMS collections, and adaptive responsive breakpoints.'
  },
  {
    id: 'ai',
    title: 'AI Exploration',
    bg: '#e2dcfd', // lavender
    icon: null,
    description: 'Cutting-edge creative direction leveraging generative AI tools, prompt engineering, custom synthetic imagery, and procedural visual workflows.'
  }
];

export const reviewsData: ReviewData[] = [
  {
    name: 'Sarah M.',
    role: 'Founder & CEO',
    company: 'Fitas Health',
    avatar: '/assets/EVSY45U60gTa9UjvovzPTZx7Hw.png',
    headline: '“The website finally feels like our brand.”',
    body: 'She turned our idea into a polished, high-performing website that felt premium, intuitive, and remarkably easy for users to navigate.',
    rot: '-2.5deg'
  },
  {
    name: 'Daniel R.',
    role: 'Product Lead',
    company: 'Bond SaaS',
    avatar: '/assets/ZAH3C8amQUigspCjEG1FJWPjI.png',
    headline: '“The flow became much easier to use.”',
    body: 'She cleaned up the entire user journey and made the product feel significantly more focused, cohesive, and visually delightful.',
    rot: '2deg'
  },
  {
    name: 'Ayesha K.',
    role: 'Creative Director',
    company: 'Arsha Studio',
    avatar: '/assets/VCIQF7ylF9U0o5QZkTgji0mxx28.png',
    headline: '“Sharp design without overcomplicating it.”',
    body: 'The final design looked modern and energetic, but still felt practical. Everything was delivered ready to hand off and ship immediately.',
    rot: '-2deg'
  }
];

export const faqsData: FAQItemData[] = [
  {
    id: 1,
    q: 'What can you design?',
    a: 'I specialize in full-cycle digital experiences: from responsive web design, mobile apps (iOS/Android UI/UX), complete brand identity systems, to production-ready Framer builds and marketing materials.',
    bg: '#fedcdd' // pink
  },
  {
    id: 2,
    q: 'Do you build in Framer?',
    a: 'Yes! I am 100% Framer native. I build websites with CMS collections, responsive layouts, custom interactive components, scroll-linked animations, and SEO optimization ready for instant publishing.',
    bg: '#e0fd72' // lime
  },
  {
    id: 3,
    q: 'How fast can we start?',
    a: 'Usually within 1 to 2 weeks depending on current availability. Once we align on project scope, deliverables, and timeline, we kick off with discovery and initial concept sprints immediately.',
    bg: '#bbdafe' // blue
  },
  {
    id: 4,
    q: 'What do you need from me to begin?',
    a: 'A clear overview of your vision, target audience, core goals, any existing brand guidelines, and reference inspirations you love. I provide a concise onboarding questionnaire to make this seamless.',
    bg: '#f3ea9a' // yellow
  },
  {
    id: 5,
    q: 'Do you only design visuals?',
    a: 'No, design without strategy is just decoration. I dive deep into user flows, product positioning, clarity of value proposition, and conversion strategy to ensure your product performs as great as it looks.',
    bg: '#c7f8d9' // mint
  },
  {
    id: 6,
    q: 'Can you work with our existing engineering team?',
    a: 'Absolutely! I provide clean Figma design tokens, auto-layout components, interactive prototypes, and implementation notes that streamline handoff for React/Next.js/Tailwind developers.',
    bg: '#e2dcfd' // lavender
  }
];
