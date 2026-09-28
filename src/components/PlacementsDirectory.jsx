import React, { useState, useEffect, useRef } from 'react';
import {
  Download, ArrowLeft, Calendar, MapPin,
  GraduationCap, Users, Sparkles, TrendingUp, Building2, Zap,
} from 'lucide-react';
import { placementsData } from '../data/mockData';
import './PlacementsDirectory.css';

/* ── colour per company ────────────────────────────────────────────────────── */
const COMPANY_COLORS = {
  'IBM':                    { bg: '#1d4ed8', text: '#93c5fd' },
  'Nvidia':                 { bg: '#16a34a', text: '#86efac' },
  'Tata Elxsi':             { bg: '#7c3aed', text: '#c4b5fd' },
  'Navikenz':               { bg: '#0891b2', text: '#67e8f9' },
  'AnkerCloud Technologies':{ bg: '#b45309', text: '#fcd34d' },
  'BNP Paribas':            { bg: '#be123c', text: '#fca5a5' },
  'Prime Vector Pvt Ltd':   { bg: '#0f766e', text: '#5eead4' },
  'Learning Routes':        { bg: '#9333ea', text: '#d8b4fe' },
  'Tata Technologies':      { bg: '#c2410c', text: '#fdba74' },
  'Xylem':                  { bg: '#1e40af', text: '#93c5fd' },
};

const ctcTier = (n) => {
  if (n >= 10) return { label: 'DREAM',    color: '#38bdf8', bar: '#38bdf8' };
  if (n >= 6)  return { label: 'TIER-1',   color: '#34d399', bar: '#34d399' };
  return               { label: 'STANDARD', color: '#94a3b8', bar: '#64748b' };
};

