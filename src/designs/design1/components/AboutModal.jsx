import styled from 'styled-components';
import MacWindow from './MacWindow';
import profile from '../../../data/profile';

const Content = styled.div`
  padding: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 24px;
`;

const ProfileSection = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
`;

const Avatar = styled.img`
  width: 120px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  flex: 1;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e8e8e8;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: 70px;
`;

const InfoValue = styled.span`
  font-size: 14px;
  color: #666;
`;

const EmailLink = styled.a`
  font-size: 14px;
  color: #007AFF;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const BioSection = styled.div`
  background: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
`;

const BioText = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: #333;
  margin-bottom: 14px;
  &:last-child { margin-bottom: 0; }
`;

const LocationTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const OpenMapsLink = styled.a`
  position: absolute;
  top: 10px;
  left: 10px;
  background: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  color: #007AFF;
  text-decoration: none;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
  z-index: 5;
  &:hover { background: #f0f0f0; }
`;

export default function AboutModal({ onClose }) {
  return (
    <MacWindow title="" width="440px" onClose={onClose}>
      <Content>
        <SectionTitle>About me</SectionTitle>
        <ProfileSection>
          <Avatar src={profile.avatar} alt={profile.name} />
          <InfoList>
            <InfoRow>
              <InfoLabel>NAME</InfoLabel>
              <InfoValue>{profile.name}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>POSITION</InfoLabel>
              <InfoValue>{profile.position}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>MAIL</InfoLabel>
              <EmailLink href={'mailto:' + profile.email}>{profile.email}</EmailLink>
            </InfoRow>
          </InfoList>
        </ProfileSection>
        <BioSection>
          {profile.bio.map((p, i) => (
            <BioText key={i}>{p}</BioText>
          ))}
        </BioSection>
        <LocationTitle>Location</LocationTitle>
        <MapContainer>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96784.03694974428!2d-73.9442!3d40.6782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25bae694479a3%3A0xb9949385da52e69e!2sBrooklyn%2C%20NY!5e0!3m2!1sen!2sus!4v1"
            allowFullScreen=""
            loading="lazy"
            title="Location Map"
          />
          <OpenMapsLink href={profile.location.mapUrl} target="_blank" rel="noopener noreferrer">
            Open in Maps ↗
          </OpenMapsLink>
        </MapContainer>
      </Content>
    </MacWindow>
  );
}
