import React, { useState, useEffect, useRef, useMemo } from 'react';
import portfolioData from '../data/portfolio_data.json';

export const STORAGE_KEY = 'foss_club_projects';

// Deterministic seeded random (0–1)
const rnd = (seed) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

// ─── Blank/Placeholder Card Generator ─────────────────────────────────────────
export const makeBlankCards = () => {
  const blanks = [];
  const categories = ['Systems', 'Open Web', 'AI & ML', 'Security'];
  const quotes = [
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "Free software is a matter of liberty, not price.", author: "Richard Stallman" },
    { text: "This is for everyone.", author: "Tim Berners-Lee" },
    { text: "Given enough eyeballs, all bugs are shallow.", author: "Eric S. Raymond" },
    { text: "Simplicity is prerequisite for reliability.", author: "E. W. Dijkstra" },
    { text: "Information wants to be free.", author: "Stewart Brand" },
    { text: "Design is intelligence made visible.", author: "Alina Wheeler" },
    { text: "Make it simple, but significant.", author: "Don Draper" },
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "Code in the open, build for the world.", author: "FOSS Club" },
  ];
  const words = ["LIBRE", "KERNEL", "RUNTIME", "COMMUNITY", "CONSENSUS", "PROTOCOL", "DISTRIBUTED", "SYSTEM", "INFERENCE", "PIPELINE"];

  for (let i = 0; i < 20; i++) {
    const category = categories[i % categories.length];
    blanks.push({
      id: `foss-${i}`,
      isBlank: true,
      category,
      title: `Module // ${100 + i}`,
      description: `An open-source architecture exploration focusing on distributed consensus, system performance, and community-driven tools.`,
      quote: quotes[i % quotes.length],
      word: words[i % words.length],
      styleType: i % 4, // 0: quote, 1: line art, 2: geometry, 3: technical coordinates
    });
  }
  return blanks;
};

export const defaultProjects = portfolioData.projects && portfolioData.projects.length > 0
  ? portfolioData.projects
  : makeBlankCards();

