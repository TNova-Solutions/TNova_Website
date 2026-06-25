import CircuitBackground from "../../ui/CircuitBackground";
import Terminal from "../../ui/Terminal";
import AnimatedCounter from "../../ui/AnimatedCounter";
import { useEffect } from "react";
import { API_BASE_URL } from '../../../config.js';
import { setHeroData } from "../../../redux/slice/HeroSlice.js";
import axios from 'axios';

export default function Hero({ globalState, dispatch }) {
  const { content, stats } = globalState?.hero || {}

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        // This will automatically use the correct URL for local vs production
        const response = await axios.get(`${API_BASE_URL}/api/hero`);
        dispatch(setHeroData(response?.data));
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };

    fetchHeroData();
  }, []);
  return (
    <header className="hero" id="top">
      <CircuitBackground />
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-cols">
        {content?.map((item, i) => (
          <div key={i}>
            <h1 className="hero-title animate-item delay-1">
              {item?.head?.title}<span className="accent">{item?.head?.accent}</span>
            </h1>

            <p className="hero-sub animate-item delay-3">
              {item?.subHead?.desc}
            </p>

            <div className="hero-actions animate-item delay-4">
              <a href="#contact" className="btn-primary">
                Get a quote →
              </a>
              <a href="#work" className="btn-ghost">
                See our work
              </a>
            </div>

            <div className="hero-stats">
              {stats?.map((stat) => (
                <div key={stat?.label}>
                  <div className="hero-stat-num">
                    {stat?.isYear ? (
                      <AnimatedCounter value={stat?.value} duration={stat?.duration} />
                    ) : (
                      <span>
                        <AnimatedCounter value={stat?.value} suffix={stat?.suffix} duration={stat?.duration} />
                      </span>
                    )}
                  </div>
                  <div className="hero-stat-label">{stat?.label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <Terminal />
      </div>
    </header>
  );
}
