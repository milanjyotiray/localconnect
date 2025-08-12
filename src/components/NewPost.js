import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function NewPost({ user, onAddPost }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'announcement',
    title: '',
    content: '',
    location: user?.neighborhood || '',
    urgent: false,
    contact: user?.email || '',
    image: null,
    imagePreview: null
  });
  
  const fileInputRef = useRef(null);

  const postTypes = [
    { value: 'lost-pet', label: '🐾 Lost Pet', description: 'Report a missing pet' },
    { value: 'event', label: '📅 Community Event', description: 'Share upcoming events' },
    { value: 'help-request', label: '🤝 Help Request', description: 'Ask for assistance' },
    { value: 'announcement', label: '📢 General Announcement', description: 'Share news or updates' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const newPost = {
      id: uuidv4(),
      ...formData,
      author: user.name,
      timestamp: new Date().toISOString(),
      title: formData.title.trim(),
      content: formData.content.trim(),
      location: formData.location.trim() || user.neighborhood
    };

    onAddPost(newPost);
    navigate('/');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: null
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getPlaceholderText = () => {
    const placeholders = {
      'lost-pet': 'Describe your pet: breed, color, size, last seen location, and any distinctive features...',
      'event': 'Provide event details: date, time, location, what to bring, and any special instructions...',
      'help-request': 'Explain what kind of help you need, when you need it, and what you can offer in return...',
      'announcement': 'Share your news, updates, or information with the community...'
    };
    return placeholders[formData.type] || 'Share details with your community...';
  };

  return (
    <div>
      <header className="header">
        <h1>✍️ New Post</h1>
        <div className="location">
          Share with {user?.neighborhood}
        </div>
      </header>

      <div className="main-content">
        <form onSubmit={handleSubmit} className="form">
          {/* Post Type */}
          <div className="form-group">
            <label>What would you like to share?</label>
            <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.5rem' }}>
              {postTypes.map(type => (
                <label 
                  key={type.value}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.75rem',
                    border: `2px solid ${formData.type === type.value ? '#667eea' : '#ddd'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: formData.type === type.value ? '#f0f4ff' : 'white',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <input
                    type="radio"
                    name="type"
                    value={type.value}
                    checked={formData.type === type.value}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    style={{ marginRight: '0.75rem' }}
                  />
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                      {type.label}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>
                      {type.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              className="form-control"
              placeholder="Give your post a clear title..."
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              maxLength={100}
              required
            />
            <small style={{ color: '#666' }}>
              {formData.title.length}/100 characters
            </small>
          </div>

          {/* Content */}
          <div className="form-group">
            <label htmlFor="content">Details *</label>
            <textarea
              id="content"
              className="form-control"
              rows="4"
              placeholder={getPlaceholderText()}
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              maxLength={500}
              required
            />
            <small style={{ color: '#666' }}>
              {formData.content.length}/500 characters
            </small>
          </div>

          {/* Location */}
          <div className="form-group">
            <label htmlFor="location">Specific Location</label>
            <input
              type="text"
              id="location"
              className="form-control"
              placeholder="e.g., Near the Community Center, Oak Street, etc."
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label>Add Photo (Optional)</label>
            <div className="image-upload-container">
              {formData.imagePreview ? (
                <div className="image-preview">
                  <img src={formData.imagePreview} alt="Preview" className="preview-image" />
                  <button type="button" className="remove-image-btn" onClick={removeImage}>
                    ✕
                  </button>
                </div>
              ) : (
                <div 
                  className="image-upload-area" 
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="upload-icon">📷</div>
                  <div>Tap to add a photo</div>
                  <small>JPG, PNG, GIF • Max 5MB</small>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="form-group">
            <label htmlFor="contact">Contact Information</label>
            <input
              type="text"
              id="contact"
              className="form-control"
              placeholder="Email, phone, or how people can reach you"
              value={formData.contact}
              onChange={(e) => handleInputChange('contact', e.target.value)}
            />
            <small style={{ color: '#666' }}>
              This will help community members contact you directly
            </small>
          </div>

          {/* Urgent checkbox */}
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.urgent}
                onChange={(e) => handleInputChange('urgent', e.target.checked)}
                style={{ marginRight: '0.5rem' }}
              />
              🚨 This is urgent and needs immediate attention
            </label>
            <small style={{ color: '#666', marginLeft: '1.5rem' }}>
              Urgent posts will be highlighted and appear at the top
            </small>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/')}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 2 }}
            >
              Share with Community
            </button>
          </div>
        </form>

        {/* Safety reminder */}
        <div style={{
          background: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '1rem',
          fontSize: '0.9rem'
        }}>
          <strong>🛡️ Safety Reminder:</strong>
          <ul style={{ margin: '0.5rem 0 0 1rem' }}>
            <li>Only share information you're comfortable making public</li>
            <li>Meet in public places when possible</li>
            <li>Trust your instincts about interactions</li>
            <li>Report any inappropriate content or behavior</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
