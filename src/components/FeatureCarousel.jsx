import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Users, GitBranch, Compass } from "lucide-react";
import "./FeatureCarousel.css";

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

// Real copy confirmed against FOSS Club specifications
const FEATURES = [
  {
    id: "shipping",
    label: "Learn by Shipping",
    icon: Terminal,
    description:
      "Workshops and teardowns built around real, running code — not slides. You leave every session having broken and fixed something yourself.",
    meta: "12 sessions/yr",
  },
  {
    id: "community",
    label: "Community Over Competition",
    icon: Users,
    description:
      "Hackathons here are collaborative by design. The person next to you debugging the same error is the whole point of showing up in person.",
    meta: "6 hackathons/yr",
  },
  {
    id: "public",
    label: "Public by Default",
    icon: GitBranch,
    description:
      "Every contribution goes upstream, in the open, mistakes included. A half-broken PR pushed today teaches more than a polished one hidden until graduation.",
    meta: "100+ PRs merged",
  },
  {
    id: "mentorship",
    label: "Mentorship, Not Hierarchy",
    icon: Compass,
    description:
      "Seniors don't gatekeep — they pair. Every track (Linux/Systems, Web/WASM, AI, Security) has someone one step ahead willing to walk it with you.",
    meta: "4 active tracks",
  },
];

const AUTO_PLAY_INTERVAL = 4000;
const ITEM_HEIGHT = 65;

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => setStep((prev) => prev + 1), []);

  const handleChipClick = (index) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;
    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="feature-carousel-root w-full max-w-6xl mx-auto md:p-6">
      <div className="feature-carousel-card relative overflow-hidden rounded-[2rem] lg:rounded-[3rem] flex flex-col min-h-[540px] lg:aspect-[16/8] border border-white/10 bg-[#0a0a0a]">
        {/* Card stack — full width */}
        <div className="feature-stack-panel w-full min-h-[420px] lg:h-full relative flex items-center justify-center py-14 px-6 lg:px-14 overflow-hidden bg-[#0a0a0a]">
          {/* faint background grid texture */}
          <div
            className="stack-grid-bg absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="stack-container relative w-full max-w-[460px] aspect-[4/5] flex items-center justify-center">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isMobile ? 0 : isPrev ? -90 : isNext ? 90 : 0,
                    scale: isActive ? 1 : isMobile ? 0.92 : isPrev || isNext ? 0.86 : 0.7,
                    opacity: isActive ? 1 : isMobile ? 0 : isPrev || isNext ? 0.3 : 0,
                    rotate: isMobile ? 0 : isPrev ? -4 : isNext ? 4 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
                  className="stack-card absolute inset-0 rounded-[1.75rem] overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-sm origin-center flex flex-col justify-between"
                >
                  {/* ghost index number, top-right */}
                  <span className="ghost-index-num absolute -top-4 -right-2 text-[8rem] font-black leading-none text-white/[0.03] select-none pointer-events-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* corner brackets for framed terminal feel - positioned in actual corners */}
                  <span className="corner-bracket-tl" aria-hidden="true" />
                  <span className="corner-bracket-br" aria-hidden="true" />

                  <div className="relative z-10 card-content-top">
                    <div className="card-badge-row flex items-center justify-between mb-4">
                      <div className="card-counter-badge flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-[10px] font-mono uppercase tracking-[0.2em]">
                        <Icon size={12} strokeWidth={2} />
                        0{index + 1} / 0{FEATURES.length}
                      </div>
                    </div>

                    <h3 className="card-title text-2xl md:text-3xl font-semibold text-white tracking-tight leading-tight mb-4">
                      {feature.label}
                    </h3>

                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.p
                          key={feature.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.4 }}
                          className="card-description text-white/60 text-[15px] leading-relaxed font-light"
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="card-footer relative z-10 flex items-center gap-2 text-[11px] font-mono text-cyan-400/80 uppercase tracking-[0.15em] pt-6 border-t border-white/10">
                    <span className="footer-dot w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {feature.meta}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Navigation Dots */}
          <div className="carousel-nav-dots" aria-label="Feature navigation">
            {FEATURES.map((feat, idx) => (
              <button
                key={feat.id}
                type="button"
                className={`carousel-dot ${idx === currentIndex ? 'is-active' : ''}`}
                onClick={() => handleChipClick(idx)}
                aria-label={`Go to track ${idx + 1}: ${feat.label}`}
              >
                <span className="dot-fill" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
