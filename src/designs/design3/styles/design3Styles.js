import { createGlobalStyle, keyframes } from 'styled-components';

export const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(var(--rot, 0deg));
  }
  50% {
    transform: translateY(-6px) rotate(calc(var(--rot, 0deg) + 1.5deg));
  }
`;

export const pulseGlow = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
`;

export const Design3GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500;1,700&family=Inter:wght@400;500;600;700;800&display=swap');

  :root {
    --d3-bg-cream: #f5f3ea;
    --d3-text-dark: #252525;
    --d3-text-muted: #666666;
    --d3-pink: #fedcdd;
    --d3-blue: #bbdafe;
    --d3-yellow: #f3ea9a;
    --d3-lime: #e0fd72;
    --d3-mint: #c7f8d9;
    --d3-lavender: #e2dcfd;
    --d3-coral: #fd5d5c;
    --d3-green: #34c75a;
  }

  html, body {
    width: 100%;
    min-height: 100%;
    background-color: var(--d3-bg-cream);
    color: var(--d3-text-dark);
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow-x: hidden;
    overflow-y: auto;
    scroll-behavior: smooth;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #f5f3ea;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.35);
  }
`;
