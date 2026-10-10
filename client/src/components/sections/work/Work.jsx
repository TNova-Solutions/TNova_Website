import Reveal from "../../animation/reveal/Reveal";
import RibbonMark from "../../animation/ribbonMark/RibbonMark";


import "./Work.css";

export default function Work({ globalState }) {
  const { tag, title, desc, workItems } = globalState?.work || {}
  return (
    <section className="section work-section" id="work">
      <div className="section-inner">
        <Reveal>
          <p className="section-tag">{tag}</p>
          <h2 className="section-title">{title}</h2>
          <p className="section-desc">{desc}</p>
        </Reveal>

        <div className="work-grid">
          {workItems?.map((item, i) => (
            <Reveal key={item?.title} delay={i * 80}>
              <div className="work-card">
                <div className="work-card-top">
                  <RibbonMark size={36} />
                  <span className={`work-status status-${item?.statusType}`}>{item.status}</span>
                </div>
                <h3 className="work-title">{item?.title}</h3>
                <p className="work-desc">{item?.desc}</p>
                <div className="work-stack">
                  {item?.stack.map((tech) => (
                    <span className="work-stack-pill" key={tech}>
                      {tech}
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