// ─── Blank/Placeholder Card Content Renderer ──────────────────────────────────
export const renderBlankCardContent = (project, isHovered, isDayMode = false) => {
  const type = project.styleType;
  const glowColor = isDayMode ? 'rgba(56,189,248,0.08)' : 'rgba(56,189,248,0.18)';
  const textColorMain = isDayMode ? 'rgba(15,23,42,0.9)' : 'rgba(241,245,249,0.95)';
  const textColorSub = isDayMode ? 'rgba(71,85,105,0.6)' : 'rgba(148,163,184,0.65)';
  const accentColor = isDayMode ? '#0284c7' : '#38bdf8';
  const borderColor = isDayMode ? 'rgba(56,189,248,0.25)' : 'rgba(56,189,248,0.35)';

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '16px 14px 14px',
      userSelect: 'none',
      pointerEvents: 'none',
    }}>
      {/* Background Layer */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isDayMode
          ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 60%, #f1f5f9 100%)'
          : 'linear-gradient(135deg, #0e121a 0%, #131824 50%, #192032 100%)',
        zIndex: -2,
        transition: 'background 800ms ease',
      }} />

      {/* Subtle Glow */}
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        background: glowColor,
        filter: 'blur(24px)',
        pointerEvents: 'none',
      }} />

      {type === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: accentColor }} />
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>
            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '10px',
              fontStyle: 'italic',
              lineHeight: 1.45,
              textAlign: 'center',
              color: textColorMain,
              opacity: isHovered ? 1 : 0.88,
              transition: 'opacity 0.3s ease',
            }}>
              "{project.quote.text}"
            </p>
          </div>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '6.5px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            textAlign: 'center',
            color: textColorSub,
            display: 'block',
          }}>
            — {project.quote.author}
          </span>
        </div>
      )}

      {type === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '6.5px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: textColorSub,
          }}>
            FOSS ARCHITECTURE
          </span>
          <div style={{ color: accentColor, opacity: isHovered ? 0.95 : 0.7, transition: 'opacity 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M20 80 L50 30 L80 80 Z" />
              <path d="M40 80 L55 55 L70 80" />
              <circle cx="75" cy="35" r="4" fill="none" />
            </svg>
          </div>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '7.5px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 500,
            color: textColorMain,
          }}>
            {project.word}
          </span>
        </div>
      )}

      {type === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '6.5px',
            letterSpacing: '0.15em',
            color: textColorSub,
            textAlign: 'center',
          }}>
            SYSTEM SCHEMA
          </span>
          <div style={{ color: textColorMain, opacity: isHovered ? 0.65 : 0.4, transition: 'opacity 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="44" height="44" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="50" cy="50" r="28" />
              <circle cx="50" cy="50" r="18" />
              <circle cx="50" cy="50" r="9" />
              <line x1="50" y1="12" x2="50" y2="88" />
              <line x1="12" y1="50" x2="88" y2="50" />
            </svg>
          </div>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '7.5px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 500,
            color: accentColor,
            textAlign: 'center',
          }}>
            {project.word}
          </span>
        </div>
      )}

      {type === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
          <div style={{
            position: 'absolute',
            inset: '8px',
            border: `1px solid ${borderColor}`,
            borderRadius: '8px',
            pointerEvents: 'none',
          }} />

          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            fontFamily: 'monospace',
            fontSize: '5.5px',
            color: textColorSub,
          }}>
            SYS.NODE // 0x4F
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '8px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: textColorMain,
            }}>
              {project.word}
            </span>
            <span style={{
              fontFamily: 'monospace',
              fontSize: '6px',
              letterSpacing: '0.04em',
              color: accentColor,
            }}>
              POSIX // KERNEL v6.8
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 12px', fontSize: '5.5px', fontFamily: 'monospace', color: textColorSub }}>
            <span>OPEN 2026</span>
            <span>SYNCED</span>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Dynamic strip generator ──────────────────────────────────────────────────
const BASE_STRIP_W = 1800;
const CARD_SLOT_WIDTH = 140;

const makeStrip = (projects) => {
  if (!projects.length) return { strip: [], stripW: BASE_STRIP_W };

  const extraCards = projects.length;
  const stripW = BASE_STRIP_W + extraCards * CARD_SLOT_WIDTH;

  // 4 rows aligned from top to cover the top empty space seamlessly
  const ROWS = 4;
  const cellW = 175;
  const COLS = Math.ceil(stripW / cellW);

  // Starts close to the top (Y_MIN = 85 gives ~5px-15px top margin for card tops)
  const Y_MIN = 85;
  const Y_MAX = 710;
  const cellH = (Y_MAX - Y_MIN) / (ROWS - 1 || 1);

  const positions = [];
  let key = 0;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const sX = key * 53 + row * 17 + 7;
      const sY = key * 79 + col * 31 + row * 11;
      const sZ = key * 67 + row * 23 + col * 13 + 3;
      const sSize = key * 29 + row * 13 + col * 7;

      const sizeVal = rnd(sSize);
      let aspect = 'portrait';
      let cardW = 120;
      let cardH = 168;
      if (sizeVal < 0.25) {
        aspect = 'square';
        cardW = 130;
        cardH = 130;
      } else if (sizeVal < 0.5) {
        aspect = 'large-portrait';
        cardW = 136;
        cardH = 192;
      } else if (sizeVal < 0.75) {
        aspect = 'medium-portrait';
        cardW = 124;
        cardH = 160;
      } else {
        aspect = 'wide';
        cardW = 148;
        cardH = 120;
      }

      const centreX = (col + 0.5) * cellW;
      const centreY = Y_MIN + row * cellH;

      const xJitter = (rnd(sX) - 0.5) * cellW * 0.65;
      const yJitter = (rnd(sY) - 0.5) * cellH * 0.35;

      const x = centreX + xJitter;
      const y = centreY + yJitter;

      const zRaw = rnd(sZ);
      const z = Math.round((Math.sin(zRaw * Math.PI) * 0.6 + zRaw * 0.4) * 85 + 50);

      positions.push({
        x,
        y,
        z,
        cardW,
        cardH,
        aspect,
        key
      });
      key++;
    }
  }

  const minGap = -20;
  const numIterations = 14;

  for (let iter = 0; iter < numIterations; iter++) {
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const p1 = positions[i];
        const p2 = positions[j];

        let dx = p2.x - p1.x;
        dx = dx - Math.round(dx / stripW) * stripW;

        const dy = p2.y - p1.y;

        const targetXGap = (p1.cardW + p2.cardW) / 2 + minGap;
        const targetYGap = (p1.cardH + p2.cardH) / 2 + minGap;

        const overlapX = targetXGap - Math.abs(dx);
        const overlapY = targetYGap - Math.abs(dy);

        if (overlapX > 0 && overlapY > 0) {
          if (overlapX < overlapY) {
            const pushX = overlapX * 0.5 * Math.sign(dx || 1);
            p2.x += pushX;
            p1.x -= pushX;
          } else {
            const pushY = overlapY * 0.5 * Math.sign(dy || 1);
            p2.y = Math.max(Y_MIN, Math.min(Y_MAX, p2.y + pushY));
            p1.y = Math.max(Y_MIN, Math.min(Y_MAX, p1.y - pushY));
          }
        }
      }
    }
  }

  positions.forEach(pos => {
    pos.x = (pos.x % stripW + stripW) % stripW;
  });

  const strip = positions.map((pos) => ({
    ...pos,
    project: projects[pos.key % projects.length],
  }));

  return { strip, stripW };
};

