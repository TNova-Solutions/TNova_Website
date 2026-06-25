import { Link } from 'react-router-dom';
import './DevelopmentPage.css';

export default function DevelopmentPage() {
  return (
    <div className="development-container">
      <div className="development-content">
        <div className="development-icon">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="60" cy="60" r="58" stroke="#562BF2" strokeWidth="4" />
            <path
              d="M45 60L55 70L75 50"
              stroke="#562BF2"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="85" cy="25" r="6" fill="#10B981" />
            <text
              x="60"
              y="95"
              textAnchor="middle"
              fontSize="14"
              fill="#562BF2"
              fontWeight="600"
            >
              Coming Soon
            </text>
          </svg>
        </div>

        <h1 className="development-title">This page is under development</h1>
        <p className="development-description">
          We&apos;re currently building something amazing. Check back soon for updates!
        </p>

        <Link to="/" className="development-button">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
