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
      // Initialize with some sample posts with realistic neighborhood examples
      const samplePosts = [
        {
          id: '1',
          type: 'lost-pet',
          title: 'URGENT: Lost Golden Retriever - Max',
          content: 'My golden retriever Max went missing this morning during our walk. He\'s wearing a blue collar with tags. Very friendly but may be scared. Last seen near Starbucks on University Ave. Please call immediately if you spot him!',
          author: 'Jennifer Chen',
          timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
          location: 'University Avenue & 5th Street',
          urgent: true,
          contact: 'jennifer.chen.sf@gmail.com',
          imagePreview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImEiIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjUwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZDcwMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2ZmYjMwMCIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2EpIiByeD0iMTIiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjQwIiBmaWxsPSIjZmY5NTAwIiBvcGFjaXR5PSIwLjgiLz48ZWxsaXBzZSBjeD0iMjAwIiBjeT0iMTgwIiByeD0iNjAiIHJ5PSI0NSIgZmlsbD0iI2ZmOTUwMCIgb3BhY2l0eT0iMC45Ii8+PHRleHQgeD0iMjAwIiB5PSIyNDAiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPk1BWCAtIEdvbGRlbiBSZXRyaWV2ZXI8L3RleHQ+PHRleHQgeD0iMjAwIiB5PSIyNzAiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOCkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJsdWUgQ29sbGFyIC0gVmVyeSBGcmllbmRseTwvdGV4dD48L3N2Zz4='
        },
        {
          id: '2',
          type: 'event',
          title: 'Weekend Farmers Market - Fresh Local Produce',
          content: 'Join us every Saturday from 8 AM - 2 PM for fresh organic vegetables, artisanal breads, local honey, and handmade crafts. This week featuring live music by the Thompson Family Band! Free coffee for first 50 visitors.',
          author: 'Mission District Farmers Market',
          timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          location: 'Mission Dolores Park, 19th & Dolores St',
          urgent: false,
          imagePreview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM0Y2FmNTAiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzJlN2QzMiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzFiNWUyMCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2IpIiByeD0iMTIiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjI1IiBmaWxsPSIjZmY1NzIyIiBvcGFjaXR5PSIwLjkiLz48Y2lyY2xlIGN4PSIzMDAiIGN5PSIxMDAiIHI9IjIwIiBmaWxsPSIjZmZlYjNiIiBvcGFjaXR5PSIwLjkiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSIxNzAiIHI9IjE4IiBmaWxsPSIjZTc0YzNjIiBvcGFjaXR5PSIwLjkiLz48Y2lyY2xlIGN4PSIyNTAiIGN5PSIxNzAiIHI9IjIyIiBmaWxsPSIjOWM1NGIwIiBvcGFjaXR5PSIwLjkiLz48dGV4dCB4PSIyMDAiIHk9IjI0MCIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iYm9sZCI+RkFSTUVSUyBNQVJLRVQ8L3RleHQ+PHRleHQgeD0iMjAwIiB5PSIyNzAiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOCkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZyZXNoIExvY2FsIFByb2R1Y2UgJiBMaXZlIE11c2ljPC90ZXh0Pjwvc3ZnPg=='
        },
        {
          id: '3',
          type: 'help-request',
          title: 'Need Help Moving Piano - Pizza & Beer Included!',
          content: 'Moving my grandmother\'s baby grand piano this Sunday around 2 PM. Need 4-5 strong people to help get it from my apartment to a truck. Professional movers will handle the truck part. Providing plenty of pizza, beer, and good stories!',
          author: 'David Rodriguez',
          timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          location: '2847 24th Street (near Bartlett)',
          urgent: false,
          contact: 'dave.rodriguez.music@gmail.com',
          imagePreview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImMiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMzNDM0MzQiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxYTFhMWEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNjKSIgcng9IjEyIi8+PHJlY3QgeD0iNTAiIHk9IjEwMCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiM4ZDZlNjMiIHJ4PSI4Ii8+PHJlY3QgeD0iNjAiIHk9IjEyMCIgd2lkdGg9IjI4MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZmZmZiIgcng9IjQiLz48cmVjdCB4PSI3MCIgeT0iMTMwIiB3aWR0aD0iMjAiIGhlaWdodD0iNDAiIGZpbGw9IiMzNDM0MzQiLz48cmVjdCB4PSIxMDAiIHk9IjEzMCIgd2lkdGg9IjE1IiBoZWlnaHQ9IjI1IiBmaWxsPSIjMzQzNDM0Ii8+PHJlY3QgeD0iMTI1IiB5PSIxMzAiIHdpZHRoPSIxNSIgaGVpZ2h0PSIyNSIgZmlsbD0iIzM0MzQzNCIvPjx0ZXh0IHg9IjIwMCIgeT0iMjQwIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5CQUJZIEdSQU5EIFBJQU5PPC90ZXh0Pjx0ZXh0IHg9IjIwMCIgeT0iMjcwIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjgpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5OZWVkIDQtNSBTdHJvbmcgSGVscGVycyE8L3RleHQ+PC9zdmc+'
        },
        {
          id: '4',
          type: 'announcement',
          title: 'New Dog Park Opens at Precita Park!',
          content: 'Exciting news! The long-awaited off-leash dog area at Precita Park is now officially open! Features include separate areas for large and small dogs, agility equipment, water fountains, and waste stations. Grand opening celebration this Saturday 11 AM with free dog treats and adoption fair.',
          author: 'San Francisco Parks & Recreation',
          timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
          location: 'Precita Park, Precita Ave & Folsom St',
          urgent: false,
          imagePreview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM4N2NlZWIiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM0ZmI0ZDgiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNkKSIgcng9IjEyIi8+PGVsbGlwc2UgY3g9IjIwMCIgY3k9IjI1MCIgcng9IjE4MCIgcnk9IjMwIiBmaWxsPSIjMjdkNzNlIiBvcGFjaXR5PSIwLjgiLz48Y2lyY2xlIGN4PSIxNDAiIGN5PSIxNDAiIHI9IjIwIiBmaWxsPSIjOGQ1NTI0IiBvcGFjaXR5PSIwLjgiLz48Y2lyY2xlIGN4PSIxNjAiIGN5PSIxMjAiIHI9IjE1IiBmaWxsPSIjOGQ1NTI0IiBvcGFjaXR5PSIwLjciLz48Y2lyY2xlIGN4PSIyNjAiIGN5PSIxNjAiIHI9IjI1IiBmaWxsPSIjZmZkNzAwIiBvcGFjaXR5PSIwLjciLz48Y2lyY2xlIGN4PSIyNDAiIGN5PSIxNDAiIHI9IjE4IiBmaWxsPSIjZmZkNzAwIiBvcGFjaXR5PSIwLjgiLz48Y2lyY2xlIGN4PSIzMjAiIGN5PSIxMjAiIHI9IjE1IiBmaWxsPSIjZmY0NDQ0IiBvcGFjaXR5PSIwLjgiLz48dGV4dCB4PSIyMDAiIHk9IjIxMCIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iYm9sZCI+TkVXIERPRyBQQVJLIE9QRU4hPC90ZXh0Pjx0ZXh0IHg9IjIwMCIgeT0iMjMwIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5PZmYtbGVhc2ggQXJlYSB8IEFnaWxpdHkgRXF1aXBtZW50PC90ZXh0Pjwvc3ZnPg=='
        },
        {
          id: '5',
          type: 'lost-pet',
          title: 'Missing: Small Black & White Cat "Luna"',
          content: 'Our indoor cat Luna escaped yesterday evening when we were bringing in groceries. She\'s very timid and likely hiding. Black with white chest and paws, green eyes. Please check your garages, basements, and under porches. She may not come when called.',
          author: 'Maria Santos',
          timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
          location: 'Castro District, near 18th & Castro',
          urgent: true,
          contact: '(415) 555-0147',
          imagePreview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImUiIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjUwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzMzMzMzMyIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2UpIiByeD0iMTIiLz48ZWxsaXBzZSBjeD0iMjAwIiBjeT0iMTgwIiByeD0iNDAiIHJ5PSI1NSIgZmlsbD0iIzMzMzMzMyIgb3BhY2l0eT0iMC45Ii8+PGVsbGlwc2UgY3g9IjIwMCIgY3k9IjE2NSIgcng9IjI1IiByeT0iMzAiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjk1Ii8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMTMwIiByPSIzNSIgZmlsbD0iIzMzMzMzMyIgb3BhY2l0eT0iMC45Ii8+PGNpcmNsZSBjeD0iMTg1IiBjeT0iMTI1IiByPSI4IiBmaWxsPSIjMDBmZjAwIiBvcGFjaXR5PSIwLjgiLz48Y2lyY2xlIGN4PSIyMTUiIGN5PSIxMjUiIHI9IjgiIGZpbGw9IiMwMGZmMDAiIG9wYWNpdHk9IjAuOCIvPjx0ZXh0IHg9IjIwMCIgeT0iMjQwIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5MVU5BIC0gSW5kb29yIENhdDwvdGV4dD48dGV4dCB4PSIyMDAiIHk9IjI3MCIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44KSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QmxhY2sgJiBXaGl0ZSAtIEdyZWVuIEV5ZXM8L3RleHQ+PC9zdmc+'
        },
        {
          id: '6',
          type: 'event',
          title: 'Block Party BBQ - Valencia Street',
          content: 'Annual Valencia Street Block Party is back! Saturday 1-8 PM with BBQ, live music, kids activities, and local vendors. Bring a side dish to share. We\'ll provide the grilled goods and drinks. Come meet your neighbors and enjoy great food!',
          author: 'Valencia St Neighborhood Assoc',
          timestamp: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
          location: 'Valencia Street (20th-21st St block)',
          urgent: false,
          imagePreview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImYiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZjcwNDMiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZjQzNDMiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNmKSIgcng9IjEyIi8+PGVsbGlwc2UgY3g9IjIwMCIgY3k9IjE1MCIgcng9IjgwIiByeT0iNDAiIGZpbGw9IiM4ZDU1MjQiIG9wYWNpdHk9IjAuOCIvPjxlbGxpcHNlIGN4PSIxNTAiIGN5PSIxODAiIHJ4PSI0MCIgcnk9IjIwIiBmaWxsPSIjZjY5NDA2IiBvcGFjaXR5PSIwLjciLz48ZWxsaXBzZSBjeD0iMjUwIiBjeT0iMTgwIiByeD0iNDAiIHJ5PSIyMCIgZmlsbD0iI2Y2OTQwNiIgb3BhY2l0eT0iMC43Ii8+PGNpcmNsZSBjeD0iMzIwIiBjeT0iMTAwIiByPSIxNSIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC44Ii8+PGNpcmNsZSBjeD0iMzQwIiBjeT0iMTIwIiByPSIxMiIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC43Ii8+PHRleHQgeD0iMjAwIiB5PSIyMzAiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPkJMT0NLIFBBUlRZIEJCUSE8L3RleHQ+PHRleHQgeD0iMjAwIiB5PSIyNjAiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOSkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxpdmUgTXVzaWMgfCBLaWRzIEFjdGl2aXRpZXMgfCBMb2NhbCBWZW5kb3JzPC90ZXh0Pjwvc3ZnPg=='
        },
        {
          id: '7',
          type: 'help-request',
          title: 'Senior Neighbor Needs Grocery Shopping Help',
          content: 'My 78-year-old neighbor Mrs. Chen needs help with weekly grocery shopping. She uses a walker and finds it difficult to carry bags. Looking for a kind neighbor who could assist every Thursday morning. She can pay for her groceries + a small thank you.',
          author: 'Amy Wilson',
          timestamp: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
          location: 'Richmond District, near 38th Ave',
          urgent: false,
          contact: 'amywilson.sf@gmail.com'
        },
        {
          id: '8',
          type: 'announcement',
          title: 'Free Community WiFi Hotspot Installed',
          content: 'Great news! A new free public WiFi hotspot has been installed at the bus stop on 16th and Mission. Password is "Community2024". This is part of the city\'s digital equity initiative to provide internet access to all residents.',
          author: 'SF Digital Equity Team',
          timestamp: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
          location: '16th & Mission St Bus Stop',
          urgent: false,
          imagePreview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM0Mjg1ZjQiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxNTY1YzAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNnKSIgcng9IjEyIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMTUwIiByPSI2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI4IiBvcGFjaXR5PSIwLjMiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNTAiIHI9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjYiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iNCIgb3BhY2l0eT0iMC45Ii8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMTUwIiByPSI4IiBmaWxsPSJ3aGl0ZSIvPjx0ZXh0IHg9IjIwMCIgeT0iMjMwIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5GUkVFIFdJRkkgSE9UU1BPVDwvdGV4dD48dGV4dCB4PSIyMDAiIHk9IjI2MCIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC45KSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UGFzc3dvcmQ6IENvbW11bml0eTIwMjQ8L3RleHQ+PC9zdmc+'
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
