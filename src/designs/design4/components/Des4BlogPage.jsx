import React, { useState, useEffect } from 'react';
import { portfolioData } from '../../../../portfolioData';
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share2,
  MoreHorizontal,
  ArrowLeft,
  ArrowUpRight,
  Send,
  Eye,
  Check,
  MapPin,
} from 'lucide-react';

// Initial thoughts / micro-posts in addition to articles
const INITIAL_THOUGHTS = [
  {
    id: 'thought-1',
    post_id: 'thought-1',
    type: 'thought',
    title: 'Code Architecture & Minimalist UX',
    excerpt: 'Design is not just how something looks. In frontend engineering, design is how snappy interactions feel, how cleanly the DOM renders, and how accessible it is for every user. Clean code is beautiful design.',
    date: '3 hours ago',
    readTime: '1 min read',
    tags: ['#Frontend', '#Engineering', '#DesignSystem'],
    initialLikes: 84,
    initialReplies: 14,
    initialReposts: 6,
    repliesList: [
      {
        id: 'r-1',
        author: 'Minh Quan',
        handle: '@mquan_dev',
        text: '100% agreed. Snappy 60fps feels better than 10 complex animations stacked together.',
        time: '2h ago',
      },
      {
        id: 'r-2',
        author: 'Sarah Chen',
        handle: '@schen_ui',
        text: 'Brutalist minimalism with high contrast typography has been my favorite trend recently.',
        time: '1h ago',
      },
    ],
  },
  {
    id: 'thought-2',
    post_id: 'thought-2',
    type: 'thought',
    title: 'Mastering CSS Fundamentals',
    excerpt: 'Hot take for developers in 2026: Master CSS Grid, Flexbox, and native CSS variables before reaching for bulky utility libraries. You will write 80% less boilerplate and understand the browser engine on a deeper level.',
    date: 'Yesterday',
    readTime: '2 min read',
    tags: ['#WebDev', '#CSS', '#Performance'],
    initialLikes: 162,
    initialReplies: 21,
    initialReposts: 19,
    repliesList: [
      {
        id: 'r-3',
        author: 'Tuấn Anh',
        handle: '@tuananh_fe',
        text: 'CSS subgrid and container queries are literal superpowers once you get used to them!',
        time: '18h ago',
      },
    ],
  },
];

