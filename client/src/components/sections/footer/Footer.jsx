import RibbonMark from "../../animation/ribbonMark/RibbonMark";
import "./Footer.css";

export default function Footer({ globalState }) {
  const { brandName, tagLine, footerItem, footerContact, footerBottom } = globalState?.footer || {}

  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div className="footer-brand">
            <RibbonMark size={32} />
            <span className="footer-brand-name">{brandName}</span>
          </div>
          <p className="footer-tagline">{tagLine}</p>
        </div>

        {footerItem?.map((item, index) => (
          <div key={index}>
            <p className="footer-col-title">{item?.title}</p>
            {item?.footerLink?.map((link) => (
              <a key={link?.link} className="footer-link" href={link?.href || "#"}>
                {link?.link}
              </a>
            ))}
          </div>
        ))}

        <div>
          <p className="footer-col-title">Get in touch</p>
          <a className="footer-link" href={`mailto:${footerContact?.email}`}>{footerContact?.email}</a>
          <a className="footer-link" href={`tel:${footerContact?.phoneHref}`}>{footerContact?.phone}</a>
          <span className="footer-link footer-link-static">{footerContact?.location}</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-bottom-text">{footerBottom?.copyRights}</span>
        <span className="footer-bottom-text">{footerBottom?.website}</span>
      </div>
    </footer>
  );
}
