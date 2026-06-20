import React from "react";
import "../TNovaSolutions.css";
import { services } from "../data";

export default function Services() {
  return (
    <section className="tnova-section" id="services">
      <div className="tnova-section-label">What we do</div>
      <h2 className="tnova-section-title">Services we offer</h2>
      <div className="tnova-accent-bar" />
      <p className="tnova-section-sub">
        From idea to production — we handle the full stack so you can focus on
        your domain.
      </p>
      <div className="tnova-services-grid">
        {services.map((s) => (
          <div key={s.title} className="tnova-service-card">
            <div className="tnova-service-icon">{s.icon}</div>
            <div className="tnova-service-title">{s.title}</div>
            <p className="tnova-service-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
