/**
 * Renders the real TNova ribbon-T logo artwork.
 * Always references the actual brand asset rather than an approximated
 * SVG redraw, since the ribbon fold is too complex to trace accurately.
 */
export default function RibbonMark({ size = 56, className = "" }) {
  return (
    <img
      src="/assets/logo.png"
      alt="TNova Solutions"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, objectFit: "contain", display: "block" }}
    />
  );
}
