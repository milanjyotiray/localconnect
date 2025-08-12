import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      icon: '🏡',
      label: 'Home'
    },
    {
      path: '/new-post',
      icon: '✨',
      label: 'Create'
    },
    {
      path: '/profile',
      icon: '👤',
      label: 'Profile'
    }
  ];

  return (
    <nav className="navigation">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export default Navigation;
