import { useEffect } from "react";

import axios from "axios";

import { API_BASE_URL } from "../../../config";
import { setProcessData } from "../../../redux/slice/ProcessSlice";
import Reveal from "../../ui/Reveal";
import "./Process.css";

export default function Process({ globalState, dispatch }) {
  const { tag, title, desc, processSteps } = globalState?.process || {}
  useEffect(() => {
    const fetchProcessData = async () => {
      try {
        // This will automatically use the correct URL for local vs production
        const response = await axios.get(`${API_BASE_URL}api/process`);
        dispatch(setProcessData(response?.data));
      } catch (error) {
        console.error("Error fetching process data:", error);
      }
    };
    fetchProcessData()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <section className="section" id="process">
      <div className="section-inner">
        <Reveal>
          <p className="section-tag">{tag}</p>
          <h2 className="section-title">{title}</h2>
          <p className="section-desc">{desc}</p>
        </Reveal>

        <div className="process-list">
          {processSteps?.map((step, i) => (
            <Reveal key={step?.n} delay={i * 60}>
              <div className="process-row">
                <div className="process-num">{step?.n}</div>
                <div>
                  <h3 className="process-title">{step?.title}</h3>
                </div>
                <div>
                  <p className="process-desc">{step?.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
