import React, { useState, useEffect } from 'react';
import BlogMediaThumb from './BlogMediaThumb';
import { IconMessageCircle } from './BlogIcons';
import BlogEmojiLikeButton from './BlogEmojiLikeButton';
import { formatDate } from './blogData';
import { getCommentsForPost } from '../../../../services/commentsService';

export default function BlogPostCard({
  post,
  isDark,
  theme,
  isLiked = false,
  onToggleLike,
  onSelect,
}) {
  const [commentCount, setCommentCount] = useState(() => getCommentsForPost(post).length);

  useEffect(() => {
    setCommentCount(getCommentsForPost(post).length);
    const handleSync = () => {
      setCommentCount(getCommentsForPost(post).length);
    };
    window.addEventListener('portfolio_comments_changed', handleSync);
    return () => window.removeEventListener('portfolio_comments_changed', handleSync);
  }, [post]);

  const rawLikes = typeof post.likes === 'number' && !isNaN(post.likes)
    ? post.likes
    : (!isNaN(parseInt(post.total_likes, 10)) && parseInt(post.total_likes, 10) > 0
      ? parseInt(post.total_likes, 10)
      : (parseInt(post.likes, 10) || 12));

  const currentLikes = Math.max(0, rawLikes) + (isLiked ? 1 : 0);

  return (
    <button
      onClick={() => onSelect(post)}
      className="blog-post-card"
      data-dark={isDark}
      style={{ borderBottom: `1px solid ${theme.border}`, color: theme.text }}
    >
      <span className="blog-post-date" style={{ color: theme.muted }}>
        {formatDate(post.date)}
      </span>

      <span className="blog-post-body">
        <span className="blog-post-title">{post.title}</span>
        <span className="blog-post-excerpt" style={{ color: theme.muted }}>
          {post.excerpt}
        </span>

        {/* Interaction stats — visible on every card */}
        <span className="blog-post-stats" style={{ color: theme.muted }}>
          <BlogEmojiLikeButton
            isLiked={isLiked}
            likeCount={currentLikes}
            onToggleLike={onToggleLike}
            theme={theme}
            size="compact"
            asDiv={true}
          />
          {commentCount > 0 && (
            <span className="blog-post-stat">
              <IconMessageCircle size={13} />
              <span>{commentCount}</span>
            </span>
          )}
          <span className="blog-post-stat blog-post-stat-tag" style={{ color: theme.accent }}>
            {post.tag}
          </span>
        </span>
      </span>

      {post.media && (
        <span className="blog-post-thumb-wrap">
          <BlogMediaThumb
            item={post.media.items[0]}
            kind={post.media.type}
            className="blog-post-thumb-wrap"
          />
          {post.media.type === 'image' && post.media.items.length > 1 && (
            <span className="blog-thumb-badge">
              +{post.media.items.length - 1}
            </span>
          )}
        </span>
      )}
    </button>
  );
}
