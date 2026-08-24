import React, { useState, useEffect } from 'react';
import styles from './ContactPopup.module.css';
import { FiSend } from 'react-icons/fi';

export interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactPopup: React.FC<ContactPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-popup-title"
    >
      <div
        className={styles.windowContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.titleBar}>
          <div className={styles.trafficLights}>
            <button
              type="button"
              className={`${styles.trafficLight} ${styles.closeLight}`}
              onClick={onClose}
              aria-label="Close Contact Window"
            />
            <button
              type="button"
              className={`${styles.trafficLight} ${styles.minLight}`}
              onClick={onClose}
              aria-label="Minimize"
            />
            <button
              type="button"
              className={`${styles.trafficLight} ${styles.maxLight}`}
              aria-label="Maximize"
            />
          </div>
          <span className={styles.titleBarText}>Start a Project – Inquiry</span>
          <div style={{ width: 40 }} />
        </div>

        <div className={styles.content}>
          <h2 id="contact-popup-title" className={styles.modalTitle}>
            Let's build something alive
          </h2>
          <p className={styles.modalSubtitle}>
            Have an idea or need a high-converting website? Leave your details below and I'll get back within 24 hours.
          </p>

          {submitted ? (
            <div className={styles.submittedMsg}>
              🎉 Thanks! Your message has been sent successfully.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">Your Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson"
                  className={styles.input}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  className={styles.input}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="message">Project Scope / Budget</label>
                <textarea
                  id="message"
                  required
                  placeholder="Tell me about your product, timeline, and goals..."
                  className={styles.textarea}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                <span>Send Inquiry</span>
                <FiSend size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;
