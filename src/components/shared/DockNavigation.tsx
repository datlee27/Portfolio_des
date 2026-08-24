import React from 'react';
import styles from './DockNavigation.module.css';

export interface DockNavigationProps {
  onOpenNotes?: () => void;
  onOpenPhotos?: () => void;
  onOpenFinder?: () => void;
  onOpenMail?: () => void;
  className?: string;
}

export const DockNavigation: React.FC<DockNavigationProps> = ({
  onOpenNotes,
  onOpenPhotos,
  onOpenFinder,
  onOpenMail,
  className = '',
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`${styles.dockContainer} ${className}`}
      aria-label="Floating macOS Dock Navigation"
    >
      <button
        type="button"
        className={styles.dockIcon}
        onClick={() => (onOpenNotes ? onOpenNotes() : scrollTo('about'))}
        title="Notes / About"
        aria-label="Notes / About"
      >
        <span className={styles.tooltip}>Notes</span>
        <img
          src="/assets/ZAH3C8amQUigspCjEG1FJWPjI.png"
          alt="Notes"
          loading="lazy"
        />
      </button>

      <button
        type="button"
        className={styles.dockIcon}
        onClick={() => (onOpenPhotos ? onOpenPhotos() : scrollTo('projects'))}
        title="Photos / Projects"
        aria-label="Photos / Projects"
      >
        <span className={styles.tooltip}>Photos</span>
        <img
          src="/assets/VCIQF7ylF9U0o5QZkTgji0mxx28.png"
          alt="Photos"
          loading="lazy"
        />
      </button>

      <button
        type="button"
        className={styles.dockIcon}
        onClick={() => (onOpenFinder ? onOpenFinder() : scrollTo('services'))}
        title="Finder / Services"
        aria-label="Finder / Services"
      >
        <span className={styles.tooltip}>Finder</span>
        <img
          src="/assets/jC3NYM1gkKdVNzokU0ojtj01asg.png"
          alt="Finder"
          loading="lazy"
        />
      </button>

      <button
        type="button"
        className={styles.dockIcon}
        onClick={() => (onOpenMail ? onOpenMail() : scrollTo('contact'))}
        title="Mail / Contact"
        aria-label="Mail / Contact"
      >
        <span className={styles.tooltip}>Mail</span>
        <img
          src="/assets/EVSY45U60gTa9UjvovzPTZx7Hw.png"
          alt="Mail"
          loading="lazy"
        />
      </button>
    </nav>
  );
};

export default DockNavigation;
