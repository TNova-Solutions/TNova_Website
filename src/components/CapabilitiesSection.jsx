import React from "react";
import Reveal from "./Reveal";
import { CAPABILITIES, TOKENS } from "../data";

export default function CapabilitiesSection() {
  return (
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
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 60}>
              <div className="cap-card">
                <div >
                  <img
                    width="100%"
                    height= "200px"
                    src={cap.image}
                    alt={cap.title}
                  />
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
  );
}
