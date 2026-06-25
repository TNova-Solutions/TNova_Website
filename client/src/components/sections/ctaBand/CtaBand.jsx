import Reveal from "../../ui/Reveal";
import { CONTACT } from "../../../constants/theme";
import { useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { setCtaBand } from "../../../redux/slice/ctaBandSlice";

export default function CtaBand({ globalState, dispatch }) {

  useEffect(() => {
    const fetchBandData = async () => {
      try {
        // This will automatically use the correct URL for local vs production
        const response = await axios.get(`${API_BASE_URL}/api/band`);
        dispatch(setCtaBand(response?.data))
        console.log(response)
      } catch (error) {
        console.error("Error fetching band data:", error);
      }
    };
    fetchBandData();
  }, []);

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
