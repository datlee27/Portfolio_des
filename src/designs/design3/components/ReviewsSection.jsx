import styled from 'styled-components';
import { FiPaperclip } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

const SectionWrapper = styled.section`
  position: relative;
  background-color: #f5f3ea;
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  padding: 80px 24px 100px;
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
  margin-bottom: 60px;
`;

const ReviewsRow = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 28px;
  width: 100%;
  max-width: 1240px;
  flex-wrap: wrap;
`;

const ReviewCard = styled.div`
  position: relative;
  flex: 1;
  min-width: 280px;
  max-width: 360px;
  background: #ffffff;
  border-radius: 20px;
  padding: 36px 28px 36px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.07), 0 2px 6px rgba(0, 0, 0, 0.04);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
  overflow: hidden;

  --rot: ${props => props.$rot || '0deg'};
  transform: rotate(var(--rot));

  /* Red pin at top-left */
  &::before {
    content: '';
    position: absolute;
    top: 14px;
    left: 16px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ef4444;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    z-index: 5;
  }

  /* Orange folded triangle corner at bottom-right */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 42px;
    height: 42px;
    background: #f97316;
    clip-path: polygon(100% 0, 0 100%, 100% 100%);
  }

  &:hover {
    transform: translateY(-8px) scale(1.04) rotate(0deg);
    box-shadow: 0 24px 50px rgba(0, 0, 0, 0.12);
    z-index: 10;
  }
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const AuthorAvatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-size: 15px;
  font-weight: 800;
  color: #111827;
`;

const AuthorRole = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

const QuoteHeadline = styled.h4`
  font-size: 19px;
  font-weight: 800;
  color: #1f2937;
  line-height: 1.3;
  margin-bottom: 16px;
`;

const StarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #fbbf24;
  font-size: 15px;
  margin-bottom: 12px;
`;

const CompanyName = styled.span`
  font-size: 12.5px;
  font-weight: 800;
  color: #4b5563;
  margin-bottom: 14px;
  display: block;
`;

const QuoteBody = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #4b5563;
`;

const reviews = [
  {
    name: 'Sarah M.',
    role: 'Founder',
    company: 'Fitas',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    headline: '“The website finally feels like our brand.”',
    body: 'She turned our idea into a polished website that felt premium, intuitive, and remarkably easy to understand.',
    rot: '-2.5deg'
  },
  {
    name: 'Daniel R.',
    role: 'Product Lead',
    company: 'Bond',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    headline: '“The flow became much easier to use.”',
    body: 'She cleaned up the entire user journey, and made the product feel significantly more focused, cohesive, and professional.',
    rot: '2deg'
  },
  {
    name: 'Ayesha K.',
    role: 'Creative Director',
    company: 'Arsha',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
    headline: '“Sharp design without overcomplicating it.”',
    body: 'The final design looked modern and energetic, but still felt practical. Everything was delivered ready to hand off and ship.',
    rot: '-2deg'
  }
];

export default function ReviewsSection() {
  return (
    <SectionWrapper id="reviews">
      <SectionTag>
        <FiPaperclip />
        <span>Reviews</span>
      </SectionTag>

      <SectionTitle>
        Clients liked<br />the pixels
      </SectionTitle>

      <ReviewsRow>
        {reviews.map((r, index) => (
          <ReviewCard key={index} $rot={r.rot}>
            <div>
              <AuthorRow>
                <AuthorAvatar src={r.avatar} alt={r.name} />
                <AuthorInfo>
                  <AuthorName>{r.name}</AuthorName>
                  <AuthorRole>{r.role}</AuthorRole>
                </AuthorInfo>
              </AuthorRow>

              <QuoteHeadline>{r.headline}</QuoteHeadline>
              <StarRow>
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </StarRow>
              <CompanyName>✦ {r.company}</CompanyName>
            </div>

            <QuoteBody>{r.body}</QuoteBody>
          </ReviewCard>
        ))}
      </ReviewsRow>
    </SectionWrapper>
  );
}
