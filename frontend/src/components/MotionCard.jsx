import React, { useRef, useState } from 'react';

export default function MotionCard({
  icon: Icon,
  badge,
  title,
  description,
  accentColor = '#38bdf8',
  metrics,
  tags = [],
  actionText = 'Explore Architecture',
  onClick,
}) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -9; // Max tilt 9 deg
    const rotateY = ((x - centerX) / centerX) * 9;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.28,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      className={`motion-interactive-card ${isHovered ? 'is-card-hovered' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${
          isHovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)'
        }`,
        transition: isHovered
          ? 'transform 0.15s ease-out, box-shadow 0.25s ease, border-color 0.25s ease'
          : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease, border-color 0.4s ease',
        '--card-accent': accentColor,
      }}
    >
      {/* Dynamic Specular Glare Reflection */}
      <div
        className="card-specular-glare"
        style={{
          background: `radial-gradient(circle 280px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}), transparent 70%)`,
        }}
      />

      {/* Card Header & Icon */}
      <div className="card-top-row">
        {Icon && (
          <div className="card-icon-emblem" style={{ color: accentColor }}>
            <Icon size={22} />
          </div>
        )}
        {badge && (
          <span className="card-category-chip" style={{ borderColor: `${accentColor}33` }}>
            <span className="chip-bullet" style={{ backgroundColor: accentColor }} />
            {badge}
          </span>
        )}
      </div>

      <h3 className="card-heading">{title}</h3>
      <p className="card-body-text">{description}</p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="card-tags-flex">
          {tags.map((tag, idx) => (
            <span key={idx} className="card-mini-tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Card Footer Metric & Action */}
      <div className="card-bottom-row">
        {metrics && (
          <div className="card-metric-badge">
            <span className="metric-accent-dot" style={{ backgroundColor: accentColor }} />
            <span>{metrics}</span>
          </div>
        )}
        <span className="card-action-link" style={{ color: accentColor }}>
          {actionText} &rarr;
        </span>
      </div>
    </div>
  );
}
