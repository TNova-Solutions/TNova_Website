import { useState } from "react";
import logo from "./logo.png";
import "./TNovaSolutions.css";

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
    <nav className="tnova-nav">
      <div className="tnova-nav-inner">
        <div className="tnova-logo-container">
          <img src={logo} alt="TNova Solutions logo" className="tnova-logo-image" />
          <div className="tnova-logo-text">TNova Solutions</div>
        </div>
        <ul className="tnova-nav-links">
          {["Services", "About", "Team", "Contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="tnova-nav-link"
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(null)}
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

function Hero() {
  return (
    <section className="tnova-hero" id="home">
      <h1 className="tnova-hero-heading">
        Build smarter with
        <br />
        <span className="tnova-heading-accent">AI-powered</span> software
      </h1>
      <p className="tnova-hero-copy">
        TNova Solutions delivers mobile apps, machine learning systems, and
        backend APIs — built fast, built to scale.
      </p>
      <div className="tnova-hero-btns">
        <a href="mailto:info@tnovasolutions.com" className="tnova-btn-primary">
          Start a project
        </a>
        <a href="#services" className="tnova-btn-secondary">
          Our services
        </a>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <div className="tnova-stats-wrap">
      <div className="tnova-stats">
        {[
          ["5+", "Service areas"],
          ["2025", "Founded in Tamil Nadu"],
          ["AI", "First in every build"],
        ].map(([num, label]) => (
          <div key={label} className="tnova-stat-item">
            <div className="tnova-stat-num">{num}</div>
            <div className="tnova-stat-label">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Services() {
  return (
    <section className="tnova-section" id="services">
      <div className="tnova-section-label">What we do</div>
      <h2 className="tnova-section-title">Services we offer</h2>
      <div className="tnova-accent-bar" />
      <p className="tnova-section-sub">
        From idea to production — we handle the full stack so you can focus on
        your domain.
      </p>
      <div className="tnova-services-grid">
        {services.map((s) => (
          <div key={s.title} className="tnova-service-card">
            <div className="tnova-service-icon">{s.icon}</div>
            <div className="tnova-service-title">{s.title}</div>
            <p className="tnova-service-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="tnova-section" id="about">
      <div className="tnova-about-grid">
        <div>
          <div className="tnova-section-label">About us</div>
          <h2 className="tnova-section-title">Innovate. Integrate. Elevate.</h2>
          <div className="tnova-accent-bar" />
          <p className="tnova-about-copy">
            TNova Solutions is a technology company based in Tamil Nadu, India.
            We specialise in AI-powered mobile applications, software
            development, and digital innovation — combining deep technical
            expertise with a mission to build scalable, affordable technology
            for real-world problems.
          </p>
        </div>
        <div className="tnova-about-info">
          {companyInfo.map(([label, val]) => (
            <div key={label} className="tnova-info-row">
              <span className="tnova-info-label">{label}</span>
              <span className="tnova-info-val">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="tnova-section" id="team">
      <div className="tnova-section-label">Our team</div>
      <h2 className="tnova-section-title">The founders</h2>
      <div className="tnova-accent-bar" />
      <div className="tnova-team-grid">
        {team.map((m) => (
          <div key={m.name} className="tnova-team-card">
            <div className="tnova-avatar">{m.initials}</div>
            <div>
              <div className="tnova-team-name">{m.name}</div>
              <div className="tnova-team-role">{m.role}</div>
              <div className="tnova-team-desc">{m.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TechStack() {
  return (
    <section className="tnova-section">
      <div className="tnova-section-label">Technology</div>
      <h2 className="tnova-section-title">Our tech stack</h2>
      <div className="tnova-accent-bar" />
      <div className="tnova-tech-grid">
        {techStack.map((t) => (
          <div key={t.name} className="tnova-tech-pill">
            <div className="tnova-tech-cat">{t.cat}</div>
            {t.name}
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <div className="tnova-cta-wrap" id="contact">
      <div className="tnova-cta">
        <h2 className="tnova-cta-heading">Ready to build something?</h2>
        <p className="tnova-cta-copy">
          Tell us your idea — we'll turn it into a working product.
        </p>
        <div className="tnova-cta-btns">
          <a href="mailto:info@tnovasolutions.com" className="tnova-btn-white">
            info@tnovasolutions.com
          </a>
          <a href="tel:+919944880268" className="tnova-btn-outline-white">
            +91 9944880268
          </a>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="tnova-footer-wrap">
      <footer className="tnova-footer">
        <div className="tnova-footer-column">
          <div className="tnova-footer-logo">TNova Solutions Pvt Ltd</div>
          <div className="tnova-footer-copy">
            AI-driven software services for mobile apps, cloud APIs, and machine learning.
          </div>
        </div>

        <div className="tnova-footer-column">
          <div className="tnova-footer-column-title">Contact</div>
          <div className="tnova-footer-contact">
            <a href="mailto:info@tnovasolutions.com" className="tnova-footer-link">
              info@tnovasolutions.com
            </a>
            <a href="tel:+919944880268" className="tnova-footer-link">
              +91 9944880268
            </a>
            <a href="http://www.tnovasolutions.com" className="tnova-footer-link">
              www.tnovasolutions.com
            </a>
          </div>
        </div>

        <div className="tnova-footer-column">
          <div className="tnova-footer-column-title">Follow us</div>
          <div className="tnova-footer-social">
            <a href="https://instagram.com/tnovasolutions" className="tnova-footer-social-link">
              📸 Instagram
            </a>
            <a href="https://facebook.com/tnovasolutions" className="tnova-footer-social-link">
              👍 Facebook
            </a>
            <a href="https://twitter.com/tnovasolutions" className="tnova-footer-social-link">
              🐦 Twitter
            </a>
          </div>
        </div>
      </footer>
      <div className="tnova-footer-bottom">
        <div className="tnova-footer-bottom-col">
          <div className="tnova-footer-bottom-logo">TNova Solutions Pvt Ltd</div>
        </div>
        <div className="tnova-footer-bottom-col">
          <a href="http://www.tnovasolutions.com" className="tnova-footer-bottom-link">
            www.tnovasolutions.com
          </a>
        </div>
        <div className="tnova-footer-bottom-col">
          <span>© 2026 TNova Solutions</span>
        </div>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="tnova-root">
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
