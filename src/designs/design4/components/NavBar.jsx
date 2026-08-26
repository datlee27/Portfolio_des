import React, { useState, useEffect } from 'react';
import { siteMeta } from '../data/homeData';

export default function NavBar() {
  const [timeStr, setTimeStr] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      // Singapore Time UTC+8
      const now = new Date();
      const options = {
        timeZone: 'Asia/Singapore',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatted = new Intl.DateTimeFormat('en-GB', options).format(now);
      setTimeStr(`Singapore ${formatted} (SGT)`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Fixed Top Bar */}
      <header className="des4-nav-top">
        <a
          href="#top"
          className="des4-nav-logo"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          yx
        </a>

        <nav className="des4-nav-menu">
          <button className="des4-nav-link" onClick={() => scrollTo('d4-work')}>
            work
          </button>
          <button className="des4-nav-link" onClick={() => scrollTo('d4-intro')}>
            about
          </button>
          <button className="des4-nav-link" onClick={() => scrollTo('d4-lab')}>
            lab
          </button>
        </nav>
      </header>

      {/* Fixed Bottom Bar */}
      <footer className="des4-dock-bottom">
        <div className="des4-dock-item">
          <span>{timeStr || 'Singapore (+65)'}</span>
        </div>

        <div className="des4-dock-item" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button
            onClick={() => scrollTo('d4-footer')}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              fontFamily: 'var(--font-inter)',
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'underline',
              padding: 0,
            }}
          >
            available for work
          </button>
        </div>
      </footer>
    </>
  );
}
