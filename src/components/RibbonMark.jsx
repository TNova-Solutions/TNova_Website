import React from "react";

export default function RibbonMark({ size = 56, animated = false }) {
  return (
    <img
      src="/logo.png"
      alt="TNova Solutions"
      width={size}
      height={size}
      className={animated ? "ribbon-path" : ""}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        display: "block",
      }}
    />
  );
}
