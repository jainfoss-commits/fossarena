import React, { useState } from 'react';
import { ArrowRight, Check, Copy, GitBranch, Sparkles, Terminal } from 'lucide-react';
import { statsData } from '../data/mockData';

export default function Hero({ onOpenJoin }) {
  const [copied, setCopied] = useState(false);
  const commandText = 'git clone https://github.com/fossclub/community.git';

  const copyCommand = () => {
    navigator.clipboard.writeText(commandText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="hero-section" id="about">
      <div className="hero-background-glow glow-1"></div>
      <div className="hero-background-glow glow-2"></div>

      <div className="container hero-container">
        <div className="badge-pill">
          <span className="pulse-dot"></span>
          <span className="badge-text">Open Source • Innovation • Libre Tech</span>
        </div>

        <h1 className="hero-title">
          Build the <span className="gradient-text">Open Future</span> Together
        </h1>

        <p className="hero-subtitle">
          FOSS Club is an engineering collective passionate about Free & Open Source Software.
          From Linux kernel drivers and AI tools to modern web frameworks, we ship real code in public.
        </p>

        <div className="hero-cta-group">
          <a href="#projects" className="btn-primary">
            <span>Explore Projects</span>
            <ArrowRight size={18} />
          </a>

          <button onClick={onOpenJoin} className="btn-secondary">
            <Sparkles size={18} />
            <span>Join Our Guild</span>
          </button>
        </div>

        <div className="cli-snippet-wrapper">
          <div className="cli-header">
            <div className="cli-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <span className="cli-title">bash — terminal</span>
            <button
              onClick={copyCommand}
              className="cli-copy-btn"
              title="Copy to clipboard"
            >
              {copied ? <Check size={14} className="copied-icon" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <div className="cli-body">
            <span className="cli-prompt">$</span>
            <span className="cli-code">{commandText}</span>
          </div>
        </div>

        <div className="stats-grid">
          {statsData.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
