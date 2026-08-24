import React from 'react';
import styles from './AboutSection.module.css';
import TitleChip from '../shared/TitleChip';
import StatsCard from '../shared/StatsCard';

export interface AboutSectionProps {
  onStartProject?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onStartProject,
}) => {
  return (
    <section className={styles.aboutWrapper} id="about">
      <TitleChip label="About" variant="Blue" rotation="-2.5deg" />

      <h2 className={styles.sectionTitle}>
        I make designs<br />people remember
      </h2>

      <p className={styles.subtitle}>
        I design clean websites, apps, and brand systems that help ideas look sharper, feel trusted, and work with purpose.
      </p>

      <div
        className={styles.startProjectBadge}
        onClick={onStartProject}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (onStartProject) onStartProject();
          }
        }}
      >
        <span className={styles.badgePin} />
        <span>Start a project</span>
      </div>

      <div className={styles.statsGrid}>
        <StatsCard
          number="8+"
          title="Years of Experience"
          description="Designing websites, apps, and digital products with a clear focus on usability and brand distinction."
          rotation="-3.5deg"
        />
        <StatsCard
          number="40+"
          title="Projects Designed"
          description="From high-converting landing pages to mobile apps, and complete interactive Framer web experiences."
          rotation="2deg"
        />
        <StatsCard
          number="12+"
          title="Industries Explored"
          description="Worked across SaaS, fintech, generative AI, creative design studios, and high-growth consumer products."
          rotation="-4deg"
        />
        <StatsCard
          number="100%"
          title="Framer Native"
          description="Responsive, accessible, lightning-fast interactive websites designed, architected, and shipped."
          rotation="3deg"
        />
      </div>
    </section>
  );
};

export default AboutSection;
