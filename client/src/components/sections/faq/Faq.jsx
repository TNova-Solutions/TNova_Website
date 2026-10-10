import Reveal from "../../animation/reveal/Reveal";
import "./Faq.css";

export default function Faq({ globalState }) {
  const { tag, title, desc, items } = globalState?.faq || {};

  return (
    <section className="section section-tinted" id="faq">
      <div className="section-inner">
        <Reveal>
          <p className="section-tag">{tag}</p>
          <h2 className="section-title">{title}</h2>
          <p className="section-desc">{desc}</p>
        </Reveal>

        <div className="faq-list">
          {items?.map((item) => (
            <details className="faq-item" key={item.q}>
              <summary className="faq-q">{item.q}</summary>
              <p className="faq-a">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
