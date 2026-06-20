import React from "react";
import Reveal from "./Reveal";
import RibbonMark from "./RibbonMark";
import { WORK_PROJECTS } from "../data";

export default function WorkSection() {
  return (
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
          {WORK_PROJECTS.map((project, index) => (
            <Reveal key={project.title} delay={index * 80}>
              <div className="work-card">
                <div className="work-card-top">
                  <RibbonMark size={36} />
                  <span className={`work-status ${project.statusClass}`}>
                    {project.status}
                  </span>
                </div>
                <h3 className="work-title">{project.title}</h3>
                <p className="work-desc">{project.desc}</p>
                <div className="work-stack">
                  {project.stack.map((pill) => (
                    <span className="work-stack-pill" key={pill}>
                      {pill}
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
