import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ThreeMotionCanvas from './components/ThreeMotionCanvas';
import SmoothTextWriter from './components/SmoothTextWriter';
import MotionCard from './components/MotionCard';
import InteractiveTerminal from './components/InteractiveTerminal';
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
} from 'lucide-react';
import './App.css';

export default function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinSubmitted, setJoinSubmitted] = useState(false);
  const [selectedRole, setSelectedRole] = useState('developer');

  const [heroReady, setHeroReady] = useState(false);

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
      {/* Top Navigation - strictly hidden during loading screen */}
      {heroReady && (
        <div className="navbar-wrapper">
          <Navbar />
        </div>
      )}

      {/* ─── Hero Section with Three.js & Smooth Text Animation ────────────── */}
      <section className="motion-hero-section" id="hero">
        {/* Three.js 3D Interactive WebGL Background */}
        <ThreeMotionCanvas onOpeningComplete={() => setHeroReady(true)} />

        {/* Ambient Overlay Vignette & Depth Mask */}
        <div className={`hero-depth-vignette ${heroReady ? 'elem-fade-in' : 'elem-hidden'}`} />

        <div className="hero-content-wrapper">
          <div className="hero-text-grid">
            {/* Left: Smooth Text Animation & CTAs */}
            <div className={`hero-left-column ${heroReady ? 'hero-ready-in' : 'hero-waiting'}`}>
              <SmoothTextWriter shouldStart={heroReady} />

              {/* Action Buttons */}
              <div className="hero-motion-actions">
                <a href="#domains" className="motion-btn primary-glow">
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
          </div>
        </div>
      </section>

      {/* Content Below Hero - completely blank/hidden during loading */}
      <div className={`content-below-hero ${heroReady ? 'elem-fade-in' : 'elem-hidden'}`}>
        {/* ─── Engineering Guilds & Domains (3D Tilt Motion Cards) ───────────── */}
        <section className="domains-motion-section" id="domains">
        <div className="section-container">
          <div className="section-header-centered">
            <span className="section-badge-pill">SPECIALIZATION GUILDS</span>
            <h2 className="section-heading-large">
              Architecting the <span className="text-gradient-cyan">Open Future</span>
            </h2>
            <p className="section-description-text">
              We operate across 4 core engineering domains, building open-source tools, contributing
              to upstream codebases, and mentoring students from their first PR to core maintainers.
            </p>
          </div>

          <div className="cards-tilt-grid">
            <MotionCard
              icon={Cpu}
              badge="Systems Guild"
              title="Linux Kernel & Systems"
              description="Low-level systems programming in C, Rust, and eBPF. Exploring memory allocators, virtual machines, custom schedulers, and Linux device drivers."
              accentColor="#38bdf8"
              metrics="12 Repositories"
              tags={['Linux', 'Rust', 'C', 'eBPF', 'POSIX']}
              actionText="View Systems Code"
              onClick={() => setIsJoinModalOpen(true)}
            />

            <MotionCard
              icon={Globe2}
              badge="Web & Runtimes"
              title="Modern Open Web & WASM"
              description="Engineering next-gen web engines, decentralized peer-to-peer protocols, WebAssembly compilers, and ultra-fast developer toolchains."
              accentColor="#818cf8"
              metrics="18 Repositories"
              tags={['TypeScript', 'WASM', 'Go', 'Next.js', 'P2P']}
              actionText="Inspect Web Stacks"
              onClick={() => setIsJoinModalOpen(true)}
            />

            <MotionCard
              icon={BrainCircuit}
              badge="AI & ML Guild"
              title="Distributed AI & Local Models"
              description="Open weights, model quantization, local inference pipelines with Ollama, PyTorch optimization, and open-source generative architectures."
              accentColor="#34d399"
              metrics="8 Research Papers"
              tags={['PyTorch', 'Quantization', 'CUDA', 'Ollama']}
              actionText="Explore AI Models"
              onClick={() => setIsJoinModalOpen(true)}
            />

            <MotionCard
              icon={ShieldCheck}
              badge="Cybersecurity"
              title="Security & Cryptography"
              description="Security audits, zero-knowledge proofs, vulnerability research, and protocol fuzzing to safeguard open networks and privacy."
              accentColor="#f43f5e"
              metrics="14 CTF Wins"
              tags={['Cryptography', 'ZK-Rollups', 'Fuzzing', 'GnuPG']}
              actionText="Audit Security"
              onClick={() => setIsJoinModalOpen(true)}
            />
          </div>
        </div>
      </section>

      {/* ─── Interactive Terminal Experience Section ───────────────────────── */}
      <section className="terminal-section" id="terminal">
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

      {/* ─── Upcoming Events & Hackathons ──────────────────────────────────── */}
      <section className="events-motion-section" id="events">
        <div className="section-container">
          <div className="section-header-centered">
            <span className="section-badge-pill">EVENTS & HACKATHONS</span>
            <h2 className="section-heading-large">
              Where <span className="text-gradient-cyan">Ideas Turn Into Pull Requests</span>
            </h2>
            <p className="section-description-text">
              Join our weekly community sprints, hands-on masterclasses, and 48-hour open hackathons.
            </p>
          </div>

          <div className="events-cards-row">
            <div className="event-motion-card">
              <div className="event-date-block">
                <span className="event-day">14</span>
                <span className="event-month">NOV</span>
              </div>
              <div className="event-details-block">
                <div className="event-status-pill open">
                  <span className="status-dot" />
                  Registration Open
                </div>
                <h3 className="event-title">Winter Open Hack 2026</h3>
                <p className="event-summary">
                  48-hour intensive hackathon building open source developer tools, Linux utilities,
                  and offline-first applications. Prizes sponsored by open-source foundations.
                </p>
                <div className="event-meta-tags">
                  <span>📍 Campus Tech Lab</span>
                  <span>🏆 ₹75,000 Grants</span>
                  <span>🤝 1-on-1 Mentors</span>
                </div>
              </div>
              <button
                type="button"
                className="event-register-btn"
                onClick={() => setIsJoinModalOpen(true)}
              >
                Register Now
              </button>
            </div>

            <div className="event-motion-card">
              <div className="event-date-block">
                <span className="event-day">28</span>
                <span className="event-month">OCT</span>
              </div>
              <div className="event-details-block">
                <div className="event-status-pill upcoming">
                  <span className="status-dot" />
                  Upcoming Workshop
                </div>
                <h3 className="event-title">Deep Dive: Writing a Toy Linux Kernel</h3>
                <p className="event-summary">
                  From bootloader to basic scheduler in x86 assembly and Rust. Learn how operating
                  systems manage physical memory and interrupts from scratch.
                </p>
                <div className="event-meta-tags">
                  <span>📍 Virtual + Lab 304</span>
                  <span>💻 Hands-on Code</span>
                  <span>🎓 Free Entry</span>
                </div>
              </div>
              <button
                type="button"
                className="event-register-btn"
                onClick={() => setIsJoinModalOpen(true)}
              >
                RSVP Seat
              </button>
            </div>
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

      {/* ─── Footer ───────────────────────────────────────────────────────── */}
      <footer className="motion-site-footer">
        <div className="section-container footer-inner">
          <div className="footer-left">
            <div className="footer-brand-title">
              <span className="footer-dot-pulse" />
              <span>FOSS CLUB // JAIN UNIVERSITY</span>
            </div>
            <p className="footer-copyright">
              © {new Date().getFullYear()} Free and Open Source Software Collective. Code in the open.
            </p>
          </div>

          <div className="footer-right">
            <div className="footer-links-row">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-link">
                GitHub <ExternalLink size={12} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-link">
                LinkedIn <ExternalLink size={12} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-link">
                Instagram <ExternalLink size={12} />
              </a>
              <a href="#hero" className="footer-link back-to-top">
                Top ↑
              </a>
            </div>
            <div className="footer-system-status">
              <span className="sys-status-indicator" />
              <span>All Systems Operational // Bangalore, India</span>
            </div>
          </div>
        </div>
      </footer>
      </div>

      {/* ─── Join Guild Interactive Modal ─────────────────────────────────── */}
      {isJoinModalOpen && (
        <div className="modal-backdrop-wrap" onClick={() => setIsJoinModalOpen(false)}>
          <div className="modal-glass-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-button"
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
