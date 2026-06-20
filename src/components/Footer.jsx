import React from "react";
import logo from "../logo.png";
import "../TNovaSolutions.css";

export default function Footer() {
  return (
    <div className="tnova-footer-wrap">
      <footer className="tnova-footer">
        <div className="tnova-footer-column tnova-footer-brand">
          <div className="tnova-footer-mark">
            <img src={logo} alt="TNova Solutions logo" className="tnova-footer-logo-image" />
          </div>
          <div className="tnova-footer-logo">TNova Solutions</div>
          <div className="tnova-footer-subtitle">PRIVATE LIMITED</div>
          <div className="tnova-footer-copy">
            We build smart digital solutions, enterprise services and scalable products that help businesses automate, grow and succeed in a digital-first world.
          </div>
          <div className="tnova-footer-social-buttons">
            <a href="https://facebook.com/tnovasolutions" className="tnova-social-button">
              f
            </a>
            <a href="https://twitter.com/tnovasolutions" className="tnova-social-button">
              t
            </a>
            <a href="https://linkedin.com/company/tnovasolutions" className="tnova-social-button">
              in
            </a>
            <a href="https://instagram.com/tnovasolutions" className="tnova-social-button">
              ig
            </a>
          </div>
        </div>

        <div className="tnova-footer-column tnova-footer-column-links">
          <div className="tnova-footer-column-title">Quick Links</div>
          <ul className="tnova-footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="tnova-footer-column tnova-footer-column-links">
          <div className="tnova-footer-column-title">Services</div>
          <ul className="tnova-footer-links">
            <li><a href="#web">Web Development</a></li>
            <li><a href="#app">App Development</a></li>
            <li><a href="#ai">AI & Automation</a></li>
            <li><a href="#servicenow">ServiceNow Solutions</a></li>
            <li><a href="#support">Support & Maintenance</a></li>
          </ul>
        </div>

        <div className="tnova-footer-column">
          <div className="tnova-footer-column-title">Contact Info</div>
          <div className="tnova-footer-contact">
            <div className="tnova-contact-item">
              <span className="tnova-contact-icon">📍</span>
              <span>Chennai, Tamil Nadu, India</span>
            </div>
            <div className="tnova-contact-item">
              <span className="tnova-contact-icon">📞</span>
              <span>+91 9944880268</span>
            </div>
            <div className="tnova-contact-item">
              <span className="tnova-contact-icon">✉️</span>
              <span>info@tnovasolutions.com</span>
            </div>
            <div className="tnova-contact-item">
              <span className="tnova-contact-icon">🌐</span>
              <span>www.tnovasolutions.com</span>
            </div>
          </div>
        </div>
      </footer>

      <div className="tnova-footer-bottom">
        <div className="tnova-footer-bottom-left">
          © 2026 TNova Solutions Pvt Ltd. All Rights Reserved.
        </div>
        <div className="tnova-footer-bottom-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
