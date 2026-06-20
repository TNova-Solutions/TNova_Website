import React from "react";
import Reveal from "./Reveal";
import { CTA_BAND } from "../data";

export default function CTABand() {
  return (
    <div style={{ padding: "0 0 0" }}>
      <Reveal>
        <div className="cta-band">
          <div className="cta-band-glow" />
          <h2 className="cta-title">{CTA_BAND.title}</h2>
          <p className="cta-sub">{CTA_BAND.subtitle}</p>
          <div className="cta-actions">
            <a href={CTA_BAND.primary.href} className="btn-primary">
              {CTA_BAND.primary.text}
            </a>
            <a href={CTA_BAND.secondary.href} className="btn-ghost">
              {CTA_BAND.secondary.text}
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
