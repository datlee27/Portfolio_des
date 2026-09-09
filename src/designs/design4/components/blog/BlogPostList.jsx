import React from 'react';
import BlogPostCard from './BlogPostCard';

export default function BlogPostList({
  posts,
  isDark,
  theme,
  likedPosts = {},
  onToggleLike,
  onSelectPost,
  onClearFilters,
}) {
  if (posts.length === 0) {
    return (
      <div className="blog-empty">
        <p style={{ color: theme.muted }}>chưa có bài nào khớp với tìm kiếm này.</p>
        <button onClick={onClearFilters} style={{ color: theme.accent }}>
          xoá bộ lọc
        </button>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <BlogPostCard
          key={post.id}
          post={post}
          isDark={isDark}
          theme={theme}
          isLiked={!!likedPosts[post.id]}
          onToggleLike={() => onToggleLike && onToggleLike(post.id)}
          onSelect={onSelectPost}
        />
      ))}
    </div>
  );
}
