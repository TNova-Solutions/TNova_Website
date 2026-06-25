import { useInView } from "../../hooks/useInView";
import "./Reveal.css";

/**
 * Wraps children in a fade-up reveal that triggers once when scrolled
 * into view. Respects prefers-reduced-motion via CSS (see global.css).
 */
export default function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView(0.15);

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "reveal-shown" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
