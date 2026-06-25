import { useEffect } from "react";

import axios from "axios";

import { API_BASE_URL } from "../../../config";
import { setCtaBandData } from "../../../redux/slice/CtaBandSlice";
import Reveal from "../../ui/Reveal";
import "./CtaBand.css";


export default function CtaBand({ globalState, dispatch }) {
  const { ctaBand, contact } = globalState || {}

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
          <h2 className="cta-title">{ctaBand?.title}</h2>
          <p className="cta-sub">
            {ctaBand?.desc}
          </p>
          <div className="cta-actions">
            <a href="#contact" className="btn-primary">
              Start a project →
            </a>
            <a href={`mailto:${contact?.contact?.email}`} className="btn-ghost">
              Email us directly
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
