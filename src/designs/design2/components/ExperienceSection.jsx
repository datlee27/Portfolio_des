import styled from 'styled-components';
import { FiBriefcase, FiCheckCircle } from 'react-icons/fi';
import notes from '../../../data/experience';

const SectionWrapper = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 60px 24px;

  @media (max-width: 768px) {
    padding: 40px 16px;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 36px;
`;

const SectionPretitle = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #6366f1;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 800;
  color: #f8fafc;
  letter-spacing: -0.02em;
  margin-top: 6px;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ExperienceCard = styled.div`
  background: #12141c;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 32px;
  transition: all 0.25s ease;

  &:hover {
    border-color: rgba(99, 102, 241, 0.35);
    background: #151824;
    transform: translateY(-2px);
  }

  @media (max-width: 640px) {
    padding: 22px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const RoleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const RoleTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #f1f5f9;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CompanyName = styled.span`
  font-size: 15px;
  color: #94a3b8;
  font-weight: 500;
`;

const PeriodBadge = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
  white-space: nowrap;
`;

const BulletList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 14px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

const BulletItem = styled.li`
  font-size: 14px;
  line-height: 1.6;
  color: #94a3b8;
  display: flex;
  align-items: flex-start;
  gap: 10px;

  svg {
    color: #6366f1;
    margin-top: 4px;
    flex-shrink: 0;
    font-size: 14px;
  }
`;

export default function ExperienceSection() {
  const expData = notes.find((n) => n.id === 'experience');

  if (!expData || !Array.isArray(expData.content)) return null;

  return (
    <SectionWrapper id="experience">
      <SectionHeader>
        <SectionPretitle>Career Journey</SectionPretitle>
        <SectionTitle>Work Experience & Leadership</SectionTitle>
      </SectionHeader>

      <Timeline>
        {expData.content.map((item, index) => (
          <ExperienceCard key={index}>
            <CardHeader>
              <RoleInfo>
                <RoleTitle>
                  <FiBriefcase style={{ color: '#818cf8' }} /> {item.role}
                </RoleTitle>
                <CompanyName>{item.company}</CompanyName>
              </RoleInfo>
              <PeriodBadge>{item.period}</PeriodBadge>
            </CardHeader>

            <BulletList>
              {item.bullets.map((bullet, bIndex) => (
                <BulletItem key={bIndex}>
                  <FiCheckCircle />
                  <span>{bullet}</span>
                </BulletItem>
              ))}
            </BulletList>
          </ExperienceCard>
        ))}
      </Timeline>
    </SectionWrapper>
  );
}
