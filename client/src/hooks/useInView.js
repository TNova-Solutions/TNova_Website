import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the referenced element scrolls into the viewport.
 * Used to drive both the Reveal fade-in and the AnimatedCounter count-up.
 *
 * @param {number} threshold - fraction of the element that must be visible (0-1)
 * @returns {[React.RefObject, boolean]} ref to attach + whether it's in view
 */
export function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
