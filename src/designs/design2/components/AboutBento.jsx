import styled from 'styled-components';
import { FiMapPin, FiBookOpen, FiArrowUpRight, FiFeather } from 'react-icons/fi';
import profile from '../../../data/profile';

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

const BentoLayout = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  grid-template-rows: auto auto;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const BentoCard = styled.div`
  background: #12141c;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 36px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 640px) {
    padding: 24px;
  }
`;

const MainBioCard = styled(BentoCard)`
  grid-row: span 2;
  gap: 28px;
`;

const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Avatar = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 20px;
  object-fit: cover;
  border: 2px solid rgba(99, 102, 241, 0.5);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Name = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
`;

const Role = styled.p`
  font-size: 14px;
  color: #a5b4fc;
  font-weight: 500;
`;

const Paragraphs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  p {
    font-size: 15px;
    line-height: 1.7;
    color: #94a3b8;
  }
`;

const PhilosophyCard = styled(BentoCard)`
  background: linear-gradient(145deg, #161926 0%, #10121a 100%);
  gap: 16px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #a5b4fc;
  font-size: 14px;
  font-weight: 600;
`;

const CardHeadline = styled.h4`
  font-size: 20px;
  font-weight: 700;
  color: #f1f5f9;
  line-height: 1.35;
`;

const CardBody = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #94a3b8;
`;

const NewsletterCard = styled(BentoCard)`
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%);
  border-color: rgba(99, 102, 241, 0.25);
  gap: 16px;
`;

const StatsPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 100px;
  background: rgba(99, 102, 241, 0.2);
  color: #c7d2fe;
  font-size: 12px;
  font-weight: 600;
  width: fit-content;
`;

const LocationCard = styled(BentoCard)`
  grid-column: span 2;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 900px) {
    grid-column: span 1;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const LocationIconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
`;

const LocationText = styled.div`
  h5 {
    font-size: 16px;
    font-weight: 700;
    color: #f1f5f9;
  }
  p {
    font-size: 13px;
    color: #64748b;
  }
`;

const MapLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #e2e8f0;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.25);
  }
`;

export default function AboutBento() {
  return (
    <SectionWrapper id="about">
      <SectionHeader>
        <SectionPretitle>About & Vision</SectionPretitle>
        <SectionTitle>Behind the Lens & Process</SectionTitle>
      </SectionHeader>

      <BentoLayout>
        <MainBioCard>
          <ProfileRow>
            <Avatar src={profile.avatar} alt={profile.name} />
            <ProfileDetails>
              <Name>{profile.name}</Name>
              <Role>{profile.position} & Creative Director</Role>
            </ProfileDetails>
          </ProfileRow>

          <Paragraphs>
            {profile.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Paragraphs>
        </MainBioCard>

        <PhilosophyCard>
          <CardHeader>
            <FiFeather /> Creative Philosophy
          </CardHeader>
          <CardHeadline>
            "Great design is strategically grounded and culturally aware."
          </CardHeadline>
          <CardBody>
            Blending bold typography, thoughtful color systems, and contemporary minimalism to craft stories that resonate deeply and stand the test of time.
          </CardBody>
        </PhilosophyCard>

        <NewsletterCard>
          <CardHeader>
            <FiBookOpen /> Publication
          </CardHeader>
          <StatsPill>8,500+ Weekly Readers</StatsPill>
          <CardHeadline>Grid & Grit Newsletter</CardHeadline>
          <CardBody>
            A weekly exploration into typography, color systems, and modern design theory read by creatives across Apple, Google, and Airbnb.
          </CardBody>
        </NewsletterCard>

        <LocationCard>
          <LocationInfo>
            <LocationIconBox>
              <FiMapPin />
            </LocationIconBox>
            <LocationText>
              <h5>Currently Working from {profile.location.name}</h5>
              <p>Lat: {profile.location.lat}, Lng: {profile.location.lng} · Available Worldwide</p>
            </LocationText>
          </LocationInfo>

          <MapLink
            href={profile.location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps <FiArrowUpRight />
          </MapLink>
        </LocationCard>
      </BentoLayout>
    </SectionWrapper>
  );
}
