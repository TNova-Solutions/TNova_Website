

import Reveal from "../../animation/reveal/Reveal.jsx";
import "./Capabilities.css";

export default function Capabilities({ globalState }) {
  const { tag, title, desc, services } = globalState?.capabilities || {}
  return (
    <section className="section" id="capabilities">
      <div className="section-inner">
        <Reveal>
          <p className="section-tag">{tag}</p>
          <h2 className="section-title">{title}</h2>
          <p className="section-desc">{desc}</p>
        </Reveal>

        <div className="cap-grid">
          {services?.map((cap, i) => (
            <Reveal key={cap?.title} delay={i * 60}>
              <div className="cap-card">
                <div className="cap-image">
                  <img
                    width="600"
                    height="200"
                    loading="lazy"
                    decoding="async"
                    src={cap?.image}
                    alt={cap?.title}
                  />
                </div>
                <div className="cap-content">
                  <h3 className="cap-title">{cap?.title}</h3>
                  <p className="cap-desc">{cap?.desc}</p>
                  <div className="cap-tags">
                    {cap?.tags?.map((tag) => (
                      <span className="cap-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="cap-actions">
                    <a href="#contact" className="btn-ghost cap-more">
                      Discuss this
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
