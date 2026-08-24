import React from 'react';
import styles from './HeroSection.module.css';
import ProfileCard from '../shared/ProfileCard';
import TitleChip from '../shared/TitleChip';
import StickerDrag from '../shared/StickerDrag';
import GooglyEyes from '../shared/GooglyEyes';
import ProjectCardStack from '../shared/ProjectCardStack';
import WaveButton from '../shared/WaveButton';

export interface HeroSectionProps {
  onStartProject?: () => void;
  onOpenProjectStack?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartProject,
  onOpenProjectStack,
}) => {
  return (
    <section className={styles.heroWrapper} id="hero">
      {/* Draggable Stickers across the viewport matching Framer source data */}
      <StickerDrag
        src="/assets/4FBbf4WZcrn8dK3FlA2Mzd21XSU.png"
        initialX="8%"
        initialY="24%"
        width={72}
        rotation="-12deg"
        alt="Sticker Star"
      />
      <StickerDrag
        src="/assets/cq5QJAT41B3uEalepXxZ1xzIFmU.png"
        initialX="85%"
        initialY="18%"
        width={68}
        rotation="14deg"
        alt="Sticker Retro"
      />
      <StickerDrag
        src="/assets/rSV8scREB8oa33rmCe6aKwYvNA.png"
        initialX="15%"
        initialY="65%"
        width={50}
        rotation="-18deg"
        alt="Sticker Capsule"
      />
      <StickerDrag
        src="/assets/Th3QEx0L91no7qCoJwVGnsQ4A.png"
        initialX="78%"
        initialY="60%"
        width={64}
        rotation="8deg"
        alt="Sticker Heart"
      />
      <StickerDrag
        src="/assets/zLP5ArGJ7hRzp9j67em5xLB9lk.png"
        initialX="88%"
        initialY="36%"
        width={58}
        rotation="-22deg"
        alt="Sticker Badge"
      />
      <StickerDrag
        src="/assets/RwKHVR3FyIMRIxdPMY5G15IYs.png"
        initialX="28%"
        initialY="15%"
        width={52}
        rotation="10deg"
        alt="Sticker Tag"
      />

      {/* Top Navbar */}
      <header className={styles.topNav}>
        <ProfileCard />

        <div className={styles.logo}>Creatie®</div>

        <div className={styles.topRightItems}>
          <GooglyEyes />
          <WaveButton onClick={onStartProject}>
            Start a Project
          </WaveButton>
        </div>
      </header>

      {/* Center Stage Headline with Floating Chips */}
      <div className={styles.centerStage}>
        <div className={styles.chipContainerLeft}>
          <TitleChip
            label="Not just visuals."
            variant="Purple"
            rotation="-10deg"
          />
        </div>

        <div className={styles.chipContainerRight}>
          <TitleChip
            label="i make digital things look alive"
            variant="Pink"
            rotation="6deg"
          />
        </div>

        <h1 className={styles.mainHeading}>
          <span className={styles.headingRow}>Design that</span>
          <span className={styles.headingRow}>makes people</span>
          <span className={styles.headingRow}>look twice</span>
        </h1>

        <div className={styles.chipContainerCenter}>
          <TitleChip
            label="UI/UX & Brand Systems"
            variant="Green"
            rotation="10deg"
          />
        </div>
      </div>

      {/* Bottom Row Info & Project Stack */}
      <footer className={styles.bottomBar}>
        <div className={styles.bottomLeftContent}>
          <p className={styles.subText}>
            I design clean websites, apps, and brand systems that help ideas look sharper, feel trusted, and work with purpose.
          </p>
        </div>

        <div className={styles.bottomRightContent}>
          <ProjectCardStack onClick={onOpenProjectStack} />
        </div>
      </footer>
    </section>
  );
};

export default HeroSection;
