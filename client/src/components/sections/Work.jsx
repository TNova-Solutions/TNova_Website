import Reveal from "../ui/Reveal";
import RibbonMark from "../ui/RibbonMark";
import { WORK_ITEMS } from "../../constants/content";

export default function Work() {
  return (
    <section className="section work-section" id="work">
      <div className="section-inner">
        <Reveal>
          <p className="section-tag">Selected work</p>
          <h2 className="section-title">Real builds, real constraints.</h2>
          <p className="section-desc">
            A look at what we're currently building — from AI-powered field tools to
            client product launches.
          </p>
        </Reveal>

        <div className="work-grid">
          {WORK_ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="work-card">
                <div className="work-card-top">
                  <RibbonMark size={36} />
                  <span className={`work-status status-${item.statusType}`}>{item.status}</span>
                </div>
                <h3 className="work-title">{item.title}</h3>
                <p className="work-desc">{item.desc}</p>
                <div className="work-stack">
                  {item.stack.map((tech) => (
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
