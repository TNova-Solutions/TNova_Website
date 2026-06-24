import Reveal from "../ui/Reveal";
import { useEffect } from "react";
import { API_BASE_URL } from '../../config.js'
import { setCapabilitiesData } from "../../redux/slice/Capabilities.js";

export default function Capabilities({ globalState, dispatch }) {
  const { tag, title, desc, services } = globalState?.capabilities || {}

  useEffect(() => {
    const fetchCapabilitiesData = async () => {
      try {
        // This will automatically use the correct URL for local vs production
        const response = await fetch(`${API_BASE_URL}/api/capabilities`);
        const data = await response.json();
        dispatch(setCapabilitiesData(data))
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };
    fetchCapabilitiesData()
  }, []);
  return (
    <section className="section" id="capabilities">
      <div className="section-inner">
        <Reveal>
          <p className="section-tag">{tag}</p>
          <h2 className="section-title">{title}</h2>
          <p className="section-desc">{desc}</p>
        </Reveal>

        <div className="cap-grid">
          {services?.map((cap, i) => (
            <Reveal key={cap?.title} delay={i * 60}>
              <div className="cap-card">
                <div className="cap-image">
                  <img
                    width="100%"
                    height="200px"
                    src={cap?.image}
                    alt={cap?.title}
                  />
                </div>
                <div className="cap-content">
                  <h3 className="cap-title">{cap?.title}</h3>
                  <p className="cap-desc">{cap?.desc}</p>
                  <div className="cap-tags">
                    {cap?.tags?.map((tag) => (
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
