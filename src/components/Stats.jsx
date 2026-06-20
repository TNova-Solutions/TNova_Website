import React from "react";
import "../TNovaSolutions.css";

export default function Stats() {
  return (
    <div className="tnova-stats-wrap">
      <div className="tnova-stats">
        {[
          ["5+", "Service areas"],
          ["2025", "Founded in Tamil Nadu"],
          ["AI", "First in every build"],
        ].map(([num, label]) => (
          <div key={label} className="tnova-stat-item">
            <div className="tnova-stat-num">{num}</div>
            <div className="tnova-stat-label">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
