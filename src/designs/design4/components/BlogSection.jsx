import React, { useState } from 'react';
import ScrollBaseAnimation from '@/components/ui/scroll-text-marque';
import { blogPostsData } from '../data/homeData';

export default function BlogSection({ onSelectPost }) {
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
        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 14,
            fontWeight: 500,
            color: '#000000',
            maxWidth: 540,
            marginBottom: 48,
            lineHeight: 1.6,
          }}
        >
          <span style={{ color: '#0b1dff', fontWeight: 700 }}>* </span>
          Reflections on software architecture, web development, UI design principles, and engineering practices.
        </p>

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
              {/* Cover Image */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/10',
                  overflow: 'hidden',
                  background: '#111',
                  position: 'relative',
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    background: '#000000',
                    color: '#ffffff',
                    fontFamily: 'var(--font-inter)',
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 100,
                  }}
                >
                  {post.readTime}
                </div>
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#fe3c01',
                      marginBottom: 8,
                    }}
                  >
                    {post.date}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-outfit)',
                      fontSize: 'clamp(18px, 2vw, 22px)',
                      fontWeight: 700,
                      color: '#000000',
                      margin: '0 0 10px 0',
                      lineHeight: 1.3,
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: 13,
                      color: '#555555',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {post.excerpt}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: 20,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontFamily: 'var(--font-inter)',
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#000000',
                  }}
                >
                  Read Article <span style={{ color: '#fe3c01' }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
          onClick={closePost}
        >
          <div
            style={{
              background: '#ffffff',
              color: '#000000',
              borderRadius: 24,
              maxWidth: 720,
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '36px 32px',
              position: 'relative',
              boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closePost}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                border: 'none',
                background: '#f4f4f5',
                borderRadius: '50%',
                width: 36,
                height: 36,
                fontSize: 16,
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              ✕
            </button>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#fe3c01', fontFamily: 'var(--font-inter)' }}>
                {selectedPost.date}
              </span>
              <span style={{ fontSize: 12, color: '#888888' }}>•</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#666666', fontFamily: 'var(--font-inter)' }}>
                {selectedPost.readTime}
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-outfit)',
                fontSize: 'clamp(24px, 4vw, 36px)',
                fontWeight: 800,
                margin: '0 0 20px 0',
                lineHeight: 1.2,
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
                  borderRadius: 16,
                  height: 280,
                  objectFit: 'cover',
                  marginBottom: 24,
                }}
              />
            )}

            <div
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 15,
                lineHeight: 1.8,
                color: '#222222',
              }}
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
