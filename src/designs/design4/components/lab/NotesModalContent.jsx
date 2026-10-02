import React, { useState } from 'react';
import styled from 'styled-components';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/* ─── MACOS NOTES DESIGN (PORTED FROM DESIGN 1 DES3) ─── */
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const NotesLayout = styled.div`
  display: flex;
  height: 480px;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Inter',
    sans-serif;
  color: #1a1a1a;
  user-select: text;
`;

const Sidebar = styled.div`
  width: 230px;
  border-right: 1px solid #d5d5d5;
  background: #f0f0f0;
  overflow-y: auto;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`;

const NoteItem = styled.div`
  padding: 14px 16px;
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;
  transition: background 0.15s ease;
  background: ${props => (props.$active ? '#fef3c7' : 'transparent')};
  border-left: ${props => (props.$active ? '3px solid #f59e0b' : '3px solid transparent')};

  &:hover {
    background: ${props => (props.$active ? '#fef3c7' : '#e8e8e8')};
  }
`;

const NoteTitle = styled.p`
  font-size: 13.5px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 3px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoteMeta = styled.p`
  font-size: 12px;
  color: #888888;
  margin: 0;
  display: flex;
  align-items: center;
`;

const NotePreview = styled.span`
  color: #999999;
  margin-left: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 30px 36px;
  background: #fefefe;
`;

const DateHeader = styled.p`
  font-size: 12px;
  color: #999999;
  text-align: center;
  margin: 0 0 22px 0;
  font-weight: 500;
`;

const ContentTitle = styled.h2`
  font-size: 26px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 16px 0;
  letter-spacing: -0.02em;
`;

const ContactPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 20px;
`;

const AboutText = styled.p`
  font-size: 14.5px;
  line-height: 1.75;
  color: #374151;
  white-space: pre-line;
  margin: 0 0 20px 0;
`;

const TechStackCard = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 16px 18px;
  font-size: 13.5px;
  line-height: 1.65;
  color: #374151;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);

  strong {
    color: #111827;
    font-weight: 700;
  }
`;

const ExperienceBlock = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const RoleHeader = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
`;

const CompanyLine = styled.p`
  font-size: 13.5px;
  color: #6b7280;
  margin: 0 0 10px 0;
  font-weight: 500;
`;

const BulletList = styled.ul`
  padding-left: 20px;
  margin: 0 0 8px 0;
`;

const BulletItem = styled.li`
  font-size: 13.5px;
  color: #4b5563;
  line-height: 1.65;
  margin-bottom: 5px;

  &::marker {
    color: #f59e0b;
  }
`;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/* ─── NOTES DATA (ACCURATE DAT LE PORTFOLIO CONTENT) ─── */
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const NOTES_LIST = [
  {
    id: 'about',
    title: '01. About Dat Le',
    date: 'Today, 3:15 PM',
    fullDate: 'Today at 3:15 PM',
    preview: 'Engineering logic & craftsmanship',
  },
  {
    id: 'architecture',
    title: '02. Core Architecture',
    date: 'Today, 11:20 AM',
    fullDate: 'Today at 11:20 AM',
    preview: 'React 19, Spring Boot, AI',
  },
  {
    id: 'experience',
    title: '03. Education & Milestones',
    date: '2022 – Pres',
    fullDate: 'September 9, 2026 at 9:00 AM',
    preview: 'FPT University • Software Engineering',
  },
];

