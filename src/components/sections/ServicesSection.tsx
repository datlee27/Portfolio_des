import React, { useState } from 'react';
import styles from './ServicesSection.module.css';
import TitleChip from '../shared/TitleChip';
import ServiceItem, { ServiceItemData } from '../shared/ServiceItem';
import { servicesData } from '../../data/homeData';
import { FiLayout, FiMousePointer, FiBox, FiCompass, FiCpu } from 'react-icons/fi';

const iconMap: Record<string, React.ReactNode> = {
  web: <FiLayout />,
  uiux: <FiMousePointer />,
  brand: <FiBox />,
  framer: <FiCompass />,
  ai: <FiCpu />,
};

export const ServicesSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className={styles.servicesWrapper} id="services">
      <TitleChip label="Services" variant="Blue" rotation="-2deg" />

      <h2 className={styles.sectionTitle}>
        Where I<br />can help you
      </h2>

      <div className={styles.servicesList}>
        {servicesData.map((item: ServiceItemData) => (
          <ServiceItem
            key={item.id}
            service={{
              ...item,
              icon: iconMap[item.id] || null,
            }}
            isExpanded={expandedId === item.id}
            onToggle={() => toggleExpand(item.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
