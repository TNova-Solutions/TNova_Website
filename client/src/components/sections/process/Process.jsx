import Reveal from "../../animation/reveal/Reveal";
import "./Process.css";

export default function Process({ globalState }) {
  const { tag, title, desc, processSteps } = globalState?.process || {}
  return (
    <section className="section" id="process">
      <div className="section-inner">
        <Reveal>
          <p className="section-tag">{tag}</p>
          <h2 className="section-title">{title}</h2>
          <p className="section-desc">{desc}</p>
        </Reveal>

        <div className="process-list">
          {processSteps?.map((step, i) => (
            <Reveal key={step?.n} delay={i * 60}>
              <div className="process-row">
                <div className="process-num">{step?.n}</div>
                <div>
                  <h3 className="process-title">{step?.title}</h3>
                </div>
                <div>
                  <p className="process-desc">{step?.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
