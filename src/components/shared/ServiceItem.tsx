import React from 'react';
import styles from './ServiceItem.module.css';
import { FiMinus, FiPlus } from 'react-icons/fi';

export interface ServiceItemData {
  id: string;
  title: string;
  bg: string;
  icon: React.ReactNode;
  description: string;
}

export interface ServiceItemProps {
  service: ServiceItemData;
  isExpanded: boolean;
  onToggle: () => void;
  className?: string;
}

export const ServiceItem: React.FC<ServiceItemProps> = ({
  service,
  isExpanded,
  onToggle,
  className = '',
}) => {
  return (
    <div
      className={`${styles.serviceCard} ${className}`}
      style={{ backgroundColor: service.bg }}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <div className={styles.cardTop}>
        <h3 className={styles.serviceTitle}>{service.title}</h3>
        <div className={styles.iconCircle}>
          {isExpanded ? <FiMinus /> : service.icon || <FiPlus />}
        </div>
      </div>

      {isExpanded && (
        <div className={styles.expandedContent}>
          <p className={styles.serviceDescription}>{service.description}</p>
        </div>
      )}
    </div>
  );
};

export default ServiceItem;
