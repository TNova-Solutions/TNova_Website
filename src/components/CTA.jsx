import React from "react";
import "../TNovaSolutions.css";

export default function CTA() {
  return (
    <div className="tnova-cta-wrap" id="contact">
      <div className="tnova-cta">
        <h2 className="tnova-cta-heading">Ready to build something?</h2>
        <p className="tnova-cta-copy">Tell us your idea — we'll turn it into a working product.</p>
        <div className="tnova-cta-btns">
          <a href="mailto:info@tnovasolutions.com" className="tnova-btn-white">
            info@tnovasolutions.com
          </a>
          <a href="tel:+919944880268" className="tnova-btn-outline-white">
            +91 9944880268
          </a>
        </div>
      </div>
    </div>
  );
}
