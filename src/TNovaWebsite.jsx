import React, { useState, useEffect, useRef } from "react";

/* ============================================================
   TNova Solutions Pvt Ltd — Marketing Website
   Theme: Deep Navy (#13131F) + Blue-to-Purple Gradient (#2427E1 → #9203E9)
   matched exactly to the TNova ribbon-T logo.
   Signature element: animated "ribbon-T" stroke motif echoing
   the brand mark, used as a connecting thread between sections.
   ============================================================ */

const TOKENS = {
  slate: "#13131F",
  slateMid: "#1A1A33",
  slateDeep: "#0C0C16",
  emerald: "#5629F2",
  emeraldBright: "#9203E9",
  emeraldDim: "#2427E1",
  paper: "#F5F5FA",
  paperDim: "#E9E8F5",
  ink: "#13131F",
  mutedInk: "#5C5C72",
};

/* ---------- Ribbon-T mark — uses the real logo artwork ---------- */
function RibbonMark({ size = 56, animated = false }) {
  return (
    <img
      src="/icon.png"
      alt="TNova Solutions"
      width={size}
      height={size}
      className={animated ? "ribbon-path" : ""}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        display: "block",
      }}
    />
  );
}

/* ---------- Reveal-on-scroll wrapper ---------- */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-shown" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ============================================================ */

