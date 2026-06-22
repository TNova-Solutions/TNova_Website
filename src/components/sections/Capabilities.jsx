import Reveal from "../ui/Reveal";
import { CAPABILITIES } from "../../constants/content";

export default function Capabilities() {
  return (
    <section className="section" id="capabilities">
      <div className="section-inner">
        <Reveal>
          <p className="section-tag">What we do</p>
          <h2 className="section-title">Five service lines, one team that ships the whole stack.</h2>
          <p className="section-desc">
            We don't hand off between specialists — the same team that trains your model
            builds the app it runs on, and the API that connects them.
          </p>
        </Reveal>

        <div className="cap-grid">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 60}>
              <div className="cap-card">
                <div className="cap-icon" aria-hidden="true">
                  <span className="cap-icon-glyph">{cap.icon}</span>
                </div>
                <h3 className="cap-title">{cap.title}</h3>
                <p className="cap-desc">{cap.desc}</p>
                <div className="cap-tags">
                  {cap.tags.map((tag) => (
                    <span className="cap-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
