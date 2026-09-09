import React, { useState, useRef } from 'react';
import { IconSearch, IconClose } from './BlogIcons';

export default function BlogTagFilter({ tags, activeTag, onSelectTag, query, onQueryChange, theme, isDark }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef(null);

  function handleToggleSearch() {
    if (searchOpen) {
      setSearchOpen(false);
      onQueryChange('');
    } else {
      setSearchOpen(true);
      /* Focus input after render */
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }

  return (
    <div className="blog-filter-bar" style={{ borderBottom: `1px solid ${theme.border}` }}>
      <div className="blog-filter-row">
        <div className="blog-tags">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onSelectTag(tag)}
              className="blog-tag-btn"
              style={{
                borderColor: activeTag === tag ? theme.accent : 'transparent',
                color: activeTag === tag ? theme.text : theme.muted,
                fontWeight: activeTag === tag ? 600 : 400,
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        <button
          onClick={handleToggleSearch}
          aria-label={searchOpen ? 'đóng tìm kiếm' : 'mở tìm kiếm'}
          className="blog-search-toggle"
          style={{
            color: theme.muted,
          }}
        >
          {searchOpen ? <IconClose size={14} /> : <IconSearch size={14} />}
        </button>
      </div>

      {/* Collapsible search bar */}
      <div className={`blog-search-bar ${searchOpen ? 'blog-search-bar--open' : ''}`}>
        <div
          className="blog-search-input-wrap"
          style={{
            backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)',
            borderColor: query ? theme.accent : 'transparent',
          }}
        >
          <IconSearch size={14} style={{ color: theme.muted, flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="tìm kiếm bài viết..."
            className="blog-search-input"
            style={{ color: theme.text }}
          />
          {query && (
            <button
              onClick={() => onQueryChange('')}
              className="blog-search-clear"
              aria-label="xoá tìm kiếm"
              style={{ color: theme.muted }}
            >
              <IconClose size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
