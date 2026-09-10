import React, { useState } from 'react';
import { IconClose } from './BlogIcons';
import BlogMediaGallery from './BlogMediaGallery';
import BlogMediaLightbox from './BlogMediaLightbox';
import BlogEmojiLikeButton from './BlogEmojiLikeButton';
import { formatDate } from './blogData';

export default function BlogDrawer({
  post,
  theme,
  likedPosts,
  extraComments,
  commentDraft,
  onClose,
  onToggleLike,
  onCommentDraftChange,
  onSubmitComment,
}) {
  const isOpen = Boolean(post);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const likeCount = post ? post.likes + (likedPosts[post.id] ? 1 : 0) : 0;

  const allComments = post
    ? [...(post.comments || []), ...(extraComments[post.id] || [])]
    : [];

  const mediaItems = post && post.media ? post.media.items : [];

  function handleOpenLightbox(index = 0) {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  return (
    <>
      <div className="blog-drawer-overlay" data-open={String(isOpen)}>
        <div className="blog-drawer-backdrop" onClick={onClose} />

        <div
          className="blog-drawer-panel"
          data-open={String(isOpen)}
          style={{ backgroundColor: theme.surface, color: theme.text }}
        >
          {post && (
            <div className="blog-drawer-content">
              {/* Borderless Close Button */}
              <button
                onClick={onClose}
                aria-label="đóng bài viết"
                className="blog-drawer-close-btn"
                style={{ color: theme.muted }}
              >
                <IconClose size={16} />
              </button>

              <p className="blog-drawer-date" style={{ color: theme.muted }}>
                {formatDate(post.date)}
              </p>
              <p className="blog-drawer-tag" style={{ color: theme.accent }}>
                {post.tag}
              </p>

              <h2 className="blog-drawer-title">{post.title}</h2>

              {/* Media Gallery (Hero image or carousel slider with expand to lightbox) */}
              {post.media && mediaItems.length > 0 && (
                <div className="blog-drawer-media-section">
                  <BlogMediaGallery
                    media={post.media}
                    onOpenLightbox={handleOpenLightbox}
                    theme={theme}
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="blog-drawer-paragraphs">
                {Array.isArray(post.content) ? (
                  post.content.map((para, i) => <p key={i}>{para}</p>)
                ) : typeof post.content === 'string' && post.content.includes('<') ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : (
                  (post.content || '').split('\n').filter(Boolean).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))
                )}
              </div>

              {/* Like Button — Framer Emoji-Buttons effect */}
              <div className="blog-drawer-like-wrap">
                <BlogEmojiLikeButton
                  isLiked={!!likedPosts[post.id]}
                  likeCount={likeCount}
                  onToggleLike={() => onToggleLike(post.id)}
                  theme={theme}
                  size="default"
                />
              </div>

              {/* Comments */}
              <div
                className="blog-comments-section"
                style={{ borderTop: `1px solid ${theme.border}` }}
              >
                <p className="blog-comments-count" style={{ color: theme.muted }}>
                  phản hồi ({allComments.length})
                </p>

                <div className="blog-comment-list">
                  {allComments.map((c, i) => (
                    <div key={i} className="blog-comment-item">
                      <p className="blog-comment-author">{c.name}</p>
                      <p className="blog-comment-text" style={{ color: theme.muted }}>
                        {c.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="blog-comment-form">
                  <input
                    type="text"
                    value={commentDraft}
                    onChange={(e) => onCommentDraftChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') onSubmitComment(post.id);
                    }}
                    placeholder="để lại vài dòng..."
                    aria-label="viết bình luận"
                    className="blog-comment-input"
                    style={{ color: theme.text, borderBottomColor: theme.border }}
                  />
                  <button
                    onClick={() => onSubmitComment(post.id)}
                    className="blog-comment-submit"
                    style={{ color: theme.accent }}
                  >
                    gửi
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Media Lightbox Viewer */}
      {post && (
        <BlogMediaLightbox
          isOpen={lightboxOpen}
          items={mediaItems}
          type={post.media ? post.media.type : 'image'}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          theme={theme}
        />
      )}
    </>
  );
}
