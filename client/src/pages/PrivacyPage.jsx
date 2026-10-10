import { Link } from "react-router-dom";

import "./PrivacyPage.css";

// IMPORTANT: this text describes what the site does today. Have it reviewed by a legal adviser before relying on it,
// and update it whenever you add analytics, cookies, new forms or third-party processors.
const UPDATED = "October 2026";

export default function PrivacyPage() {
  return (
    <main className="privacy-page" id="main">
      <Link to="/" className="privacy-back">← Back to home</Link>
      <h1>Privacy Policy</h1>
      <p className="privacy-updated">Last updated: {UPDATED}</p>

      <h2>Who we are</h2>
      <p>
        This website is operated by TNova Solutions Pvt Ltd, Tamil Nadu, India. You can reach us at{" "}
        <a href="mailto:info@tnovasolutions.com">info@tnovasolutions.com</a>.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Contact form:</strong> your name, email address, enquiry type and message.</li>
        <li>
          <strong>Job applications:</strong> your name, email address, selected role, optional phone number,
          optional profile link and the note you write.
        </li>
        <li>Our servers may keep standard technical logs (such as IP address) for security and abuse prevention.</li>
      </ul>
      <p>This website does not currently use advertising trackers or analytics cookies.</p>

      <h2>How we use it</h2>
      <p>
        We use enquiry details to reply to you and prepare quotations or training proposals, and application details
        to consider you for roles. We do not sell your personal information.
      </p>

      <h2>Where it is stored and who can see it</h2>
      <p>
        Submissions are stored in our database and may be emailed to the TNova team. They are accessible only to
        authorised TNova staff and to the infrastructure providers that host the website and database on our behalf.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us to access, correct or delete the personal information you sent us by emailing{" "}
        <a href="mailto:info@tnovasolutions.com">info@tnovasolutions.com</a>. We keep submissions only as long as they
        are needed for the purpose they were sent for.
      </p>

      <h2>Changes</h2>
      <p>We will update this page, and its date, if our practices change.</p>
    </main>
  );
}
