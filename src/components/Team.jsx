import React from "react";
import "../TNovaSolutions.css";
import { team } from "../data";

export default function Team() {
  return (
    <section className="tnova-section" id="team">
      <div className="tnova-section-label">Our team</div>
      <h2 className="tnova-section-title">The founders</h2>
      <div className="tnova-accent-bar" />
      <div className="tnova-team-grid">
        {team.map((m) => (
          <div key={m.name} className="tnova-team-card">
            <div className="tnova-avatar">{m.initials}</div>
            <div>
              <div className="tnova-team-name">{m.name}</div>
              <div className="tnova-team-role">{m.role}</div>
              <div className="tnova-team-desc">{m.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
