import React, { useState } from "react";
import logo from "../logo.png";
import "../TNovaSolutions.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ["Services", "About", "Team", "Contact"];

  return (
    <nav className="tnova-nav">
      <div className="tnova-nav-inner">
        <div className="tnova-logo-container">
          <img src={logo} alt="TNova Solutions logo" className="tnova-logo-image" />
          <div className="tnova-logo-text">TNova Solutions</div>
        </div>

        <button
          type="button"
          className={`tnova-nav-toggle${menuOpen ? " open" : ""}`}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="tnova-nav-icon">{menuOpen ? "✕" : "☰"}</span>
        </button>

        <ul className={`tnova-nav-links${menuOpen ? " active" : ""}`}>
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="tnova-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <a href="mailto:info@tnovasolutions.com" className="tnova-btn-nav">
          Get in touch
        </a>
      </div>
    </nav>
  );
}
