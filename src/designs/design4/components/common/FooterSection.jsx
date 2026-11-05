import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { SiGithub, SiFacebook } from 'react-icons/si';
import { siteMeta } from '../../data/homeData';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

export default function FooterSection() {
  const [daNangTime, setDaNangTime] = useState('');

  const emailAddress = siteMeta.email || 'lvd27012004@gmail.com';
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}`;

  // Live Da Nang (GMT+7) Clock
  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const vnTime = new Date(utc + 3600000 * 7);
      let hours = vnTime.getHours();
      const minutes = vnTime.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      setDaNangTime(`${hours}:${minutes} ${ampm}`);
    }

    updateClock();
    const interval = setInterval(updateClock, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      id="d4-footer"
      style={{
        backgroundColor: '#F6F4EF',
        color: '#111111',
        minHeight: '100vh',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(64px, 8vh, 100px) 0 clamp(24px, 3vh, 36px)',
        borderTop: '1px solid rgba(17, 17, 17, 0.12)',
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      <div
        className="des4-container"
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        {/* Main Footer Block */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '40px',
            marginBottom: 'clamp(48px, 6vw, 72px)',
          }}
        >
          {/* Left Column: Dispatch & CTA */}
          <ScrollAnimation direction="left" style={{ maxWidth: '520px' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                color: 'rgba(17, 17, 17, 0.55)',
                display: 'block',
                marginBottom: '12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              04 // dispatch
            </span>

            <h3
              style={{
                fontFamily: "var(--font-sans, 'Inter', sans-serif)",
                fontSize: 'clamp(32px, 5.5vw, 68px)',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                color: '#111111',
                textTransform: 'lowercase',
                margin: '0 0 24px 0',
              }}
            >
              let's work together
            </h3>

            <p
              style={{
                fontFamily: "var(--font-sans, 'Inter', sans-serif)",
                fontSize: '15px',
                color: 'rgba(17, 17, 17, 0.6)',
                lineHeight: 1.7,
                margin: '0 0 36px 0',
                maxWidth: '420px',
              }}
            >
              open for select roles, engineering contracts, and creative collaborations.
            </p>

            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '999px',
                backgroundColor: '#111111',
                color: '#F6F4EF',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                touchAction: 'manipulation',
                minHeight: '44px',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#262626';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#111111';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Mail size={15} />
              <span>send an email</span>
              <ArrowUpRight size={15} />
            </a>
          </ScrollAnimation>

          {/* Right Column: Social Links & Local Time */}
          <ScrollAnimation direction="up" delay={0.08} style={{ textAlign: 'left' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                fontSize: '14px',
                marginBottom: '20px',
                flexWrap: 'wrap',
                fontFamily: "var(--font-inter, 'Inter', sans-serif)",
              }}
            >
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#111111',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                email
              </a>
              <span style={{ color: 'rgba(17, 17, 17, 0.25)' }}>·</span>
              <a
                href={siteMeta.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#111111',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <SiGithub size={14} />
                github <ArrowUpRight size={13} />
              </a>
              <span style={{ color: 'rgba(17, 17, 17, 0.25)' }}>·</span>
              <a
                href={siteMeta.facebook}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#111111',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <SiFacebook size={14} />
                facebook <ArrowUpRight size={13} />
              </a>
            </div>

            {/* Live local time block */}
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                color: 'rgba(17, 17, 17, 0.58)',
                letterSpacing: '-0.01em',
              }}
            >
              da nang&nbsp;&nbsp;
              <span style={{ color: '#111111', fontWeight: 600 }}>
                {daNangTime || '10:14 pm'}
              </span>
              &nbsp;&nbsp;[gmt +7] · open to work · 2026. {siteMeta.name?.toLowerCase() || 'dat le'}
            </div>
          </ScrollAnimation>
        </div>

        {/* Giant quiet watermark / monogram */}
        <ScrollAnimation direction="up">
          <div
            style={{
              paddingTop: '40px',
              borderTop: '1px solid rgba(17, 17, 17, 0.12)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              userSelect: 'none',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-outfit, 'Inter', sans-serif)",
                fontSize: 'clamp(54px, 13vw, 150px)',
                fontWeight: 600,
                letterSpacing: '-0.05em',
                color: 'rgba(17, 17, 17, 0.06)',
                lineHeight: 0.85,
              }}
            >
              dl* /26
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: 'rgba(17, 17, 17, 0.42)',
                paddingBottom: '8px',
              }}
            >
              craft on paper — built with structural honesty
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </footer>
  );
}
