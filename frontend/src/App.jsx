import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ThreeMotionCanvas from './components/ThreeMotionCanvas';
import ParticleLoader, { hasLoaderRun } from './components/ParticleLoader';
import FossEcosystem from './components/FossEcosystem';
import SmoothTextWriter from './components/SmoothTextWriter';
import AboutSection from './components/AboutSection';
import TeamSection from './components/TeamSection';
import OpenSourceForge from './components/OpenSourceForge';
import KineticManifesto from './components/KineticManifesto';
import PlacementsDirectory from './components/PlacementsDirectory';
import {
  ArrowRight,
  Terminal,
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

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.includes('placements')) {
        return 'placements';
      }
    }
    return 'home';
  });

  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinSubmitted, setJoinSubmitted] = useState(false);
  const [selectedRole, setSelectedRole] = useState('developer');
  const [heroReady, setHeroReady] = useState(false);

  // Sync hash routing for placements
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('placements')) {
        setCurrentView('placements');
        window.scrollTo(0, 0);
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view) => {
    setCurrentView(view);
    if (view === 'placements') {
      window.location.hash = '#/placements';
      window.scrollTo(0, 0);
    } else {
      window.location.hash = '';
      window.scrollTo(0, 0);
    }
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    setJoinSubmitted(true);
    setTimeout(() => {
      setJoinSubmitted(false);
      setIsJoinModalOpen(false);
    }, 2400);
  };

  // If in dedicated Placements screen
  if (currentView === 'placements') {
    return (
      <div className="app-motion-layout page-ready">
        <div className="navbar-wrapper">
          <Navbar onNavigate={handleNavigate} currentView="placements" />
        </div>
        <PlacementsDirectory onBackToHome={() => handleNavigate('home')} />
      </div>
    );
  }

  // Home Screen Layout
  return (
    <div className={`app-motion-layout ${heroReady ? 'page-ready' : 'page-loading'}`}>
      {/* Top Navigation */}
      {heroReady && (
        <div className="navbar-wrapper">
          <Navbar onNavigate={handleNavigate} currentView="home" />
        </div>
      )}

      {/* ─── Hero Section with Three.js & Smooth Text Animation ────────────── */}
      <section className="motion-hero-section" id="hero">
        {/* Three.js 3D Interactive WebGL Background */}
        <ThreeMotionCanvas onOpeningComplete={loaderDone ? onOpeningComplete : undefined} />

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
                  <span>Explore Guild</span>
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

      {/* Content Below Hero */}
      <div className={`content-below-hero ${heroReady ? 'elem-fade-in' : 'elem-hidden'}`}>
        {/* ─── 01 // About FOSS Club (Mission, Terminal & FeatureCarousel) ───── */}
        <AboutSection />

        {/* ─── 02 // Guild Leadership & Operatives (Club Leads) ─────────────── */}
        <TeamSection />

        {/* ─── 03 // Open Source Forge (3D Topology & Contributor Protocol) ──── */}
        <OpenSourceForge />

        {/* ─── 04 // Kinetic Matrix (Isometric GSAP Layered Text) ───────────── */}
        <KineticManifesto />

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
                <button
                  type="button"
                  onClick={() => handleNavigate('placements')}
                  className="footer-link placements-footer-btn"
                >
                  Placements Directory
                </button>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-link">
                  GitHub <ExternalLink size={12} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-link">
                  LinkedIn <ExternalLink size={12} />
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
                <p>
                  Your application packet has been registered on the local node. Check your inbox for Discord
                  and GitHub organization invites.
                </p>
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
  const navigate = useNavigate();

  // On hard reload, redirect to '/' so the loader + hero always play first.
  // We use performance.getEntriesByType (Navigation Timing API) to detect
  // a true page reload vs SPA route change. Unlike sessionStorage, this is
  // reliable: it resets every time the browser fetches the page.
  useEffect(() => {
    const navEntry = performance.getEntriesByType('navigation')[0];
    const navType  = navEntry?.type; // 'navigate' | 'reload' | 'back_forward'
    const isReload = navType === 'reload';
    const isFreshNav = navType === 'navigate';

    // On reload OR on first direct-URL navigation to a non-home route: redirect home
    if ((isReload || isFreshNav) && location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
