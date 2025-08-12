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
          contact: 'sarah@email.com',
          imagePreview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZjk1MDAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZjZhMDAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNhKSIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjNlbSI+8J+QsTA8L3RleHQ+PC9zdmc+'
        },
        {
          id: '2',
          type: 'event',
          title: 'Community Garden Cleanup',
          content: 'Join us this Saturday at 10 AM for our monthly community garden cleanup. Bring gloves and water!',
          author: 'Community Garden Team',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          location: 'Community Garden, Maple Ave',
          urgent: false,
          imagePreview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMyN2FlNjAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxZThjNGYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNiKSIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjNlbSI+8J+MsTA8L3RleHQ+PC9zdmc+'
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
        },
        {
          id: '4',
          type: 'announcement',
          title: 'New Playground Opening!',
          content: 'Our new community playground is finally ready! Grand opening this Sunday at 2 PM. Bring the family for games, food trucks, and fun activities.',
          author: 'City Council',
          timestamp: new Date(Date.now() - 259200000).toISOString(),
          location: 'Central Park',
          urgent: false,
          imagePreview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImMiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMzNDk4ZGIiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMyOTgwYjkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNjKSIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0OCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjNlbSI+8J+OoCDwn4+5PC90ZXh0Pjwvc3ZnPg=='
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
