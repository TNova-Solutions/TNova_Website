import React from "react";
import Reveal from "./Reveal";
import { PROCESS_STEPS } from "../data";

export default function ProcessSection() {
  return (
    <section className="section" id="process">
      <div className="section-inner">
        <Reveal>
          <div className="section-tag">How we work</div>
          <h2 className="section-title">A process built around milestones you can see.</h2>
          <p className="section-desc">
            Every engagement follows the same four stages — scoped, priced,
            and signed off before the next one starts.
          </p>
        </Reveal>

        <div className="process-list">
          {PROCESS_STEPS.map((step, i) => (
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
  );
}
