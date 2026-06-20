import React from "react";
import "../TNovaSolutions.css";
import { companyInfo } from "../data";

export default function About() {
  return (
    <section className="tnova-section" id="about">
      <div className="tnova-about-grid">
        <div>
          <div className="tnova-section-label">About us</div>
          <h2 className="tnova-section-title">Innovate. Integrate. Elevate.</h2>
          <div className="tnova-accent-bar" />
          <p className="tnova-about-copy">
            TNova Solutions is a technology company based in Tamil Nadu, India.
            We specialise in AI-powered mobile applications, software
            development, and digital innovation — combining deep technical
            expertise with a mission to build scalable, affordable technology
            for real-world problems.
          </p>
        </div>
        <div className="tnova-about-info">
          {companyInfo.map(([label, val]) => (
            <div key={label} className="tnova-info-row">
              <span className="tnova-info-label">{label}</span>
              <span className="tnova-info-val">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
