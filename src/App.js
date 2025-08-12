import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Profile from './components/Profile';
import NewPost from './components/NewPost';
import Login from './components/Login';
import Navigation from './components/Navigation';

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('localconnect_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Load posts from localStorage
    const savedPosts = localStorage.getItem('localconnect_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Initialize with some sample posts
      const samplePosts = [
        {
          id: '1',
          type: 'lost-pet',
          title: 'Lost Cat - Fluffy',
          content: 'My orange tabby cat Fluffy has been missing since yesterday. Last seen near Oak Street. Please call if you see him!',
          author: 'Sarah M.',
          timestamp: new Date().toISOString(),
          location: 'Oak Street Area',
          urgent: true,
          contact: 'sarah@email.com'
        },
        {
          id: '2',
          type: 'event',
          title: 'Community Garden Cleanup',
          content: 'Join us this Saturday at 10 AM for our monthly community garden cleanup. Bring gloves and water!',
          author: 'Community Garden Team',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          location: 'Community Garden, Maple Ave',
          urgent: false
        },
        {
          id: '3',
          type: 'help-request',
          title: 'Need help moving furniture',
          content: 'Looking for 2-3 people to help move a couch up to the second floor. Can offer pizza and drinks!',
          author: 'Mike R.',
          timestamp: new Date(Date.now() - 172800000).toISOString(),
          location: 'Pine Street',
          urgent: false,
          contact: 'mike@email.com'
        }
      ];
      setPosts(samplePosts);
      localStorage.setItem('localconnect_posts', JSON.stringify(samplePosts));
    }

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('localconnect_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('localconnect_user');
  };

  const addPost = (newPost) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('localconnect_posts', JSON.stringify(updatedPosts));
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home posts={posts} user={user} userLocation={userLocation} />} />
          <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
          <Route path="/new-post" element={<NewPost user={user} onAddPost={addPost} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
