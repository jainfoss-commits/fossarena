import React from 'react';
import FossClubAnimation from './FossClubAnimation';
import './SmoothTextWriter.css';

export default function SmoothTextWriter({ shouldStart = true }) {
  return (
    <div className="smooth-text-writer-wrap">
      {/* Rejouice-Inspired Kinetic Typography: FOSS CLUB */}
      <div className="foss-club-headline-container">
        <FossClubAnimation autoplay={shouldStart} />
      </div>

      {/* Smoothly Revealed Secondary Subhead */}
      <div className={`writer-subtitle-wrap ${shouldStart ? 'subtitle-visible' : ''}`}>
        <h2 className="writer-tagline">
          Built by the community, <span className="gradient-highlight">for the community.</span>
        </h2>
      </div>
    </div>
  );
}
