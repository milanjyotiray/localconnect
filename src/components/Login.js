import React, { useState } from 'react';

function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && neighborhood.trim() && email.trim()) {
      const userData = {
        name: name.trim(),
        neighborhood: neighborhood.trim(),
        email: email.trim(),
        joinedAt: new Date().toISOString()
      };
      onLogin(userData);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">🏡 LocalConnect</h1>
        <p className="app-description">
          Connect with your neighbors, share updates, and discover what's happening in your local community.
        </p>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="neighborhood">Your Neighborhood</label>
            <input
              type="text"
              id="neighborhood"
              className="form-control"
              placeholder="e.g., Mission District, Castro, Richmond, etc."
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary btn-block">
            Join LocalConnect
          </button>
        </form>
        
        <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666', textAlign: 'center' }}>
          By joining, you agree to be part of a safe and respectful community.
        </div>
      </div>
    </div>
  );
}

export default Login;
