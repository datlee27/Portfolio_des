import { useState } from 'react';
import styled from 'styled-components';
import { FiPaperclip, FiPlus, FiMinus } from 'react-icons/fi';

const SectionWrapper = styled.section`
  position: relative;
  background-color: #f5f3ea;
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  padding: 80px 24px 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 16px 80px;
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
  margin-bottom: 60px;
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 820px;
`;

const FAQCard = styled.div`
  background: ${props => props.$bg || '#fedcdd'};
  border-radius: 18px;
  padding: 20px 26px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.09);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
`;

const Question = styled.h3`
  font-size: 18px;
  font-weight: 800;
  color: #1f2937;
  letter-spacing: -0.01em;
`;

const ToggleIcon = styled.div`
  font-size: 18px;
  color: #1f2937;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Answer = styled.div`
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  text-align: left;

  p {
    font-size: 15px;
    line-height: 1.6;
    color: #374151;
  }
`;

const faqs = [
  {
    id: 1,
    q: 'What can you design?',
    a: 'I specialize in full-cycle digital experiences: from responsive web design, mobile apps (iOS/Android UI/UX), complete brand identity systems, to production-ready Framer builds and marketing materials.',
    bg: '#fedcdd' // pink
  },
  {
    id: 2,
    q: 'Do you build in framer?',
    a: 'Yes! I am 100% Framer native. I build websites with CMS, responsive layouts, custom interactive components, scroll-linked animations, and SEO optimization ready for instant publishing.',
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
    q: 'What do you need from me?',
    a: 'A clear overview of your vision, target audience, core goals, any existing brand guidelines, and reference inspirations you love. I provide a concise onboarding questionnaire to make this seamless.',
    bg: '#f3ea9a' // yellow
  },
  {
    id: 5,
    q: 'Do you only design visuals?',
    a: 'No, design without strategy is just decoration. I dive deep into user flows, product positioning, clarity of value proposition, and conversion strategy to ensure your product performs as great as it looks.',
    bg: '#c7f8d9' // mint
  }
];

export default function FAQSection() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <SectionWrapper id="faqs">
      <SectionTag>
        <FiPaperclip />
        <span>FAQs</span>
      </SectionTag>

      <SectionTitle>
        Answer before<br />we starts
      </SectionTitle>

      <FAQList>
        {faqs.map((f) => {
          const isOpen = openId === f.id;
          return (
            <FAQCard key={f.id} $bg={f.bg} onClick={() => toggle(f.id)}>
              <CardHeader>
                <Question>{f.q}</Question>
                <ToggleIcon>
                  {isOpen ? <FiMinus /> : <FiPlus />}
                </ToggleIcon>
              </CardHeader>

              {isOpen && (
                <Answer>
                  <p>{f.a}</p>
                </Answer>
              )}
            </FAQCard>
          );
        })}
      </FAQList>
    </SectionWrapper>
  );
}
