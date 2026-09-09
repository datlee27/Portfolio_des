import React from 'react';

export default function BlogFooter({ siteName, theme }) {
  return (
    <footer className="blog-footer" style={{ color: theme.muted, borderTop: `1px solid ${theme.border}` }}>
      <span>{siteName} © 2026</span>
      <a href="#" style={{ color: theme.muted }}>
        email
      </a>
    </footer>
  );
}
