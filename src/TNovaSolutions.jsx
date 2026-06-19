import { useState } from "react";
import logo from "./logo.png";

const GRADIENT = "linear-gradient(135deg, #6B3FA0, #3B6DD4)";
const PURPLE = "#6B3FA0";
const FOOTER_BG = "linear-gradient(135deg, rgba(107,63,160,0.95), rgba(59,109,212,0.95))";
const DARK_BG = "linear-gradient(135deg, #3A1A6E, #1A3A7A)";

const styles = {
  // Reset & Base
  body: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    margin: 0,
    padding: 0,
    background: "transparent",
    color: "#1a1a2e",
  },
  // Nav
  nav: {
    background: FOOTER_BG,
    borderBottom: "1px solid rgba(255,255,255,0.12)",
    padding: "0",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 1px 12px rgba(0,0,0,0.18)",
  },
  navInner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.85rem"
  },
  logoImage: {
    width: 36,
    height: 36,
    objectFit: "contain",
  },
  logoText: {
    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
    fontSize: "1.4rem",
    fontWeight: 700,
    color: "#fff",
    letterSpacing: "-0.5px",
    cursor: "default",
  },
  navLinks: {
    display: "flex",
    gap: "2rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navLink: {
    textDecoration: "none",
    fontSize: "0.9rem",
    color: "#eef2ff",
    fontWeight: 500,
    transition: "color 0.2s",
  },
  btnNav: {
    background: "rgba(255,255,255,0.12)",
    color: "#fff",
    padding: "0.5rem 1.3rem",
    borderRadius: 8,
    fontSize: "0.875rem",
    fontWeight: 500,
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.18)",
    cursor: "pointer",
  },
  // Hero
  hero: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "5rem 1.5rem 4rem",
    textAlign: "center",
  },
  heroTag: {
    display: "inline-block",
    background: "#EDE8F8",
    color: PURPLE,
    fontSize: "0.75rem",
    fontWeight: 600,
    padding: "0.35rem 1rem",
    borderRadius: 20,
    marginBottom: "1.2rem",
    letterSpacing: "0.6px",
    textTransform: "uppercase",
  },
  h1: {
    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
    fontSize: "clamp(2rem, 5vw, 3.2rem)",
    fontWeight: 700,
    lineHeight: 1.15,
    marginBottom: "1.2rem",
    letterSpacing: "-1px",
    color: "#1a1a2e",
  },
  h1Accent: {
    background: GRADIENT,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroP: {
    fontSize: "1.1rem",
    color: "#666",
    maxWidth: 560,
    margin: "0 auto 2rem",
    lineHeight: 1.7,
  },
  heroBtns: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  btnPrimary: {
    background: GRADIENT,
    color: "#fff",
    padding: "0.75rem 1.8rem",
    borderRadius: 8,
    fontSize: "0.95rem",
    fontWeight: 500,
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    display: "inline-block",
  },
  btnSecondary: {
    background: "transparent",
    color: "#1a1a2e",
    padding: "0.75rem 1.8rem",
    borderRadius: 8,
    fontSize: "0.95rem",
    fontWeight: 500,
    textDecoration: "none",
    border: "1px solid #ccc",
    cursor: "pointer",
    display: "inline-block",
  },
  // Stats
  statsWrap: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 1.5rem",
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.5rem",
    padding: "2.5rem 0",
    borderTop: "1px solid #e8e0f0",
    borderBottom: "1px solid #e8e0f0",
    margin: "1rem 0 3rem",
  },
  statItem: { textAlign: "center" },
  statNum: {
    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
    fontSize: "2.2rem",
    fontWeight: 700,
    background: GRADIENT,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  statLabel: { fontSize: "0.85rem", color: "#888", marginTop: "0.3rem" },
  // Sections
  section: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "4rem 1.5rem",
  },
  sectionLabel: {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: PURPLE,
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "0.6rem",
  },
  sectionTitle: {
    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: 700,
    letterSpacing: "-0.5px",
    marginBottom: "1rem",
    color: "#1a1a2e",
  },
  accentBar: {
    height: 3,
    width: 48,
    background: GRADIENT,
    borderRadius: 2,
    marginBottom: "1.5rem",
  },
  sectionSub: {
    color: "#666",
    fontSize: "1rem",
    maxWidth: 500,
    lineHeight: 1.7,
    marginBottom: "2.5rem",
  },
  // Services
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.25rem",
  },
  serviceCard: {
    background: "#fff",
    border: "1px solid #e8e0f0",
    borderRadius: 12,
    padding: "1.5rem",
    transition: "box-shadow 0.2s, transform 0.2s",
  },
  serviceIcon: {
    width: 44,
    height: 44,
    background: "linear-gradient(135deg, #EDE8F8, #E0E8FA)",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
    fontSize: 22,
  },
  serviceTitle: {
    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
    fontSize: "1rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
    color: "#1a1a2e",
  },
  serviceDesc: { fontSize: "0.875rem", color: "#666", lineHeight: 1.6 },
  // About
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "4rem",
    alignItems: "center",
  },
  aboutInfo: {
    background: "#fff",
    border: "1px solid #e8e0f0",
    borderRadius: 12,
    padding: "1.5rem",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.75rem 0",
    borderBottom: "1px solid #f0eaf8",
    fontSize: "0.9rem",
  },
  infoLabel: { color: "#888" },
  infoVal: { fontWeight: 500, color: "#1a1a2e" },
  // Team
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.5rem",
  },
  teamCard: {
    background: "#fff",
    border: "1px solid #e8e0f0",
    borderRadius: 12,
    padding: "1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: "50%",
    background: GRADIENT,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
    fontSize: "1rem",
    fontWeight: 700,
    flexShrink: 0,
  },
  teamName: {
    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
    fontSize: "1rem",
    fontWeight: 600,
    marginBottom: "0.2rem",
    color: "#1a1a2e",
  },
  teamRole: {
    fontSize: "0.8rem",
    color: PURPLE,
    fontWeight: 500,
    marginBottom: "0.3rem",
  },
  teamDesc: { fontSize: "0.8rem", color: "#888" },
  // Tech
  techGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
    gap: "1rem",
  },
  techPill: {
    background: "#fff",
    border: "1px solid #e8e0f0",
    borderRadius: 8,
    padding: "0.75rem 1rem",
    textAlign: "center",
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "#1a1a2e",
  },
  techCat: {
    fontSize: "0.68rem",
    color: PURPLE,
    marginBottom: "0.2rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  // CTA
  ctaWrap: { maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem 4rem" },
  cta: {
    background: DARK_BG,
    borderRadius: 16,
    padding: "3.5rem 2rem",
    textAlign: "center",
  },
  ctaH2: {
    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: 700,
    color: "#fff",
    marginBottom: "0.75rem",
  },
  ctaP: {
    color: "rgba(255,255,255,0.7)",
    marginBottom: "2rem",
    fontSize: "1rem",
  },
  ctaBtns: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  btnWhite: {
    background: "#fff",
    color: "#3A1A6E",
    padding: "0.75rem 1.8rem",
    borderRadius: 8,
    fontSize: "0.95rem",
    fontWeight: 600,
    textDecoration: "none",
    display: "inline-block",
  },
  btnOutlineWhite: {
    background: "transparent",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.35)",
    padding: "0.75rem 1.8rem",
    borderRadius: 8,
    fontSize: "0.95rem",
    fontWeight: 500,
    textDecoration: "none",
    display: "inline-block",
  },
  // Footer
  footerWrap: {
    borderTop: "1px solid rgba(107, 63, 160, 0.18)",
    background: FOOTER_BG,
  },
  footer: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "1.75rem 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "1rem",
    fontSize: "0.95rem",
    color: "#eef2ff",
  },
  footerLogo: {
    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
    fontWeight: 700,
    fontSize: "1.05rem",
    color: "#fff",
  },
  footerLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "0.65rem",
    flex: "1 1 320px",
  },
  footerBottom: {
    background: "#fff",
    color: "#1a1a2e",
    padding: "1rem 1.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    flexWrap: "nowrap",
    width: "100%",
  },
  footerBottomCol: {
    flex: "1 1 0",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  footerBottomLogo: {
    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
    fontWeight: 700,
    fontSize: "1.05rem",
    color: "#1a1a2e",
  },
  footerBottomLink: { color: "#1a1a2e", textDecoration: "none" },
  footerColumn: {
    flex: "1 1 0",
    minWidth: 220,
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  footerColumnTitle: {
    fontWeight: 700,
    color: "#eef2ff",
    marginBottom: "0.5rem",
  },
  footerLink: { color: "#d8dcff", textDecoration: "none" },
  footerContact: {
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
    color: "#eef2ff",
  },
  footerSocial: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    marginTop: "0.75rem",
    flexWrap: "wrap",
  },
  footerSocialLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#d8dcff",
    textDecoration: "none",
    fontWeight: 500,
  },
};

