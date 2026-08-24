import { useState } from 'react';
import styled from 'styled-components';
import { FiPaperclip, FiLayout, FiMousePointer, FiBox, FiCpu, FiCompass, FiMinus } from 'react-icons/fi';

const SectionWrapper = styled.section`
  position: relative;
  background-color: #f5f3ea;
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  padding: 100px 24px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 16px 60px;
  }
`;

const SectionTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border-radius: 12px;
  background: #bbdafe;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  transform: rotate(-2deg);
  margin-bottom: 24px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    right: 14px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #000000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  span {
    font-size: 15px;
    font-weight: 800;
    color: #1e3a8a;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(38px, 6vw, 68px);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #252525;
  text-transform: uppercase;
  max-width: 800px;
  line-height: 1.05;
  margin-bottom: 50px;
`;

const ServicesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 860px;
`;

const ServiceCard = styled.div`
  background: ${props => props.$bg || '#fedcdd'};
  border-radius: 20px;
  padding: 22px 28px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-3px) scale(1.01);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 640px) {
    padding: 18px 20px;
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ServiceTitle = styled.h3`
  font-size: 22px;
  font-weight: 800;
  color: #1f2937;
  letter-spacing: -0.02em;
`;

const IconCircle = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #1f2937;
`;

const ExpandedContent = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;

  p {
    font-size: 15px;
    line-height: 1.6;
    color: #374151;
  }
`;

const services = [
  {
    id: 'web',
    title: 'Website Design',
    bg: '#fedcdd', // pink
    icon: <FiLayout />,
    desc: 'High-converting, visually distinct digital web presences tailored for SaaS, e-commerce, design agencies, and creative founders.'
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    bg: '#bbdafe', // blue
    icon: <FiMousePointer />,
    desc: 'User-centered interfaces, accessible design systems, intuitive wireframing, and interactive prototypes built for rapid scalability.'
  },
  {
    id: 'brand',
    title: 'Brand Identity',
    bg: '#f3ea9a', // yellow
    icon: <FiBox />,
    desc: 'Comprehensive visual systems including logos, bold color theory, bespoke typography pairings, packaging, and brand guidelines.'
  },
  {
    id: 'framer',
    title: 'Framer Builds',
    bg: '#c7f8d9', // mint green
    icon: <FiCompass />,
    desc: 'Pixel-perfect, lightning fast interactive Framer websites with custom micro-animations, CMS architecture, and responsive breakpoints.'
  },
  {
    id: 'ai',
    title: 'AI Exploration',
    bg: '#e2dcfd', // lavender
    icon: <FiCpu />,
    desc: 'Cutting-edge creative direction leveraging generative AI tools, prompt engineering, custom imagery, and procedural visual workflows.'
  }
];

export default function ServicesSection() {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <SectionWrapper id="services">
      <SectionTag>
        <FiPaperclip />
        <span>Services</span>
      </SectionTag>

      <SectionTitle>
        Where I<br />can help you
      </SectionTitle>

      <ServicesList>
        {services.map((item) => {
          const isExp = expanded === item.id;
          return (
            <ServiceCard
              key={item.id}
              $bg={item.bg}
              onClick={() => toggleExpand(item.id)}
            >
              <CardTop>
                <ServiceTitle>{item.title}</ServiceTitle>
                <IconCircle>
                  {isExp ? <FiMinus /> : item.icon}
                </IconCircle>
              </CardTop>

              {isExp && (
                <ExpandedContent>
                  <p>{item.desc}</p>
                </ExpandedContent>
              )}
            </ServiceCard>
          );
        })}
      </ServicesList>
    </SectionWrapper>
  );
}
