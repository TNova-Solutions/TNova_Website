import React, { useState, useEffect } from 'react';
import './HeroSection.css';

// Custom component for the scrambling text effect on the numbers
const ScrambleText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const characters = '0123456789!<>-_\\/[]{}—=+*^?#_';

  useEffect(() => {
    let interval;
    let timeout;
    
    timeout = setTimeout(() => {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText((prev) => 
          text
            .split('')
            .map((char, index) => {
              if (index < iteration) return text[index];
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 4; 
      }, 40);
    }, delay);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return <span>{displayText || '\u00A0'}</span>; 
};

const HeroSection = () => {
  const stats = [
    { value: '2026', label: 'Founded', colorClass: 'text-white' },
    { value: '5+', label: 'Service lines', colorClass: 'text-purple' },
    { value: '100%', label: 'In-house delivery', colorClass: 'text-purple' },
    { value: '24/7', label: 'Project visibility', colorClass: 'text-purple' },
  ];

  return (
    <section className="hero-container">
      
      {/* T-Shaped Isometric Wireframe Background */}
      <div className="hero-bg-graphic">
        <svg viewBox="0 0 800 900" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Deep purple radial glow matching the image */}
            <radialGradient id="t-glow" cx="60%" cy="30%" r="60%">
              <stop offset="0%" stopColor="rgba(70, 30, 200, 0.25)" />
              <stop offset="100%" stopColor="rgba(13, 14, 21, 0)" />
            </radialGradient>
          </defs>
          
          <circle cx="500" cy="300" r="500" fill="url(#t-glow)" />

          {/* Glowing purple dot on the far left */}
          <circle cx="40" cy="480" r="8" fill="#a824ee" />
          
          <g strokeLinejoin="round">
            {/* Large Back T-Shape */}
            <path 
              d="M 120 220 L 400 100 L 750 220 L 500 320 L 500 800 L 300 700 L 300 300 Z" 
              stroke="#4a24d8" 
              strokeWidth="2" 
              opacity="0.8" 
            />
            
            {/* Smaller Front T-Shape */}
            <path 
              d="M 150 420 L 340 340 L 530 410 L 400 460 L 400 850 L 270 780 L 270 390 Z" 
              stroke="#3d1c9c" 
              strokeWidth="1.5" 
              opacity="0.6" 
            />
          </g>
        </svg>
      </div>

      <div className="hero-content-wrapper">
        <div className="hero-main">
          {/* Main heading animates first */}
          <h1 className="animate-item delay-1">
            Software that ships,<br />
            AI that <span className="highlight">actually works.</span>
          </h1>
          
          {/* Paragraph animates second */}
          <p className="animate-item delay-2">
            TNova Solutions designs and builds mobile apps, backend systems, and machine learning products for teams who need a technical partner that owns delivery end-to-end — not just code.
          </p>
          
          {/* Buttons animate third */}
          <div className="button-group animate-item delay-3">
            <button className="btn primary">Get a quote &rarr;</button>
            <button className="btn secondary">See our work</button>
          </div>
        </div>

        {/* Stats Section Animates Fourth */}
        <div className="hero-stats animate-item delay-4">
          {stats.map((stat, index) => (
            <div key={index} className="stat-block">
              <h2 className={`stat-value ${stat.colorClass}`}>
                <ScrambleText text={stat.value} delay={1500 + (index * 200)} />
              </h2>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;