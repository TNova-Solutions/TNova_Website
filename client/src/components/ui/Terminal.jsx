import { useEffect, useState } from "react";

import { TERMINAL_LINES } from "../../constants/content";
import "./Terminal.css";

/**
 * Simulates a terminal deploying a TNova project, typing line by line
 * with a blinking cursor, then looping. Purely decorative (aria-hidden
 * via the wrapping hero section); content is duplicated in plain text
 * nowhere else, so no accessibility info is lost by hiding it.
 */
export default function Terminal() {
  const lines = TERMINAL_LINES;
  const [shown, setShown] = useState(() => Array(lines.length).fill(""));
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      const reset = setTimeout(() => {
        setShown(Array(lines.length).fill(""));
        setLineIndex(0);
        setCharIndex(0);
      }, 2400);
      return () => clearTimeout(reset);
    }

    const current = lines[lineIndex].text;
    if (charIndex <= current.length) {
      const t = setTimeout(() => {
        setShown((prev) => {
          const copy = [...prev];
          copy[lineIndex] = current.slice(0, charIndex);
          return copy;
        });
        setCharIndex((c) => c + 1);
      }, 26);
      return () => clearTimeout(t);
    }

    const next = setTimeout(() => {
      setLineIndex((l) => l + 1);
      setCharIndex(0);
    }, 280);
    return () => clearTimeout(next);
  }, [charIndex, lineIndex, lines]);

  return (
    <div className="tn-terminal" role="img" aria-label="Animated terminal showing a simulated TNova deployment">
      <div className="tn-terminal-bar">
        <span className="tn-dot tn-dot-blue" />
        <span className="tn-dot tn-dot-purple" />
        <span className="tn-dot tn-dot-muted" />
        <span className="tn-terminal-label">deploy.sh</span>
      </div>
      <div className="tn-terminal-body">
        {lines.map((line, i) => (
          <div key={line.text} className="tn-terminal-line" style={{ color: `var(${line.colorVar})` }}>
            {shown[i]}
            {i === lineIndex && <span className="tn-cursor">▌</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
