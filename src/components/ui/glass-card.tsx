import * as React from "react";
import "./glass-card.css";

// Safe SVG fallbacks for social icons
export const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

export const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

// Fallback ULogo from prompt
export const ULogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29.667 31.69"
    {...props}
  >
    <path d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z" />
    <path d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z" transform="translate(-45.91 0)" />
    <path d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z" transform="translate(0 -51.963)" />
  </svg>
);

// Helper to compute initials from name
export function computeInitials(name?: string): string {
  if (!name) return "UI";
  const cleaned = name.replace(/[\[\]]/g, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "UI";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  // If template placeholder like "[Program Head Name]" or "[Faculty Coordinator Name]"
  if (parts.length > 2 && parts[parts.length - 1].toLowerCase() === "name") {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  role?: string;
  bio?: string;
  initials?: string;
  accent?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className = "",
      name = "Monochrome",
      role,
      bio = "Create, share, and use beautiful custom elements made with CSS.",
      initials,
      accent = "#38bdf8",
      githubUrl = "https://github.com",
      linkedinUrl = "https://linkedin.com",
      instagramUrl = "https://instagram.com",
      twitterUrl,
      style,
      ...props
    },
    ref
  ) => {
    const displayInitials = initials || (name === "Monochrome" ? "UI" : computeInitials(name));

    return (
      <div
        ref={ref}
        className={`glass-card-container ${className}`}
        style={{ "--card-accent": accent, ...style } as React.CSSProperties}
        {...props}
      >
        <div className="glass-card-inner">
          {/* Frosted Glass Layer */}
          <div className="glass-frosted-backdrop" />

          {/* 3D Concentric Rings */}
          <div className="glass-rings-cluster">
            {[
              { size: "170px", pos: "8px", z: "20px", delay: "0s" },
              { size: "140px", pos: "10px", z: "40px", delay: "0.4s" },
              { size: "110px", pos: "17px", z: "60px", delay: "0.8s" },
              { size: "80px", pos: "23px", z: "80px", delay: "1.2s" },
            ].map((circle, index) => (
              <div
                key={index}
                className="glass-concentric-ring"
                style={{
                  width: circle.size,
                  height: circle.size,
                  top: circle.pos,
                  right: circle.pos,
                  transform: `translate3d(0, 0, ${circle.z})`,
                  transitionDelay: circle.delay,
                }}
              />
            ))}

            {/* Initials badge in place of UI in the top right icon */}
            <div
              className="glass-initials-badge"
              title={name}
            >
              <span className="glass-initials-text">
                {displayInitials}
              </span>
              <span className="glass-initials-bar" />
            </div>
          </div>

          {/* Card Body: Name (in place of Monochrome) & 2-Line Description */}
          <div className="glass-content-wrap">
            <div className="glass-body-group">
              <span className="glass-title-text">
                {name}
              </span>
              <p className="glass-description-text">
                {bio}
              </p>
            </div>

            {/* Bottom Row: Right bottom corner social logos (LinkedIn, Instagram, GitHub) */}
            <div className="glass-footer-row">
              <div className="glass-social-group">
                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-social-btn"
                    aria-label={`${name} LinkedIn`}
                    title="LinkedIn"
                  >
                    <LinkedinIcon />
                  </a>
                )}
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-social-btn"
                    aria-label={`${name} Instagram`}
                    title="Instagram"
                  >
                    <InstagramIcon />
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-social-btn"
                    aria-label={`${name} GitHub`}
                    title="GitHub"
                  >
                    <GithubIcon />
                  </a>
                )}
                {twitterUrl && (
                  <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-social-btn"
                    aria-label={`${name} Twitter`}
                    title="Twitter"
                  >
                    <TwitterIcon />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export default GlassCard;
