import React from 'react';
import styles from './ReviewCard.module.css';
import { FaStar } from 'react-icons/fa';

export interface ReviewData {
  name: string;
  role: string;
  company: string;
  avatar: string;
  headline: string;
  body: string;
  rot?: string;
}

export interface ReviewCardProps {
  review: ReviewData;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  className = '',
}) => {
  const rotation = review.rot || '0deg';

  return (
    <article
      className={`${styles.reviewCard} ${className}`}
      style={{ transform: `rotate(${rotation})` }}
    >
      <span className={styles.pushpin} />
      <span className={styles.foldedCorner} />

      <div>
        <div className={styles.authorRow}>
          <img
            src={review.avatar}
            alt={review.name}
            className={styles.authorAvatar}
            loading="lazy"
          />
          <div className={styles.authorInfo}>
            <span className={styles.authorName}>{review.name}</span>
            <span className={styles.authorRole}>{review.role}</span>
          </div>
        </div>

        <h4 className={styles.quoteHeadline}>{review.headline}</h4>

        <div className={styles.starRow}>
          <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
        </div>

        <span className={styles.companyName}>✦ {review.company}</span>
      </div>

      <p className={styles.quoteBody}>{review.body}</p>
    </article>
  );
};

export default ReviewCard;
