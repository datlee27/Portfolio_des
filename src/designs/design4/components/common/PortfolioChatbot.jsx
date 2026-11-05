import React, { useEffect, useState, useRef } from 'react';
import { MessageSquareText } from 'lucide-react';

const CHATBASE_BOT_ID = import.meta.env.VITE_CHATBASE_BOT_ID || 'c9zgwCRkU8lje3AUpu6-j';

export default function PortfolioChatbot({ activeView }) {
  const [isHovered, setIsHovered] = useState(false);
  const scriptLoadedRef = useRef(false);

  // Hidden on /blog and /lab per user specification
  const isExcludedView = activeView === 'blog' || activeView === 'lab';

  // Manage Chatbase script lifecycle and view changes
  useEffect(() => {
    // 1. Setup Window Proxy Queue if not initialized yet
    if (typeof window !== 'undefined') {
      if (!window.chatbase || window.chatbase('getState') !== 'initialized') {
        window.chatbase = (...args) => {
          if (!window.chatbase.q) {
            window.chatbase.q = [];
          }
          window.chatbase.q.push(args);
        };
        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if (prop === 'q') return target.q;
            return (...args) => target(prop, ...args);
          },
        });
      }
    }

    // 2. Load script function
    const loadScript = () => {
      if (document.getElementById(CHATBASE_BOT_ID)) {
        scriptLoadedRef.current = true;
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://www.chatbase.co/embed.min.js';
      script.id = CHATBASE_BOT_ID;
      script.setAttribute('domain', 'www.chatbase.co');
      script.async = true;
      script.onload = () => {
        scriptLoadedRef.current = true;
      };
      document.body.appendChild(script);
    };

    // 3. Lazy load script after 2.5s if not excluded
    let timer = null;
    if (!isExcludedView) {
      timer = setTimeout(loadScript, 2500);
    }

    // 4. Custom event listener so any button can trigger open
    const handleTriggerOpen = () => {
      if (!scriptLoadedRef.current) {
        loadScript();
      }
      if (window.chatbase) {
        window.chatbase('open');
      }
    };
    window.addEventListener('open-portfolio-chat', handleTriggerOpen);
    window.openAboutChat = handleTriggerOpen;
    window.openPortfolioChat = handleTriggerOpen;

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('open-portfolio-chat', handleTriggerOpen);
    };
  }, [isExcludedView]);

  // Handle visibility changes when activeView changes to/from blog or lab
  useEffect(() => {
    const bubbleWindow = document.getElementById('chatbase-bubble-window');
    const bubbleButton = document.getElementById('chatbase-bubble-button');

    if (isExcludedView) {
      // Force close and hide on /blog and /lab
      try {
        if (window.chatbase) {
          window.chatbase('close');
        }
      } catch {
        // ignore
      }
      if (bubbleWindow) {
        bubbleWindow.style.setProperty('display', 'none', 'important');
      }
      if (bubbleButton) {
        bubbleButton.style.setProperty('display', 'none', 'important');
      }
    } else {
      // Restore window visibility state when navigating back
      if (bubbleWindow) {
        bubbleWindow.style.removeProperty('display');
      }
      // Guarantee Chatbase default button remains permanently hidden
      if (bubbleButton) {
        bubbleButton.style.setProperty('display', 'none', 'important');
      }
    }
  }, [isExcludedView]);

  const handleOpenChat = () => {
    // If clicked before the 2.5s timer finished, immediately load script
    if (!scriptLoadedRef.current && !document.getElementById(CHATBASE_BOT_ID)) {
      const script = document.createElement('script');
      script.src = 'https://www.chatbase.co/embed.min.js';
      script.id = CHATBASE_BOT_ID;
      script.setAttribute('domain', 'www.chatbase.co');
      script.async = true;
      script.onload = () => {
        scriptLoadedRef.current = true;
        if (window.chatbase) window.chatbase('open');
      };
      document.body.appendChild(script);
    }

    if (window.chatbase) {
      window.chatbase('open');
    }
  };

  // Do not render anything on /blog and /lab
  if (isExcludedView) {
    return null;
  }

  return (
    <>
      {/* Floating Action Capsule Button — Placed cleanly ABOVE the CornerNav 'lab' button */}
      <div
        className="des4-about-chat-fab"
        style={{
          position: 'fixed',
          /* Aligned with 'lab' horizontally, elevated 50px above 'lab' vertically */
          bottom: 'calc(clamp(16px, 3.5vw, 32px) + 50px + env(safe-area-inset-bottom, 0px))',
          right: 'calc(clamp(16px, 4vw, 36px) + env(safe-area-inset-right, 0px))',
          zIndex: 99998, /* Just beneath CornerNav lab button (99999) */
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          pointerEvents: 'auto',
        }}
      >
        {/* Subtle Tooltip on Hover */}
        {isHovered && (
          <div
            style={{
              marginBottom: '8px',
              padding: '6px 12px',
              backgroundColor: '#111111',
              color: '#F6F4EF',
              borderRadius: '6px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
              boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
              border: '1px solid rgba(246, 244, 239, 0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              pointerEvents: 'none',
              animation: 'chatFabFadeIn 0.2s ease-out forwards',
            }}
          >
            <span>Hỏi AI về kinh nghiệm & tech stack của Đạt</span>
            <span style={{ color: '#fe3c01' }}>↵</span>
          </div>
        )}

        {/* Main Capsule Pill */}
        <button
          onClick={handleOpenChat}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Trò chuyện với AI Assistant của Đạt"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '9px',
            backgroundColor: '#111111',
            color: '#F6F4EF',
            border: isHovered
              ? '1px solid rgba(254, 60, 1, 0.45)'
              : '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: '999px',
            padding: '8px 14px 8px 11px',
            boxShadow: isHovered
              ? '0 10px 28px rgba(0, 0, 0, 0.32), 0 2px 8px rgba(0, 0, 0, 0.16)'
              : '0 6px 20px rgba(0, 0, 0, 0.22), 0 2px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
            userSelect: 'none',
            outline: 'none',
          }}
        >



          {/* Label in Editorial JetBrains Mono */}
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: '#F6F4EF',
              lineHeight: 1,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            <span>(ai) dat.assistant</span>
            <span style={{ color: '#fe3c01', marginLeft: '1px' }}>*</span>
          </span>

          {/* Minimalist Message Icon */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '2px',
              color: isHovered ? '#fe3c01' : 'rgba(246, 244, 239, 0.7)',
              transition: 'color 0.2s ease',
            }}
          >
            <MessageSquareText size={14} />
          </span>
        </button>
      </div>
    </>
  );
}

