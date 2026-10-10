import { setInterest } from "../../../redux/slice/enquiry/EnquirySlice";
import Reveal from "../../animation/reveal/Reveal";
import RibbonMark from "../../animation/ribbonMark/RibbonMark";
import "../work/Work.css";
import "./Products.css";

export default function Products({ globalState, dispatch }) {
  const { tag, title, desc, items } = globalState?.products || {};

  return (
    <section className="section work-section" id="products">
      <div className="section-inner">
        <Reveal>
          <p className="section-tag">{tag}</p>
          <h2 className="section-title">{title}</h2>
          <p className="section-desc">{desc}</p>
        </Reveal>

        <div className="work-grid">
          {items?.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="work-card">
                <div className="work-card-top">
                  <RibbonMark size={36} />
                  <span className={`work-status status-${item.statusType}`}>{item.status}</span>
                </div>
                <h3 className="work-title">{item.title}</h3>
                <p className="work-desc">{item.desc}</p>
                <div className="work-stack">
                  {item.highlights?.map((h) => (
                    <span className="work-stack-pill" key={h}>{h}</span>
                  ))}
                </div>
                <div className="product-actions">
                  {item.liveUrl ? (
                    <a href={item.liveUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">
                      Open app →
                    </a>
                  ) : (
                    <a
                      href="#contact"
                      className="btn-ghost"
                      onClick={() => dispatch?.(setInterest(item.interest))}
                    >
                      Request early access
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
