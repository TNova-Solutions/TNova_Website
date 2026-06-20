import React, { useState, useEffect } from "react";
import RibbonMark from "./RibbonMark";
import { NAV_LINKS } from "../data";

export default function Nav() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div
        className="nav-brand"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <RibbonMark size={34} />
        <span className="nav-brand-name">TNova Solutions</span>
      </div>

      <div className="nav-links">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="nav-link">
            {link.label}
          </a>
        ))}
        <a href="#contact" className="nav-cta">
          Start a project
        </a>
      </div>

      <button
        className="nav-burger"
        onClick={() => setNavOpen(true)}
        aria-label="Open menu"
      >
        <span />
        <span />
        <span />
      </button>

      {navOpen && (
        <div className="mobile-menu">
          <button
            className="mobile-close"
            onClick={() => setNavOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setNavOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-cta"
            onClick={() => setNavOpen(false)}
          >
            Start a project
          </a>
        </div>
      )}
    </nav>
  );
}
