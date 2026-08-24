import React from 'react';
import styles from './FooterSection.module.css';
import { FiInstagram, FiMail, FiPhone, FiArrowUpRight } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';

export interface FooterSectionProps {
  onOpenContact?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenContact,
}) => {
  return (
    <footer className={styles.footerWrapper} id="contact">
      <div className={styles.landscapeContainer}>
        <div className={styles.topRow}>
          <div className={styles.socialIcons}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              title="Instagram"
              aria-label="Instagram"
            >
              <FiInstagram />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              title="X (Twitter)"
              aria-label="X (Twitter)"
            >
              <FaXTwitter />
            </a>
            <button
              type="button"
              className={styles.socialBtn}
              onClick={onOpenContact}
              title="Email Inquiry"
              aria-label="Email Inquiry"
            >
              <FiMail />
            </button>
            <a
              href="tel:+123456789"
              className={styles.socialBtn}
              title="Phone Call"
              aria-label="Phone Call"
            >
              <FiPhone />
            </a>
          </div>

          <div className={styles.topRightText}>
            — Have an idea?<br />
            Let's turn it into a sharp digital experience.
          </div>
        </div>

        <div className={styles.bottomContent}>
          <div className={`${styles.footerSticker} ${styles.stickerUI}`}>
            <span className={styles.stickerPaperclip} style={{ borderColor: '#ec4899' }} />
            <span>UI/UX Design</span>
          </div>

          <div className={`${styles.footerSticker} ${styles.stickerIll}`}>
            <span className={styles.stickerPaperclip} style={{ borderColor: '#84cc16' }} />
            <span>Illustration</span>
          </div>

          <h2 className={styles.footerHeadline}>
            Let's build<br />something<br />memorable
          </h2>

          <div className={`${styles.footerSticker} ${styles.sticker3D}`}>
            <span className={styles.stickerPaperclip} style={{ borderColor: '#8b5cf6' }} />
            <span>3D Design</span>
          </div>

          <button
            type="button"
            className={styles.chatButton}
            onClick={onOpenContact}
          >
            <span>Let's chat</span>
            <FiArrowUpRight size={18} />
          </button>
        </div>
      </div>

      <nav className={styles.bottomNavigation} aria-label="Footer Navigation">
        <span className={styles.brandLogo}>CREATIE®</span>
        <div className={styles.navLinks}>
          <a href="#about" className={styles.navItem}>About</a>
          <a href="#services" className={styles.navItem}>Services</a>
          <a href="#projects" className={styles.navItem}>Projects</a>
          <a href="#reviews" className={styles.navItem}>Reviews</a>
          <a href="#faqs" className={styles.navItem}>FAQs</a>
          <a
            href="#contact"
            className={styles.navItem}
            onClick={(e) => {
              e.preventDefault();
              if (onOpenContact) onOpenContact();
            }}
          >
            Contact
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default FooterSection;
