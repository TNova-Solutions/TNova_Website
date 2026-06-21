import React from "react";
import "./style.css";
import Nav from "./components/Nav";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection/HeroSection";
import Marquee from "./components/Marquee";
import CapabilitiesSection from "./components/CapabilitiesSection";
import WorkSection from "./components/WorkSection";
import ProcessSection from "./components/ProcessSection";
import TeamSection from "./components/TeamSection";
import CTABand from "./components/CTABand";

export default function TNovaWebsite() {
  return (
    <div className="tnova-root">
      <Nav />
      <HeroSection />
      <Marquee />
      <CapabilitiesSection />
      <WorkSection />
      <ProcessSection />
      <TeamSection />
      <CTABand />
      <ContactSection />
      <Footer />
    </div>
  );
}
