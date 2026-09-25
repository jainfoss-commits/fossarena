import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ThreeMotionCanvas from './components/ThreeMotionCanvas';
import FossEcosystem from './components/FossEcosystem';
import SmoothTextWriter from './components/SmoothTextWriter';
import MotionCard from './components/MotionCard';
import InteractiveTerminal from './components/InteractiveTerminal';
import EventsSectionCanvas from './components/EventsSectionCanvas';
import EventsPage from './pages/EventsPage';
import {
  ArrowRight,
  Terminal,
  Cpu,
  Globe2,
  BrainCircuit,
  ShieldCheck,
  Calendar,
  Sparkles,
  GitBranch,
  X,
  Send,
  CheckCircle2,
  ExternalLink,
  Code2,
  GitPullRequest,
  Users,
  Clock,
  MapPin,
  Trophy,
  Award,
} from 'lucide-react';
import './App.css';

// ─── Homepage Component ───────────────────────────────────────────────────────
function HomePage({ isSiteLoaded, onOpeningComplete, isJoinModalOpen, setIsJoinModalOpen }) {
  const [joinSubmitted, setJoinSubmitted] = useState(false);
  const [selectedRole, setSelectedRole] = useState('developer');
  const [homeEventTab, setHomeEventTab] = useState('upcoming'); // 'upcoming' | 'past'
  const heroReady = isSiteLoaded;

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    setJoinSubmitted(true);
    setTimeout(() => {
      setJoinSubmitted(false);
      setIsJoinModalOpen(false);
    }, 2400);
  };

  return (
    <div className={`app-motion-layout ${heroReady ? 'page-ready' : 'page-loading'}`}>
      {/* ─── Hero Section with Three.js & Smooth Text Animation ────────────── */}
      <section className="motion-hero-section" id="hero">
        {/* Three.js 3D Interactive WebGL Background */}
        <ThreeMotionCanvas onOpeningComplete={onOpeningComplete} />

        {/* Ambient Overlay Vignette & Depth Mask */}
        <div className={`hero-depth-vignette ${heroReady ? 'elem-fade-in' : 'elem-hidden'}`} />

        <div className="hero-content-wrapper">
          <div className="hero-split-grid">
            {/* Left: Smooth Text Animation & CTAs */}
            <div className={`hero-left-column ${heroReady ? 'hero-ready-in' : 'hero-waiting'}`}>
              <SmoothTextWriter shouldStart={heroReady} />

              {/* Action Buttons */}
              <div className="hero-motion-actions">
                <a href="#about" className="motion-btn primary-glow">
                  <span>Explore Ecosystem</span>
                  <ArrowRight size={16} />
                </a>

                <button
                  type="button"
                  className="motion-btn secondary-glass"
                  onClick={() => setIsJoinModalOpen(true)}
                >
                  <Terminal size={16} />
                  <span>Join The Guild</span>
                </button>
              </div>
            </div>

            {/* Right: Ecosystem spinning slowly, replacing the ball */}
            <div className={`hero-ecosystem-column ${heroReady ? 'hero-ready-in' : 'hero-waiting'}`}>
              <FossEcosystem />
            </div>
          </div>
        </div>
      </section>

      {/* Content Below Hero - completely blank/hidden during loading */}
      <div className={`content-below-hero ${heroReady ? 'elem-fade-in' : 'elem-hidden'}`}>
        {/* ─── About Section: Open Source Ecosystem & Git Graph ────────────── */}
        <section className="about-motion-section" id="about">
          <div className="section-container">
            <div className="about-split-grid">
              {/* Left Column: Narrative, Ethos & Core Pillars */}
              <div className="about-narrative-column">
                <span className="section-badge-pill">OUR ECOSYSTEM & ETHOS</span>
                <h2 className="section-heading-large">
                  Built on <span className="text-gradient-cyan">Radical Collaboration</span> & Libre Code
                </h2>
                <p className="about-lead-paragraph">
                  We are an engineering collective operating at the frontier of Free and Open Source Software.
                  Rather than building isolated class assignments, our members write code that powers real-world
                  infrastructure, upstream Linux distributions, decentralized networks, and open AI inference pipelines.
                </p>

                <div className="about-pillars-grid">
                  <div className="about-pillar-card">
                    <div className="pillar-icon-box">
                      <Code2 size={20} className="text-cyan" />
                    </div>
                    <div className="pillar-content">
                      <h4 className="pillar-title">100% Libre Code</h4>
                      <p className="pillar-desc">
                        Every tool, engine, and kernel patch we produce is open-licensed under MIT, GPLv3, or Apache-2.0.
                      </p>
                    </div>
                  </div>

                  <div className="about-pillar-card">
                    <div className="pillar-icon-box">
                      <GitPullRequest size={20} className="text-green" />
                    </div>
                    <div className="pillar-content">
                      <h4 className="pillar-title">Real Upstream PRs</h4>
                      <p className="pillar-desc">
                        From day one, members contribute directly to major global open-source codebases and build public GitHub portfolios.
                      </p>
                    </div>
                  </div>

                  <div className="about-pillar-card">
                    <div className="pillar-icon-box">
                      <Users size={20} className="text-violet" />
                    </div>
                    <div className="pillar-content">
                      <h4 className="pillar-title">Peer-to-Peer Mentorship</h4>
                      <p className="pillar-desc">
                        Senior maintainers guide newcomers through asynchronous code reviews, architectural RFCs, and bug triage.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="about-actions-row">
                  <button
                    type="button"
                    className="motion-btn primary-glow"
                    onClick={() => setIsJoinModalOpen(true)}
                  >
                    <span>Join Our Open Network</span>
                    <Sparkles size={16} />
                  </button>

                  <a href="#domains" className="motion-btn secondary-glass">
                    <span>Explore Guilds</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Git / Open Source Ecosystem Node Graph */}
              <div className="about-graph-column">
                <FossEcosystem />
              </div>
            </div>
          </div>
        </section>

        {/* ─── Guilds / Specialization Tracks ─────────────────────────────────── */}
        <section className="domains-motion-section" id="domains">
          <div className="section-container">
            <div className="section-header-centered">
              <span className="section-badge-pill">SPECIALIZATION TRACKS</span>
              <h2 className="section-heading-large">
                Four Pillars of <span className="text-gradient-cyan">Open Infrastructure</span>
              </h2>
              <p className="section-description-text">
                Choose your focus area or contribute across disciplines. Every domain is backed by dedicated maintainers,
                repositories, and upstream sprints.
              </p>
            </div>

            <div className="domains-motion-grid">
              <MotionCard
                icon={Cpu}
                title="Systems & Linux Kernel"
                description="Writing loadable kernel modules, eBPF telemetry hooks, and lightweight hypervisor runtimes in C and Rust."
                tags={['Linux Kernel', 'eBPF', 'Rust', 'QEMU']}
                stats="3 Upstream Merges in Linux 6.8"
                gradient="cyan"
              />

              <MotionCard
                icon={Globe2}
                title="Decentralized Web & WASM"
                description="Compiling system code into WebAssembly, peer-to-peer libp2p nodes, and offline-first browser protocols."
                tags={['WebAssembly', 'libp2p', 'Go', 'CRDTs']}
                stats="2.4k Weekly NPM Downloads"
                gradient="indigo"
              />

              <MotionCard
                icon={BrainCircuit}
                title="Open Weights AI & Inference"
                description="Fine-tuning open weights, creating quantized GGUF runtimes, and building local agent harnesses without proprietary APIs."
                tags={['PyTorch', 'vLLM', 'Ollama', 'LoRA']}
                stats="16 Published HuggingFace Models"
                gradient="emerald"
              />

              <MotionCard
                icon={ShieldCheck}
                title="Cryptography & Privacy"
                description="Auditing supply-chain dependencies, zero-knowledge proofs, hardware security tokens, and reproducible builds."
                tags={['GnuPG', 'ZK-Rollups', 'Sigstore', 'Rust']}
                stats="Audited 12 Student Repos"
                gradient="cyan"
              />
            </div>
          </div>
        </section>

        {/* ─── Interactive Terminal Playground ───────────────────────────────── */}
        <section className="terminal-motion-section" id="terminal">
          <div className="section-container">
            <div className="terminal-split-layout">
              <div className="terminal-info-side">
                <span className="section-badge-pill">COMMAND LINE PROTOCOL</span>
                <h2 className="section-heading-medium">
                  Talk is cheap. <br />
                  <span className="text-gradient-cyan">Show me the code.</span>
                </h2>
                <p className="terminal-side-desc">
                  Every member gets shell access, local repo mirrors, and CI/CD pipelines.
                  Test our interactive terminal to query guild metrics, review recent upstream commits,
                  or read our open source manifest.
                </p>

                <div className="terminal-feature-list">
                  <div className="feature-item">
                    <CheckCircle2 size={18} className="text-cyan" />
                    <span>Direct mentorship from upstream maintainers</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle2 size={18} className="text-cyan" />
                    <span>Full access to GPU compute clusters for AI models</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle2 size={18} className="text-cyan" />
                    <span>Public GitHub portfolio that replaces standard resumes</span>
                  </div>
                </div>
              </div>

              <div className="terminal-interactive-side">
                <InteractiveTerminal />
              </div>
            </div>
          </div>
        </section>

        {/* ─── Upcoming & Past Events Section with 3D Canvas ─────────────────── */}
        <section className="events-motion-section" id="events" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Scroll-Oriented 3D Geometric Canvas */}
          <EventsSectionCanvas />

          <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
            <div className="section-header-centered">
              <span className="section-badge-pill">GATHERINGS & SPRINT TRACKS</span>
              <h2 className="section-heading-large">
                Where <span className="text-gradient-cyan">Ideas Turn Into Pull Requests</span>
              </h2>
              <p className="section-description-text">
                From 48-hour upstream hackathons to kernel device driver sprints. Explore what is coming up or review the records of our past hackathons.
              </p>

              {/* Segmented Switcher for Upcoming vs Past */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
                <div style={{
                  display: 'inline-flex',
                  background: 'rgba(15, 23, 42, 0.75)',
                  padding: '5px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(12px)',
                }}>
                  <button
                    type="button"
                    onClick={() => setHomeEventTab('upcoming')}
                    style={{
                      padding: '8px 20px',
                      borderRadius: '9999px',
                      border: 'none',
                      background: homeEventTab === 'upcoming' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                      color: homeEventTab === 'upcoming' ? '#38bdf8' : '#94a3b8',
                      border: homeEventTab === 'upcoming' ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
                      fontWeight: 600,
                      fontSize: '0.86rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#38bdf8' }} />
                    <span>Upcoming Gatherings</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setHomeEventTab('past')}
                    style={{
                      padding: '8px 20px',
                      borderRadius: '9999px',
                      border: 'none',
                      background: homeEventTab === 'past' ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                      color: homeEventTab === 'past' ? '#c084fc' : '#94a3b8',
                      border: homeEventTab === 'past' ? '1px solid rgba(168, 85, 247, 0.4)' : '1px solid transparent',
                      fontWeight: 600,
                      fontSize: '0.86rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a855f7' }} />
                    <span>Past Events Archive</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Events Cards Showcase */}
            {homeEventTab === 'upcoming' ? (
              <div className="events-cards-row">
                <div className="event-motion-card">
                  <div className="event-date-block">
                    <span className="event-day">14</span>
                    <span className="event-month">OCT</span>
                  </div>
                  <div className="event-details-block">
                    <div className="event-status-pill open">
                      <span className="status-dot" />
                      Registration Open // Flagship
                    </div>
                    <h3 className="event-title">FOSS HACK 2026: Upstream Sprint</h3>
                    <p className="event-summary">
                      48-hour non-stop open-source sprint. Build production tools, submit upstream PRs,
                      and compete for ₹1,50,000 in grants across Linux Kernel, WASM, and Open-Weights AI.
                    </p>
                    <div className="event-meta-tags">
                      <span><MapPin size={12} style={{ display: 'inline', marginRight: 4 }} />Campus Lab + Discord</span>
                      <span><Trophy size={12} style={{ display: 'inline', marginRight: 4 }} />₹1,50,000 Pool</span>
                      <span><Users size={12} style={{ display: 'inline', marginRight: 4 }} />340 / 450 Registered</span>
                    </div>
                  </div>
                  <Link to="/events" className="event-register-btn" style={{ textDecoration: 'none' }}>
                    RSVP Seat
                  </Link>
                </div>

                <div className="event-motion-card">
                  <div className="event-date-block">
                    <span className="event-day">28</span>
                    <span className="event-month">OCT</span>
                  </div>
                  <div className="event-details-block">
                    <div className="event-status-pill upcoming">
                      <span className="status-dot" />
                      Systems Workshop
                    </div>
                    <h3 className="event-title">Linux Kernel Device Drivers Lab</h3>
                    <p className="event-summary">
                      Hands-on exploration of writing loadable kernel modules (LKMs), character drivers,
                      and debugging live kernel panics via QEMU and GDB with core maintainers.
                    </p>
                    <div className="event-meta-tags">
                      <span><MapPin size={12} style={{ display: 'inline', marginRight: 4 }} />Systems Lab 304</span>
                      <span><Clock size={12} style={{ display: 'inline', marginRight: 4 }} />4.5 Hours</span>
                      <span><Award size={12} style={{ display: 'inline', marginRight: 4 }} />Hardware Dev Kits</span>
                    </div>
                  </div>
                  <Link to="/events" className="event-register-btn" style={{ textDecoration: 'none' }}>
                    View Brief
                  </Link>
                </div>
              </div>
            ) : (
              <div className="events-cards-row">
                <div className="event-motion-card" style={{ borderColor: 'rgba(168, 85, 247, 0.25)' }}>
                  <div className="event-date-block" style={{ background: 'rgba(168, 85, 247, 0.1)', borderColor: 'rgba(168, 85, 247, 0.3)' }}>
                    <span className="event-day" style={{ color: '#c084fc' }}>18</span>
                    <span className="event-month">AUG</span>
                  </div>
                  <div className="event-details-block">
                    <div className="event-status-pill" style={{ background: 'rgba(168, 85, 247, 0.12)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                      <span className="status-dot" />
                      Completed // Archived
                    </div>
                    <h3 className="event-title">FOSS Genesis Hackathon v2.4</h3>
                    <p className="event-summary">
                      520 student hackers contributed to 48 open-source repositories and merged 12 upstream
                      PRs into Linux, BCC eBPF tools, and decentralized WASM editors.
                    </p>
                    <div className="event-meta-tags">
                      <span><Award size={12} style={{ display: 'inline', marginRight: 4 }} />520+ Hackers</span>
                      <span><GitBranch size={12} style={{ display: 'inline', marginRight: 4 }} />12 Upstream PRs</span>
                      <span><Trophy size={12} style={{ display: 'inline', marginRight: 4 }} />₹1,20,000 Awarded</span>
                    </div>
                  </div>
                  <Link to="/events" className="event-register-btn" style={{ textDecoration: 'none' }}>
                    Inspect Archive
                  </Link>
                </div>

                <div className="event-motion-card" style={{ borderColor: 'rgba(168, 85, 247, 0.25)' }}>
                  <div className="event-date-block" style={{ background: 'rgba(168, 85, 247, 0.1)', borderColor: 'rgba(168, 85, 247, 0.3)' }}>
                    <span className="event-day" style={{ color: '#c084fc' }}>12</span>
                    <span className="event-month">JUL</span>
                  </div>
                  <div className="event-details-block">
                    <div className="event-status-pill" style={{ background: 'rgba(168, 85, 247, 0.12)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                      <span className="status-dot" />
                      Symposium Archive
                    </div>
                    <h3 className="event-title">Rust Systems & Memory Safety Summit</h3>
                    <p className="event-summary">
                      Full-day symposium with 6 upstream maintainers delivering keynotes on Rust in Linux 6.x,
                      async runtime concurrency with Tokio, and formal verification.
                    </p>
                    <div className="event-meta-tags">
                      <span><Users size={12} style={{ display: 'inline', marginRight: 4 }} />350 Attendees</span>
                      <span><Code2 size={12} style={{ display: 'inline', marginRight: 4 }} />6 Talks</span>
                      <span><ExternalLink size={12} style={{ display: 'inline', marginRight: 4 }} />Slides & Video</span>
                    </div>
                  </div>
                  <Link to="/events" className="event-register-btn" style={{ textDecoration: 'none' }}>
                    View Talks
                  </Link>
                </div>
              </div>
            )}

            {/* Hub Redirection Callout */}
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link
                to="/events"
                className="motion-btn primary-glow"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 28px',
                  fontSize: '0.94rem',
                  textDecoration: 'none',
                }}
              >
                <span>Launch 3D Chrono-Helix Event Hub</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Placements & Industry Track ───────────────────────────────────── */}
        <section className="placements-motion-section" id="placements">
          <div className="section-container">
            <div className="placements-banner-box">
              <div className="placements-content">
                <span className="section-badge-pill">CAREERS & RECOGNITION</span>
                <h2>Public Code Speaks Louder Than Resumes</h2>
                <p>
                  Our members contribute to standard open source repositories like Linux, Kubernetes,
                  Vite, and PyTorch. We routinely excel in Google Summer of Code (GSoC), LFX Mentorship,
                  and high-tier engineering careers.
                </p>
                <div className="placements-stats-row">
                  <div className="placement-stat">
                    <span className="stat-large">18+</span>
                    <span className="stat-label">GSoC & LFX Scholars</span>
                  </div>
                  <div className="placement-stat">
                    <span className="stat-large">100%</span>
                    <span className="stat-label">Real Portfolio Impact</span>
                  </div>
                  <div className="placement-stat">
                    <span className="stat-large">₹24L+</span>
                    <span className="stat-label">Top Engineering CTC</span>
                  </div>
                </div>
              </div>

              <div className="placements-cta-wrap">
                <button
                  type="button"
                  className="motion-btn primary-glow"
                  onClick={() => setIsJoinModalOpen(true)}
                >
                  <span>Join Our Guild Today</span>
                  <Sparkles size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Modern Minimal Footer ─────────────────────────────────────────── */}
        <footer className="motion-site-footer">
          <div className="section-container footer-inner">
            <div className="footer-left">
              <div className="footer-brand">
                <span className="brand-dot"></span>
                <span>FOSS Club</span>
              </div>
              <p className="footer-tagline">
                Open source is our foundation. Building public infrastructure for the next generation of engineers.
              </p>
            </div>

            <div className="footer-right">
              <div className="footer-links">
                <a href="#hero">Hero</a>
                <a href="#about">About</a>
                <Link to="/events">Events</Link>
                <a href="#placements">Placements</a>
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
              <span className="footer-copy">© 2026 FOSS Club. Released under MIT & GPLv3.</span>
            </div>
          </div>
        </footer>
      </div>

      {/* ─── Join The Guild Modal Dialog ──────────────────────────────────── */}
      {isJoinModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsJoinModalOpen(false)}>
          <div className="modal-glass-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsJoinModalOpen(false)}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {joinSubmitted ? (
              <div className="modal-success-screen">
                <CheckCircle2 size={48} className="text-cyan success-icon-spin" />
                <h3>Welcome to the Guild!</h3>
                <p>Your application packet has been registered on the local node. Check your inbox for Discord and GitHub organization invites.</p>
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit} className="join-guild-form">
                <div className="form-header">
                  <span className="form-badge">JOIN FOSS CLUB</span>
                  <h2>Initiate Guild Membership</h2>
                  <p>Open to all students eager to code, build, and ship in public.</p>
                </div>

                <div className="form-input-group">
                  <label htmlFor="student-name">Full Name</label>
                  <input
                    id="student-name"
                    type="text"
                    required
                    placeholder="Linus Torvalds"
                    className="form-text-input"
                  />
                </div>

                <div className="form-input-group">
                  <label htmlFor="student-email">University / Personal Email</label>
                  <input
                    id="student-email"
                    type="email"
                    required
                    placeholder="student@jainuniversity.ac.in"
                    className="form-text-input"
                  />
                </div>

                <div className="form-input-group">
                  <label htmlFor="github-handle">GitHub Profile URL or Username</label>
                  <div className="input-prefix-wrap">
                    <span className="input-prefix">github.com/</span>
                    <input
                      id="github-handle"
                      type="text"
                      required
                      placeholder="octocat"
                      className="form-text-input prefix-padding"
                    />
                  </div>
                </div>

                <div className="form-input-group">
                  <label>Primary Area of Interest</label>
                  <div className="roles-selector-grid">
                    {[
                      { id: 'systems', label: 'Systems & Kernel' },
                      { id: 'web', label: 'Web & WASM' },
                      { id: 'ai', label: 'AI & Inference' },
                      { id: 'security', label: 'Cybersecurity' },
                    ].map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        className={`role-option-btn ${selectedRole === role.id ? 'selected' : ''}`}
                        onClick={() => setSelectedRole(role.id)}
                      >
                        {role.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="motion-btn primary-glow submit-full">
                  <span>Submit Membership Packet</span>
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main App with Universal Navbar & React Router DOM ──────────────────────
export default function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isSiteLoaded, setIsSiteLoaded] = useState(false);
  const location = useLocation();

  const handleOpeningComplete = () => {
    setIsSiteLoaded(true);
  };

  const isNavbarVisible = isSiteLoaded || location.pathname !== '/';

  return (
    <div className="app-root-shell">
      {/* Universal Navigation Bar: kept in every section & route */}
      <Navbar
        isVisible={isNavbarVisible}
        onOpenJoinModal={() => setIsJoinModalOpen(true)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isSiteLoaded={isSiteLoaded}
              onOpeningComplete={handleOpeningComplete}
              isJoinModalOpen={isJoinModalOpen}
              setIsJoinModalOpen={setIsJoinModalOpen}
            />
          }
        />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </div>
  );
}
