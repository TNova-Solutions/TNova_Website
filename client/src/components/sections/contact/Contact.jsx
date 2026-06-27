import { useEffect, useState } from "react";

import axios from "axios";

import { API_BASE_URL } from "../../../config";
import { setContactData } from "../../../redux/slice/contact/ContactSlice";
import { setUserData } from "../../../redux/slice/user/UserSlice";
import Reveal from "../../animation/reveal/Reveal";
import "./Contact.css";


export default function Contact({ globalState, dispatch }) {
  const { tag, title, desc, contact } = globalState?.contact || {}
  const { message, submitMsg, } = globalState?.user || {}
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    try {
      const response = await axios.post(`${API_BASE_URL}api/user`, formData);

      dispatch(setUserData(response?.data))
      setSubmitted(true);
      setShowPopup(true);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      const message = error?.response?.data?.error || "Unable to submit form. Please try again.";
      setSubmitError(message);
    }
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }, 5000); // Reset after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [submitted]);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

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
          <p className="section-tag">{tag}</p>
          <h2 className="section-title">{title}</h2>
          <p className="section-desc">
            {desc}
          </p>
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
              <div className="form-field">
                <label className="form-label" htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  className="form-input"
                  type="text"
                  placeholder="Your full name"
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
                  placeholder="Tell us what you're building..."
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>
              <button className="form-submit" type="submit">
                Send message
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
