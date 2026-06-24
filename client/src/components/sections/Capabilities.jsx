import Reveal from "../ui/Reveal";
import { CAPABILITIES } from "../../constants/content";
import { useEffect } from "react";
import { API_BASE_URL } from '../../config.js'

export default function Capabilities() {
const fetchCapabilitiesData = async () => {
    try {
      // This will automatically use the correct URL for local vs production
      const response = await fetch(`${API_BASE_URL}/api/capabilities`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching hero data:", error);
    }
  };
  useEffect(() => {
    fetchCapabilitiesData()
  }, []);
  return (
    <section className="section" id="capabilities">
      <div className="section-inner">
        <Reveal>
          <p className="section-tag">What we do</p>
          <h2 className="section-title">Five service lines, one team that ships the whole stack.</h2>
          <p className="section-desc">
            We don't hand off between specialists — the same team that trains your model
            builds the app it runs on, and the API that connects them.
          </p>
        </Reveal>

        <div className="cap-grid">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 60}>
              <div className="cap-card">
                <div className="cap-image">
                  <img
                    width="100%"
                    height="200px"
                    src={cap.image}
                    alt={cap.title}
                  />
                </div>
                <div className="cap-content">
                  <h3 className="cap-title">{cap.title}</h3>
                  <p className="cap-desc">{cap.desc}</p>
                  <div className="cap-tags">
                    {cap.tags.map((tag) => (
                      <span className="cap-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
