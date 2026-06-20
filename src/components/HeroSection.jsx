import React from "react";
import RibbonMark from "./RibbonMark";

export default function HeroSection() {
  return (
    <header className="hero" id="top">
      <div className="hero-grid" />
      <div className="hero-glow" />
      <svg
        className="hero-ribbons"
        viewBox="0 0 400 600"
        style={{ position: "absolute", top: 40, right: -40 }}
      >
        <defs>
          <linearGradient id="hg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9203E9" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2427E1" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path
          d="M60 80 L220 20 L380 80 L260 130 L260 380 L160 330 L160 160 Z"
          fill="none"
          stroke="url(#hg1)"
          strokeWidth="2"
        />
        <path
          d="M60 80 L220 20 L380 80 L260 130 L260 380 L160 330 L160 160 Z"
          fill="none"
          stroke="url(#hg1)"
          strokeWidth="2"
          transform="translate(40, 140) scale(0.6)"
          opacity="0.6"
        />
      </svg>

      <div className="hero-content">
        <h1 className="hero-title">
          Software that ships, <br />
          AI that <span className="accent">actually works.</span>
        </h1>
        <p className="hero-sub">
          TNova Solutions designs and builds mobile apps, backend systems, and
          machine learning products for teams who need a technical partner
          that owns delivery end-to-end — not just code.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn-primary">
            Get a quote →
          </a>
          <a href="#work" className="btn-ghost">
            See our work
          </a>
        </div>

        <div className="hero-stats">
          <div>
            <div className="hero-stat-num">2026</div>
            <div className="hero-stat-label">Founded</div>
          </div>
          <div>
            <div className="hero-stat-num">
              <span>5+</span>
            </div>
            <div className="hero-stat-label">Service lines</div>
          </div>
          <div>
            <div className="hero-stat-num">
              <span>100%</span>
            </div>
            <div className="hero-stat-label">In-house delivery</div>
          </div>
          <div>
            <div className="hero-stat-num">
              <span>24/7</span>
            </div>
            <div className="hero-stat-label">Project visibility</div>
          </div>
        </div>
      </div>
    </header>
  );
}
