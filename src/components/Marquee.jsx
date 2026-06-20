import React from "react";
import { MARQUEE_ITEMS } from "../data";

export default function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee">
        {[...Array(2)].map((_, repeatIndex) => (
          <React.Fragment key={repeatIndex}>
            {MARQUEE_ITEMS.map((item) => (
              <span className="marquee-item" key={`${item.label}-${repeatIndex}`}>
                <b>{item.label}</b> · {item.text}
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
