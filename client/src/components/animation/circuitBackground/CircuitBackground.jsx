import { CIRCUIT_PULSES } from "../../../constants/content";
import "./CircuitBackground.css";

/**
 * Faint grid + travelling light pulses behind the hero text.
 * Purely decorative — aria-hidden, contributes no information.
 */
export default function CircuitBackground() {
  return (
    <div className="tn-circuit-wrap" aria-hidden="true">
      <svg className="tn-circuit-grid">
        <defs>
          <pattern id="tnova-grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(143,156,179,0.14)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tnova-grid)" />
      </svg>

      {CIRCUIT_PULSES.map((p, i) => {
        const color = `var(${p.colorVar})`;
        const style = {
          animationDelay: p.delay,
          animationDuration: p.duration,
          background: color,
          boxShadow: `0 0 8px 2px ${color}`,
        };
        return p.type === "h" ? (
          <span key={i} className="tn-pulse-h" style={{ ...style, top: p.pos }} />
        ) : (
          <span key={i} className="tn-pulse-v" style={{ ...style, left: p.pos }} />
        );
      })}
    </div>
  );
}
