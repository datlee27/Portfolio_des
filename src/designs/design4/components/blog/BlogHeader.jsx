import React from 'react';
import { IconSun, IconMoon } from './BlogIcons';

export default function BlogHeader({ siteName, intro, isDark, theme, onToggleTheme }) {
  return (
    <header className="blog-header">
      <div className="blog-header-left">
        <h1 className="blog-header-name">{siteName}</h1>
        <p className="blog-header-subtitle">ghi chép cá nhân</p>
      </div>

      <button
        onClick={onToggleTheme}
        aria-label="chuyển giao diện sáng tối"
        className="blog-theme-toggle"
        style={{
          color: theme.muted,
        }}
      >
        {isDark ? <IconSun size={16} /> : <IconMoon size={16} />}
      </button>
    </header>
  );
}
