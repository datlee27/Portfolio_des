import React, { useState, useEffect, useRef } from 'react';
import styles from './ProfileCard.module.css';

export interface ProfileCardProps {
  avatarUrl?: string;
  name?: string;
  role?: string;
  status?: string;
  bio?: string;
  skills?: string;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl = '/assets/avatar.png',
  name = 'DATLE - PRODUCT DESIGNER',
  role = 'Product Designer',
  status = 'Available for work',
  bio = 'I design clean websites, landing pages, and product interfaces that look sharper, feel clearer, and convert better.',
  skills = 'UI/UX Design · Framer · Web Design',
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getPupilOffset = () => {
    if (!cardRef.current) return { x: 0, y: 0 };
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (mousePos.x - cx) / rect.width;
    const dy = (mousePos.y - cy) / rect.height;
    return {
      x: Math.max(-1, Math.min(1, dx)) * 6,
      y: Math.max(-1, Math.min(1, dy)) * 6,
    };
  };

  const pupil = getPupilOffset();
  const pupilStyle = { transform: `translate(${pupil.x}px, ${pupil.y}px)` };

  return (
    <div
      className={`${styles.profileCardWrapper} ${className}`}
      ref={cardRef}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={`${styles.profileCard} ${isExpanded ? styles.expanded : ''}`}>
        {/* Top row: avatar + info (collapsed) OR avatar + eyes (expanded) */}
        <div className={styles.topRow}>
          <div className={styles.leftGroup}>
            <img
              src={avatarUrl}
              alt={role}
              className={`${styles.avatar} ${isExpanded ? styles.avatarExpanded : ''}`}
              onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatar-cap.png'; }}
            />
            {!isExpanded && (
              <div className={styles.badgeInfo}>
                <span className={styles.statusLine}>
                  <span className={styles.statusDot} />
                  {status}
                </span>
                <span className={styles.designerName}>{name}</span>
              </div>
            )}
          </div>

          {/* Googly Eyes (visible on expand) */}
          <div className={`${styles.eyesBox} ${isExpanded ? styles.eyesVisible : ''}`}>
            <div className={styles.eye}>
              <div className={styles.pupil} style={pupilStyle} />
            </div>
            <div className={styles.eye}>
              <div className={styles.pupil} style={pupilStyle} />
            </div>
          </div>
        </div>

        {/* Expanded body */}
        <div className={`${styles.expandedBody} ${isExpanded ? styles.expandedBodyVisible : ''}`}>
          <div className={styles.badgeInfo}>
            <span className={styles.statusLine}>
              <span className={styles.statusDot} />
              {status}
            </span>
            <span className={styles.designerName}>{name}</span>
          </div>
          <p className={styles.bioText}>{bio}</p>
          <span className={styles.skillsText}>{skills}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
