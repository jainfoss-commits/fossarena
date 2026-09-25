import React, { useEffect, useState } from 'react';

/**
 * Minimal Loading Screen — no canvas, no particles.
 * Just a dark background with animated "[ LOADING — XX% ]" text.
 *
 * Module-level flag (resets on hard reload, persists through SPA nav):
 *   - false  → show loader
 *   - true   → skip immediately
 */

let _hasRun = false;
export function hasLoaderRun() { return _hasRun; }

const DURATION = 2600; // ms

export default function ParticleLoader({ onComplete }) {
  const [pct, setPct]   = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (_hasRun) {
      if (onComplete) onComplete();
      return;
    }

    let frameId;
    const t0 = performance.now();

    const tick = () => {
      const elapsed  = performance.now() - t0;
      const progress = Math.min(1, elapsed / DURATION);
      setPct(Math.floor(progress * 100));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        _hasRun = true;
        setTimeout(() => {
          setDone(true);
          setTimeout(() => { if (onComplete) onComplete(); }, 700);
        }, 150);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`pl-root${done ? ' pl-exit' : ''}`}>
      <span className="pl-label">[ LOADING — {pct}% ]</span>
    </div>
  );
}
