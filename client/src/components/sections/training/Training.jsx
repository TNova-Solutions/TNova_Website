import { setInterest } from "../../../redux/slice/enquiry/EnquirySlice";
import Reveal from "../../animation/reveal/Reveal";
import "./Training.css";

export default function Training({ globalState, dispatch }) {
  const { tag, title, desc, tracks, trainerService, bootcampCta } = globalState?.training || {};

  const chooseInterest = (interest) => dispatch?.(setInterest(interest));

  return (
    <section className="section section-tinted" id="training">
      <div className="section-inner">
        <Reveal>
          <p className="section-tag">{tag}</p>
          <h2 className="section-title">{title}</h2>
          <p className="section-desc">{desc}</p>
        </Reveal>

        <div className="training-grid">
          {tracks?.map((track, i) => (
            <Reveal key={track.title} delay={i * 80}>
              <div className="training-card">
                <h3 className="training-card-title">{track.title}</h3>
                <p className="training-card-desc">{track.desc}</p>
                <div className="training-tags">
                  {track.tags?.map((t) => (
                    <span className="training-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {bootcampCta && (
          <Reveal>
            <a
              href="#contact"
              className="btn-primary training-bootcamp-cta"
              onClick={() => chooseInterest(bootcampCta.interest)}
            >
              {bootcampCta.label} →
            </a>
          </Reveal>
        )}

        {trainerService && (
          <Reveal>
            <div className="trainer-panel">
              <div>
                <h3 className="trainer-title">{trainerService.title}</h3>
                <p className="trainer-desc">{trainerService.desc}</p>
                <a
                  href="#contact"
                  className="btn-primary"
                  onClick={() => chooseInterest(trainerService.cta?.interest)}
                >
                  {trainerService.cta?.label} →
                </a>
              </div>
              <ul className="trainer-points">
                {trainerService.points?.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
