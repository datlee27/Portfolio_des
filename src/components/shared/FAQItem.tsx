import React from 'react';
import styles from './FAQItem.module.css';
import { FiX, FiPlus } from 'react-icons/fi';

export interface FAQItemData {
  id: number | string;
  q: string;
  a: string;
  bg?: string;
}

export interface FAQItemProps {
  faq: FAQItemData;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export const FAQItem: React.FC<FAQItemProps> = ({
  faq,
  isOpen,
  onToggle,
  className = '',
}) => {
  const bg = faq.bg || '#fedcdd';

  return (
    <div
      className={`${styles.faqCard} ${isOpen ? styles.expanded : ''} ${className}`}
      style={{ backgroundColor: bg }}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.question}>{faq.q}</h3>
        <div className={styles.toggleIcon}>
          {isOpen ? <FiX /> : <FiPlus />}
        </div>
      </div>

      {isOpen && (
        <p className={styles.answerText}>{faq.a}</p>
      )}
    </div>
  );
};

export default FAQItem;
