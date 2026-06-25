import { useEffect } from "react";

import axios from "axios";

import { API_BASE_URL } from "../../../config";
import { CONTACT } from "../../../constants/theme";
import { setCtaBandData } from "../../../redux/slice/CtaBandSlice";
import Reveal from "../../ui/Reveal";
import "./CtaBand.css";


export default function CtaBand({ dispatch }) {

  useEffect(() => {
    const fetchBandData = async () => {
      try {
        // This will automatically use the correct URL for local vs production
        const response = await axios.get(`${API_BASE_URL}api/band`);
        dispatch(setCtaBandData(response?.data))
       
      } catch (error) {
        console.error("Error fetching band data:", error);
      }
    };
    fetchBandData();
  }, [dispatch]);

  return (
    <div className="cta-band-wrap">
      <Reveal>
        <div className="cta-band">
          <div className="cta-band-glow" aria-hidden="true" />
          <h2 className="cta-title">Have a build in mind?</h2>
          <p className="cta-sub">
            Tell us what you&apos;re building — we&apos;ll send back a scoped quotation within 48
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
