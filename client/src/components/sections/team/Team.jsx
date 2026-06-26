import { useEffect } from "react";

import axios from "axios";

import { API_BASE_URL } from "../../../config";
import { setTeamData } from "../../../redux/slice/TeamSlice";
import Reveal from "../../animation/reveal/Reveal";
import "./Team.css";

export default function Team({ globalState, dispatch }) {
  const { tag, title, desc, founders } = globalState?.team || {}

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/team`);
        dispatch(setTeamData(response?.data))
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };
    fetchTeamData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <section className="section section-tinted" id="team">
      <div className="section-inner">
        <Reveal>
          <p className="section-tag">{tag}</p>
          <h2 className="section-title">{title}</h2>
          <p className="section-desc">{desc}</p>
        </Reveal>
        <div className="team-grid">
          {founders?.map((founder, i) => (
            <Reveal key={founder.name} delay={i * 80}>
              <div className="team-card">
                <div className="team-avatar">
                  {founder.image ? (
                    <img src={founder.image} alt={founder.name} />
                  ) : (
                    founder.initials
                  )}
                </div>
                <h3 className="team-name">{founder.name}</h3>
                <p className="team-role">{founder.role}</p>
                <p className="team-bio">{founder.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
