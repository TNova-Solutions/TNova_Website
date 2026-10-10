import Reveal from "../../animation/reveal/Reveal";
import "./CtaBand.css";


export default function CtaBand({ globalState }) {
  const { ctaBand, contact } = globalState || {}


  return (
    <div className="cta-band-wrap">
      <Reveal>
        <div className="cta-band">
          <div className="cta-band-glow" aria-hidden="true" />
          <h2 className="cta-title">{ctaBand?.title}</h2>
          <p className="cta-sub">
            {ctaBand?.desc}
          </p>
          <div className="cta-actions">
            <a href="#contact" className="btn-primary">
              Start a project →
            </a>
            <a href={`mailto:${contact?.contact?.email}`} className="btn-ghost">
              Email us directly
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