export default function PlacementsDirectory({ onBackToHome }) {
  const [hoveredId,  setHoveredId]  = useState(null);
  const timelineRef = useRef(null);
  const fillRef     = useRef(null); // direct DOM — no setState = zero lag

  /* ── Scroll progress: write directly to DOM, bypassing React render ── */
  useEffect(() => {
    const onScroll = () => {
      const wrap = timelineRef.current;
      const fill = fillRef.current;
      if (!wrap || !fill) return;
      const rect = wrap.getBoundingClientRect();
      const winH = window.innerHeight;
      // Start filling when the timeline begins entering the center-top of viewport
      const startThreshold = winH * 0.65;
      const totalHeight = wrap.offsetHeight;
      const scrolled = startThreshold - rect.top;
      const pct = Math.max(0, Math.min(1, scrolled / (totalHeight - winH * 0.35 || totalHeight)));
      fill.style.height = `${pct * 100}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const handleExportCSV = () => {
    const headers = ['Company','Role','Annual CTC','Date','Assessment Venue','Eligible Branches','Applications'];
    const rows = placementsData.drives
      .filter((d) => !d.isAcademicPause)
      .map((d) => [
        `"${d.company}"`,`"${d.role}"`,`"${d.ctc}"`,`"${d.date}"`,
        `"${d.venueType}"`,`"${d.branches}"`,`"${d.applications}"`,
      ]);
    const csv = 'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const a = document.createElement('a');
    a.href = encodeURI(csv);
    a.download = 'placement_directory_batch_2027.csv';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  return (
    <div className="pd-root">
      {/* ── Background glow orbs ── */}
      <div className="pd-orb pd-orb-1" />
      <div className="pd-orb pd-orb-2" />

      <div className="pd-inner">

        {/* ── Top bar ── */}
        <div className="pd-topbar">
          <button type="button" className="pd-back-btn" onClick={onBackToHome}>
            <ArrowLeft size={15} />
            <span>Hub</span>
          </button>
          <div className="pd-topbar-right">
            <span className="pd-month-chip">
              <Calendar size={12} />
              {placementsData.header.month}
            </span>
            <button type="button" className="pd-export-btn" onClick={handleExportCSV}>
              <Download size={13} />
              Export CSV
            </button>
          </div>
        </div>

        {/* ── Hero ── */}
        <div className="pd-hero">
          <h1 className="pd-hero-title">
            Placement<br />
            <span className="pd-hero-title-accent">Directory</span>
          </h1>
          <p className="pd-hero-sub">{placementsData.header.subtitle}</p>
        </div>

        {/* ── Stats row ── */}
        <div className="pd-stats-row">
          {placementsData.stats.map((st, i) => (
            <div key={st.label} className={`pd-stat-card ${i === 0 ? 'pd-stat-highlight' : ''}`}>
              <div className="pd-stat-icon">
                {i === 0 ? <Sparkles size={16} /> : i === 1 ? <TrendingUp size={16} /> : i === 2 ? <Users size={16} /> : <Building2 size={16} />}
              </div>
              <div className="pd-stat-body">
                <span className="pd-stat-value">{st.value}</span>
                <span className="pd-stat-label">{st.label}</span>
                <span className="pd-stat-sub">{st.sub}</span>
              </div>
              {i === 0 && <div className="pd-stat-glow" />}
            </div>
          ))}
        </div>

        {/* ── Timeline + progress bar ── */}
        <div className="pd-timeline-wrap" ref={timelineRef}>
          {/* Absolute progress track spans full section height */}
          <div className="pd-progress-track">
            <div ref={fillRef} className="pd-progress-fill" />
          </div>

          {/* Drive list */}
          <div className="pd-timeline">
            {placementsData.drives.map((item) => {

              if (item.isAcademicPause) {
                return (
                  <div key={item.id} className="pd-pause-row">
                    <div className="pd-pause-content">
                      <span className="pd-pause-date">{item.date}</span>
                      <span className="pd-pause-title">{item.title}</span>
                      <span className="pd-pause-desc">{item.description}</span>
                    </div>
                  </div>
                );
              }

              const tier    = ctcTier(item.ctcNum);
              const cc      = COMPANY_COLORS[item.company] || { bg: '#334155', text: '#94a3b8' };
              const isDream = item.ctcNum >= 10;

              return (
                <div key={item.id} className="pd-drive-row">
                  <div
                    className={`pd-drive-card ${isDream ? 'pd-dream' : ''} ${hoveredId === item.id ? 'pd-hovered' : ''}`}
                    style={{ '--accent': tier.color }}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {isDream && <div className="pd-dream-strip" />}

                    <div className="pd-card-inner">
                      {/* Left */}
                      <div className="pd-card-left">
                        <div
                          className="pd-company-mono"
                          style={{ background: cc.bg + '33', borderColor: cc.bg, color: cc.text }}
                        >
                          {item.company.slice(0, 3).toUpperCase()}
                        </div>

                        <div className="pd-card-info">
                          <div className="pd-card-meta-top">
                            <span className="pd-company-name">{item.company}</span>
                            {isDream && (
                              <span className="pd-dream-badge">
                                <Zap size={9} />
                                DREAM
                              </span>
                            )}
                          </div>
                          <h3 className="pd-role-title">{item.role}</h3>
                          <div className="pd-card-tags">
                            <span className="pd-tag"><Calendar size={11} />{item.date}</span>
                            <span className="pd-tag"><MapPin size={11} />{item.venueType}</span>
                            <span className="pd-tag"><GraduationCap size={11} />{item.branches}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right — CTC only */}
                      <div className="pd-card-right">
                        <div className="pd-ctc-block">
                          <span className="pd-ctc-value" style={{ color: tier.color }}>
                            {item.ctc}
                          </span>
                          <div className="pd-ctc-bar-track">
                            <div
                              className="pd-ctc-bar-fill"
                              style={{
                                width: `${Math.min(100, (item.ctcNum / 20) * 100)}%`,
                                background: tier.bar,
                              }}
                            />
                          </div>
                          <span className="pd-tier-label" style={{ color: tier.color }}>
                            {tier.label}
                          </span>
                        </div>

                        <span className="pd-apps-text">
                          <Users size={11} />
                          {item.applications}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
