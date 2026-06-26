import { useEffect, useState } from "react";

import { useInView } from "../../../hooks/useInView";

/**
 * Counts up from 0 to `value` with an ease-out curve, starting the moment
 * the element scrolls into view. Triggers once per page load.
 *
 * Example: <AnimatedCounter value={100} suffix="%" />  →  0% → 100%
 */
export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1400,
  decimals = 0,
}) {
  const [ref, inView] = useInView(0.6);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const factor = Math.pow(10, decimals);

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(eased * value * factor) / factor);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
