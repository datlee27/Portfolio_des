import React from 'react';
import { IconClose } from './BlogIcons';
import BlogMediaFill from './BlogMediaFill';
import BlogEmojiLikeButton from './BlogEmojiLikeButton';
import { formatDate, IMAGE_LIMIT, VIDEO_LIMIT } from './blogData';

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

  const likeCount = post ? post.likes + (likedPosts[post.id] ? 1 : 0) : 0;

  const allComments = post
    ? [...(post.comments || []), ...(extraComments[post.id] || [])]
    : [];

  const mediaItems =
    post && post.media
      ? post.media.items.slice(
          0,
          post.media.type === 'video' ? VIDEO_LIMIT : IMAGE_LIMIT,
        )
      : [];

  const colCount = mediaItems.length >= 3 ? 3 : mediaItems.length;

  function getMediaClassName(isSingle, isVideo) {
    let cls = 'blog-drawer-media-item';
    if (isSingle) {
      cls += ' blog-media-single';
    } else if (isVideo) {
      cls += ' blog-media-multi-video';
    } else {
      cls += ' blog-media-multi';
    }
    return cls;
  }

  return (
    <div className="blog-drawer-overlay" data-open={String(isOpen)}>
      <div className="blog-drawer-backdrop" onClick={onClose} />

      <div
        className="blog-drawer-panel"
        data-open={String(isOpen)}
        style={{ backgroundColor: theme.surface, color: theme.text }}
      >
        {post && (
          <>
            {/* Media Grid */}
            {post.media && mediaItems.length > 0 && (
              <div className="blog-drawer-media-grid" data-cols={colCount}>
                {mediaItems.map((item, i) => (
                  <BlogMediaFill
                    key={i}
                    item={item}
                    kind={post.media.type}
                    className={getMediaClassName(
                      mediaItems.length === 1,
                      post.media.type === 'video',
                    )}
                  />
                ))}
              </div>
            )}

            {/* Content */}
            <div className="blog-drawer-content">
              <button
                onClick={onClose}
                aria-label="đóng"
                className="blog-drawer-close-btn"
                style={{ border: `1px solid ${theme.border}` }}
              >
                <IconClose size={15} />
              </button>

              <p className="blog-drawer-date" style={{ color: theme.muted }}>
                {formatDate(post.date)}
              </p>
              <p className="blog-drawer-tag" style={{ color: theme.accent }}>
                {post.tag}
              </p>

              <h2 className="blog-drawer-title">{post.title}</h2>

              <div className="blog-drawer-paragraphs">
                {post.content.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
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
          </>
        )}
      </div>
    </div>
  );
}
