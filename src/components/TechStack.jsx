import React from "react";
import "../TNovaSolutions.css";
import { techStack } from "../data";

export default function TechStack() {
  return (
    <section className="tnova-section">
      <div className="tnova-section-label">Technology</div>
      <h2 className="tnova-section-title">Our tech stack</h2>
      <div className="tnova-accent-bar" />
      <div className="tnova-tech-grid">
        {techStack.map((t) => (
          <div key={t.name} className="tnova-tech-pill">
            <div className="tnova-tech-cat">{t.cat}</div>
            {t.name}
          </div>
        ))}
      </div>
    </section>
  );
}
