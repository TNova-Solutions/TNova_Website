import { useEffect, useState } from "react";

import axios from "axios";

import { API_BASE_URL } from "../../../config";
import { setUserData } from "../../../redux/slice/user/UserSlice";
import Reveal from "../../animation/reveal/Reveal";
import "./Contact.css";

const EMPTY_FORM = { name: "", email: "", message: "", interest: "project", website: "" };

export default function Contact({ globalState, dispatch }) {
  const { tag, title, desc, contact, interests } = globalState?.contact || {};
  const { message, submitMsg } = globalState?.user || {};
  const preferredInterest = globalState?.enquiry?.interest;

  const [showPopup, setShowPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState(EMPTY_FORM);

  // "Request a trainer" / "Request early access" buttons preselect the enquiry type.
  useEffect(() => {
    if (preferredInterest) {
      setFormData((prev) => ({ ...prev, interest: preferredInterest }));
    }
  }, [preferredInterest]);

  useEffect(() => {
    if (!showPopup) return undefined;
    const timer = setTimeout(() => setShowPopup(false), 10000);
    return () => clearTimeout(timer);
  }, [showPopup]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitError("");
    setSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE_URL}api/user`, formData);
      dispatch(setUserData(response?.data));
      setFormData((prev) => ({ ...EMPTY_FORM, interest: prev.interest }));
      setShowPopup(true);
    } catch (error) {
      const status = error?.response?.status;
      setSubmitError(
        error?.response?.data?.error ||
          (status === 429
            ? "Too many submissions. Please try again in a few minutes."
            : "Unable to send your message. Please try again or email us directly.")
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="section-inner">
        <Reveal>
          <p className="section-tag">{tag}</p>
          <h2 className="section-title">{title}</h2>
          <p className="section-desc">{desc}</p>
        </Reveal>

        <div className="contact-grid">
          <Reveal>
            <div>
              <ContactInfoItem icon="✉" label="Email" value={contact?.email} href={`mailto:${contact?.email}`} />
              <ContactInfoItem icon="☎" label="Phone" value={contact?.phone} href={`tel:${contact?.phoneHref}`} />
              <ContactInfoItem icon="◉" label="Location" value={contact?.location} />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <form onSubmit={handleSubmit}>
              {submitError && (
                <div className="form-error" role="alert">
                  {submitError}
                </div>
              )}

              {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
              <div className="form-hp" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="contact-interest">I&apos;m interested in</label>
                <select
                  id="contact-interest"
                  name="interest"
                  className="form-input"
                  value={formData.interest}
                  onChange={handleInputChange}
                >
                  {(interests || [{ value: "project", label: "Build a software project" }]).map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  className="form-input"
                  type="text"
                  placeholder="Your full name"
                  autoComplete="name"
                  maxLength={100}
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  className="form-input"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  maxLength={254}
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="contact-msg">Project details</label>
                <textarea
                  id="contact-msg"
                  name="message"
                  className="form-textarea"
                  placeholder="Tell us what you're looking for..."
                  maxLength={4000}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>
              <button className="form-submit" type="submit" disabled={submitting}>
                {submitting ? "Sending…" : "Send message"}
              </button>
            </form>
          </Reveal>
        </div>

        {showPopup && (
          <div className="success-popup-overlay" role="dialog" aria-live="polite">
            <div className="success-popup">
              <button
                type="button"
                className="success-popup-close"
                onClick={() => setShowPopup(false)}
                aria-label="Close success popup"
              >
                ×
              </button>

              <div className="success-popup-content">
                <div className="success-popup-icon" aria-hidden="true">✓</div>
                <h3>{message}</h3>
                <p>{submitMsg}</p>
              </div>
            </div>
          </div>
        )}
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
