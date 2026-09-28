import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './FossClubAnimation.css';

/**
 * FossClubAnimation — Editorial Split Typography
 * - FOSS (outlined/stroke) + CLUB (gradient fill) side by side on one line
 * - Word-clip slide-up reveal on load (modern editorial motion)
 * - Shimmer scan line sweeps across after reveal
 * - GSAP magnetic hover with chromatic aberration per letter
 */
export default function FossClubAnimation({
  autoplay = true,
  className = '',
  onAnimationComplete,
}) {
  const containerRef  = useRef(null);
  const charsRef      = useRef([]);
  const chromasRef    = useRef([]);
  const word1Ref      = useRef(null); // FOSS clip wrapper
  const word2Ref      = useRef(null); // CLUB clip wrapper
  const dividerRef    = useRef(null);

  const word1 = ['F', 'O', 'S', 'S'];
  const word2 = ['C', 'L', 'U', 'B'];

  charsRef.current   = [];
  chromasRef.current = [];

  const addToChars   = (el) => { if (el && !charsRef.current.includes(el))   charsRef.current.push(el); };
  const addToChromas = (el) => { if (el && !chromasRef.current.includes(el)) chromasRef.current.push(el); };

  // ── Entrance: word-clip slide-up reveal ──────────────────────────────────
  useEffect(() => {
    if (!autoplay) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const chars   = charsRef.current;   // 8 letter cores
    const chromas = chromasRef.current;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(chars, { opacity: 1, y: 0 });
        gsap.set(dividerRef.current, { opacity: 1 });
        return;
      }

      // Fade-up entrance (no clip needed — clean and works with overflow:visible)
      gsap.set(chars, { y: 40, opacity: 0 });
      gsap.set(dividerRef.current, { opacity: 0, scaleY: 0, transformOrigin: 'bottom center' });

      const tl = gsap.timeline({ delay: 0.05, onComplete: onAnimationComplete });

      // FOSS letters fade up (staggered)
      tl.to(chars.slice(0, 4), {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power4.out',
        stagger: { each: 0.06, from: 'start' },
      });

      // CLUB letters fade up slightly offset
      tl.to(chars.slice(4), {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power4.out',
        stagger: { each: 0.06, from: 'start' },
      }, '-=0.68');

      // Divider snaps in after both words
      tl.to(dividerRef.current, {
        opacity: 1,
        scaleY: 1,
        duration: 0.4,
        ease: 'back.out(2)',
      }, '-=0.55');

      // Chromatic spray burst fades out
      tl.fromTo(
        chromas,
        { opacity: 0.7, x: (i) => (i % 2 === 0 ? 5 : -5), y: 3 },
        { opacity: 0, x: 0, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.035 },
        '-=0.5'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [autoplay, onAnimationComplete]);

  // ── GSAP Magnetic Hover ──────────────────────────────────────────────────
  const handleMouseMove = (e, index) => {
    const el     = charsRef.current[index];
    const chroma = chromasRef.current[index];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
    const relY = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);

    gsap.to(el, {
      x: relX * 7,
      y: relY * 7 - 10,
      scale: 1.14,
      rotateZ: relX * 10,
      rotateY: relX * 16,
      rotateX: -relY * 16,
      duration: 0.22,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    if (chroma) {
      gsap.to(chroma, {
        x: relX * 5 + 3,
        y: relY * 4 + 2,
        opacity: 0.9,
        duration: 0.18,
        overwrite: 'auto',
      });
    }

    const prev = charsRef.current[index - 1];
    const next = charsRef.current[index + 1];
    if (prev) gsap.to(prev, { y: -4, rotateZ: -3, duration: 0.28, ease: 'power1.out', overwrite: 'auto' });
    if (next) gsap.to(next, { y: -4, rotateZ:  3, duration: 0.28, ease: 'power1.out', overwrite: 'auto' });
  };

  const handleMouseLeave = (index) => {
    const el     = charsRef.current[index];
    const chroma = chromasRef.current[index];
    if (!el) return;

    gsap.to(el, {
      x: 0, y: 0, scale: 1, rotateZ: 0, rotateY: 0, rotateX: 0,
      duration: 0.7,
      ease: 'elastic.out(1.2, 0.4)',
      overwrite: 'auto',
    });

    if (chroma) {
      gsap.to(chroma, { x: 0, y: 0, opacity: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    }

    const prev = charsRef.current[index - 1];
    const next = charsRef.current[index + 1];
    if (prev) gsap.to(prev, { y: 0, rotateZ: 0, duration: 0.55, ease: 'elastic.out(1.2, 0.4)' });
    if (next) gsap.to(next, { y: 0, rotateZ: 0, duration: 0.55, ease: 'elastic.out(1.2, 0.4)' });
  };

  const renderLetter = (char, index) => (
    <span
      key={index}
      className="graffiti-char-wrapper"
      onMouseMove={(e) => handleMouseMove(e, index)}
      onMouseLeave={() => handleMouseLeave(index)}
    >
      <span ref={addToChars} className="graffiti-char-core" data-char={char}>
        {/* Chromatic aberration offset layer */}
        <span ref={addToChromas} className="graffiti-layer-chroma" aria-hidden="true">{char}</span>
        {/* Block shadow */}
        <span className="graffiti-layer-block" aria-hidden="true">{char}</span>
        {/* Main front fill */}
        <span className="graffiti-layer-fill">{char}</span>
      </span>
    </span>
  );

  return (
    <div
      ref={containerRef}
      className={`cyber-graffiti-stage ${className}`}
      aria-label="FOSS CLUB"
    >

      <div className="graffiti-title-track">
        {/* FOSS — outlined stroke style */}
        <div className="graffiti-word-clip">
          <div className="graffiti-word word-foss" aria-hidden="true">
            {word1.map((c, i) => renderLetter(c, i))}
          </div>
        </div>

        {/* Glowing pipe divider */}
        <span ref={dividerRef} className="graffiti-word-divider" aria-hidden="true" />

        {/* CLUB — gradient fill style */}
        <div className="graffiti-word-clip">
          <div className="graffiti-word word-club" aria-hidden="true">
            {word2.map((c, i) => renderLetter(c, i + 4))}
          </div>
        </div>
      </div>
    </div>
  );
}