export default function Des4BlogPage({ onGoHome }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'articles' | 'thoughts'
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Initialize interactive posts state
  const [posts, setPosts] = useState(() => {
    const articles = (portfolioData.blogPosts || []).map((p, idx) => ({
      ...p,
      type: 'article',
      tags:
        idx === 0
          ? ['#Minimalism', '#WebDev', '#CleanDesign']
          : idx === 1
          ? ['#Career', '#DevJourney', '#Growth']
          : idx === 2
          ? ['#React', '#Frontend', '#Architecture']
          : ['#DevLife', '#Balance', '#Productivity'],
      likes: 120 + idx * 37,
      isLiked: false,
      reposts: 8 + idx * 5,
      isReposted: false,
      repliesList: [
        {
          id: `art-reply-${idx}`,
          author: 'Dev Community',
          handle: '@tech_reader',
          text: `Inspiring perspective on ${p.title.toLowerCase()}! Thanks for sharing your insights.`,
          time: '3d ago',
        },
      ],
      showReplyBox: false,
      replyInput: '',
    }));

    const thoughts = INITIAL_THOUGHTS.map((t) => ({
      ...t,
      likes: t.initialLikes,
      isLiked: false,
      reposts: t.initialReposts,
      isReposted: false,
      showReplyBox: false,
      replyInput: '',
    }));

    return [...thoughts, ...articles];
  });

  // Scroll to targeted post if hash exists in URL, else scroll to top
  useEffect(() => {
    document.body.style.overflow = '';
    const hash = window.location.hash?.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const el =
          document.getElementById(hash) ||
          document.getElementById(`post-${hash}`) ||
          document.querySelector(`[id*="${hash}"]`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.style.transition = 'background 0.4s ease, border-radius 0.4s ease, box-shadow 0.4s ease';
          el.style.background = 'rgba(254, 60, 1, 0.14)';
          el.style.borderRadius = '12px';
          el.style.boxShadow = '0 0 0 1px #fe3c01';
          setTimeout(() => {
            el.style.background = 'transparent';
            el.style.boxShadow = 'none';
          }, 2600);
        }
      }, 180);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  // Lock body scroll ONLY when full article modal is open
  useEffect(() => {
    if (selectedArticle) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original || '';
      };
    }
  }, [selectedArticle]);

  // Auto clear toast after 2.5s
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Handle like toggle
  const handleToggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const nextLiked = !post.isLiked;
          return {
            ...post,
            isLiked: nextLiked,
            likes: nextLiked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  // Handle repost toggle
  const handleToggleRepost = (postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const nextReposted = !post.isReposted;
          return {
            ...post,
            isReposted: nextReposted,
            reposts: nextReposted ? post.reposts + 1 : post.reposts - 1,
          };
        }
        return post;
      })
    );
    setToastMessage('🔁 Reposted to your Threads feed!');
  };

  // Handle share (copy link to clipboard)
  const handleShare = (post) => {
    const shareUrl = `${window.location.origin}/blog#${post.slug || post.id}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(
        () => setToastMessage('📋 Link copied to clipboard!'),
        () => setToastMessage('📋 Thread link: ' + shareUrl)
      );
    } else {
      setToastMessage('📋 Thread link copied!');
    }
  };

  // Toggle reply box
  const handleToggleReplyBox = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, showReplyBox: !post.showReplyBox } : post
      )
    );
  };

  // Submit reply
  const handleSubmitReply = (postId) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId && post.replyInput.trim()) {
          const newReply = {
            id: `usr-reply-${Date.now()}`,
            author: 'You (Visitor)',
            handle: '@guest_user',
            text: post.replyInput.trim(),
            time: 'Just now',
          };
          return {
            ...post,
            repliesList: [...post.repliesList, newReply],
            replyInput: '',
          };
        }
        return post;
      })
    );
    setToastMessage('💬 Reply posted to thread!');
  };

  // Filter posts based on activeTab
  const filteredPosts = posts.filter((post) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'articles') return post.type === 'article';
    if (activeTab === 'thoughts') return post.type === 'thought';
    return true;
  });

  const avatarUrl =
    portfolioData.personal.avatarUrl ||
    'https://res.cloudinary.com/ddwt6nl7s/image/upload/v1775989709/IMG_6098_fuhsm3.jpg';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#09090b',
        color: '#f4f4f5',
        fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif',
        paddingBottom: 80,
      }}
    >
      {/* ─── Sticky Top Navigation Bar ─── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(9, 9, 11, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid #1f1f23',
          padding: '12px 20px',
        }}
      >
        <div
          style={{
            maxWidth: 640,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Back button */}
          <button
            onClick={onGoHome}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#d4d4d8',
              border: '1px solid #27272a',
              borderRadius: 100,
              padding: '6px 14px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = '#fe3c01';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#d4d4d8';
              e.currentTarget.style.borderColor = '#27272a';
            }}
          >
            <ArrowLeft size={14} />
            <span>Overview</span>
          </button>

          {/* Center Brand Title */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-outfit)',
              color: '#ffffff',
            }}
          >
            <span>@datlee27</span>
            <span
              style={{
                color: '#fe3c01',
                fontSize: 12,
                background: 'rgba(254, 60, 1, 0.15)',
                padding: '2px 6px',
                borderRadius: 4,
                fontWeight: 700,
              }}
            >
              threads
            </span>
          </div>

          {/* Home Link */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onGoHome();
            }}
            style={{
              color: '#a1a1aa',
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fe3c01')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#a1a1aa')}
          >
            dl<span style={{ color: '#fe3c01' }}>*</span>
          </a>
        </div>
      </header>

      {/* ─── Centered Feed Container (Threads width: 640px) ─── */}
      <main
        style={{
          maxWidth: 640,
          margin: '0 auto',
          padding: '20px 16px',
        }}
      >
        {/* ─── Profile Header Card ─── */}
        <section
          style={{
            padding: '20px 20px 24px',
            marginBottom: 20,
            borderBottom: '1px solid #27272a',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 'clamp(22px, 3vw, 26px)',
                  fontWeight: 800,
                  fontFamily: 'var(--font-outfit)',
                  color: '#ffffff',
                  letterSpacing: '-0.03em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                Dat Le (Lê Văn Đạt)
                <span
                  title="Verified Technical Artisan"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: '#fe3c01',
                    color: '#ffffff',
                    fontSize: 10,
                    fontWeight: 900,
                  }}
                >
                  <Check size={11} strokeWidth={3} />
                </span>
              </h1>
              <div
                style={{
                  fontSize: 14,
                  color: '#71717a',
                  marginTop: 4,
                  fontWeight: 500,
                }}
              >
                @datlee27 • <span style={{ color: '#fe3c01', fontWeight: 700 }}>dl*</span>
              </div>
            </div>

            {/* Profile Avatar with glow */}
            <div style={{ position: 'relative' }}>
              <img
                src={avatarUrl}
                alt="Dat Le"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #27272a',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                }}
              />
              <span
                title="Active Developer"
                style={{
                  position: 'absolute',
                  bottom: 2,
                  right: 2,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: '#10b981',
                  border: '2.5px solid #09090b',
                }}
              />
            </div>
          </div>

          {/* Bio text */}
          <p
            style={{
              margin: '14px 0 16px',
              fontSize: 14.5,
              lineHeight: 1.6,
              color: '#d4d4d8',
            }}
          >
            Engineering Logic, Crafting Digital Experiences. Full-stack Developer & Technical
            Artisan exploring the boundaries between brutalist web aesthetics and clean architecture.
          </p>

          {/* Stats & Metadata Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16,
              fontSize: 13,
              color: '#71717a',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <MapPin size={13} style={{ color: '#fe3c01' }} /> Đà Nẵng, VN
            </span>
            <span>•</span>
            <span>{posts.length} Threads & Articles</span>
            <span>•</span>
            <a
              href="https://github.com/datlee27"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#fe3c01',
                textDecoration: 'none',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span>github.com/datlee27</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </section>

        {/* ─── Segmented Filter Tabs (All Threads / Articles / Thoughts) ─── */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid #1f1f23',
            marginBottom: 16,
          }}
        >
          {[
            { key: 'all', label: 'All Threads', count: posts.length },
            {
              key: 'articles',
              label: 'Articles',
              count: posts.filter((p) => p.type === 'article').length,
            },
            {
              key: 'thoughts',
              label: 'Thoughts',
              count: posts.filter((p) => p.type === 'thought').length,
            },
          ].map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #fe3c01' : '2px solid transparent',
                  padding: '12px 10px',
                  color: isActive ? '#ffffff' : '#71717a',
                  fontFamily: 'var(--font-inter)',
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <span>{tab.label}</span>
                <span
                  style={{
                    fontSize: 11,
                    background: isActive ? 'rgba(254, 60, 1, 0.18)' : '#18181b',
                    color: isActive ? '#fe3c01' : '#a1a1aa',
                    padding: '1px 6px',
                    borderRadius: 10,
                    fontWeight: 600,
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ─── Thread Posts Stream ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              id={post.slug || (post.id ? `post-${post.id}` : undefined)}
              style={{
                display: 'flex',
                gap: 14,
                padding: '18px 0',
                borderBottom: '1px solid #1f1f23',
                position: 'relative',
              }}
            >
              {/* Left Column: Avatar + Connecting Vertical Thread Line */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: 44,
                  flexShrink: 0,
                }}
              >
                <img
                  src={avatarUrl}
                  alt="Dat Le"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid #27272a',
                  }}
                />
                {/* Continuous thread line connecting downward */}
                <div
                  style={{
                    width: 2,
                    flexGrow: 1,
                    minHeight: 40,
                    background: '#27272a',
                    margin: '8px 0',
                    borderRadius: 1,
                  }}
                />
                {/* Mini loop anchor at bottom of thread line */}
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: post.isLiked ? '#fe3c01' : '#3f3f46',
                    transition: 'background 0.3s ease',
                  }}
                />
              </div>

              {/* Right Column: Post Body, Media, Actions, Sub-replies */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Author Info & Timestamp */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: '#ffffff',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Dat Le
                    </span>
                    <span style={{ fontSize: 13, color: '#71717a' }}>@datlee27</span>
                    <span style={{ fontSize: 13, color: '#52525b' }}>•</span>
                    <span style={{ fontSize: 13, color: '#71717a' }}>{post.date}</span>
                    {post.readTime && (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: 12,
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: '#a1a1aa',
                          border: '1px solid #27272a',
                        }}
                      >
                        {post.readTime}
                      </span>
                    )}
                  </div>

                  {/* 3-dots context menu button */}
                  <button
                    onClick={() => handleShare(post)}
                    title="Share options"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#71717a',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#71717a')}
                  >
                    <MoreHorizontal size={17} />
                  </button>
                </div>

                {/* Post Title */}
                <h2
                  onClick={() => {
                    if (post.type === 'article') {
                      setSelectedArticle(post);
                    }
                  }}
                  style={{
                    margin: '6px 0 8px',
                    fontSize: 'clamp(16px, 2.2vw, 19px)',
                    fontWeight: 700,
                    fontFamily: 'var(--font-outfit)',
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.35,
                    cursor: post.type === 'article' ? 'pointer' : 'default',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (post.type === 'article') e.currentTarget.style.color = '#fe3c01';
                  }}
                  onMouseLeave={(e) => {
                    if (post.type === 'article') e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  {post.title}
                </h2>

                {/* Excerpt / Thought text */}
                <p
                  style={{
                    margin: '0 0 12px',
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    color: '#d4d4d8',
                  }}
                >
                  {post.excerpt}
                </p>

                {/* Optional Cover Image (for Articles) */}
                {post.image && (
                  <div
                    onClick={() => setSelectedArticle(post)}
                    style={{
                      borderRadius: 14,
                      overflow: 'hidden',
                      marginBottom: 12,
                      cursor: 'pointer',
                      border: '1px solid #27272a',
                      background: '#18181b',
                      aspectRatio: '16/9',
                    }}
                    title="Click to read full article"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </div>
                )}

                {/* Tags */}
                {post.tags && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 6,
                      marginBottom: 14,
                    }}
                  >
                    {post.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: '#fe3c01',
                          background: 'rgba(254, 60, 1, 0.08)',
                          padding: '2px 8px',
                          borderRadius: 6,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* ─── 4 Interactive Action Buttons (Like, Reply, Repost, Share) ─── */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                    paddingTop: 4,
                  }}
                >
                  {/* 1. Like ❤️ */}
                  <button
                    type="button"
                    onClick={() => handleToggleLike(post.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      color: post.isLiked ? '#fe3c01' : '#a1a1aa',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      transform: post.isLiked ? 'scale(1.05)' : 'scale(1)',
                    }}
                    title="Like thread"
                  >
                    <Heart
                      size={17}
                      fill={post.isLiked ? '#fe3c01' : 'none'}
                      color={post.isLiked ? '#fe3c01' : 'currentColor'}
                    />
                    <span>{post.likes}</span>
                  </button>

                  {/* 2. Reply 💬 */}
                  <button
                    type="button"
                    onClick={() => handleToggleReplyBox(post.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      color: post.showReplyBox ? '#ffffff' : '#a1a1aa',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'color 0.15s ease',
                    }}
                    title="Reply to thread"
                  >
                    <MessageCircle size={17} />
                    <span>{post.repliesList?.length || 0}</span>
                  </button>

                  {/* 3. Repost 🔁 */}
                  <button
                    type="button"
                    onClick={() => handleToggleRepost(post.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      color: post.isReposted ? '#10b981' : '#a1a1aa',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'color 0.15s ease',
                    }}
                    title="Repost thread"
                  >
                    <Repeat2 size={17} />
                    <span>{post.reposts}</span>
                  </button>

                  {/* 4. Share ↗️ */}
                  <button
                    type="button"
                    onClick={() => handleShare(post)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      color: '#a1a1aa',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'color 0.15s ease',
                    }}
                    title="Share thread"
                  >
                    <Share2 size={16} />
                    <span>Share</span>
                  </button>

                  {/* Read Article Fullscreen trigger (for long-form articles) */}
                  {post.type === 'article' && (
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(post)}
                      style={{
                        marginLeft: 'auto',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid #27272a',
                        color: '#f4f4f5',
                        borderRadius: 100,
                        padding: '4px 12px',
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#fe3c01';
                        e.currentTarget.style.borderColor = '#fe3c01';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = '#27272a';
                        e.currentTarget.style.color = '#f4f4f5';
                      }}
                    >
                      <Eye size={12} />
                      <span>Read full</span>
                      <ArrowUpRight size={12} />
                    </button>
                  )}
                </div>

                {/* ─── Expandable Reply / Comment Thread Box ─── */}
                {post.showReplyBox && (
                  <div
                    style={{
                      marginTop: 16,
                      padding: 14,
                      background: '#121215',
                      borderRadius: 12,
                      border: '1px solid #27272a',
                    }}
                  >
                    {/* Existing replies */}
                    {post.repliesList?.length > 0 && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 12,
                          marginBottom: 14,
                          paddingBottom: 12,
                          borderBottom: '1px solid #1f1f23',
                        }}
                      >
                        {post.repliesList.map((rep) => (
                          <div
                            key={rep.id}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 10,
                            }}
                          >
                            <div
                              style={{
                                width: 28,
                                height: 28,
                                borderRadius: '50%',
                                background: '#27272a',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 11,
                                fontWeight: 700,
                                color: '#d4d4d8',
                                flexShrink: 0,
                              }}
                            >
                              {rep.author[0]}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 6,
                                  fontSize: 12,
                                  marginBottom: 2,
                                }}
                              >
                                <span style={{ fontWeight: 700, color: '#ffffff' }}>
                                  {rep.author}
                                </span>
                                <span style={{ color: '#71717a' }}>{rep.handle}</span>
                                <span style={{ color: '#52525b' }}>•</span>
                                <span style={{ color: '#71717a' }}>{rep.time}</span>
                              </div>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: 13,
                                  lineHeight: 1.5,
                                  color: '#d4d4d8',
                                }}
                              >
                                {rep.text}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* New reply input */}
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <input
                        type="text"
                        value={post.replyInput}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPosts((prev) =>
                            prev.map((p) => (p.id === post.id ? { ...p, replyInput: val } : p))
                          );
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSubmitReply(post.id);
                        }}
                        placeholder={`Reply to @datlee27...`}
                        style={{
                          flex: 1,
                          background: '#18181b',
                          border: '1px solid #27272a',
                          borderRadius: 8,
                          padding: '8px 12px',
                          color: '#ffffff',
                          fontSize: 13,
                          outline: 'none',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleSubmitReply(post.id)}
                        disabled={!post.replyInput.trim()}
                        style={{
                          background: post.replyInput.trim() ? '#fe3c01' : '#27272a',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: 8,
                          padding: '8px 16px',
                          fontSize: 13,
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <Send size={12} />
                        <span>Post</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* ─── Footer Stamp ─── */}
        <footer
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: '1px solid #1f1f23',
            textAlign: 'center',
            fontSize: 13,
            color: '#71717a',
          }}
        >
          <div style={{ marginBottom: 6, fontWeight: 700, color: '#a1a1aa' }}>
            Dat Le • Engineering Logic, Crafting Digital Experiences
          </div>
          <div>© {new Date().getFullYear()} Dat Le. Designed with Threads aesthetics & dl*</div>
        </footer>
      </main>

      {/* ─── Toast Notification (Floating bottom center) ─── */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(24, 24, 27, 0.95)',
            border: '1px solid #3f3f46',
            backdropFilter: 'blur(12px)',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: 100,
            fontSize: 13,
            fontWeight: 600,
            zIndex: 99999,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            animation: 'fadeInUp 0.25s ease',
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* ─── Full Article Reader Modal (macOS TitleBar Design) ─── */}
      {selectedArticle && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setSelectedArticle(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 780,
              maxHeight: '90vh',
              background: '#0e0e11',
              borderRadius: 16,
              border: '1px solid #27272a',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* macOS TitleBar Header */}
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
              {/* Traffic Lights (Red, Yellow, Green) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: 80 }}>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  title="Close Article"
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
                  onClick={() => setSelectedArticle(null)}
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

              {/* Title in center */}
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#a1a1aa',
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '60%',
                  textAlign: 'center',
                }}
              >
                Article – {selectedArticle.title}
              </div>

              {/* Share shortcut */}
              <div style={{ width: 80, display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => handleShare(selectedArticle)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#a1a1aa',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                  title="Copy link"
                >
                  <Share2 size={12} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Modal Body (Scrollable) */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '28px clamp(16px, 4vw, 36px)',
              }}
            >
              {/* Meta header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 16,
                  flexWrap: 'wrap',
                }}
              >
                <img
                  src={avatarUrl}
                  alt="Dat Le"
                  style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#ffffff' }}>Dat Le</div>
                  <div style={{ fontSize: 12, color: '#71717a' }}>
                    {selectedArticle.date} • {selectedArticle.readTime}
                  </div>
                </div>
              </div>

              {/* Article Title */}
              <h1
                style={{
                  fontFamily: 'var(--font-outfit)',
                  fontSize: 'clamp(24px, 3.5vw, 36px)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.25,
                  color: '#ffffff',
                  margin: '0 0 16px',
                }}
              >
                {selectedArticle.title}
              </h1>

              {/* Cover Image */}
              {selectedArticle.image && (
                <div
                  style={{
                    borderRadius: 14,
                    overflow: 'hidden',
                    marginBottom: 24,
                    aspectRatio: '16/9',
                    border: '1px solid #27272a',
                  }}
                >
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              {/* Article Content Rendered */}
              <div
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: '#e4e4e7',
                }}
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />

              {/* Divider & Action Footer */}
              <div
                style={{
                  marginTop: 40,
                  paddingTop: 20,
                  borderTop: '1px solid #27272a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <button
                    type="button"
                    onClick={() => handleToggleLike(selectedArticle.id)}
                    style={{
                      background: selectedArticle.isLiked ? 'rgba(254, 60, 1, 0.15)' : '#18181b',
                      border: '1px solid #27272a',
                      color: selectedArticle.isLiked ? '#fe3c01' : '#ffffff',
                      borderRadius: 100,
                      padding: '8px 18px',
                      fontSize: 13,
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <Heart
                      size={14}
                      fill={selectedArticle.isLiked ? '#fe3c01' : 'none'}
                      color={selectedArticle.isLiked ? '#fe3c01' : 'currentColor'}
                    />
                    <span>{selectedArticle.likes} Likes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShare(selectedArticle)}
                    style={{
                      background: '#18181b',
                      border: '1px solid #27272a',
                      color: '#ffffff',
                      borderRadius: 100,
                      padding: '8px 18px',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <Share2 size={14} />
                    <span>Share Article</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  style={{
                    background: '#fe3c01',
                    border: 'none',
                    color: '#ffffff',
                    borderRadius: 100,
                    padding: '8px 20px',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span>Done Reading</span>
                  <Check size={14} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
