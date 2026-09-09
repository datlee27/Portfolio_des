import React from 'react';
import { IconPlay } from './BlogIcons';

/**
 * Thumbnail media renderer for the post list.
 * Always static — videos only show a poster / gradient + play icon, never autoplay.
 */
export default function BlogMediaThumb({ item, kind, className, style }) {
  /* Video thumb — always static */
  if (kind === 'video') {
    const bg = Array.isArray(item)
      ? `linear-gradient(135deg, ${item[0]}, ${item[1]})`
      : '#33405E';
    return (
      <div className={`blog-media-thumb-video ${className || ''}`} style={{ ...style, background: bg }}>
        <span className="blog-media-thumb-play-wrap">
          <span className="blog-media-thumb-play-btn">
            <IconPlay size={8} />
          </span>
        </span>
      </div>
    );
  }

  /* Image placeholder (gradient) */
  if (Array.isArray(item)) {
    return (
      <div
        className={className}
        style={{ ...style, background: `linear-gradient(135deg, ${item[0]}, ${item[1]})` }}
      />
    );
  }

  /* Real image */
  return <img className={className} style={style} src={item} alt="" />;
}
