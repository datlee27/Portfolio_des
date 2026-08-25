import React, { useState } from 'react';
import styles from './FAQSection.module.css';
import TitleChip from '../shared/TitleChip';
import FAQItem, { FAQItemData } from '../shared/FAQItem';
import { faqsData } from '../../data/homeData';

const pillPositions = [
  styles.pill1,
  styles.pill2,
  styles.pill3,
  styles.pill4,
  styles.pill5,
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | string | null>(null);

  const toggleOpen = (id: number | string) => {
    setOpenId(openId === id ? null : id);
  };

  /* We only place the first 5 in the scatter layout
     (the 6th one would crowd the layout; drop it or add if needed). */
  const visibleFaqs = faqsData.slice(0, 5);

  return (
    <section className={styles.faqWrapper} id="faqs">
      <div className={styles.faqScatter}>
        {/* Center title block */}
        <div className={styles.titleBlock}>
          <TitleChip label="FAQs" variant="Blue" rotation="-2deg" />
          <h2 className={styles.sectionTitle}>
            Answer Before<br />We Starts
          </h2>
        </div>

        {/* Floating FAQ pills */}
        {visibleFaqs.map((faq: FAQItemData, i: number) => (
          <div
            key={faq.id}
            className={`${styles.faqPill} ${pillPositions[i] || ''}`}
          >
            <FAQItem
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => toggleOpen(faq.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
