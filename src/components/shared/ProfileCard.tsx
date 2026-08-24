import React, { useState } from 'react';
import styles from './ProfileCard.module.css';

export interface ProfileCardProps {
  avatarUrl?: string;
  name?: string;
  role?: string;
  status?: string;
  bio?: string;
  tags?: string[];
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl = '/assets/avatar.png',
  name = 'Dat Lee',
  role = 'Product & Brand Designer',
  status = 'Available for work',
  bio = 'Crafting bold visual identities, intuitive UI/UX systems & responsive Framer builds.',
  tags = ['UI/UX', 'Framer', 'Branding', 'Motion'],
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`${styles.profileCardWrapper} ${className}`}>
      <div
        className={`${styles.profileCard} ${isExpanded ? styles.expanded : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <div className={styles.headerRow}>
          <img src={avatarUrl} alt={name} className={styles.avatar} />
          <div className={styles.infoColumn}>
            <div className={styles.nameRow}>
              <span className={styles.nameText}>{name}</span>
              <span className={styles.statusDot} />
            </div>
            <span className={styles.statusText}>{status}</span>
          </div>
        </div>

        {isExpanded && (
          <div className={styles.expandDetails}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>
              {role}
            </div>
            <p className={styles.bioText}>{bio}</p>
            <div className={styles.badgeRow}>
              {tags.map((tag, i) => (
                <span key={i} className={styles.badge}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
