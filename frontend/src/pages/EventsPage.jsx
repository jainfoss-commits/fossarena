import React, { useState, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
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
  Maximize2,
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

const FALLBACK_GALLERY_IMAGES = [
  '/events/03_Project_Expo_Jun2023/photo_10.jpeg',
  '/events/18_Fullstack_Week5_Node_Express_Mar2026/photo_01.jpeg',
  '/events/17_Squid_Game_Challenge_Mar2026/photo_01.jpeg',
  '/events/04_DIP23_Induction_Sep2023/photo_03.jpeg',
  '/events/02_Exam_Writing_Presentation_Workshop_May2023/photo_02.jpeg',
  '/events/08_Industrial_Visit_XCEL_Corp_Feb2024/photo_01.png',
  '/events/09_Code_Relay_Challenge_Mar2025/photo_01.jpeg',
  '/events/chapter-1.png',
  '/events/chapter-2.png',
  '/events/chapter-3.png',
  '/events/chapter-5.png',
];

function getEventGalleryPhotos(event) {
  if (!event) return [];
  const isUpcoming = event.status === 'Upcoming' ||
    event.id === 'event-vibe-coding-workshop-sep2026' ||
    (event.title && event.title.toLowerCase().includes('vibe coding'));
  if (isUpcoming) {
    return [];
  }

  const photos = Array.isArray(event.photos) && event.photos.length > 0
    ? [...event.photos]
    : [];

  if (photos.length === 0 && event.image_url) {
    photos.push(event.image_url);
  }

  let fbIdx = 0;
  while (photos.length < 9 && fbIdx < FALLBACK_GALLERY_IMAGES.length) {
    const candidate = FALLBACK_GALLERY_IMAGES[fbIdx++];
    if (!photos.includes(candidate)) {
      photos.push(candidate);
    }
  }

  return photos;
}

function getCylinderSlotStyle(offset) {
  const absOffset = Math.abs(offset);
  const x = offset * 64; // 64px spread: fits completely inside the container
  const y = (4 - Math.min(absOffset, 4)) * 3; // gentle concave curve
  const rotY = offset * -14; // smooth inward 3D rotation
  const scale = Number((1 - absOffset * 0.055).toFixed(2));
  const zIndex = 30 - absOffset * 4;
  const opacity = absOffset >= 4 ? 0 : (absOffset === 3 ? 0.65 : 1);
  const pointerEvents = absOffset >= 4 ? 'none' : 'auto';

  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0px) rotateY(${rotY}deg) scale(${scale})`,
    zIndex,
    opacity,
    pointerEvents,
  };
}

export default function EventsPage() {
  const [statusTab, setStatusTab] = useState('all'); // 'all' | 'Upcoming' | 'Past'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isConsolidated, setIsConsolidated] = useState(true); // Default true: eliminate duplicate weekly entries
  const [isLoopPaused, setIsLoopPaused] = useState(false);
  const [expandedCardKey, setExpandedCardKey] = useState(null);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [targetExpandedWidth, setTargetExpandedWidth] = useState(960);
  const [frozenTrackX, setFrozenTrackX] = useState(null);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpEmail, setRsvpEmail] = useState('');

  const marqueeRef = useRef(null);
  const trackRef = useRef(null);
  const baseTrackXRef = useRef(null);
  const isCollapsingRef = useRef(false);

  // Active base dataset: consolidated 15 unique events vs raw 20 weekly records
  const sourceEvents = isConsolidated ? CONSOLIDATED_EVENTS : DEFAULT_EVENTS;

  // Normalize all events from master register with unique titles and chapters
  const enrichedEvents = useMemo(() => {
    return sourceEvents.map((evt, idx) => enrichEventForDisplay(evt, idx));
  }, [sourceEvents]);

  // Filter events based on active status, category, and search query
  const filteredEvents = useMemo(() => {
    return enrichedEvents.filter((item) => {
      if (statusTab === 'Upcoming' && item.status !== 'Upcoming') return false;
      if (statusTab === 'Past' && item.status !== 'Past') return false;
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      return true;
    });
  }, [enrichedEvents, statusTab, selectedCategory]);

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

  const galleryPhotos = useMemo(() => {
    return getEventGalleryPhotos(expandedEvent);
  }, [expandedEvent]);

  // Compute 9 symmetrical slots (-4 to +4) with stable photo keys for smooth 3D carousel transitions
  const visibleGallerySlots = useMemo(() => {
    if (!galleryPhotos || galleryPhotos.length === 0) return [];
    const total = galleryPhotos.length;
    const slots = [];
    for (let offset = -4; offset <= 4; offset++) {
      let rawIdx = (activeGalleryIdx + offset) % total;
      if (rawIdx < 0) rawIdx += total;
      slots.push({
        slotKey: `photo-${rawIdx}`, // Stable key based on photo index enables smooth slide animation
        offset,
        absOffset: Math.abs(offset),
        isCenter: offset === 0,
        photoIdx: rawIdx,
        photoSrc: galleryPhotos[rawIdx],
      });
    }
    return slots;
  }, [galleryPhotos, activeGalleryIdx]);

  const computeExpandedTarget = () => {
    const winW = window.innerWidth;
    return winW < 768 
      ? Math.min(winW - 24, 620) 
      : Math.min(1060, Math.max(760, winW * 0.82));
  };

  const handleCardClick = (cardKey, eventItem, cardElement) => {
    if (expandedCardKey === cardKey) {
      handleCollapse();
      return;
    }

    const trackEl = trackRef.current;
    const winW = window.innerWidth;
    const targetWidth = computeExpandedTarget();

    if (trackEl && cardElement) {
      // 1. Get computed transform of the track at current instant
      const computedStyle = window.getComputedStyle(trackEl);
      const matrix = new DOMMatrixReadOnly(computedStyle.transform);
      const currentTrackX = matrix.m41;
      baseTrackXRef.current = currentTrackX;

      // 2. Measure card's current viewport position
      const cardRect = cardElement.getBoundingClientRect();

      // 3. In-flow expansion: card expands in-place to targetWidth.
      // Its center will be cardRect.left + (targetWidth / 2).
      const newCardCenter = cardRect.left + (targetWidth / 2);
      const viewportCenter = winW / 2;

      // 4. Translate track so that newCardCenter lands exactly at viewportCenter
      const deltaX = viewportCenter - newCardCenter;
      const targetTrackX = currentTrackX + deltaX;

      setFrozenTrackX(targetTrackX);
      setTargetExpandedWidth(targetWidth);
    }

    setActiveGalleryIdx(0);
    setExpandedCardKey(cardKey);
    setExpandedEvent(eventItem);
    setIsLoopPaused(true);
  };

  const handleCollapse = () => {
    if (isCollapsingRef.current) return;
    isCollapsingRef.current = true;

    // Slide track smoothly back to its base position before collapse
    if (baseTrackXRef.current !== null) {
      setFrozenTrackX(baseTrackXRef.current);
    }
    setExpandedCardKey(null);
    setExpandedEvent(null);
    setLightboxPhoto(null);

    // After collapse transition finishes, resume conveyor
    setTimeout(() => {
      setFrozenTrackX(null);
      setIsLoopPaused(false);
      baseTrackXRef.current = null;
      isCollapsingRef.current = false;
    }, 520);
  };

  const handleGalleryNav = (direction) => {
    if (galleryPhotos.length <= 1) return;
    setActiveGalleryIdx((prev) => {
      const next = (prev + direction) % galleryPhotos.length;
      return next < 0 ? next + galleryPhotos.length : next;
    });
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    setRsvpSubmitted(true);
    setTimeout(() => {
      setRsvpSubmitted(false);
      handleCollapse();
      setRsvpEmail('');
    }, 2200);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCollapse();
      } else if (e.key === 'ArrowLeft' && expandedCardKey) {
        handleGalleryNav(-1);
      } else if (e.key === 'ArrowRight' && expandedCardKey) {
        handleGalleryNav(1);
      }
    };
    if (expandedCardKey) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedCardKey, galleryPhotos.length]);

  // Recalculate horizontal center shift on viewport resize
  useEffect(() => {
    if (!expandedCardKey) return;
    const handleResize = () => {
      const cardEl = document.querySelector(`[data-card-key="${expandedCardKey}"]`);
      const trackEl = trackRef.current;
      if (cardEl && trackEl) {
        const winW = window.innerWidth;
        const targetWidth = computeExpandedTarget();
        setTargetExpandedWidth(targetWidth);

        const cardRect = cardEl.getBoundingClientRect();
        const currentCenter = cardRect.left + (cardRect.width / 2);
        const delta = (winW / 2) - currentCenter;
        setFrozenTrackX((prev) => (prev !== null ? prev + delta : delta));
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [expandedCardKey]);

  const isConveyorPaused = isLoopPaused || expandedCardKey !== null;

  return (
    <div className="events-page-wrapper">
      {/* ─── Hero Section with Dynamic Chronology Header ───────────────────── */}
      <main className="events-main-content">
        {/* Ambient Top Light Beam for Page Entry */}
        <div className="events-entry-light-beam" aria-hidden="true" />

        {/* ─── Chapter-Based Vertical Strip Event Conveyor ───────────────── */}
        <section 
          className={`events-feed-section ${expandedCardKey ? 'has-expanded-card' : ''}`}
          onClick={() => {
            if (expandedCardKey) handleCollapse();
          }}
        >
          <div
            className={`events-marquee-viewport ${expandedCardKey ? 'has-expanded-card' : ''}`}
            ref={marqueeRef}
            onMouseEnter={() => setIsLoopPaused(true)}
            onMouseLeave={() => {
              if (!expandedCardKey) setIsLoopPaused(false);
            }}
          >
            <div
              ref={trackRef}
              className={`events-marquee-track ${isConveyorPaused ? 'is-paused' : ''} ${expandedCardKey ? 'has-expanded-card' : ''}`}
              style={{
                '--loop-duration': `${marqueeDuration}s`,
                ...(frozenTrackX !== null ? {
                  transform: `translateX(${frozenTrackX}px)`,
                  transition: 'transform 0.52s cubic-bezier(0.16, 1, 0.3, 1)',
                  animation: 'none',
                } : {}),
              }}
            >
              {loopingEvents.map((item, idx) => {
                const cardKey = `${item.id}-loop-${idx}`;
                const isExpanded = expandedCardKey === cardKey;

                return (
                  <article
                    key={cardKey}
                    data-card-key={cardKey}
                    className={`chapter-column-card ${isExpanded ? 'is-card-expanded' : ''} ${expandedCardKey && !isExpanded ? 'is-dimmed' : ''}`}
                    style={{
                      '--stagger-offset': isExpanded ? '0px' : (item.staggerY || (idx % 2 === 1 ? '24px' : '0px')),
                      '--badge-color': item.accentColor,
                      '--badge-glow': item.glowColor,
                      ...(isExpanded ? {
                        '--card-expanded-w': `${targetExpandedWidth}px`,
                      } : {}),
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isExpanded) {
                        handleCardClick(cardKey, item, e.currentTarget);
                      }
                    }}
                  >
                    <div className="chapter-card-inner">
                      {/* Visual Artwork Banner (Left side when expanded) */}
                      <div
                        className="chapter-art-frame"
                        onClick={(e) => {
                          if (isExpanded) {
                            e.stopPropagation();
                            setLightboxPhoto(item.image_url || item.fallbackImage);
                          }
                        }}
                        title={isExpanded ? 'Click to view full resolution poster' : 'Click to view event details'}
                      >
                        <img
                          src={item.image_url || item.fallbackImage}
                          alt={item.title}
                          className={`chapter-art-img ${isExpanded ? 'is-expanded-poster' : ''}`}
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
                        {isExpanded && (
                          <div className="expanded-art-collapse-hint">
                            <span>◄ CLOSE</span>
                          </div>
                        )}
                      </div>

                      {/* In-Card Horizontally Expanded Details Panel (Expands in-place towards middle) */}
                      {isExpanded && (
                        <div
                          className="chapter-expanded-panel"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            className="expanded-panel-close-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCollapse();
                            }}
                            aria-label="Collapse event details"
                            title="Collapse (Esc)"
                          >
                            <X size={18} />
                          </button>

                          <div className="editorial-panel-scrollable">
                            {/* Editorial Eyebrow & Headline */}
                            <header className="editorial-header">
                              <div className="editorial-meta-kicker">
                                <span className="editorial-kicker-type">{item.type || item.category}</span>
                                <span className="editorial-kicker-sep">/</span>
                                <time className="editorial-kicker-item">{item.date}</time>
                                {item.academic_year && (
                                  <>
                                    <span className="editorial-kicker-sep">/</span>
                                    <span className="editorial-kicker-item">{item.academic_year}</span>
                                  </>
                                )}
                                <span className="editorial-kicker-sep">/</span>
                                <span className={`editorial-status-pill ${item.status === 'Upcoming' ? 'is-upcoming' : ''}`}>
                                  {item.status === 'Upcoming' ? 'REGISTRATIONS OPEN' : 'ARCHIVED RECORD'}
                                </span>
                              </div>

                              <h2 className="editorial-headline">{item.title}</h2>
                              <p className="editorial-narrative">{item.description || item.desc}</p>
                            </header>

                            {/* Minimalist Telemetry Row */}
                            <dl className="editorial-telemetry-row">
                              <div className="telemetry-cell">
                                <dt className="telemetry-term">SCHEDULE DATE</dt>
                                <dd className="telemetry-val">{item.date}</dd>
                              </div>
                              <div className="telemetry-cell">
                                <dt className="telemetry-term">CAMPUS VENUE</dt>
                                <dd className="telemetry-val">{item.venue || 'FET Campus Block'}</dd>
                              </div>
                              <div className="telemetry-cell">
                                <dt className="telemetry-term">TIME WINDOW</dt>
                                <dd className="telemetry-val">{item.time || '10:00 AM – 4:00 PM'}</dd>
                              </div>
                              <div className="telemetry-cell">
                                <dt className="telemetry-term">ACADEMIC SCOPE</dt>
                                <dd className="telemetry-val">{item.category}</dd>
                              </div>
                              <div className="telemetry-cell">
                                <dt className="telemetry-term">DELIVERY FORMAT</dt>
                                <dd className="telemetry-val">{item.mode || 'In-Person Workshop'}</dd>
                              </div>
                              <div className="telemetry-cell">
                                <dt className="telemetry-term">ATTENDANCE LOG</dt>
                                <dd className="telemetry-val">{item.attendance || `${item.participants_count || 120}+ Attended`}</dd>
                              </div>
                            </dl>

                            {/* ─── Photo Gallery (past events only) ─── */}
                            {item.status !== 'Upcoming' && galleryPhotos.length > 0 && (
                                <section className="editorial-gallery-section">
                                  <div className="editorial-gallery-header">
                                    <div className="gallery-header-info">
                                      <span className="gallery-header-badge">VISUAL ARCHIVE</span>
                                      <h3 className="gallery-section-title">Event Photo Gallery</h3>
                                    </div>
                                    <div className="gallery-nav-controls">
                                      <span className="gallery-counter">
                                        {galleryPhotos.length > 0 ? `${activeGalleryIdx + 1} / ${galleryPhotos.length}` : '0 / 0'}
                                      </span>
                                      <button
                                        type="button"
                                        className="gallery-nav-btn prev-btn"
                                        onClick={() => handleGalleryNav(-1)}
                                        aria-label="Previous gallery photo"
                                      >
                                        <ChevronLeft size={16} />
                                      </button>
                                      <button
                                        type="button"
                                        className="gallery-nav-btn next-btn"
                                        onClick={() => handleGalleryNav(1)}
                                        aria-label="Next gallery photo"
                                        title="Next Photo"
                                      >
                                        <ChevronRight size={16} />
                                      </button>
                                      <button
                                        type="button"
                                        className="gallery-nav-btn expand-btn"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setLightboxPhoto(galleryPhotos[activeGalleryIdx] || null);
                                        }}
                                        title="Fullscreen Photo"
                                        aria-label="Fullscreen photo preview"
                                      >
                                        <Maximize2 size={13} />
                                      </button>
                                    </div>
                                  </div>

                                  {/* Cylindrical 3D Panoramic Curve Stage (Contained inside box) */}
                                  <div className="gallery-cylindrical-viewport">
                                    <div className="gallery-cylindrical-track">
                                      {visibleGallerySlots.map((slot) => {
                                        const slotStyle = getCylinderSlotStyle(slot.offset);
                                        return (
                                          <div
                                            key={slot.slotKey}
                                            className={`gallery-cylinder-card ${slot.isCenter ? 'is-center-card' : ''}`}
                                            style={slotStyle}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setActiveGalleryIdx(slot.photoIdx);
                                            }}
                                            title={slot.isCenter ? "Click to view full photo" : `Focus photo ${slot.photoIdx + 1}`}
                                          >
                                            <img
                                              src={slot.photoSrc}
                                              alt={`${item.title} photo ${slot.photoIdx + 1}`}
                                              className="cylinder-card-img"
                                              loading="lazy"
                                              onError={(e) => {
                                                if (e.currentTarget.src !== window.location.origin + '/events/chapter-1.png') {
                                                  e.currentTarget.src = '/events/chapter-1.png';
                                                }
                                              }}
                                            />
                                            <div className="cylinder-card-shine" />
                                            <span className="cylinder-card-num">0{slot.photoIdx + 1}</span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </section>
                            )}


                            {/* Strategic Session Objectives */}
                            {item.objectives && item.objectives.length > 0 && (
                              <section className="editorial-objectives-block">
                                <h3 className="editorial-subheading">SESSION OBJECTIVES & KEY LEARNINGS</h3>
                                <ol className="editorial-numbered-list">
                                  {item.objectives.map((obj, i) => (
                                    <li key={i} className="editorial-list-item">
                                      <span className="editorial-item-num">0{i + 1}</span>
                                      <span className="editorial-item-text">{obj}</span>
                                    </li>
                                  ))}
                                </ol>
                              </section>
                            )}

                            {/* Curriculum Breakdown */}
                            {item.curriculum && item.curriculum.length > 0 && (
                              <section className="editorial-curriculum-strip">
                                <h3 className="editorial-subheading">CURRICULUM BREAKDOWN</h3>
                                <div className="editorial-curriculum-flow">
                                  {item.curriculum.map((week, wIdx) => (
                                    <article key={wIdx} className="editorial-week-entry">
                                      <span className="week-tag">{week.week}</span>
                                      <h4 className="week-heading">{week.title}</h4>
                                      <p className="week-desc">{week.description}</p>
                                      {week.date && <time className="week-date">{week.date}</time>}
                                    </article>
                                  ))}
                                </div>
                              </section>
                            )}

                            {/* Institutional Outcome Quote */}
                            {item.outcomes && (
                              <blockquote className="editorial-outcomes-quote">
                                <p className="quote-body">"{item.outcomes}"</p>
                                <cite className="quote-attribution">— Department of Computer Science & Engineering, FET Jain (Deemed-to-be University)</cite>
                              </blockquote>
                            )}

                            {/* Action Footer */}
                            <footer className="editorial-action-footer">
                              {item.status === 'Upcoming' ? (
                                <form onSubmit={handleRsvpSubmit} className="editorial-rsvp-inline">
                                  <label htmlFor="editorial-email-field" className="editorial-rsvp-label">
                                    RESERVE ACCESS PASS
                                  </label>
                                  <div className="editorial-input-group">
                                    <input
                                      id="editorial-email-field"
                                      type="email"
                                      required
                                      placeholder="Enter university email address..."
                                      value={rsvpEmail}
                                      onChange={(e) => setRsvpEmail(e.target.value)}
                                      className="editorial-rsvp-input"
                                    />
                                    <button type="submit" className="editorial-rsvp-button">
                                      <span>CONFIRM PASS</span>
                                      <Send size={13} />
                                    </button>
                                  </div>
                                  {rsvpSubmitted && (
                                    <p className="editorial-rsvp-success">
                                      ✓ Registration confirmed for {rsvpEmail || 'attendee'}. Credentials dispatched.
                                    </p>
                                  )}
                                </form>
                              ) : (
                                <div className="editorial-archive-seal">
                                  <span className="seal-dot" />
                                  <span>AUTHENTICATED INSTITUTIONAL ARCHIVE • FACULTY OF ENGINEERING & TECHNOLOGY (FET)</span>
                                </div>
                              )}
                            </footer>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Title & Category Info (Visible below card when NOT expanded) */}
                    {!isExpanded && (
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
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Lightbox Full-Resolution Photo Modal (Portaled to document.body) */}
        {lightboxPhoto && typeof document !== 'undefined' && createPortal(
          <div 
            className="gallery-lightbox-overlay"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxPhoto(null);
            }}
          >
            <div className="gallery-lightbox-modal" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setLightboxPhoto(null)}
                aria-label="Close fullscreen view"
              >
                <X size={20} />
              </button>
              <img src={lightboxPhoto} alt="Full resolution capture" className="lightbox-img" />
            </div>
          </div>,
          document.body
        )}
      </main>
    </div>
  );
}
