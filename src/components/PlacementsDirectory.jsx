import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Calendar,
  MapPin,
  Sparkles,
  Users,
  GraduationCap,
  Building2,
  ArrowUpRight,
} from 'lucide-react';
import { placementsData } from '../data/mockData';
import './PlacementsDirectory.css';

// Formats "21-09-2026 (Monday)" into clean "September 21, 2026"
const formatCleanDate = (dateStr) => {
  if (!dateStr) return '';
  const match = dateStr.match(/(\d{2})-(\d{2})-(\d{4})/);
  if (match) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const day = parseInt(match[1], 10);
    const monthIndex = parseInt(match[2], 10) - 1;
    const year = match[3];
    return `${months[monthIndex]} ${day}, ${year}`;
  }
  return dateStr.split('(')[0].trim();
};

// Assigns background gradient theme matching the reference card image
const getCardTheme = (ctcNum, index) => {
  if (ctcNum >= 10) return 'theme-emerald'; // Deep forest green glow
  if (ctcNum >= 8)  return 'theme-crimson'; // Deep ruby crimson glow
  if (ctcNum >= 6)  return index % 2 === 0 ? 'theme-sapphire' : 'theme-emerald';
  return index % 2 === 0 ? 'theme-crimson' : 'theme-slate';
};

export default function PlacementsDirectory() {
  const [selectedDriveForModal, setSelectedDriveForModal] = useState(null);

  // Guarantee page starts from the very top on open
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedDriveForModal) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [selectedDriveForModal]);

  // Master placement drives (excluding academic pauses)
  const drives = useMemo(() => {
    return placementsData.drives.filter((d) => !d.isAcademicPause);
  }, []);

  // Keyboard navigation (Escape to close modal)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedDriveForModal && e.key === 'Escape') {
        setSelectedDriveForModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDriveForModal]);

  return (
    <div className="brandhub-placements-page">
      {/* Global floating Navbar is mounted at root shell */}

      {/* ─── Normal Rows Form of Placement Boxes ─────────────────────────────── */}
      <main className="brandhub-placements-main">
        {/* Page Title */}
        <div className="brandhub-placements-header">
          <h1 className="brandhub-headline">PLACEMENTS</h1>
        </div>

        {/* Regular Rows Grid of News-Style Cards */}
        <div className="brandhub-news-grid">
          {drives.map((item, idx) => {
            const formattedDate = formatCleanDate(item.date);
            const themeClass = getCardTheme(item.ctcNum, idx);
            const isDream = item.ctcNum >= 10;

            return (
              <div
                key={item.id}
                className={`news-card-container ${themeClass}`}
                onClick={() => setSelectedDriveForModal(item)}
                title={`View ${item.company} dossier`}
              >
                {/* Card Top: Tag info + Circular ↗ Arrow Button */}
                <div className="news-card-top-row">
                  <div className="news-card-kicker-group">
                    <span className="news-card-kicker-title">
                      {isDream ? 'Dream Recruitment' : 'Campus Recruitment'}
                    </span>
                    <span className="news-card-kicker-sub">
                      {item.venueType.includes('Online') ? 'Online Assessment' : 'On-Campus Drive'} • {item.branches.split('/')[0].trim()}
                    </span>
                  </div>

                  <div className="news-card-arrow-disc">
                    <ArrowUpRight size={17} className="news-arrow-icon" />
                  </div>
                </div>

                {/* Card Body: Company Name, Role & Prominent LPA Package */}
                <div className="news-card-center-block">
                  <div className="news-company-lpa-row">
                    <h3 className="news-company-title">
                      {item.company}
                    </h3>
                    <div className="news-lpa-chip">
                      <span className="news-lpa-value">{item.ctc}</span>
                    </div>
                  </div>

                  <h4 className="news-role-headline">
                    {item.role}
                  </h4>

                  <span className="news-date-label">
                    {formattedDate}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ─── Swiss Minimalist Placement Details Modal ─────────────────────────── */}
      {selectedDriveForModal && (
        <div
          className="brandhub-details-backdrop"
          onClick={() => setSelectedDriveForModal(null)}
        >
          <div
            className="brandhub-details-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Top Chrome */}
            <div className="modal-top-chrome">
              <div className="modal-kicker">
                <span className="kicker-dot" />
                <span>PLACEMENT DOSSIER // {selectedDriveForModal.id.toUpperCase()}</span>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedDriveForModal(null)}
                aria-label="Close details"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="modal-scroll-body">
              {/* Company & Role Header */}
              <div className="modal-title-section">
                <span className="modal-category-badge">
                  {selectedDriveForModal.ctcNum >= 10 ? 'DREAM OFFER (10+ LPA)' : 'CAMPUS RECRUITMENT'}
                </span>
                <h2 className="modal-event-title">
                  {selectedDriveForModal.company}
                </h2>
                <p className="modal-drive-role-subtitle">
                  {selectedDriveForModal.role}
                </p>

                {/* Minimalist Meta Grid */}
                <div className="modal-meta-grid">
                  <div className="meta-tile">
                    <Sparkles size={14} className="meta-icon" />
                    <div>
                      <span className="meta-label">ANNUAL CTC</span>
                      <span className="meta-val text-accent">{selectedDriveForModal.ctc}</span>
                    </div>
                  </div>

                  <div className="meta-tile">
                    <Calendar size={14} className="meta-icon" />
                    <div>
                      <span className="meta-label">SCHEDULE DATE</span>
                      <span className="meta-val">{selectedDriveForModal.date}</span>
                    </div>
                  </div>

                  <div className="meta-tile">
                    <MapPin size={14} className="meta-icon" />
                    <div>
                      <span className="meta-label">ASSESSMENT VENUE</span>
                      <span className="meta-val">{selectedDriveForModal.venueType}</span>
                    </div>
                  </div>

                  <div className="meta-tile">
                    <GraduationCap size={14} className="meta-icon" />
                    <div>
                      <span className="meta-label">ELIGIBLE BRANCHES</span>
                      <span className="meta-val">{selectedDriveForModal.branches}</span>
                    </div>
                  </div>

                  <div className="meta-tile">
                    <Users size={14} className="meta-icon" />
                    <div>
                      <span className="meta-label">CANDIDATE APPLICATIONS</span>
                      <span className="meta-val">{selectedDriveForModal.applications}</span>
                    </div>
                  </div>

                  <div className="meta-tile">
                    <Building2 size={14} className="meta-icon" />
                    <div>
                      <span className="meta-label">RECRUITMENT STATUS</span>
                      <span className="meta-val">
                        {selectedDriveForModal.status || 'Active'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recruitment Overview */}
              <div className="modal-section-block">
                <h4 className="section-kicker">RECRUITMENT PROFILE</h4>
                <p className="modal-narrative-text">
                  Official on-campus recruitment drive conducted by {selectedDriveForModal.company} for the position of {selectedDriveForModal.role}. Eligible candidates from {selectedDriveForModal.branches} will undergo technical assessment and evaluation as scheduled for Batch 2027.
                </p>
              </div>

              {/* Action Bar */}
              <div className="modal-actions-bar">
                <button
                  type="button"
                  className="modal-dismiss-btn"
                  onClick={() => setSelectedDriveForModal(null)}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
