import React from 'react';
import { IconPlay } from './BlogIcons';

/**
 * Full-size media renderer for the drawer/reader view.
 * Supports: real image URLs, real video URLs, gradient placeholder arrays.
 */
export default function BlogMediaFill({ item, kind, className, style }) {
  const isPlaceholder = Array.isArray(item);

  /* Real video link */
  if (kind === 'video' && !isPlaceholder) {
    return <video className={className} style={style} src={item} controls preload="metadata" />;
  }

  const bg = isPlaceholder
    ? `linear-gradient(135deg, ${item[0]}, ${item[1]})`
    : undefined;

  /* Placeholder video — gradient + play button overlay */
  if (kind === 'video') {
    return (
      <div className={`blog-media-fill-video ${className || ''}`} style={{ ...style, background: bg }}>
        <span className="blog-media-fill-play-wrap">
          <span className="blog-media-fill-play-btn">
            <IconPlay size={18} />
          </span>
        </span>
      </div>
    );
  }

  /* Placeholder image — gradient block */
  if (isPlaceholder) {
    return <div className={className} style={{ ...style, background: bg }} />;
  }

  /* Real image */
  return <img className={className} style={style} src={item} alt="" />;
}
