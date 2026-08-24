import React from 'react';
import styles from './ReviewsSection.module.css';
import TitleChip from '../shared/TitleChip';
import ReviewCard, { ReviewData } from '../shared/ReviewCard';
import { reviewsData } from '../../data/homeData';

export const ReviewsSection: React.FC = () => {
  return (
    <section className={styles.reviewsWrapper} id="reviews">
      <TitleChip label="Reviews" variant="Blue" rotation="-2deg" />

      <h2 className={styles.sectionTitle}>
        Clients liked<br />the pixels
      </h2>

      <div className={styles.reviewsGrid}>
        {reviewsData.map((review: ReviewData, i: number) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