// ── Data ──────────────────────────────────────────────────────────────
const services = [
  {
    icon: "🧠",
    title: "AI & Machine Learning",
    desc: "Custom ML models, image classification, computer vision, and TensorFlow Lite mobile AI deployment.",
  },
  {
    icon: "📱",
    title: "Mobile App Development",
    desc: "React Native + Expo cross-platform apps for Android and iOS with camera, GPS, and offline support.",
  },
  {
    icon: "⚙️",
    title: "Backend API Development",
    desc: "Python FastAPI and Node.js REST APIs with authentication, database integration, and cloud hosting.",
  },
  {
    icon: "☁️",
    title: "Database & Cloud",
    desc: "PostgreSQL, Firebase, Cloudinary, Render, Supabase — cost-optimised cloud architecture.",
  },
  {
    icon: "🔬",
    title: "Research & Prototyping",
    desc: "Academic prototypes, conference demos, and proof-of-concept builds for research institutions.",
  },
];

const companyInfo = [
  ["Company", "TNova Solutions Pvt Ltd"],
  ["Type", "Private Limited"],
  ["Founded", "2026"],
  ["Headquarters", "Tamil Nadu, India"],
  ["Industry", "IT & AI Applications"],
  ["Email", "info@tnovasolutions.com"],
  ["Phone", "+91 9944880268"],
  ["Website", "www.tnovasolutions.com"],
];

