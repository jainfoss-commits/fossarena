import React, { useState, useEffect } from 'react';
import './SmoothTextWriter.css';

export default function SmoothTextWriter({ shouldStart = true }) {
  const fullText = "FOSS CLUB";
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [activeHoverIdx, setActiveHoverIdx] = useState(null);

  // Smooth letter-by-letter reveal once shouldStart is true
  useEffect(() => {
    if (!shouldStart) return;

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setDisplayedCount(current);
      if (current >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => setIsDone(true), 300);
      }
    }, 110); // Smooth pacing

    return () => clearInterval(interval);
  }, [shouldStart, fullText.length]);

  return (
    <div className="smooth-text-writer-wrap">
      {/* Main Animated Title: FOSS CLUB */}
      <div className="foss-club-headline-container" aria-label="FOSS CLUB">
        <h1 className="foss-club-title">
          {fullText.split('').map((char, index) => {
            const isVisible = index < displayedCount;
            const isSpace = char === ' ';
            const isHovered = activeHoverIdx === index;

            if (isSpace) {
              return <span key={index} className="foss-title-space">&nbsp;</span>;
            }

            return (
              <span
                key={index}
                className={`foss-letter ${isVisible ? 'letter-visible' : 'letter-hidden'} ${isHovered ? 'letter-hovered' : ''}`}
                onMouseEnter={() => setActiveHoverIdx(index)}
                onMouseLeave={() => setActiveHoverIdx(null)}
                style={{
                  '--char-index': index,
                  transitionDelay: `${index * 15}ms`,
                }}
              >
                <span className="letter-inner">{char}</span>
                <span className="letter-glow-layer" aria-hidden="true">{char}</span>
              </span>
            );
          })}

          {/* Smooth Cursor Indicator */}
          <span className={`writer-cursor ${isDone ? 'cursor-breathe' : 'cursor-typing'}`} />
        </h1>
      </div>

      {/* Smoothly Revealed Secondary Subhead */}
      <div className={`writer-subtitle-wrap ${isDone ? 'subtitle-visible' : ''}`}>
        <h2 className="writer-tagline">
          Built by the community, <span className="gradient-highlight">for the community.</span>
        </h2>
        <p className="writer-description">
          We are an engineering collective dedicated to libre software, Linux kernel research,
          distributed systems, AI inference pipelines, and shipping real code in the open.
        </p>
      </div>
    </div>
  );
}
