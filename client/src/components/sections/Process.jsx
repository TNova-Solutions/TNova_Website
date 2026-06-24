import Reveal from "../ui/Reveal";
import { PROCESS_STEPS } from "../../constants/content";
import { useEffect } from "react";
import { API_BASE_URL } from "../../config";
impo
rt { setProcessData } from "../../redux/slice/ProcessSlice";

export default function Process({ globalState, dispatch }) {
  useEffect(() => {
    const fetchProcessData = async () => {
      try {
        // This will automatically use the correct URL for local vs production
        const response = await fetch(`${API_BASE_URL}/api/process`);
        const data = await response.json();
        dispatch(setProcessData(data));
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };
    fetchProcessData()
  }, []);
  return (
    <section className="section" id="process">
      <div className="section-inner">
        <Reveal>
          <p className="section-tag">How we work</p>
          <h2 className="section-title">A process built around milestones you can see.</h2>
          <p className="section-desc">
            Every engagement follows the same four stages — scoped, priced, and signed
            off before the next one starts.
          </p>
        </Reveal>

        <div className="process-list">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 60}>
              <div className="process-row">
                <div className="process-num">{step.n}</div>
                <div>
                  <h3 className="process-title">{step.title}</h3>
                </div>
                <div>
                  <p className="process-desc">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
