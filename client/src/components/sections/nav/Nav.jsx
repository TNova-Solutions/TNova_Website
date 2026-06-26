import { useState } from "react";

import { Link } from "react-router-dom";

import { NAV_LINKS } from "../../../constants/content";
import { useScrolled } from "../../../hooks/useScrolled";
import RibbonMark from "../../animation/ribbonMark/RibbonMark";
import "./Nav.css";


export default function Nav() {
  const [navOpen, setNavOpen] = useState(false);
  const scrolled = useScrolled(24);

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <Link 
          to="/" 
          className="nav-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <RibbonMark size={34} />
          <span className="nav-brand-name">TNova Solutions</span>
        </Link>

        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="nav-cta">
            Start a project
          </a>
        </div>

        <button
          className={`nav-burger ${navOpen ? "open" : ""}`}
          onClick={() => setNavOpen(!navOpen)}
          aria-label={navOpen ? "Close menu" : "Open menu"}
          aria-expanded={navOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {navOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setNavOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="nav-cta" onClick={() => setNavOpen(false)}>
            Start a project
          </a>
        </div>
      )}
    </>
  );
}