export default function NotesModalContent() {
  const [activeNote, setActiveNote] = useState('about');
  const currentNote = NOTES_LIST.find((n) => n.id === activeNote) || NOTES_LIST[0];

  const renderContent = () => {
    if (activeNote === 'about') {
      return (
        <>
          <ContentTitle>Lê Văn Đạt (Dat Le)</ContentTitle>
          <ContactPill>
            <span>📍 Da Nang, Vietnam</span>
            <span>•</span>
            <span>✉️ lvd27012004@gmail.com</span>
          </ContactPill>
          <AboutText>
            Full-stack Developer & Technical Artisan exploring the intersection between robust
            distributed systems, brutalist aesthetics, and seamless user experiences. Specializing
            in high-performance web applications, modern React architecture, and clean decoupled
            services.
          </AboutText>
          <TechStackCard>
            <strong>Technical Stack:</strong> React, TypeScript, Spring Boot, Java, Vite, Tailwind CSS,
            Docker, PostgreSQL, MySQL, Redis, AI Inference Pipelines.
          </TechStackCard>
        </>
      );
    }

    if (activeNote === 'architecture') {
      return (
        <>
          <ContentTitle>Core Architecture & Engineering Logic</ContentTitle>
          <ExperienceBlock>
            <RoleHeader>01. Frontend Systems & Reactive UI</RoleHeader>
            <CompanyLine>React 19 • TypeScript • Vite • Three.js</CompanyLine>
            <BulletList>
              <BulletItem>
                Component-driven architecture with clean separation of concerns and reusable custom hooks.
              </BulletItem>
              <BulletItem>
                High-performance WebGL 3D graphics & shader integration using React Three Fiber and Three.js.
              </BulletItem>
              <BulletItem>
                Silk-smooth 60fps micro-interactions powered by Framer Motion, GSAP, and styled-components.
              </BulletItem>
            </BulletList>
          </ExperienceBlock>

          <ExperienceBlock>
            <RoleHeader>02. Distributed Backend Architecture</RoleHeader>
            <CompanyLine>Spring Boot • Java 21 • Microservices • Redis</CompanyLine>
            <BulletList>
              <BulletItem>
                Enterprise RESTful services designed with Spring Boot, Spring Security, and stateless JWT auth.
              </BulletItem>
              <BulletItem>
                Relational schema design with PostgreSQL & MySQL, optimized with Redis in-memory caching.
              </BulletItem>
              <BulletItem>
                Decoupled domain-driven logic and robust error-handling pipelines.
              </BulletItem>
            </BulletList>
          </ExperienceBlock>

          <ExperienceBlock>
            <RoleHeader>03. Modern DevOps & AI Workflow</RoleHeader>
            <CompanyLine>Docker • CI/CD GitHub Actions • AI Pipelines</CompanyLine>
            <BulletList>
              <BulletItem>
                Multi-stage Docker builds ensuring lean, reproducible production deployments.
              </BulletItem>
              <BulletItem>
                Automated CI/CD workflows for testing, linting, and continuous delivery.
              </BulletItem>
              <BulletItem>
                Integration of LLMs and agentic AI tools into daily software development workflows.
              </BulletItem>
            </BulletList>
          </ExperienceBlock>
        </>
      );
    }

    if (activeNote === 'experience') {
      return (
        <>
          <ContentTitle>Education & Background</ContentTitle>
          <ExperienceBlock>
            <RoleHeader>Software Engineering Student</RoleHeader>
            <CompanyLine>FPT University, Da Nang • 2022 – Present</CompanyLine>
            <BulletList>
              <BulletItem>
                Specialization in Software Engineering, full-stack systems, algorithm design, and cloud architecture.
              </BulletItem>
              <BulletItem>
                Built real-world applications including Dev Roadmap Tracking, IELTS Writing platform, and IoT Smart Recycle systems.
              </BulletItem>
            </BulletList>
          </ExperienceBlock>

          <ExperienceBlock>
            <RoleHeader>High School Student</RoleHeader>
            <CompanyLine>Phan Chau Trinh High School, Da Nang • 2020 – 2022</CompanyLine>
            <BulletList>
              <BulletItem>
                Solid foundation in Mathematics, Information Technology, and creative digital problem solving.
              </BulletItem>
            </BulletList>
          </ExperienceBlock>
        </>
      );
    }

    return null;
  };

  return (
    <NotesLayout>
      <Sidebar>
        {NOTES_LIST.map((note) => (
          <NoteItem
            key={note.id}
            $active={activeNote === note.id}
            onClick={() => setActiveNote(note.id)}
          >
            <NoteTitle>{note.title}</NoteTitle>
            <NoteMeta>
              <span>{note.date}</span>
              <NotePreview>{note.preview}</NotePreview>
            </NoteMeta>
          </NoteItem>
        ))}
      </Sidebar>

      <ContentArea>
        <DateHeader>{currentNote?.fullDate}</DateHeader>
        {renderContent()}
      </ContentArea>
    </NotesLayout>
  );
}
