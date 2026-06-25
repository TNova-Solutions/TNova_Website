import RibbonMark from "../../ui/RibbonMark";
import { CONTACT } from "../../../constants/theme";
import { useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config";

export default function Footer() {
  const year = new Date().getFullYear();

 useEffect(() => {
    const fetchFooterData = async () => {
      try {
        // This will automatically use the correct URL for local vs production
        const response = await axios.get(`${API_BASE_URL}/api/footer`);
        console.log(response)
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    fetchFooterData();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div className="footer-brand">
            <RibbonMark size={32} />
            <span className="footer-brand-name">TNova Solutions</span>
          </div>
          <p className="footer-tagline">Innovate · Integrate · Elevate</p>
        </div>

        <div>
          <p className="footer-col-title">Services</p>
          <a className="footer-link" href="#capabilities">AI &amp; Machine Learning</a>
          <a className="footer-link" href="#capabilities">Mobile Apps</a>
          <a className="footer-link" href="#capabilities">Backend &amp; APIs</a>
          <a className="footer-link" href="#capabilities">Web Development</a>
        </div>

        <div>
          <p className="footer-col-title">Company</p>
          <a className="footer-link" href="#work">Our Work</a>
          <a className="footer-link" href="#process">Process</a>
          <a className="footer-link" href="#team">Team</a>
          <a className="footer-link" href="#contact">Contact</a>
        </div>

        <div>
          <p className="footer-col-title">Get in touch</p>
          <a className="footer-link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <a className="footer-link" href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a>
          <span className="footer-link footer-link-static">{CONTACT.location}</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-bottom-text">© {year} TNova Solutions Pvt Ltd. All rights reserved.</span>
        <span className="footer-bottom-text">{CONTACT.website}</span>
      </div>
    </footer>
  );
}
