import React, { useState, useRef, useMemo } from 'react';
import { AVATAR_METADATA, getAvatarDataUrl } from './avatarTextures';
import './FossEcosystem.css';

/**
 * FossEcosystem - Community Avatar Constellation Ball
 * - 1 Center avatar (Maya Lin - blue hair, red shirt, sunglasses)
 * - 4 Mid-ring avatars (Devon, Zuri, Koa, Astrid)
 * - 8 Outer-ring avatars (Elena, Ren, Chloe, Tariq, Leo, Samir, Marcus, Nadia)
 * - Dashed spherical orbital rings & intersecting floral petals (purple, gold, pink, cyan, coral)
 * - Removed all satellite bead balls as requested
 * - Slow, smooth continuous spin
 * - Clean display: NO info card on hover
 */

export default function FossEcosystem() {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const containerRef = useRef(null);

  // Pre-generate data URLs for all 13 avatars
  const avatarUrls = useMemo(() => {
    const urls = {};
    AVATAR_METADATA.forEach((meta) => {
      urls[meta.id] = getAvatarDataUrl(meta.id, 256);
    });
    return urls;
  }, []);

  // Handle smooth 2.5D tilt on mouse hover
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: -y * 12,
      ry: x * 14,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  // Node Geometry Coordinates on a 500x500 SVG Canvas (Center = 250, 250)
  // Outer Radius R = 175, Mid Radius r = 94
  const NODES = [
    // Center
    { id: 'center', cx: 250, cy: 250, r: 42, ring: 'center' },
    // Mid Ring (4 nodes at 45°, 135°, 225°, 315°)
    { id: 'mid-tl', cx: 250 - 66, cy: 250 - 66, r: 34, ring: 'mid' },
    { id: 'mid-tr', cx: 250 + 66, cy: 250 - 66, r: 34, ring: 'mid' },
    { id: 'mid-bl', cx: 250 - 66, cy: 250 + 66, r: 34, ring: 'mid' },
    { id: 'mid-br', cx: 250 + 66, cy: 250 + 66, r: 34, ring: 'mid' },
    // Outer Ring (8 nodes)
    { id: 'outer-t', cx: 250, cy: 250 - 175, r: 26, ring: 'outer' },
    { id: 'outer-tr', cx: 250 + 144, cy: 250 - 100, r: 26, ring: 'outer' },
    { id: 'outer-r', cx: 250 + 175, cy: 250, r: 26, ring: 'outer' },
    { id: 'outer-br', cx: 250 + 144, cy: 250 + 100, r: 26, ring: 'outer' },
    { id: 'outer-b', cx: 250, cy: 250 + 175, r: 26, ring: 'outer' },
    { id: 'outer-bl', cx: 250 - 144, cy: 250 + 100, r: 26, ring: 'outer' },
    { id: 'outer-l', cx: 250 - 175, cy: 250, r: 26, ring: 'outer' },
    { id: 'outer-tl', cx: 250 - 144, cy: 250 - 100, r: 26, ring: 'outer' },
  ];

  return (
    <div
      className="community-ball-wrapper"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 2.5D Parallax Interactive Stage */}
      <div
        className="community-ball-stage"
        style={{
          transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
      >
        {/* Soft Ambient Core Glow */}
        <div className="ball-ambient-halo" />

        {/* SVG Network Constellation Ball */}
        <svg
          className="constellation-svg"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients for Dashed Orbital Arcs */}
            <linearGradient id="gradPurple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>

            <linearGradient id="gradPink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>

            <linearGradient id="gradGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>

            <linearGradient id="gradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            <linearGradient id="gradCoral" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>

            {/* Avatar Circular Clip Paths */}
            {NODES.map((node) => (
              <clipPath id={`clip-${node.id}`} key={`clip-${node.id}`}>
                <circle cx={node.cx} cy={node.cy} r={node.r} />
              </clipPath>
            ))}

            {/* Soft Drop Shadows */}
            <filter id="avatarGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="rgba(0,0,0,0.55)" />
            </filter>
          </defs>

          {/* ── Rotating Constellation Core: Slowly and smoothly spinning! ──── */}
          <g className="constellation-rotating-core">
            {/* ── 1. Intersecting Spherical Dashed Arcs (Petals) ────────── */}
            <g className="orbital-arcs-layer">
              {/* Outer Concentric Dashed Ring */}
              <circle
                cx="250"
                cy="250"
                r="175"
                stroke="url(#gradPurple)"
                strokeWidth="1.6"
                strokeDasharray="6 5"
                opacity="0.8"
              />

              {/* Inner Concentric Dashed Ring */}
              <circle
                cx="250"
                cy="250"
                r="94"
                stroke="url(#gradGold)"
                strokeWidth="1.6"
                strokeDasharray="6 5"
                opacity="0.85"
              />

              {/* Vertical Petal Arc - Left Bow */}
              <path
                d="M 250 75 C 130 140 130 360 250 425"
                stroke="url(#gradPink)"
                strokeWidth="1.6"
                strokeDasharray="6 5"
                opacity="0.85"
              />

              {/* Vertical Petal Arc - Right Bow */}
              <path
                d="M 250 75 C 370 140 370 360 250 425"
                stroke="url(#gradPurple)"
                strokeWidth="1.6"
                strokeDasharray="6 5"
                opacity="0.85"
              />

              {/* Horizontal Petal Arc - Upper Bow */}
              <path
                d="M 75 250 C 140 130 360 130 425 250"
                stroke="url(#gradCyan)"
                strokeWidth="1.6"
                strokeDasharray="6 5"
                opacity="0.8"
              />

              {/* Horizontal Petal Arc - Lower Bow */}
              <path
                d="M 75 250 C 140 370 360 370 425 250"
                stroke="url(#gradCoral)"
                strokeWidth="1.6"
                strokeDasharray="6 5"
                opacity="0.8"
              />

              {/* Diagonal Sweeping Arcs through Mid Nodes */}
              <path
                d="M 106 150 C 175 190 325 310 394 350"
                stroke="url(#gradPink)"
                strokeWidth="1.4"
                strokeDasharray="5 5"
                opacity="0.6"
              />
              <path
                d="M 106 350 C 175 310 325 190 394 150"
                stroke="url(#gradGold)"
                strokeWidth="1.4"
                strokeDasharray="5 5"
                opacity="0.6"
              />
            </g>

            {/* ── 2. 13 Contributor Avatar Badge Nodes (Slowly Orbiting) ── */}
            <g className="avatar-nodes-layer">
              {NODES.map((node) => (
                <g
                  key={node.id}
                  className="avatar-node-item"
                  style={{
                    transformOrigin: `${node.cx}px ${node.cy}px`,
                  }}
                >
                  {/* Avatar Image clipped to circle */}
                  <image
                    href={avatarUrls[node.id]}
                    x={node.cx - node.r}
                    y={node.cy - node.r}
                    width={node.r * 2}
                    height={node.r * 2}
                    clipPath={`url(#clip-${node.id})`}
                    filter="url(#avatarGlow)"
                    className="avatar-image-disc"
                  />

                  {/* Clean outer perimeter stroke */}
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={node.r}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.45)"
                    strokeWidth="1.6"
                  />
                </g>
              ))}
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
