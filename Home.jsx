import React from "react";
import Hero from "../components/Hero.jsx";
import AboutUs from "../components/AboutUs.jsx";
import Services from "../components/Services.jsx";
import HomeProductSection from "../components/HomeProductSection.jsx";
import HowItWorks from "../components/HowItWorks.jsx";  
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import SocialProofSection from "../components/SocialProofSection.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";

function Home() {
  return (
    <main className="pt-20 w-full">
      <Navbar /> 
      <ScrollToTop />

      {/* Hero stays visible immediately on load */}
      <section id="home">
        <Hero />
      </section>

      {/* Sections below reveal as you scroll */}
      <section id="social-proof">
          <SocialProofSection />
      </section>

      <section id="services">
          <Services />
      </section>

      <section id="products">
          <HomeProductSection />
      </section>

      <section id="how-it-works">
          <HowItWorks />
      </section>

      <section id="about">
          <AboutUs />
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
}

export default Home;