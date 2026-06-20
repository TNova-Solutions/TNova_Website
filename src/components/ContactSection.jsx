import React, { useState } from "react";
import Reveal from "./Reveal";
import { CONTACT_INFO, TOKENS } from "../data";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <section className="section contact-section" id="contact">
      <div className="section-inner">
        <Reveal>
          <div className="section-tag">Contact</div>
          <h2 className="section-title">Let's talk about what you're building.</h2>
          <p className="section-desc">
            Send a brief or just say hello — Thepakar and Naresh personally
            review every inquiry.
          </p>
        </Reveal>

        <div className="contact-grid">
          <Reveal>
            <div>
              {CONTACT_INFO.map((item) => (
                <div className="contact-info-item" key={item.label}>
                  <div className="contact-info-icon">
                    <span style={{ color: TOKENS.emerald, fontSize: 18 }}>
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <div className="contact-info-label">{item.label}</div>
                    <div className="contact-info-value">
                      {item.href ? (
                        <a href={item.href}>{item.value}</a>
                      ) : (
                        item.value
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            {submitted ? (
              <div className="form-success">
                Thanks — your message has been noted. We'll get back to you
                within 48 hours at the email you provided.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-field">
                  <label className="form-label">Name</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Email</label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="you@company.com"
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Project details</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Tell us what you're building..."
                    required
                  />
                </div>
                <button className="form-submit" type="submit">
                  Send message
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