/* ─── 3D Card Animation Component ─────────────────────────────────────────── */
export default function Card3DAnimation({ isDayMode = false }) {
  const [projects] = useState(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) {
        const parsed = JSON.parse(s);
        const wasInitialized = localStorage.getItem('foss_club_blanks_init');
        if (!wasInitialized) {
          const blanks = makeBlankCards();
          const merged = [...parsed, ...blanks];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          localStorage.setItem('foss_club_blanks_init', 'true');
          return merged;
        }
        return parsed;
      } else {
        const fallback = defaultProjects;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
        localStorage.setItem('foss_club_blanks_init', 'true');
        return fallback;
      }
    } catch {
      return defaultProjects;
    }
  });

  const [hoveredKey, setHoveredKey] = useState(null);
  const { strip, stripW } = useMemo(() => makeStrip(projects), [projects]);

  const scrollContainerRef = useRef(null);
  const stripRef = useRef(null);
  const rafRef = useRef(null);
  const scrollXRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, cx: 0, cy: 0 });
  const breatheRef = useRef(0);
  const hoveredUidRef = useRef(null);
  const prefersReduced = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const stripWRef = useRef(stripW);
  useEffect(() => { stripWRef.current = stripW; }, [stripW]);

  useEffect(() => {
    const outer = scrollContainerRef.current;
    const inner = stripRef.current;
    if (!outer || !inner) return;

    const onMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const SPEED = 0.82;

    const tick = () => {
      const m = mouseRef.current;
      m.cx += (m.x - m.cx) * 0.05;
      m.cy += (m.y - m.cy) * 0.05;

      if (!prefersReduced.current) {
        const speed = hoveredUidRef.current ? SPEED * 0.15 : SPEED;
        scrollXRef.current += speed;
        if (scrollXRef.current >= stripWRef.current) {
          scrollXRef.current -= stripWRef.current;
        }
      }

      if (!prefersReduced.current) breatheRef.current += 0.0022;
      const dolly = Math.sin(breatheRef.current) * 40;
      const rotX = m.cy * -3;
      const rotY = m.cx * 3;
      const transX = m.cx * 20;
      const transY = m.cy * 14;

      outer.style.transform =
        `translate3d(${transX}px, ${transY}px, ${dolly}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      inner.style.transform = `translateX(${-scrollXRef.current}px)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const renderStrip = (tileOffsetX = 0, keyPrefix = 'a') =>
    strip.map(({ x, y, z, cardW, cardH, project, key }) => {
      const uid = `${keyPrefix}-${key}`;
      const isHovered = hoveredKey === uid;

      const depthFactor = (z - 50) / 85;
      const baseZIndex = Math.round(100 + z);
      const effectiveZ = isHovered ? 999 : baseZIndex;

      const baseOpacity = 0.58 + depthFactor * 0.42;
      const shadowBlur = isHovered ? 40 : 14 + depthFactor * 20;
      const shadow = isHovered
        ? '0 20px 40px rgba(0,0,0,0.65), 0 0 30px rgba(56,189,248,0.45)'
        : `8px 12px ${shadowBlur}px rgba(0,0,0,0.45)`;

      const driftIdx = key % 6;
      const driftDur = 4.5 + rnd(key * 7) * 3.5;
      const driftDelay = (rnd(key * 11) * -7).toFixed(2);

      return (
        <div
          key={uid}
          aria-label={`Foss Card: ${project.word || project.title}`}
          onMouseEnter={() => { setHoveredKey(uid); hoveredUidRef.current = uid; }}
          onMouseLeave={() => { setHoveredKey(null); hoveredUidRef.current = null; }}
          style={{
            position: 'absolute',
            left: tileOffsetX + x,
            top: y,
            transform: `translate3d(0, -50%, ${z}px) ${isHovered ? 'scale(1.08) translateY(calc(-50% - 10px))' : 'scale(1) translateY(-50%)'}`,
            width: cardW,
            height: cardH,
            borderRadius: 12,
            overflow: 'hidden',
            cursor: 'default',
            pointerEvents: 'auto',
            zIndex: effectiveZ,
            willChange: 'transform, opacity, box-shadow',
            transition: isHovered
              ? 'transform 0.32s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s ease, border-color 0.25s ease, opacity 0.25s ease'
              : 'transform 0.5s cubic-bezier(0.25,1,0.5,1), box-shadow 0.45s ease, border-color 0.6s ease, opacity 0.35s ease',
            boxShadow: shadow,
            opacity: isHovered ? 1 : baseOpacity,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: isHovered
              ? 'rgba(56,189,248,0.75)'
              : 'rgba(255,255,255,0.08)',
            backgroundColor: isDayMode ? 'rgba(255,255,255,0.85)' : 'rgba(15,20,30,0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            animation: `fossDrift-${driftIdx} ${driftDur}s ease-in-out ${driftDelay}s infinite alternate`,
            outline: 'none',
          }}
        >
          {renderBlankCardContent(project, isHovered, isDayMode)}
        </div>
      );
    });

  return (
    <div className="animation-scene-wrapper">
      {/* 3D Scene */}
      <div
        className="animation-3d-scene"
        style={{
          perspective: '1050px',
          perspectiveOrigin: '50% 35%',
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          ref={scrollContainerRef}
          style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}
        >
          <div
            ref={stripRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: stripW * 2,
              height: '100%',
              transformStyle: 'preserve-3d',
            }}
          >
            {renderStrip(0, 'a')}
            {renderStrip(stripW, 'b')}
          </div>
        </div>

        {/* Seamless edge fade overlays */}
        <div className="edge-fade edge-fade-left" />
        <div className="edge-fade edge-fade-right" />
      </div>

      {/* CSS drift keyframes */}
      <style>{`
        @keyframes fossDrift-0 { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(4px, -5px, 0); } }
        @keyframes fossDrift-1 { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(-5px, 4px, 0); } }
        @keyframes fossDrift-2 { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(3px, 6px, 0); } }
        @keyframes fossDrift-3 { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(-4px, -4px, 0); } }
        @keyframes fossDrift-4 { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(6px, 2px, 0); } }
        @keyframes fossDrift-5 { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(-3px, 5px, 0); } }
      `}</style>
    </div>
  );
}
