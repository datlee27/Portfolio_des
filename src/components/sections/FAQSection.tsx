import React, { useState } from 'react';
import styles from './FAQSection.module.css';
import TitleChip from '../shared/TitleChip';
import FAQItem, { FAQItemData } from '../shared/FAQItem';
import { faqsData } from '../../data/homeData';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | string | null>(null);

  const toggleOpen = (id: number | string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={styles.faqWrapper} id="faqs">
      <TitleChip label="FAQs" variant="Blue" rotation="-2deg" />

      <h2 className={styles.sectionTitle}>
        Answer Before<br />We Starts
      </h2>

      <div className={styles.faqList}>
        {faqsData.map((faq: FAQItemData) => (
          <FAQItem
            key={faq.id}
            faq={faq}
            isOpen={openId === faq.id}
            onToggle={() => toggleOpen(faq.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