export default function TNovaWebsite() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Capabilities", href: "#capabilities" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="tnova-root">
      <style>{`
        * { box-sizing: border-box; }
        .tnova-root {
          --slate: ${TOKENS.slate};
          --slate-mid: ${TOKENS.slateMid};
          --slate-deep: ${TOKENS.slateDeep};
          --emerald: ${TOKENS.emerald};
          --emerald-bright: ${TOKENS.emeraldBright};
          --emerald-dim: ${TOKENS.emeraldDim};
          --paper: ${TOKENS.paper};
          --paper-dim: ${TOKENS.paperDim};
          --ink: ${TOKENS.ink};
          --muted: ${TOKENS.mutedInk};
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: var(--paper);
          color: var(--ink);
          overflow-x: hidden;
        }
        .tnova-root h1, .tnova-root h2, .tnova-root h3, .tnova-root .display {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          letter-spacing: -0.02em;
          font-weight: 600;
        }
        .mono { font-family: 'JetBrains Mono', 'Courier New', monospace; }

        /* ---------- Reveal animation ---------- */
        .reveal { opacity: 0; transform: translateY(22px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
        .reveal-shown { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; transition: none; }
        }

        /* ---------- Ribbon animation ---------- */
        @keyframes ribbonFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        .ribbon-path { transform-origin: center; }

        /* ---------- NAV ---------- */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 48px;
          transition: background .35s ease, padding .35s ease, box-shadow .35s ease;
          background: transparent;
        }
        .nav.scrolled {
          background: rgba(28,37,38,0.92);
          backdrop-filter: blur(12px);
          padding: 12px 48px;
          box-shadow: 0 1px 0 rgba(146,3,233,0.12);
        }
        .nav-brand { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .nav-brand-name { color: white; font-size: 17px; font-weight: 600; font-family: 'Space Grotesk', sans-serif; letter-spacing: -0.01em; }
        .nav-links { display: flex; gap: 36px; align-items: center; }
        .nav-link {
          color: rgba(255,255,255,0.75); text-decoration: none; font-size: 14.5px;
          font-weight: 500; position: relative; transition: color .2s;
        }
        .nav-link:hover { color: var(--emerald-bright); }
        .nav-link::after {
          content: ''; position: absolute; left: 0; bottom: -6px; height: 1.5px; width: 0;
          background: var(--emerald-bright); transition: width .25s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .nav-cta {
          background: var(--emerald); color: white; padding: 10px 22px; border-radius: 999px;
          font-size: 14px; font-weight: 600; text-decoration: none; transition: background .2s, transform .2s;
          box-shadow: 0 0 0 0 rgba(146,3,233,0.5);
        }
        .nav-cta:hover { background: var(--emerald-bright); transform: translateY(-1px); }
        .nav-burger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 6px; }
        .nav-burger span { width: 22px; height: 2px; background: white; border-radius: 2px; }

        @media (max-width: 900px) {
          .nav { padding: 16px 22px; }
          .nav.scrolled { padding: 12px 22px; }
          .nav-links { display: none; }
          .nav-burger { display: flex; }
        }

        .mobile-menu {
          position: fixed; inset: 0; background: var(--slate-deep); z-index: 99;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 28px;
        }
        .mobile-menu a { color: white; font-size: 26px; text-decoration: none; font-family: 'Space Grotesk', sans-serif; }
        .mobile-menu .nav-cta { font-size: 16px; padding: 14px 32px; }
        .mobile-close { position: absolute; top: 24px; right: 28px; background: none; border: none; color: white; font-size: 28px; cursor: pointer; }

        /* ---------- HERO ---------- */
        .hero {
          position: relative; min-height: 100vh; background: var(--slate);
          display: flex; flex-direction: column; justify-content: center;
          padding: 140px 48px 100px; overflow: hidden;
        }
        .hero-grid {
          position: absolute; inset: 0; opacity: 0.05;
          background-image: linear-gradient(rgba(146,3,233,1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(146,3,233,1) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 70% 60% at 60% 30%, black 0%, transparent 70%);
        }
        .hero-glow {
          position: absolute; top: -10%; right: -5%; width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(86,41,242,0.28) 0%, transparent 65%);
          filter: blur(40px); pointer-events: none;
        }
        .hero-ribbons { position: absolute; top: 0; right: 0; width: 50%; height: 100%; pointer-events: none; opacity: 0.9; }
        .hero-content { position: relative; z-index: 2; max-width: 1240px; width: 100%; margin: 0 auto; }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px; color: var(--emerald-bright);
          font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          margin-bottom: 28px; font-family: 'JetBrains Mono', monospace;
        }
        .hero-eyebrow::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: var(--emerald-bright); box-shadow: 0 0 12px var(--emerald-bright); }
        .hero-title {
          color: white; font-size: clamp(40px, 6.4vw, 84px); line-height: 1.02; font-weight: 700;
          max-width: 920px; margin-bottom: 28px;
        }
        .hero-title .accent { color: var(--emerald-bright); }
        .hero-sub {
          color: rgba(255,255,255,0.68); font-size: clamp(16px, 1.5vw, 19px); line-height: 1.6;
          max-width: 560px; margin-bottom: 44px; font-weight: 400;
        }
        .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 80px; }
        .btn-primary {
          background: var(--emerald); color: white; padding: 16px 32px; border-radius: 999px;
          font-size: 15px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 10px;
          transition: background .2s, transform .2s, box-shadow .2s;
        }
        .btn-primary:hover { background: var(--emerald-bright); transform: translateY(-2px); box-shadow: 0 12px 28px rgba(146,3,233,0.3); }
        .btn-ghost {
          color: white; padding: 16px 28px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.22);
          font-size: 15px; font-weight: 600; text-decoration: none; transition: border-color .2s, background .2s;
        }
        .btn-ghost:hover { border-color: var(--emerald-bright); background: rgba(146,3,233,0.08); }

        .hero-stats { display: flex; gap: 56px; flex-wrap: wrap; border-top: 1px solid rgba(255,255,255,0.12); padding-top: 32px; }
        .hero-stat-num { color: white; font-size: 32px; font-weight: 700; font-family: 'Space Grotesk', sans-serif; }
        .hero-stat-num span { color: var(--emerald-bright); }
        .hero-stat-label { color: rgba(255,255,255,0.5); font-size: 13px; margin-top: 4px; }

        /* ---------- Marquee ---------- */
        .marquee-wrap { background: var(--slate-deep); padding: 18px 0; overflow: hidden; border-top: 1px solid rgba(146,3,233,0.15); border-bottom: 1px solid rgba(146,3,233,0.15); }
        .marquee { display: flex; gap: 56px; white-space: nowrap; animation: scrollMarquee 28s linear infinite; }
        @keyframes scrollMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-item { color: rgba(255,255,255,0.4); font-size: 14px; font-weight: 500; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.04em; }
        .marquee-item b { color: var(--emerald-bright); }

        /* ---------- SECTION shared ---------- */
        .section { padding: 120px 48px; position: relative; }
        .section-inner { max-width: 1240px; margin: 0 auto; }
        .section-tag {
          display: inline-block; color: var(--emerald); font-size: 13px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 18px; font-family: 'JetBrains Mono', monospace;
        }
        .section-title { font-size: clamp(30px, 4vw, 48px); color: var(--ink); margin-bottom: 18px; max-width: 700px; }
        .section-desc { color: var(--muted); font-size: 17px; max-width: 560px; line-height: 1.65; }

        @media (max-width: 700px) {
          .section { padding: 80px 22px; }
          .hero { padding: 120px 22px 70px; }
        }

        /* ---------- CAPABILITIES ---------- */
        .cap-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin-top: 64px; background: var(--paper-dim); border-radius: 20px; overflow: hidden; }
        @media (max-width: 900px) { .cap-grid { grid-template-columns: 1fr; } }
        .cap-card {
          background: white; padding: 40px 36px; transition: background .25s ease;
          position: relative;
        }
        .cap-card:hover { background: var(--slate); }
        .cap-card:hover .cap-title, .cap-card:hover .cap-desc { color: white; }
        .cap-card:hover .cap-desc { color: rgba(255,255,255,0.65); }
        .cap-card:hover .cap-icon { background: var(--emerald); }
        .cap-icon {
          width: 48px; height: 48px; border-radius: 12px; background: var(--paper-dim);
          display: flex; align-items: center; justify-content: center; margin-bottom: 24px;
          transition: background .25s ease;
        }
        .cap-title { font-size: 19px; color: var(--ink); margin-bottom: 10px; transition: color .25s ease; }
        .cap-desc { font-size: 14.5px; color: var(--muted); line-height: 1.6; transition: color .25s ease; }
        .cap-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 18px; }
        .cap-tag { font-size: 11.5px; padding: 4px 10px; border-radius: 999px; background: rgba(86,41,242,0.1); color: var(--emerald); font-weight: 600; font-family: 'JetBrains Mono', monospace; }
        .cap-card:hover .cap-tag { background: rgba(146,3,233,0.15); color: var(--emerald-bright); }

        /* ---------- WORK / PROJECTS ---------- */
        .work-section { background: var(--slate); }
        .work-section .section-tag { color: var(--emerald-bright); }
        .work-section .section-title { color: white; }
        .work-section .section-desc { color: rgba(255,255,255,0.6); }
        .work-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 64px; }
        @media (max-width: 800px) { .work-grid { grid-template-columns: 1fr; } }
        .work-card {
          background: var(--slate-mid); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px;
          padding: 36px; transition: border-color .25s, transform .25s;
        }
        .work-card:hover { border-color: var(--emerald); transform: translateY(-4px); }
        .work-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; }
        .work-status { font-size: 11.5px; font-weight: 700; padding: 5px 12px; border-radius: 999px; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.04em; }
        .status-live { background: rgba(146,3,233,0.15); color: var(--emerald-bright); }
        .status-progress { background: rgba(255,193,7,0.12); color: #FFC107; }
        .work-title { color: white; font-size: 22px; margin-bottom: 12px; }
        .work-desc { color: rgba(255,255,255,0.58); font-size: 14.5px; line-height: 1.65; margin-bottom: 22px; }
        .work-stack { display: flex; gap: 8px; flex-wrap: wrap; }
        .work-stack-pill { font-size: 12px; color: rgba(255,255,255,0.55); border: 1px solid rgba(255,255,255,0.15); padding: 5px 12px; border-radius: 999px; }

        /* ---------- PROCESS ---------- */
        .process-list { margin-top: 64px; }
        .process-row {
          display: grid; grid-template-columns: 90px 1fr 1fr; gap: 32px; padding: 36px 0;
          border-top: 1px solid var(--paper-dim); align-items: start;
        }
        .process-row:last-child { border-bottom: 1px solid var(--paper-dim); }
        @media (max-width: 760px) { .process-row { grid-template-columns: 50px 1fr; } .process-row > div:last-child { grid-column: 2; } }
        .process-num { font-family: 'Space Grotesk', sans-serif; font-size: 36px; color: var(--paper-dim); font-weight: 700; }
        .process-title { font-size: 21px; color: var(--ink); margin-bottom: 8px; }
        .process-desc { color: var(--muted); font-size: 15px; line-height: 1.6; }

        /* ---------- TEAM ---------- */
        .team-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; margin-top: 64px; }
        @media (max-width: 760px) { .team-grid { grid-template-columns: 1fr; } }
        .team-card {
          background: white; border: 1px solid var(--paper-dim); border-radius: 20px; padding: 40px;
          position: relative; overflow: hidden; transition: box-shadow .3s;
        }
        .team-card:hover { box-shadow: 0 24px 48px rgba(28,37,38,0.08); }
        .team-card::before {
          content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: var(--emerald);
        }
        .team-avatar {
          width: 64px; height: 64px; border-radius: 16px; background: var(--slate);
          display: flex; align-items: center; justify-content: center; color: var(--emerald-bright);
          font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 22px; margin-bottom: 24px;
        }
        .team-name { font-size: 21px; color: var(--ink); margin-bottom: 4px; }
        .team-role { color: var(--emerald); font-size: 13.5px; font-weight: 700; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.04em; font-family: 'JetBrains Mono', monospace; }
        .team-bio { color: var(--muted); font-size: 14.5px; line-height: 1.65; }

        /* ---------- CTA BAND ---------- */
        .cta-band {
          background: var(--slate); border-radius: 28px; padding: 72px 56px; margin: 0 48px;
          text-align: center; position: relative; overflow: hidden;
        }
        @media (max-width: 700px) { .cta-band { margin: 0 16px; padding: 56px 28px; } }
        .cta-band-glow { position: absolute; top: -30%; left: 50%; transform: translateX(-50%); width: 500px; height: 500px; background: radial-gradient(circle, rgba(86,41,242,0.25), transparent 70%); }
        .cta-title { color: white; font-size: clamp(28px, 4vw, 44px); margin-bottom: 18px; position: relative; z-index: 1; }
        .cta-sub { color: rgba(255,255,255,0.6); font-size: 16px; margin-bottom: 36px; position: relative; z-index: 1; }
        .cta-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; position: relative; z-index: 1; }

        /* ---------- FOOTER ---------- */
        .footer { background: var(--slate-deep); padding: 64px 48px 32px; }
        .footer-top { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 48px; max-width: 1240px; margin: 0 auto 48px; }
        @media (max-width: 800px) { .footer-top { grid-template-columns: 1fr 1fr; } }
        .footer-brand-name { color: white; font-size: 19px; margin-bottom: 14px; }
        .footer-tagline { color: rgba(255,255,255,0.45); font-size: 13.5px; letter-spacing: 0.06em; text-transform: uppercase; font-family: 'JetBrains Mono', monospace; }
        .footer-col-title { color: white; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 18px; font-family: 'JetBrains Mono', monospace; }
        .footer-link { display: block; color: rgba(255,255,255,0.55); font-size: 14.5px; text-decoration: none; margin-bottom: 12px; transition: color .2s; }
        .footer-link:hover { color: var(--emerald-bright); }
        .footer-bottom {
          max-width: 1240px; margin: 0 auto; padding-top: 28px; border-top: 1px solid rgba(255,255,255,0.08);
          display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px;
        }
        .footer-bottom-text { color: rgba(255,255,255,0.35); font-size: 13px; }

        /* ---------- Contact form ---------- */
        .contact-section { background: white; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; margin-top: 56px; align-items: start; }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; gap: 40px; } }
        .contact-info-item { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 28px; }
        .contact-info-icon { width: 42px; height: 42px; border-radius: 11px; background: var(--paper-dim); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .contact-info-label { font-size: 12.5px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; font-family: 'JetBrains Mono', monospace; margin-bottom: 3px; }
        .contact-info-value { font-size: 16px; color: var(--ink); font-weight: 600; }
        .form-field { margin-bottom: 20px; }
        .form-label { display: block; font-size: 13.5px; color: var(--ink); font-weight: 600; margin-bottom: 8px; }
        .form-input, .form-textarea {
          width: 100%; padding: 14px 16px; border: 1.5px solid var(--paper-dim); border-radius: 10px;
          font-size: 15px; font-family: inherit; transition: border-color .2s; background: var(--paper);
        }
        .form-input:focus, .form-textarea:focus { outline: none; border-color: var(--emerald); background: white; }
        .form-textarea { resize: vertical; min-height: 110px; }
        .form-submit {
          background: var(--slate); color: white; padding: 15px 32px; border-radius: 10px; border: none;
          font-size: 15px; font-weight: 600; cursor: pointer; transition: background .2s; width: 100%;
        }
        .form-submit:hover { background: var(--emerald); }
        .form-success { background: rgba(86,41,242,0.1); border: 1px solid var(--emerald); border-radius: 10px; padding: 16px; color: var(--emerald-dim); font-size: 14.5px; margin-top: 16px; }
      `}</style>

      {/* ============ NAV ============ */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div
          className="nav-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <RibbonMark size={34} />
          <span className="nav-brand-name">TNova Solutions</span>
        </div>
        <div className="nav-links">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
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
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {navOpen && (
        <div className="mobile-menu">
          <button
            className="mobile-close"
            onClick={() => setNavOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setNavOpen(false)}>
              {l.label}
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

      {/* ============ HERO ============ */}
      <header className="hero" id="top">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <svg
          className="hero-ribbons"
          viewBox="0 0 400 600"
          style={{ position: "absolute", top: 40, right: -40 }}
        >
          <defs>
            <linearGradient id="hg1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#9203E9" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#2427E1" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <path
            d="M60 80 L220 20 L380 80 L260 130 L260 380 L160 330 L160 160 Z"
            fill="none"
            stroke="url(#hg1)"
            strokeWidth="2"
          />
          <path
            d="M60 80 L220 20 L380 80 L260 130 L260 380 L160 330 L160 160 Z"
            fill="none"
            stroke="url(#hg1)"
            strokeWidth="2"
            transform="translate(40, 140) scale(0.6)"
            opacity="0.6"
          />
        </svg>

        <div className="hero-content">
          <div className="hero-eyebrow">
            Tamil Nadu, India · Building since 2025
          </div>
          <h1 className="hero-title">
            Software that ships, <br />
            AI that <span className="accent">actually works.</span>
          </h1>
          <p className="hero-sub">
            TNova Solutions designs and builds mobile apps, backend systems, and
            machine learning products for teams who need a technical partner
            that owns delivery end-to-end — not just code.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">
              Get a quote →
            </a>
            <a href="#work" className="btn-ghost">
              See our work
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <div className="hero-stat-num">2026</div>
              <div className="hero-stat-label">Founded</div>
            </div>
            <div>
              <div className="hero-stat-num">
                <span>5+</span>
              </div>
              <div className="hero-stat-label">Service lines</div>
            </div>
            <div>
              <div className="hero-stat-num">
                <span>100%</span>
              </div>
              <div className="hero-stat-label">In-house delivery</div>
            </div>
            <div>
              <div className="hero-stat-num">
                <span>24/7</span>
              </div>
              <div className="hero-stat-label">Project visibility</div>
            </div>
          </div>
        </div>
      </header>

      {/* ============ MARQUEE ============ */}
      <div className="marquee-wrap">
        <div className="marquee">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="marquee-item">
                <b>AI / ML</b> · model training & deployment
              </span>
              <span className="marquee-item">
                <b>Mobile</b> · React Native + Expo
              </span>
              <span className="marquee-item">
                <b>Backend</b> · FastAPI · Node.js
              </span>
              <span className="marquee-item">
                <b>Cloud</b> · AWS · Render · Supabase
              </span>
              <span className="marquee-item">
                <b>Web</b> · React · Next.js
              </span>
              <span className="marquee-item">
                <b>Research</b> · academic & startup prototypes
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ============ CAPABILITIES ============ */}
      <section className="section" id="capabilities">
        <div className="section-inner">
          <Reveal>
            <div className="section-tag">What we do</div>
            <h2 className="section-title">
              Five service lines, one team that ships the whole stack.
            </h2>
            <p className="section-desc">
              We don't hand off between specialists — the same team that trains
              your model builds the app it runs on, and the API that connects
              them.
            </p>
          </Reveal>

          <div className="cap-grid">
            {[
              {
                icon: "◧",
                title: "AI & Machine Learning",
                desc: "Custom computer vision and classification models, trained on your data and shipped as production-ready TensorFlow Lite or cloud endpoints.",
                tags: ["TensorFlow", "PyTorch", "Computer Vision"],
              },
              {
                icon: "▱",
                title: "Mobile App Development",
                desc: "Cross-platform Android & iOS apps in React Native — camera, offline storage, push notifications, and polished native-feeling UI.",
                tags: ["React Native", "Expo", "iOS / Android"],
              },
              {
                icon: "⌁",
                title: "Backend & API Development",
                desc: "Secure, documented REST APIs with authentication, database design, and cloud deployment — built to scale from prototype to production.",
                tags: ["FastAPI", "Node.js", "PostgreSQL"],
              },
              {
                icon: "◫",
                title: "Cloud & Database Architecture",
                desc: "Cost-optimised infrastructure on AWS, Render, Supabase and Firebase — we pick the stack that fits your scale, not the most expensive one.",
                tags: ["AWS", "Firebase", "Supabase"],
              },
              {
                icon: "◬",
                title: "Web Development",
                desc: "Marketing sites, dashboards, and internal tools built in React and Next.js — fast, accessible, and easy for your team to maintain.",
                tags: ["React", "Next.js", "Design Systems"],
              },
              {
                icon: "◔",
                title: "Research & Prototyping",
                desc: "Conference-ready demos and proof-of-concept builds for academic and early-stage teams who need to show working software, fast.",
                tags: ["Rapid Prototyping", "PoC", "Academic"],
              },
            ].map((cap, i) => (
              <Reveal key={cap.title} delay={i * 60}>
                <div className="cap-card">
                  <div className="cap-icon">
                    <span style={{ fontSize: 22, color: TOKENS.emerald }}>
                      {cap.icon}
                    </span>
                  </div>
                  <h3 className="cap-title">{cap.title}</h3>
                  <p className="cap-desc">{cap.desc}</p>
                  <div className="cap-tags">
                    {cap.tags.map((t) => (
                      <span className="cap-tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WORK ============ */}
      <section className="section work-section" id="work">
        <div className="section-inner">
          <Reveal>
            <div className="section-tag">Selected work</div>
            <h2 className="section-title">Real builds, real constraints.</h2>
            <p className="section-desc">
              A look at what we're currently building — from AI-powered field
              tools to client product launches.
            </p>
          </Reveal>

          <div className="work-grid">
            <Reveal delay={0}>
              <div className="work-card">
                <div className="work-card-top">
                  <RibbonMark size={36} />
                  <span className="work-status status-progress">
                    In progress
                  </span>
                </div>
                <h3 className="work-title">Fish Freshness Indicator App</h3>
                <p className="work-desc">
                  An AI-powered mobile app that assesses fish freshness from eye
                  and gill photographs — built for a fisheries research
                  conference, from dataset collection through to a working
                  Android prototype.
                </p>
                <div className="work-stack">
                  <span className="work-stack-pill">TensorFlow Lite</span>
                  <span className="work-stack-pill">React Native</span>
                  <span className="work-stack-pill">FastAPI</span>
                  <span className="work-stack-pill">PostgreSQL</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="work-card">
                <div className="work-card-top">
                  <RibbonMark size={36} />
                  <span className="work-status status-live">Live</span>
                </div>
                <h3 className="work-title">Internal Delivery Platform</h3>
                <p className="work-desc">
                  TNova's own client dashboard for project tracking, milestone
                  sign-off, and document delivery — used to run every engagement
                  we take on.
                </p>
                <div className="work-stack">
                  <span className="work-stack-pill">Next.js</span>
                  <span className="work-stack-pill">Supabase</span>
                  <span className="work-stack-pill">Tailwind</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="section" id="process">
        <div className="section-inner">
          <Reveal>
            <div className="section-tag">How we work</div>
            <h2 className="section-title">
              A process built around milestones you can see.
            </h2>
            <p className="section-desc">
              Every engagement follows the same four stages — scoped, priced,
              and signed off before the next one starts.
            </p>
          </Reveal>

          <div className="process-list">
            {[
              {
                n: "01",
                title: "Scope & Quote",
                desc: "We turn your brief into a fixed-scope quotation with module-by-module pricing — so you know exactly what you're paying for before work starts.",
              },
              {
                n: "02",
                title: "Build in Milestones",
                desc: "Work is delivered in 3–4 milestones, each tied to a working deliverable: a trained model, a live API, a testable app build.",
              },
              {
                n: "03",
                title: "Test in the Real World",
                desc: "Before final delivery, we validate against real conditions — field tests, user testing, or load testing, depending on the product.",
              },
              {
                n: "04",
                title: "Hand Off & Support",
                desc: "You get full source code, documentation, and 30 days of post-launch support — no vendor lock-in, no black boxes.",
              },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 60}>
                <div className="process-row">
                  <div className="process-num">{step.n}</div>
                  <div>
                    <h3 className="process-title">{step.title}</h3>
                  </div>
                  <div>
                    <p className="process-desc">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TEAM ============ */}
      <section
        className="section"
        id="team"
        style={{ background: TOKENS.paperDim }}
      >
        <div className="section-inner">
          <Reveal>
            <div className="section-tag">Leadership</div>
            <h2 className="section-title">Founded by two people who ship.</h2>
            <p className="section-desc">
              TNova is run by its founders, end to end — from the first client
              call to the final commit.
            </p>
          </Reveal>

          <div className="team-grid">
            <Reveal delay={0}>
              <div className="team-card">
                <div className="team-avatar">TM</div>
                <h3 className="team-name">Thipakar Murugesan</h3>
                <div className="team-role">
                  Founder & Chief Executive Officer
                </div>
                <p className="team-bio">
                  Leads client strategy, project scoping, and delivery across
                  every TNova engagement — the first and last point of contact
                  for every client.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="team-card">
                <div className="team-avatar">NK</div>
                <h3 className="team-name">Naresh Krishna</h3>
                <div className="team-role">Co-Founder & Director</div>
                <p className="team-bio">
                  Owns technical architecture and engineering delivery — from
                  mobile apps and backend systems to machine learning pipelines.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <div style={{ padding: "0 0 0" }}>
        <Reveal>
          <div className="cta-band">
            <div className="cta-band-glow" />
            <h2 className="cta-title">Have a build in mind?</h2>
            <p className="cta-sub">
              Tell us what you're building — we'll send back a scoped quotation
              within 48 hours.
            </p>
            <div className="cta-actions">
              <a href="#contact" className="btn-primary">
                Start a project →
              </a>
              <a href="mailto:contact@tnovasolutions.com" className="btn-ghost">
                Email us directly
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ============ CONTACT ============ */}
      <ContactSection />

      {/* ============ FOOTER ============ */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <RibbonMark size={32} />
              <span className="footer-brand-name">TNova Solutions</span>
            </div>
            <div className="footer-tagline">Innovate · Integrate · Elevate</div>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <a className="footer-link" href="#capabilities">
              AI & Machine Learning
            </a>
            <a className="footer-link" href="#capabilities">
              Mobile Apps
            </a>
            <a className="footer-link" href="#capabilities">
              Backend & APIs
            </a>
            <a className="footer-link" href="#capabilities">
              Web Development
            </a>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <a className="footer-link" href="#work">
              Our Work
            </a>
            <a className="footer-link" href="#process">
              Process
            </a>
            <a className="footer-link" href="#team">
              Team
            </a>
            <a className="footer-link" href="#contact">
              Contact
            </a>
          </div>
          <div>
            <div className="footer-col-title">Get in touch</div>
            <a className="footer-link" href="mailto:contact@tnovasolutions.com">
              contact@tnovasolutions.com
            </a>
            <a className="footer-link" href="tel:+919944880268">
              +91 99448 80268
            </a>
            <span className="footer-link" style={{ cursor: "default" }}>
              Tamil Nadu, India
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-bottom-text">
            © 2026 TNova Solutions Pvt Ltd. All rights reserved.
          </span>
          <span className="footer-bottom-text">www.tnovasolutions.com</span>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Contact form component ---------- */
function ContactSection() {
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
          <h2 className="section-title">
            Let's talk about what you're building.
          </h2>
          <p className="section-desc">
            Send a brief or just say hello — Thipakar and Naresh personally
            review every inquiry.
          </p>
        </Reveal>

        <div className="contact-grid">
          <Reveal>
            <div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <span style={{ color: TOKENS.emerald, fontSize: 18 }}>✉</span>
                </div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-value">
                    info@tnovasolutions.com
                  </div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <span style={{ color: TOKENS.emerald, fontSize: 18 }}>☎</span>
                </div>
                <div>
                  <div className="contact-info-label">Phone</div>
                  <div className="contact-info-value">+91 99448 80268</div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <span style={{ color: TOKENS.emerald, fontSize: 18 }}>◉</span>
                </div>
                <div>
                  <div className="contact-info-label">Location</div>
                  <div className="contact-info-value">Tamil Nadu, India</div>
                </div>
              </div>
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
