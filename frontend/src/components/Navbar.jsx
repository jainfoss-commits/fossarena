import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import './Navbar.css';

// Crisp SVG Icons for Instagram & LinkedIn
function InstagramIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="site-header">
      <div className="navbar-container">
        {/* Left: Brand Logo & Company Name */}
        <div className="nav-brand">
          <span className="brand-dot" aria-hidden="true"></span>
          <span className="brand-name">Foss Club</span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="nav-center" aria-label="Main Navigation">
          <a href="#about" className="nav-link" onClick={(e) => e.preventDefault()}>
            About
          </a>
          <a href="#events" className="nav-link" onClick={(e) => e.preventDefault()}>
            Events
          </a>
          <a href="#placements" className="nav-link" onClick={(e) => e.preventDefault()}>
            Placements
          </a>
        </nav>

        {/* Right: Explore button with popping social buttons toward the left */}
        <div className="nav-right">
          <div
            className={`explore-action-group ${isHovered ? 'is-active' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Popped out social icon buttons toward the left */}
            <div className="social-popover" aria-hidden={!isHovered}>
              <button
                type="button"
                className="social-icon-btn instagram-btn"
                aria-label="Instagram"
                title="Instagram"
                onClick={(e) => e.preventDefault()}
              >
                <InstagramIcon size={14} />
              </button>
              <button
                type="button"
                className="social-icon-btn linkedin-btn"
                aria-label="LinkedIn"
                title="LinkedIn"
                onClick={(e) => e.preventDefault()}
              >
                <LinkedinIcon size={14} />
              </button>
            </div>

            {/* Explore Pill Button */}
            <button
              type="button"
              className="nav-explore-btn"
              onClick={(e) => e.preventDefault()}
              aria-label="Explore"
            >
              <Compass size={15} className="btn-icon" />
              <span>Explore</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
