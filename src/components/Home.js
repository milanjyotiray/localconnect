import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

function Home({ posts, user, userLocation }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'All Posts', icon: '📋' },
    { key: 'urgent', label: 'Urgent', icon: '🚨' },
    { key: 'lost-pet', label: 'Lost Pets', icon: '🐾' },
    { key: 'event', label: 'Events', icon: '📅' },
    { key: 'help-request', label: 'Help', icon: '🤝' },
    { key: 'announcement', label: 'News', icon: '📢' }
  ];

  const filteredPosts = posts.filter(post => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'urgent') return post.urgent;
    return post.type === activeFilter;
  });

  const getPostTypeLabel = (type) => {
    const typeMap = {
      'lost-pet': 'Lost Pet',
      'event': 'Event',
      'help-request': 'Help Request',
      'announcement': 'Announcement'
    };
    return typeMap[type] || type;
  };

  const formatTimeAgo = (timestamp) => {
    try {
      return formatDistance(new Date(timestamp), new Date(), { addSuffix: true });
    } catch (error) {
      return 'Recently';
    }
  };

  return (
    <div>
      <header className="header">
        <h1>🏡 LocalConnect</h1>
        <div className="location">
          📍 {user?.neighborhood || 'Your Neighborhood'}
        </div>
      </header>

      <div className="main-content">
        {/* Filters */}
        <div className="filters">
          {filters.map(filter => (
            <button
              key={filter.key}
              className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.icon} {filter.label}
            </button>
          ))}
        </div>

        {/* Posts Feed */}
        <div className="posts-feed">
          {filteredPosts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <h3>No posts found</h3>
              <p>
                {activeFilter === 'all' 
                  ? "Be the first to share something with your community!"
                  : `No ${activeFilter.replace('-', ' ')} posts yet.`
                }
              </p>
              <Link to="/new-post" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Create First Post
              </Link>
            </div>
          ) : (
            filteredPosts.map(post => (
              <div key={post.id} className={`post ${post.urgent ? 'urgent' : ''}`}>
                <div className="post-header">
                  <div className={`post-type ${post.type}`}>
                    {getPostTypeLabel(post.type)}
                  </div>
                  {post.urgent && (
                    <div className="urgent-badge">
                      🚨 URGENT
                    </div>
                  )}
                </div>
                
                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">{post.content}</p>
                
                {post.imagePreview && (
                  <div className="post-image-container">
                    <img src={post.imagePreview} alt={post.title} className="post-image" />
                  </div>
                )}
                
                {post.contact && (
                  <div className="contact-info">
                    <strong>Contact:</strong> {post.contact}
                  </div>
                )}
                
                <div className="post-meta">
                  <div>
                    <span className="post-author">👤 {post.author}</span>
                  </div>
                  <div>
                    <span className="post-location">📍 {post.location}</span>
                  </div>
                </div>
                
                <div className="post-meta" style={{ borderTop: 'none', paddingTop: '0.25rem' }}>
                  <small>🕒 {formatTimeAgo(post.timestamp)}</small>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <Link to="/new-post" className="fab" title="Create new post">
        <span className="fab-icon">+</span>
      </Link>
    </div>
  );
}

export default Home;
