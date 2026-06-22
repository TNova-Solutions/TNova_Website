import Reveal from "../ui/Reveal";
import { CONTACT } from "../../constants/theme";

export default function CtaBand() {
  return (
    <div className="cta-band-wrap">
      <Reveal>
        <div className="cta-band">
          <div className="cta-band-glow" aria-hidden="true" />
          <h2 className="cta-title">Have a build in mind?</h2>
          <p className="cta-sub">
            Tell us what you're building — we'll send back a scoped quotation within 48
            hours.
          </p>
          <div className="cta-actions">
            <a href="#contact" className="btn-primary">
              Start a project →
            </a>
            <a href={`mailto:${CONTACT.email}`} className="btn-ghost">
              Email us directly
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
