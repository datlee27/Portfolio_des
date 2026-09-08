import React, { useState } from 'react';
import ScrollBaseAnimation from '@/components/ui/scroll-text-marque';
import { blogPostsData } from '../data/homeData';

export default function BlogSection({ onOpenBlog }) {
  const [selectedPost, setSelectedPost] = useState(null);

  const openPost = (post) => {
    setSelectedPost(post);
  };

  const closePost = () => {
    setSelectedPost(null);
  };

  return (
    <section
      id="d4-blog"
      style={{
        padding: '60px 0 80px',
        background: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Giant Smooth Marquee Header */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          marginBottom: 32,
        }}
      >
        <ScrollBaseAnimation
          delay={200}
          baseVelocity={0.6}
          clasname="font-bold tracking-[-0.04em] leading-none"
          style={{
            fontFamily: 'var(--font-outfit)',
            fontSize: 'clamp(40px, 9vw, 130px)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: '#000000',
            textTransform: 'lowercase',
          }}
        >
          articles & thoughts<span style={{ color: '#0b1dff', marginLeft: 8, marginRight: 24 }}>*</span>
        </ScrollBaseAnimation>
      </div>

      <div className="des4-container">
        {/* Subtitle & Threads view link */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
            marginBottom: 48,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 14,
              fontWeight: 500,
              color: '#000000',
              maxWidth: 540,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: '#0b1dff', fontWeight: 700 }}>* </span>
            Reflections on software architecture, web development, UI design principles, and engineering practices.
          </p>

          {onOpenBlog && (
            <button
              type="button"
              onClick={onOpenBlog}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#09090b',
                color: '#ffffff',
                border: 'none',
                borderRadius: 100,
                padding: '10px 22px',
                fontSize: 13,
                fontWeight: 700,
                fontFamily: 'var(--font-inter)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fe3c01';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#09090b';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Threads Feed (/blog)</span>
              <span style={{ color: '#fe3c01', background: 'rgba(255,255,255,0.15)', padding: '2px 6px', borderRadius: 4, fontSize: 11 }}>
                Live ↗
              </span>
            </button>
          )}
        </div>

        {/* Blog Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 32,
          }}
        >
          {blogPostsData.map((post) => (
            <div
              key={post.id}
              onClick={() => openPost(post)}
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                background: '#fafafa',
                border: '1px solid #e4e4e7',
                boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = '#fe3c01';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(254,60,1,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#e4e4e7';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.04)';
              }}
            >
              {/* Media Card */}
              {post.image && (
                <div style={{ width: '100%', height: 180, overflow: 'hidden' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              {/* Content */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#fe3c01', fontFamily: 'var(--font-inter)' }}>
                      {post.date}
                    </span>
                    <span style={{ fontSize: 12, color: '#a1a1aa' }}>•</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#71717a', fontFamily: 'var(--font-inter)' }}>
                      {post.readTime}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-outfit)',
                      fontSize: 18,
                      fontWeight: 700,
                      lineHeight: 1.35,
                      color: '#000000',
                      margin: '0 0 10px 0',
                    }}
                  >
                    {post.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: 13.5,
                      lineHeight: 1.6,
                      color: '#52525b',
                      margin: 0,
                    }}
                  >
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reader Modal (macOS TitleBar Design) */}
      {selectedPost && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
          onClick={closePost}
        >
          <div
            style={{
              background: '#0e0e11',
              color: '#f4f4f5',
              borderRadius: 16,
              border: '1px solid #27272a',
              maxWidth: 760,
              width: '100%',
              maxHeight: '90vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* macOS TitleBar */}
            <div
              style={{
                height: 44,
                borderBottom: '1px solid #27272a',
                background: '#141418',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px',
                userSelect: 'none',
                flexShrink: 0,
              }}
            >
              {/* Traffic Lights */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: 80 }}>
                <button
                  type="button"
                  onClick={closePost}
                  title="Close"
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: '#ff5f56',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
                <button
                  type="button"
                  onClick={closePost}
                  title="Minimize"
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: '#ffbd2e',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
                <button
                  type="button"
                  title="Zoom"
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: '#27c93f',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              </div>

              {/* Title */}
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#a1a1aa',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '60%',
                  textAlign: 'center',
                }}
              >
                Preview – {selectedPost.title}
              </div>

              <div style={{ width: 80, display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={closePost}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#a1a1aa',
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  ESC
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '28px clamp(16px, 4vw, 32px)',
              }}
            >
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#fe3c01', fontFamily: 'var(--font-inter)' }}>
                  {selectedPost.date}
                </span>
                <span style={{ fontSize: 12, color: '#71717a' }}>•</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#a1a1aa', fontFamily: 'var(--font-inter)' }}>
                  {selectedPost.readTime}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-outfit)',
                  fontSize: 'clamp(22px, 3.5vw, 32px)',
                  fontWeight: 800,
                  margin: '0 0 20px 0',
                  lineHeight: 1.25,
                  color: '#ffffff',
                }}
              >
                {selectedPost.title}
              </h2>

              {selectedPost.image && (
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  style={{
                    width: '100%',
                    borderRadius: 14,
                    height: 280,
                    objectFit: 'cover',
                    marginBottom: 24,
                    border: '1px solid #27272a',
                  }}
                />
              )}

              <div
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 15.5,
                  lineHeight: 1.8,
                  color: '#d4d4d8',
                }}
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />

              <div
                style={{
                  marginTop: 32,
                  paddingTop: 18,
                  borderTop: '1px solid #27272a',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <button
                  type="button"
                  onClick={closePost}
                  style={{
                    background: '#fe3c01',
                    border: 'none',
                    color: '#ffffff',
                    borderRadius: 100,
                    padding: '8px 22px',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
