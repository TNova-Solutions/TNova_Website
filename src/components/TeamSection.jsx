import React from "react";
import Reveal from "./Reveal";
import { TEAM_LEADERS, TOKENS } from "../data";

export default function TeamSection() {
  return (
    <section className="section" id="team" style={{ background: TOKENS.paperDim }}>
      <div className="section-inner">
        <Reveal>
          <div className="section-tag">Leadership</div>
          <h2 className="section-title">Founded by two people who ship.</h2>
          <p className="section-desc">
            TNova is run by its founders, end to end — from the first client call
            to the final commit.
          </p>
        </Reveal>

        <div className="team-grid">
          {TEAM_LEADERS.map((leader, index) => (
            <Reveal key={leader.name} delay={index * 80}>
              <div className="team-card">
                <div className="team-avatar">{leader.initials}</div>
                <h3 className="team-name">{leader.name}</h3>
                <div className="team-role">{leader.role}</div>
                <p className="team-bio">{leader.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
