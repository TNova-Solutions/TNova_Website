import React from "react";
import RibbonMark from "./RibbonMark";
import { FOOTER_DATA } from "../data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <RibbonMark size={32} />
            <span className="footer-brand-name">{FOOTER_DATA.brand.name}</span>
          </div>
          <div className="footer-tagline">{FOOTER_DATA.brand.tagline}</div>
        </div>
        <div>
          <div className="footer-col-title">Services</div>
          {FOOTER_DATA.services.map((item) => (
            <a key={item.href} className="footer-link" href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <div>
          <div className="footer-col-title">Company</div>
          {FOOTER_DATA.company.map((item) => (
            <a key={item.href} className="footer-link" href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <div>
          <div className="footer-col-title">Get in touch</div>
          {FOOTER_DATA.contact.map((item) => (
            item.href ? (
              <a key={item.href} className="footer-link" href={item.href}>
                {item.label}
              </a>
            ) : (
              <span key={item.label} className="footer-link" style={{ cursor: "default" }}>
                {item.label}
              </span>
            )
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-bottom-text">{FOOTER_DATA.copyright}</span>
        <span className="footer-bottom-text">{FOOTER_DATA.website}</span>
      </div>
    </footer>
  );
}
