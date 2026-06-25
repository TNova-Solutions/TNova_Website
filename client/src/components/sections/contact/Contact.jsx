import { useEffect, useState } from "react";

import axios from "axios";

import { API_BASE_URL } from "../../../config";
import { CONTACT } from "../../../constants/theme";
import { setContactData } from "../../../redux/slice/ContactSlice";
import Reveal from "../../ui/Reveal";
import "./Contact.css";

export default function Contact({ dispatch }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // NOTE: this is a static front-end form. To actually receive
    // submissions, wire this up to a backend endpoint, a service like
    // Formspree/Resend, or your own FastAPI /contact route.
    setSubmitted(true);
  };

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        // This will automatically use the correct URL for local vs production
        const response = await axios.get(`${API_BASE_URL}api/contact`);
        dispatch(setContactData(response?.data))
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };
    fetchContactData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="section contact-section" id="contact">
      <div className="section-inner">
        <Reveal>
          <p className="section-tag">Contact</p>
          <h2 className="section-title">Let&apos;s talk about what you&apos;re building.</h2>
          <p className="section-desc">
            Send a brief or just say hello — Thepakar and Naresh personally review every
            inquiry.
          </p>
        </Reveal>

        <div className="contact-grid">
          <Reveal>
            <div>
              <ContactInfoItem icon="✉" label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
              <ContactInfoItem icon="☎" label="Phone" value={CONTACT.phone} href={`tel:${CONTACT.phoneHref}`} />
              <ContactInfoItem icon="◉" label="Location" value={CONTACT.location} />
            </div>
          </Reveal>

          <Reveal delay={80}>
            {submitted ? (
              <div className="form-success" role="status">
                Thanks — your message has been noted. We&apos;ll get back to you within 48
                hours at the email you provided.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-field">
                  <label className="form-label" htmlFor="contact-name">Name</label>
                  <input id="contact-name" className="form-input" type="text" placeholder="Your full name" required />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="contact-email">Email</label>
                  <input id="contact-email" className="form-input" type="email" placeholder="you@company.com" required />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="contact-msg">Project details</label>
                  <textarea id="contact-msg" className="form-textarea" placeholder="Tell us what you're building..." required />
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

function ContactInfoItem({ icon, label, value, href }) {
  const valueNode = href ? (
    <a href={href} className="contact-info-value contact-info-link">
      {value}
    </a>
  ) : (
    <div className="contact-info-value">{value}</div>
  );

  return (
    <div className="contact-info-item">
      <div className="contact-info-icon" aria-hidden="true">
        <span>{icon}</span>
      </div>
      <div>
        <div className="contact-info-label">{label}</div>
        {valueNode}
      </div>
    </div>
  );
}
