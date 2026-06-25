import Reveal from "../../ui/Reveal";
import { FOUNDERS } from "../../../constants/theme";
import { useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config";

export default function Team() {

   useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // This will automatically use the correct URL for local vs production
        const response = await axios.get(`${API_BASE_URL}api/team`);
        console.log(response)
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };
    fetchTeamData();
  }, []);


  return (
    <section className="section section-tinted" id="team">
      <div className="section-inner">
        <Reveal>
          <p className="section-tag">Leadership</p>
          <h2 className="section-title">Founded by two people who ship.</h2>
          <p className="section-desc">
            TNova is run by its founders, end to end — from the first client call to the
            final commit.
          </p>
        </Reveal>

        <div className="team-grid">
          {FOUNDERS.map((founder, i) => (
            <Reveal key={founder.name} delay={i * 80}>
              <div className="team-card">
                <div className="team-avatar" aria-hidden="true">
                  {founder.initials}
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
