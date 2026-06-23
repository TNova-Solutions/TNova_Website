import { useEffect } from 'react'
import "./styles/global.css";
import Nav from "./components/sections/Nav";
import Hero from "./components/sections/Hero";
import Marquee from "./components/sections/Marquee";
import Capabilities from "./components/sections/Capabilities";
import Work from "./components/sections/Work";
import Process from "./components/sections/Process";
import Team from "./components/sections/Team";
import CtaBand from "./components/sections/CtaBand";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";

/**
 * TNova Solutions — marketing site.
 *
 * Layout is a single scrolling page; each section is its own component
 * under components/sections/. Shared, reusable pieces (logo mark, reveal
 * animation, counter, terminal) live under components/ui/. Brand colours
 * and copy live under constants/ — edit those files to update content
 * without touching component logic.
 */
export default function App() {
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    fetch(`${baseUrl}/api/message`)
      .then(response => response.json())
      .then(data => console.log(data.message))
      .catch(error => console.error('Error fetching message:', error));
  }, []);
  return (
    <div className="tnova-root">
      <Nav />
      <Hero />
      <Marquee />
      <Capabilities />
      <Work />
      <Process />
      <Team />
      <CtaBand />
      <Contact />
      <Footer />
    </div>
  );
}
