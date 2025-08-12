import React from 'react';
import { formatDistance } from 'date-fns';

function Profile({ user, onLogout }) {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatJoinDate = (dateString) => {
    try {
      return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
    } catch (error) {
      return 'Recently';
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  return (
    <div>
      <div className="profile-header">
        <div className="profile-avatar">
          {getInitials(user.name)}
        </div>
        <h2 className="profile-name">{user.name}</h2>
        <div className="profile-location">
          📍 {user.neighborhood}
        </div>
      </div>

      <div className="main-content">
        {/* User Info Card */}
        <div className="form">
          <h3 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>
            👤 Account Information
          </h3>
          
          <div className="form-group">
            <label>Full Name</label>
            <div className="form-control" style={{ background: '#f8f9fa', cursor: 'not-allowed' }}>
              {user.name}
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="form-control" style={{ background: '#f8f9fa', cursor: 'not-allowed' }}>
              {user.email}
            </div>
          </div>

          <div className="form-group">
            <label>Neighborhood</label>
            <div className="form-control" style={{ background: '#f8f9fa', cursor: 'not-allowed' }}>
              {user.neighborhood}
            </div>
          </div>

          <div className="form-group">
            <label>Member Since</label>
            <div className="form-control" style={{ background: '#f8f9fa', cursor: 'not-allowed' }}>
              {formatJoinDate(user.joinedAt)}
            </div>
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="form">
          <h3 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>
            🤝 Community Guidelines
          </h3>
          
          <div style={{ color: '#555', lineHeight: '1.6' }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>LocalConnect</strong> is a safe space for neighbors to connect and help each other. 
              Please follow these guidelines:
            </p>
            
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
              <li><strong>Be respectful:</strong> Treat everyone with kindness and respect</li>
              <li><strong>Be honest:</strong> Share accurate information and authentic posts</li>
              <li><strong>Stay local:</strong> Keep posts relevant to your neighborhood</li>
              <li><strong>Be safe:</strong> Don't share personal details like home addresses</li>
              <li><strong>Be helpful:</strong> Offer assistance when you can</li>
            </ul>
            
            <p style={{ fontSize: '0.9rem', color: '#777' }}>
              Report any inappropriate content or behavior to help keep our community safe.
            </p>
          </div>
        </div>

        {/* App Features */}
        <div className="form">
          <h3 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>
            ✨ App Features
          </h3>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🐾</span>
              <div>
                <strong>Lost Pet Alerts</strong>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  Quickly report and help find missing pets
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>📅</span>
              <div>
                <strong>Community Events</strong>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  Discover and share local events and meetups
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🤝</span>
              <div>
                <strong>Help Requests</strong>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  Ask for or offer help to your neighbors
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🚨</span>
              <div>
                <strong>Urgent Alerts</strong>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  Mark important posts for immediate attention
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About the App */}
        <div className="form">
          <h3 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>
            📱 About LocalConnect
          </h3>
          
          <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '1rem' }}>
            LocalConnect is designed to bring neighborhoods together through simple, 
            safe, and meaningful connections. Built with privacy and community in mind, 
            it helps you stay informed about what's happening around you and connect 
            with neighbors who care.
          </p>
          
          <div style={{ 
            background: '#e8f4fd', 
            padding: '1rem', 
            borderRadius: '8px',
            fontSize: '0.9rem',
            color: '#2c5aa0'
          }}>
            <strong>💡 Tip:</strong> Your data stays on your device. We believe in privacy 
            and community ownership of local information.
          </div>
        </div>

        {/* Logout Button */}
        <div style={{ marginTop: '2rem' }}>
          <button 
            onClick={handleLogout}
            className="btn btn-danger btn-block"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
