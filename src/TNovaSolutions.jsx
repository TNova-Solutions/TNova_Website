import "./TNovaSolutions.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Services from "./components/Services";
import About from "./components/About";
import Team from "./components/Team";
import TechStack from "./components/TechStack";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function TNovaSolutions() {
  return (
    <div className="tnova-root">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <About />
      <Team />
      <TechStack />
      <CTA />
      <Footer />
    </div>
  );
}
