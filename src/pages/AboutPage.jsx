import React, { useEffect } from 'react';
import AboutSection from '../components/AboutSection';
import { ExternalLink } from 'lucide-react';
import '../App.css';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page-root" style={{ minHeight: '100vh', backgroundColor: 'transparent', paddingTop: '80px' }}>
      <AboutSection />

      <footer className="motion-site-footer">
        <div className="section-container footer-inner">
          <div className="footer-left">
            <div className="footer-brand-title">
              <span className="footer-dot-pulse" />
              <span>FOSS CLUB // JAIN UNIVERSITY</span>
            </div>
            <p className="footer-copyright">
              © {new Date().getFullYear()} Free and Open Source Software Collective.
            </p>
          </div>
          <div className="footer-right">
            <div className="footer-links-row">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-link">Instagram <ExternalLink size={12} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-link">LinkedIn <ExternalLink size={12} /></a>
              <a href="#about" className="footer-link back-to-top">Top ↑</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
