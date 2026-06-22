import CircuitBackground from "../ui/CircuitBackground";
import Terminal from "../ui/Terminal";
import AnimatedCounter from "../ui/AnimatedCounter";
import { HERO_STATS } from "../../constants/content";

export default function Hero() {
  return (
    <header className="hero" id="top">
      <CircuitBackground />
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-cols">
        <div>
          <p className="hero-eyebrow">Tamil Nadu, India · Building since 2026</p>

          <h1 className="hero-title">
            We build software <br />
            that <span className="accent">ships.</span>
          </h1>

          <p className="hero-sub">
            TNova Solutions designs and builds mobile apps, backend systems, and machine
            learning products for teams who need a technical partner that owns delivery
            end-to-end — not just code.
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
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <div className="hero-stat-num">
                  {stat.isYear ? (
                    <AnimatedCounter value={stat.value} duration={stat.duration} />
                  ) : (
                    <span>
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={stat.duration} />
                    </span>
                  )}
                </div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <Terminal />
      </div>
    </header>
  );
}
