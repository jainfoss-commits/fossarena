import React from 'react';
import { clubLeads } from '../data/mockData';
import GlassCard, { computeInitials } from './ui/glass-card';
import './TeamSection.css';

export default function TeamSection() {
  return (
    <section className="team-motion-section" id="leads">
      <div className="section-container">
        {/* Section Header */}
        <div className="team-header-centered">
          <h2 className="team-heading">
            Meet the <span className="text-gradient-cyan">Guild Mentors & Leads</span>
          </h2>

          <p className="team-subtitle">
            The mentors, builders, and community architects steering FOSS Club across systems,
            tracks, hackathons, and upstream codebases.
          </p>
        </div>

        {/* Responsive Grid with 3D GlassCards */}
        <div className="leads-grid">
          {clubLeads.map((lead) => (
            <GlassCard
              key={lead.id}
              name={lead.name}
              role={lead.role}
              bio={lead.bio}
              initials={computeInitials(lead.name)}
              accent={lead.accent}
              linkedinUrl={lead.linkedin || 'https://linkedin.com'}
              instagramUrl={lead.instagram || 'https://instagram.com'}
              githubUrl={lead.github || 'https://github.com'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
