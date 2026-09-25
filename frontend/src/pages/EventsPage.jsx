import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import EventsThreeCanvas from '../components/EventsThreeCanvas';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  ArrowRight,
  ArrowLeft,
  Search,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  GitBranch,
  Terminal,
  Code2,
  X,
  Send,
  Layers,
  Award,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Filter,
  Star,
  BookOpen,
  LayoutGrid,
  Film,
  RotateCcw,
} from 'lucide-react';
import { DEFAULT_EVENTS, CONSOLIDATED_EVENTS, enrichEventForDisplay } from '../utils/eventUtils';
import './EventsPage.css';

const CATEGORIES = [
  'All',
  'Workshops & Seminars',
  'Hackathons & Challenges',
  'Orientation & Community',
  'Industrial Visits',
  'Culture & Heritage',
  'Technical Fests & Expos',
  'Historical Archive',
];

export default function EventsPage() {
  const [statusTab, setStatusTab] = useState('all'); // 'all' | 'Upcoming' | 'Past'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('loop'); // 'loop' | 'grid'
  const [isConsolidated, setIsConsolidated] = useState(true); // Default true to eliminate repetition of weekly sessions
  const [isLoopPaused, setIsLoopPaused] = useState(false);
  const [activeModalEvent, setActiveModalEvent] = useState(null);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpEmail, setRsvpEmail] = useState('');

  const marqueeRef = useRef(null);

  // Active base dataset: consolidated 15 unique events vs raw 20 weekly records
  const sourceEvents = isConsolidated ? CONSOLIDATED_EVENTS : DEFAULT_EVENTS;

  // Normalize all events from master register with unique titles and chapters
  const enrichedEvents = useMemo(() => {
    return sourceEvents.map((evt, idx) => enrichEventForDisplay(evt, idx));
  }, [sourceEvents]);

  // Filter events based on active status, category, and search query
  const filteredEvents = useMemo(() => {
    return enrichedEvents.filter((item) => {
      // Status filter
      if (statusTab === 'Upcoming' && item.status !== 'Upcoming') return false;
      if (statusTab === 'Past' && item.status !== 'Past') return false;

      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = item.title?.toLowerCase().includes(q);
        const inDesc = item.description?.toLowerCase().includes(q);
        const inVenue = item.venue?.toLowerCase().includes(q);
        const inYear = item.academic_year?.toLowerCase().includes(q);
        const inType = item.type?.toLowerCase().includes(q);
        if (!inTitle && !inDesc && !inVenue && !inYear && !inType) return false;
      }

      return true;
    });
  }, [enrichedEvents, statusTab, selectedCategory, searchQuery]);

  // Construct duplicated array for seamless looping marquee
  const loopingEvents = useMemo(() => {
    if (filteredEvents.length === 0) return [];
    if (filteredEvents.length < 5) {
      return [...filteredEvents, ...filteredEvents, ...filteredEvents, ...filteredEvents];
    }
    return [...filteredEvents, ...filteredEvents];
  }, [filteredEvents]);

  // Speed calculation: scale loop speed proportionally to number of items
  const marqueeDuration = useMemo(() => {
    return Math.max(35, filteredEvents.length * 4.4);
  }, [filteredEvents.length]);

  const upcomingCount = useMemo(
    () => DEFAULT_EVENTS.filter((e) => e.status === 'Upcoming').length,
    []
  );
  const pastCount = useMemo(
    () => DEFAULT_EVENTS.filter((e) => e.status === 'Past').length,
    []
  );

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    setRsvpSubmitted(true);
    setTimeout(() => {
      setRsvpSubmitted(false);
      setActiveModalEvent(null);
      setRsvpEmail('');
    }, 2200);
  };

  const scrollMarquee = (direction) => {
    if (marqueeRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      marqueeRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="events-page-wrapper">
      {/* ─── Scroll-Driven Three.js Chrono-Helix Canvas ────────────────────── */}
      <EventsThreeCanvas />

      {/* ─── Hero Section with Dynamic Chronology Header ───────────────────── */}
      <main className="events-main-content">
        {/* Ambient Top Light Beam for Page Entry */}
        <div className="events-entry-light-beam" aria-hidden="true" />

        <section className="events-hero-header">
          <div className="events-header-container">
            <div className="events-eyebrow-badge">
              <Sparkles size={13} />
              <span>OFFICIAL FOSS REGISTER • 2021 – 2026</span>
            </div>

            <h1 className="events-hero-title">
              <span className="title-line-mask">
                <span className="title-line-anim line-1">Where Open Ideas Turn Into</span>
              </span>
              <span className="title-line-mask">
                <span className="title-line-anim line-2 text-gradient-cyan">Upstream Pull Requests</span>
              </span>
            </h1>

            {/* ─── High-Level Summary Statistics Deck ────────────────────────── */}
            <div className="events-metrics-deck">
              <div className="metric-stat-item">
                <span className="metric-stat-val text-gradient-cyan">{sourceEvents.length}</span>
                <span className="metric-stat-lbl">{isConsolidated ? 'Flagship Events' : 'Total Sessions'}</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-stat-item">
                <span className="metric-stat-val">3,200+</span>
                <span className="metric-stat-lbl">Attendees & Coders</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-stat-item">
                <span className="metric-stat-val">5 Years</span>
                <span className="metric-stat-lbl">Academic Trajectory</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-stat-item">
                <span className="metric-stat-val text-green">★ 4.95</span>
                <span className="metric-stat-lbl">Session Satisfaction</span>
              </div>
            </div>

            {/* ─── Primary Status Switcher: All vs Upcoming vs Past ──────────── */}
            <div className="events-tab-container">
              <div className="events-tab-pill-box">
                <button
                  type="button"
                  className={`tab-switch-btn ${statusTab === 'all' ? 'is-active' : ''}`}
                  onClick={() => setStatusTab('all')}
                >
                  <span className="tab-status-dot all-dot" />
                  <span>All Gatherings ({sourceEvents.length})</span>
                </button>

                <button
                  type="button"
                  className={`tab-switch-btn ${statusTab === 'Upcoming' ? 'is-active' : ''}`}
                  onClick={() => setStatusTab('Upcoming')}
                >
                  <span className="tab-status-dot upcoming-dot" />
                  <span>Upcoming SDP ({upcomingCount})</span>
                </button>

                <button
                  type="button"
                  className={`tab-switch-btn ${statusTab === 'Past' ? 'is-active' : ''}`}
                  onClick={() => setStatusTab('Past')}
                >
                  <span className="tab-status-dot past-dot" />
                  <span>Past Events Archive ({sourceEvents.filter((e) => e.status === 'Past').length})</span>
                </button>
              </div>
            </div>

            {/* ─── Category Filter Pills Bar ─────────────────────────────────── */}
            <div className="events-category-scroll-bar">
              {CATEGORIES.map((cat) => {
                const count =
                  cat === 'All'
                    ? enrichedEvents.length
                    : enrichedEvents.filter((e) => e.category === cat).length;
                if (count === 0 && cat !== 'All') return null;
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`category-chip-btn ${selectedCategory === cat ? 'is-active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span>{cat}</span>
                    <span className="category-chip-count">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* ─── Search & View Mode Switcher Toolbar ───────────────────────── */}
            <div className="events-filter-bar">
              <div className="events-search-box">
                <Search size={15} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search events by title, track, venue, or year..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="events-toolbar-actions">
                {/* Repetition Filter: Consolidate Series vs Show All Sessions */}
                <div className="view-mode-toggle-group">
                  <button
                    type="button"
                    className={`view-mode-btn ${isConsolidated ? 'is-active' : ''}`}
                    onClick={() => setIsConsolidated(true)}
                    title="Consolidate duplicate weekly workshop modules into single master events"
                  >
                    <span>Unique Events ({CONSOLIDATED_EVENTS.length})</span>
                  </button>
                  <button
                    type="button"
                    className={`view-mode-btn ${!isConsolidated ? 'is-active' : ''}`}
                    onClick={() => setIsConsolidated(false)}
                    title="Show individual weekly sessions"
                  >
                    <span>All Sessions ({DEFAULT_EVENTS.length})</span>
                  </button>
                </div>

                {/* View Mode Toggle: Looping Strip vs Full Grid */}
                <div className="view-mode-toggle-group">
                  <button
                    type="button"
                    className={`view-mode-btn ${viewMode === 'loop' ? 'is-active' : ''}`}
                    onClick={() => setViewMode('loop')}
                    title="Infinite looping reel"
                  >
                    <Film size={14} />
                    <span>Looping Strip</span>
                  </button>
                  <button
                    type="button"
                    className={`view-mode-btn ${viewMode === 'grid' ? 'is-active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Browse all cards in grid"
                  >
                    <LayoutGrid size={14} />
                    <span>Full Grid</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Marquee Motion Control Strip (When in Loop Mode) ─────────────── */}
        {viewMode === 'loop' && filteredEvents.length > 0 && (
          <div className="events-loop-controls-bar">
            <div className="loop-status-indicator">
              <span className={`loop-pulse-dot ${isLoopPaused ? 'is-paused' : ''}`} />
              <span>
                {isLoopPaused
                  ? 'Motion Paused • Click to Resume'
                  : 'Continuous Loop Running • Hover anywhere to pause'}
              </span>
            </div>

            <div className="loop-btn-group">
              <button
                type="button"
                className="loop-control-btn"
                onClick={() => scrollMarquee('left')}
                title="Scroll previous"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className={`loop-control-btn ${isLoopPaused ? 'is-active-btn' : ''}`}
                onClick={() => setIsLoopPaused(!isLoopPaused)}
                title={isLoopPaused ? 'Resume loop' : 'Pause loop'}
              >
                {isLoopPaused ? <Play size={14} /> : <Pause size={14} />}
                <span>{isLoopPaused ? 'Resume' : 'Pause'}</span>
              </button>
              <button
                type="button"
                className="loop-control-btn"
                onClick={() => scrollMarquee('right')}
                title="Scroll next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ─── Chapter-Based Card Showing Area ────────────────────────────── */}
        <section className="events-feed-section">
          {filteredEvents.length === 0 ? (
            <div className="events-empty-state">
              <Code2 size={40} className="empty-icon text-cyan" />
              <h3>No matching events found</h3>
              <p>
                No events match your current filter query "{searchQuery || selectedCategory}".
                Try clearing your search or category filters.
              </p>
              <button
                type="button"
                className="motion-btn secondary-glass"
                onClick={() => {
                  setStatusTab('all');
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
              >
                <RotateCcw size={14} />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : viewMode === 'loop' ? (
            /* ─── Continuous Looping Marquee Section (Stops on Hover) ──────── */
            <div className="events-marquee-viewport" ref={marqueeRef}>
              <div
                className={`events-marquee-track ${isLoopPaused ? 'is-paused' : ''}`}
                style={{ '--loop-duration': `${marqueeDuration}s` }}
              >
                {loopingEvents.map((item, idx) => (
                  <article
                    key={`${item.id}-loop-${idx}`}
                    className="chapter-column-card"
                    style={{
                      '--stagger-offset': item.staggerY || (idx % 2 === 1 ? '54px' : '0px'),
                      '--badge-color': item.accentColor,
                      '--badge-glow': item.glowColor,
                    }}
                    onClick={() => setActiveModalEvent(item)}
                  >
                    {/* Visual Artwork Banner */}
                    <div className="chapter-art-frame">
                      <img
                        src={item.image_url || item.fallbackImage}
                        alt={item.title}
                        className="chapter-art-img"
                        loading="lazy"
                        onError={(e) => {
                          if (e.currentTarget.src !== window.location.origin + item.fallbackImage) {
                            e.currentTarget.src = item.fallbackImage;
                          }
                        }}
                      />
                      <div className="chapter-art-overlay" />
                      {item.status === 'Upcoming' && (
                        <span className="live-status-chip">UPCOMING SDP</span>
                      )}
                      {item.rating && (
                        <span className="card-rating-chip">★ {item.rating}</span>
                      )}
                    </div>

                    {/* Chapter Framed Badge */}
                    <div className="chapter-badge-wrap">
                      <div
                        className="chapter-badge-box"
                        style={{ borderColor: item.accentColor }}
                      >
                        <span className="chapter-badge-text">{item.chapter}</span>
                      </div>
                    </div>

                    {/* Card Title & Category Info */}
                    <div className="chapter-info-wrap">
                      <h3 className="chapter-card-title">{item.cardTitle || item.title}</h3>
                      <p className="chapter-card-category">{item.category}</p>
                      <div className="chapter-card-meta-line">
                        <span className="card-meta-date">{item.date}</span>
                        {item.academic_year && (
                          <span className="card-meta-year">{item.academic_year}</span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            /* ─── Full Grid View of All Events ────────────────────────────── */
            <div className="events-chapter-gallery-wrap">
              <div className="events-chapter-gallery is-grid-layout">
                {filteredEvents.map((item, idx) => (
                  <article
                    key={item.id}
                    className="chapter-column-card is-grid-card"
                    style={{
                      '--card-delay': `${0.06 + idx * 0.03}s`,
                      '--stagger-offset': item.staggerY || (idx % 2 === 1 ? '54px' : '0px'),
                      '--badge-color': item.accentColor,
                      '--badge-glow': item.glowColor,
                    }}
                    onClick={() => setActiveModalEvent(item)}
                  >
                    {/* Visual Artwork Banner */}
                    <div className="chapter-art-frame">
                      <img
                        src={item.image_url || item.fallbackImage}
                        alt={item.title}
                        className="chapter-art-img"
                        loading="lazy"
                        onError={(e) => {
                          if (e.currentTarget.src !== window.location.origin + item.fallbackImage) {
                            e.currentTarget.src = item.fallbackImage;
                          }
                        }}
                      />
                      <div className="chapter-art-overlay" />
                      {item.status === 'Upcoming' && (
                        <span className="live-status-chip">UPCOMING SDP</span>
                      )}
                      {item.rating && (
                        <span className="card-rating-chip">★ {item.rating}</span>
                      )}
                    </div>

                    {/* Chapter Framed Badge */}
                    <div className="chapter-badge-wrap">
                      <div
                        className="chapter-badge-box"
                        style={{ borderColor: item.accentColor }}
                      >
                        <span className="chapter-badge-text">{item.chapter}</span>
                      </div>
                    </div>

                    {/* Card Title & Category Info */}
                    <div className="chapter-info-wrap">
                      <h3 className="chapter-card-title">{item.cardTitle || item.title}</h3>
                      <p className="chapter-card-category">{item.category}</p>
                      <div className="chapter-card-meta-line">
                        <span className="card-meta-date">{item.date}</span>
                        {item.academic_year && (
                          <span className="card-meta-year">{item.academic_year}</span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* ─── Interactive Event Detail & RSVP Modal ─────────────────────────── */}
      {activeModalEvent && (
        <div
          className="modal-backdrop-wrap"
          onClick={() => setActiveModalEvent(null)}
        >
          <div
            className="modal-glass-container event-detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-button"
              onClick={() => setActiveModalEvent(null)}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {rsvpSubmitted ? (
              <div className="rsvp-success-screen">
                <CheckCircle2 size={54} className="text-cyan success-pulse-icon" />
                <h3>Registration Confirmed!</h3>
                <p>
                  You are registered for <strong>{activeModalEvent.title}</strong>. Check{' '}
                  <span className="email-highlight">{rsvpEmail || 'your email'}</span> for your
                  calendar invite, venue badge, and preparation pack.
                </p>
                <div className="success-tag">PASS ID // #FOSS-{Math.floor(Math.random() * 90000 + 10000)}</div>
              </div>
            ) : (
              <div className="event-detail-scrollable">
                <div className="modal-header-meta">
                  <span className="event-type-badge">{activeModalEvent.type || activeModalEvent.category}</span>
                  <span className="modal-date-val">{activeModalEvent.date}</span>
                  {activeModalEvent.rating && (
                    <span className="modal-rating-badge">★ {activeModalEvent.rating}</span>
                  )}
                </div>

                <h2 className="modal-event-title">{activeModalEvent.title}</h2>
                <p className="modal-event-desc">{activeModalEvent.description || activeModalEvent.desc}</p>

                {/* Specs Grid */}
                <div className="modal-specs-grid">
                  <div className="modal-spec-cell">
                    <span className="cell-label">Schedule / Duration</span>
                    <span className="cell-value">{activeModalEvent.time || activeModalEvent.duration}</span>
                  </div>
                  <div className="modal-spec-cell">
                    <span className="cell-label">Venue</span>
                    <span className="cell-value">{activeModalEvent.venue || activeModalEvent.mode}</span>
                  </div>
                  <div className="modal-spec-cell">
                    <span className="cell-label">Academic Year</span>
                    <span className="cell-value">{activeModalEvent.academic_year || 'FET Jain University'}</span>
                  </div>
                  <div className="modal-spec-cell">
                    <span className="cell-label">Attendance / Scale</span>
                    <span className="cell-value">{activeModalEvent.attendance || `${activeModalEvent.participants_count || 100}+ Participants`}</span>
                  </div>
                </div>

                {/* Objectives */}
                {activeModalEvent.objectives && activeModalEvent.objectives.length > 0 && (
                  <div className="modal-agenda-section">
                    <h4 className="agenda-title">
                      <Layers size={16} className="text-cyan" />
                      <span>Key Objectives & Pedagogical Focus</span>
                    </h4>
                    <ul className="modal-objectives-list">
                      {activeModalEvent.objectives.map((obj, i) => (
                        <li key={i}>
                          <CheckCircle2 size={13} className="text-cyan" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Curriculum for SDP workshops */}
                {activeModalEvent.curriculum && activeModalEvent.curriculum.length > 0 && (
                  <div className="modal-agenda-section">
                    <h4 className="agenda-title">
                      <BookOpen size={16} className="text-green" />
                      <span>4-Week Structured Curriculum</span>
                    </h4>
                    <div className="agenda-timeline-track">
                      {activeModalEvent.curriculum.map((curr, i) => (
                        <div key={i} className="agenda-timeline-step">
                          <span className="step-time">{curr.week} • {curr.date}</span>
                          <span className="step-title">{curr.title}</span>
                          <p className="step-desc">{curr.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Coordinators */}
                {activeModalEvent.coordinators && activeModalEvent.coordinators.length > 0 && (
                  <div className="modal-coordinators-section">
                    <h4 className="agenda-title">
                      <Users size={16} className="text-violet" />
                      <span>Program Leadership & Student Coordinators</span>
                    </h4>
                    <div className="coordinators-grid">
                      {activeModalEvent.coordinators.map((c, i) => (
                        <div key={i} className="coordinator-badge-card">
                          <span className="coordinator-name">{c.name}</span>
                          <span className="coordinator-role">{c.role}</span>
                          {c.phone && <span className="coordinator-phone">Tel: {c.phone}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Outcomes & Highlights */}
                {activeModalEvent.outcomes && (
                  <div className="modal-prereqs-box">
                    <Award size={16} className="text-green" />
                    <div>
                      <strong>Educational Outcomes: </strong>
                      <span>{activeModalEvent.outcomes}</span>
                    </div>
                  </div>
                )}

                {/* RSVP / Registration Form */}
                {activeModalEvent.status === 'Upcoming' ? (
                  <form onSubmit={handleRsvpSubmit} className="modal-rsvp-form">
                    <h4 className="rsvp-form-heading">Register for Vibe Coding Workshop (SDP)</h4>
                    <div className="rsvp-input-row">
                      <input
                        type="email"
                        required
                        placeholder="your.email@jainuniversity.ac.in or personal..."
                        value={rsvpEmail}
                        onChange={(e) => setRsvpEmail(e.target.value)}
                        className="rsvp-email-input"
                      />
                      <button type="submit" className="motion-btn primary-glow rsvp-submit-btn">
                        <span>Confirm Enrollment</span>
                        <Send size={14} />
                      </button>
                    </div>
                    <span className="rsvp-privacy-note">
                      Faculty of Engineering & Technology • 4 Saturdays • Certificate upon completion
                    </span>
                  </form>
                ) : (
                  <div className="modal-archive-actions">
                    <div className="archive-record-note">
                      <span>Official Departmental Archive Record • FET Jain University</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
