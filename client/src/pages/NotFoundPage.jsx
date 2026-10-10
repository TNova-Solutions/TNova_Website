import { Link } from "react-router-dom";

import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <main className="development-container">
      <div className="development-content">
        <h1 className="development-title">404 — page not found</h1>
        <p className="development-description">
          The page you are looking for doesn&apos;t exist or has moved.
        </p>
        <Link to="/" className="development-button">
          Back to home
        </Link>
      </div>
    </main>
  );
}