const team = [
  {
    initials: "TM",
    name: "Thepakar Murugesan",
    role: "Founder & CEO",
    desc: "Leading product vision, strategy, and technical direction at TNova Solutions.",
  },
  {
    initials: "NK",
    name: "Naresh Krishna",
    role: "Co-Founder & Director",
    desc: "Driving engineering, partnerships, and operational growth for the company.",
  },
];

const techStack = [
  { cat: "Mobile", name: "React Native" },
  { cat: "Mobile", name: "Expo" },
  { cat: "Backend", name: "Python FastAPI" },
  { cat: "Backend", name: "Node.js" },
  { cat: "AI / ML", name: "TensorFlow" },
  { cat: "AI / ML", name: "MobileNetV2" },
  { cat: "Database", name: "PostgreSQL" },
  { cat: "Cloud", name: "Cloudinary" },
  { cat: "Cloud", name: "Render.com" },
  { cat: "Auth", name: "JWT" },
  { cat: "Storage", name: "Firebase" },
  { cat: "Data", name: "Supabase" },
];

// ── Components ────────────────────────────────────────────────────────
function Navbar() {
  const [, setHovered] = useState(null);
  return (
    <nav style={styles.nav}>
      <div style={styles.navInner}>
        <div style={styles.logoContainer}>
          <img src={logo} alt="TNova Solutions logo" style={styles.logoImage} />
          <div style={styles.logoText}>TNova Solutions</div>
        </div>
        <ul style={styles.navLinks}>
          {["Services", "About", "Team", "Contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                style={{
                  ...styles.navLink,
                  color: "#fff",
                }}
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(null)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <a href="mailto:info@tnovasolutions.com" style={styles.btnNav}>
          Get in touch
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section style={styles.hero} id="home">

      <h1 style={styles.h1}>
        Build smarter with
        <br />
        <span style={styles.h1Accent}>AI-powered</span> software
      </h1>
      <p style={styles.heroP}>
        TNova Solutions delivers mobile apps, machine learning systems, and
        backend APIs — built fast, built to scale.
      </p>
      <div style={styles.heroBtns}>
        <a href="mailto:info@tnovasolutions.com" style={styles.btnPrimary}>
          Start a project
        </a>
        <a href="#services" style={styles.btnSecondary}>
          Our services
        </a>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <div style={styles.statsWrap}>
      <div style={styles.stats}>
        {[
          ["5+", "Service areas"],
          ["2025", "Founded in Tamil Nadu"],
          ["AI", "First in every build"],
        ].map(([num, label]) => (
          <div key={label} style={styles.statItem}>
            <div style={styles.statNum}>{num}</div>
            <div style={styles.statLabel}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Services() {
  const [hovered, setHovered] = useState(null);
  return (
    <section style={styles.section} id="services">
      <div style={styles.sectionLabel}>What we do</div>
      <h2 style={styles.sectionTitle}>Services we offer</h2>
      <div style={styles.accentBar} />
      <p style={styles.sectionSub}>
        From idea to production — we handle the full stack so you can focus on
        your domain.
      </p>
      <div style={styles.servicesGrid}>
        {services.map((s) => (
          <div
            key={s.title}
            style={{
              ...styles.serviceCard,
              boxShadow:
                hovered === s.title
                  ? "0 8px 32px rgba(107,63,160,0.12)"
                  : "none",
              transform: hovered === s.title ? "translateY(-3px)" : "none",
            }}
            onMouseEnter={() => setHovered(s.title)}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={styles.serviceIcon}>{s.icon}</div>
            <div style={styles.serviceTitle}>{s.title}</div>
            <p style={styles.serviceDesc}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section style={styles.section} id="about">
      <div style={styles.aboutGrid}>
        <div>
          <div style={styles.sectionLabel}>About us</div>
          <h2 style={styles.sectionTitle}>Innovate. Integrate. Elevate.</h2>
          <div style={styles.accentBar} />
          <p style={{ color: "#666", lineHeight: 1.8, fontSize: "0.95rem" }}>
            TNova Solutions is a technology company based in Tamil Nadu, India.
            We specialise in AI-powered mobile applications, software
            development, and digital innovation — combining deep technical
            expertise with a mission to build scalable, affordable technology
            for real-world problems.
          </p>
        </div>
        <div style={styles.aboutInfo}>
          {companyInfo.map(([label, val], i) => (
            <div
              key={label}
              style={{
                ...styles.infoRow,
                borderBottom:
                  i < companyInfo.length - 1 ? "1px solid #f0eaf8" : "none",
              }}
            >
              <span style={styles.infoLabel}>{label}</span>
              <span style={styles.infoVal}>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section style={styles.section} id="team">
      <div style={styles.sectionLabel}>Our team</div>
      <h2 style={styles.sectionTitle}>The founders</h2>
      <div style={styles.accentBar} />
      <div style={styles.teamGrid}>
        {team.map((m) => (
          <div key={m.name} style={styles.teamCard}>
            <div style={styles.avatar}>{m.initials}</div>
            <div>
              <div style={styles.teamName}>{m.name}</div>
              <div style={styles.teamRole}>{m.role}</div>
              <div style={styles.teamDesc}>{m.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TechStack() {
  return (
    <section style={styles.section}>
      <div style={styles.sectionLabel}>Technology</div>
      <h2 style={styles.sectionTitle}>Our tech stack</h2>
      <div style={styles.accentBar} />
      <div style={styles.techGrid}>
        {techStack.map((t) => (
          <div key={t.name} style={styles.techPill}>
            <div style={styles.techCat}>{t.cat}</div>
            {t.name}
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <div style={styles.ctaWrap} id="contact">
      <div style={styles.cta}>
        <h2 style={styles.ctaH2}>Ready to build something?</h2>
        <p style={styles.ctaP}>
          Tell us your idea — we'll turn it into a working product.
        </p>
        <div style={styles.ctaBtns}>
          <a href="mailto:info@tnovasolutions.com" style={styles.btnWhite}>
            info@tnovasolutions.com
          </a>
          <a href="tel:+919944880268" style={styles.btnOutlineWhite}>
            +91 9944880268
          </a>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div style={styles.footerWrap}>
      <footer style={styles.footer}>
        <div style={styles.footerColumn}>
          <div style={styles.footerLogo}>TNova Solutions Pvt Ltd</div>
          <div style={{ marginTop: "0.6rem", color: "#d8dcff" }}>
            AI-driven software services for mobile apps, cloud APIs, and machine learning.
          </div>
        </div>

        <div style={styles.footerColumn}>
          <div style={styles.footerColumnTitle}>Contact</div>
          <div style={styles.footerContact}>
            <a href="mailto:info@tnovasolutions.com" style={styles.footerLink}>
              info@tnovasolutions.com
            </a>
            <a href="tel:+919944880268" style={styles.footerLink}>
              +91 9944880268
            </a>
            <a href="http://www.tnovasolutions.com" style={styles.footerLink}>
              www.tnovasolutions.com
            </a>
          </div>
        </div>

        <div style={styles.footerColumn}>
          <div style={styles.footerColumnTitle}>Follow us</div>
          <div style={styles.footerSocial}>
            <a href="https://instagram.com/tnovasolutions" style={styles.footerSocialLink}>
              📸 Instagram
            </a>
            <a href="https://facebook.com/tnovasolutions" style={styles.footerSocialLink}>
              👍 Facebook
            </a>
            <a href="https://twitter.com/tnovasolutions" style={styles.footerSocialLink}>
              🐦 Twitter
            </a>
          </div>
        </div>
      </footer>
      <div style={styles.footerBottom}>
        <div style={styles.footerBottomCol}>
          <div style={styles.footerBottomLogo}>TNova Solutions Pvt Ltd</div>
        </div>
        <div style={styles.footerBottomCol}>

          <a href="http://www.tnovasolutions.com" style={styles.footerBottomLink}>
            www.tnovasolutions.com
          </a>
        </div>
        <div style={styles.footerBottomCol}>
          <span>© 2026 TNova Solutions</span>
        </div>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={styles.body}>
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <About />
      <Team />
      <TechStack />
      <CTA />
      <Footer />
    </div>
  );
}
