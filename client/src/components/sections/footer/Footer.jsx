import { useEffect } from "react";

import axios from "axios";

import { API_BASE_URL } from "../../../config";
import { setFooterData } from "../../../redux/slice/FooterSlice";
import RibbonMark from "../../animation/ribbonMark/RibbonMark";
import "./Footer.css";

export default function Footer({ globalState, dispatch }) {
  const { brandName, tagLine, footerItem, footerContact, footerBottom } = globalState?.footer || {}


  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        // This will automatically use the correct URL for local vs production
        const response = await axios.get(`${API_BASE_URL}api/footer`);
        dispatch(setFooterData(response?.data))
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    fetchFooterData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
              <a key={link?.link} className="footer-link" href={link?.link}>
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
