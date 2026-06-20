import React from "react";
import "../TNovaSolutions.css";

export default function Hero() {
  return (
    <section className="tnova-hero" id="home">
      <div className="tnova-hero-inner">
        <div className="tnova-hero-left">
          <h1 className="tnova-hero-heading">
            Accelerate revenue,
            <br />
            automate operations, and
            <br />
            <span className="tnova-heading-accent">launch growth-ready</span>
            <br />
            digital solutions.
          </h1>

          <p className="tnova-hero-copy">
            TNova Solutions helps businesses scale with enterprise-grade AI
            services, cloud modernization, secure software engineering, and
            automation that turns technology into measurable results.
          </p>

          <div className="tnova-hero-btns">
            <a href="mailto:info@tnovasolutions.com" className="tnova-btn-primary">
              Book a Free Strategy Call
            </a>
            <a href="#services" className="tnova-btn-secondary">
              Explore Our Services
            </a>
          </div>

          <div className="tnova-hero-badges">
            {[
              ["120+", "enterprise customers"],
              ["98%", "delivery success rate"],
              ["24/7", "global support"],
            ].map(([a, b]) => (
              <div key={b} className="tnova-hero-badge">
                <div className="tnova-hero-badge-num">{a}</div>
                <div className="tnova-hero-badge-label">{b}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="tnova-hero-right" aria-hidden="true" />
      </div>
    </section>
  );
}
