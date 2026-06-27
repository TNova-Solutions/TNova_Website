import { useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";


import { API_BASE_URL } from '../../../config.js'
import { setCapabilitiesData } from "../../../redux/slice/capabilities/CapabilitiesSlice.js";
import Reveal from "../../animation/reveal/Reveal.jsx";
import "./Capabilities.css";

export default function Capabilities({ globalState, dispatch }) {
  const { tag, title, desc, services } = globalState?.capabilities || {}

  useEffect(() => {
    const fetchCapabilitiesData = async () => {
      try {
        // This will automatically use the correct URL for local vs production
        const response = await axios.get(`${API_BASE_URL}api/capabilities`);
        dispatch(setCapabilitiesData(response?.data));
      } catch (error) {
        console.error("Error fetching capabilities data:", error);
      }
    };
    fetchCapabilitiesData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
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
                  <div className="cap-actions">
                    <Link
                      to="/development"
                      className="btn-ghost cap-more"
                    >
                      See more
                    </Link>
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
