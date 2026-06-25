import Reveal from "../../ui/Reveal";
import RibbonMark from "../../ui/RibbonMark";
import { WORK_ITEMS } from "../../../constants/content";
import { setWorkData } from "../../../redux/slice/WorkSlice";
import { useEffect } from "react";
import { API_BASE_URL } from "../../../config";
import axios from "axios";

export default function Work({ globalState, dispatch }) {
  const { tag, title, desc, workItems } = globalState?.work || {}
  useEffect(() => {
    const fetchWorkData = async () => {
      try {
        // This will automatically use the correct URL for local vs production
        const response = await axios.get(`${API_BASE_URL}api/work`);

        dispatch(setWorkData(response?.data));
      } catch (error) {
        console.error("Error fetching work data:", error);
      }
    };
    fetchWorkData()
  }, []);
  return (
    <section className="section work-section" id="work">
      <div className="section-inner">
        <Reveal>
          <p className="section-tag">{tag}</p>
          <h2 className="section-title">{title}</h2>
          <p className="section-desc">{desc}</p>
        </Reveal>

        <div className="work-grid">
          {workItems?.map((item, i) => (
            <Reveal key={item?.title} delay={i * 80}>
              <div className="work-card">
                <div className="work-card-top">
                  <RibbonMark size={36} />
                  <span className={`work-status status-${item?.statusType}`}>{item.status}</span>
                </div>
                <h3 className="work-title">{item?.title}</h3>
                <p className="work-desc">{item?.desc}</p>
                <div className="work-stack">
                  {item?.stack.map((tech) => (
                    <span className="work-stack-pill" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
