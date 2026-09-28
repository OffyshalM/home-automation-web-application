import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  MessageSquare, 
  PhoneCall, 
  Grid, 
  Building2, 
  Home as HomeIcon, 
  Award, 
  CheckCircle2, 
  Radio, 
  Lock 
} from 'lucide-react';

// ASSET IMPORTS
import smartHomeImg from '../assets/images/smart-home.png';
import cctvImg from '../assets/images/cctv-installations.jpeg';
import smartDevicesImg from '../assets/images/smart-devices.jpeg';
import techniciansImg from '../assets/images/technicians.jpg';
import homeWithSmartDevicesImg from '../assets/images/home-with-smart-devices.jpg';
import teamPhotoImg from '../assets/images/team-photo-2.jpg';
import smartControl from '../assets/images/smart-control.jpeg';
import engineerImg from '../assets/images/engineer.jpeg';

const slides = [
  {
    image: smartHomeImg,
    tagline: "West Africa's Premier Smart Home Engineers",
    title: "Transform Your Space into an Intelligent Sanctuary",
    subtitle: "Futurica designs, installs, and integrates world-class home automation, Hikvision AI surveillance, Moorgen access control, and high-speed satellite connectivity.",
  },
  {
    image: homeWithSmartDevicesImg,
    tagline: "Complete All-In-One Bundles",
    title: "Complete Smart Home Hardware Kits & Automation Packs",
    subtitle: "Explore our fully stocked range of smart locks, Hikvision AI cameras, Starlink dishes, and motorized control units ready for instant deployment.",
  },
  {
    image: cctvImg,
    tagline: "Enterprise CCTV & AI Security",
    title: "High-Definition AI Video Surveillance",
    subtitle: "Protect high-value residential complexes and corporate facilities with 24/7 AI-driven threat detection and real-time alerts.",
  },
  {
    image: smartControl,
    tagline: "Professional System Integration",
    title: "Precision Smart Control Installation",
    subtitle: "Expert setup and real-time testing of intuitive touch control panels for multi-room audio, lighting, and security.",
  },
  {
    image: smartDevicesImg,
    tagline: "Unified Smart Infrastructure",
    title: "Seamless Control Across Every Device",
    subtitle: "Unify motorized shades, multi-room sound, intelligent locks, and architectural lighting into single-touch control panels.",
  },
  {
    image: engineerImg,
    tagline: "Certified Field Technical Team",
    title: "Expert Engineering & Flawless Execution",
    subtitle: "Our certified engineers deliver clean, conduit-concealed wiring, zero-latency network integration, and lifetime support.",
  },
  {
    image: teamPhotoImg,
    tagline: "Certified Field Technical Team",
    title: "Expert Systems Engineering & On-Site Execution",
    subtitle: "Our certified installation engineers deliver precision cabling, zero-latency network infrastructure, and lifetime maintenance support.",
  },
];

// COUNTER COMPONENT
function CounterNumber({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 15,
  });

  const displayValue = useTransform(springValue, (current) => 
    Math.floor(current)
  );

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const scrollToServices = (e) => {
    e.preventDefault();
    const serviceSection = document.getElementById("services");
    if (serviceSection) {
      serviceSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="relative w-full bg-[#0A0A0A] text-white font-sans overflow-hidden select-none">
      
      {/* 1. HERO SLIDER SECTION */}
      <div 
        className="relative w-full h-screen min-h-[650px] sm:min-h-[750px] overflow-hidden pt-16 sm:pt-20"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* BACKGROUND IMAGE WITH FALLBACK */}
              <img
                src={slide.image}
                alt={slide.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1600&q=80";
                }}
                className={`absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-[10000ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              />

              {/* OVERLAYS */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent z-10" />
              <div className="absolute inset-0 bg-black/40 z-10" />

              {/* SLIDE CONTENT */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-12 pt-8 sm:pt-12">
                <div className="max-w-5xl mx-auto flex flex-col items-center">
                  
                  {/* TAGLINE BADGE */}
                  <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-heading font-semibold text-[#D4AF37] uppercase tracking-[0.15em] sm:tracking-[0.2em] border border-[#D4AF37]/40 bg-[#152a63]/80 backdrop-blur-md px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 shadow-lg">
                    <ShieldCheck size={16} className="text-[#D4AF37] shrink-0" />
                    <span>{slide.tagline}</span>
                  </span>

                  {/* SLIDE HEADLINE */}
                  <h1 className="font-heading text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mb-4 sm:mb-6 drop-shadow-lg">
                    {slide.title}
                  </h1>

                  {/* SLIDE SUBTITLE */}
                  <p className="text-xs sm:text-base md:text-lg lg:text-xl text-slate-100 max-w-2xl font-normal leading-relaxed mb-6 sm:mb-8 drop-shadow-md px-2">
                    {slide.subtitle}
                  </p>

                  {/* ACTION BUTTONS */}
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full max-w-2xl">
                    
                    {/* GET A QUOTE */}
                    <Link
                      to="/quote"
                      className="bg-[#1E3A8A] hover:bg-[#152a63] text-white font-heading font-bold px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-xl border border-slate-700 cursor-pointer"
                    >
                      <span>Get a Quote</span>
                      <ArrowRight size={16} className="text-[#D4AF37] shrink-0" />
                    </Link>

                    {/* WHATSAPP */}
                    <a
                      href="https://wa.me/2349130799766"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-700/90 hover:bg-emerald-800 text-white font-heading font-semibold px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm border border-emerald-600 flex items-center justify-center gap-2 transition-all backdrop-blur-md cursor-pointer"
                    >
                      <MessageSquare size={16} className="text-emerald-200 shrink-0" />
                      <span>WhatsApp Us</span>
                    </a>

                    {/* CALL NOW */}
                    <a
                      href="tel:+2349130799766"
                      className="bg-slate-900/90 hover:bg-slate-800 text-white font-heading font-semibold px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-2 transition-all backdrop-blur-md cursor-pointer"
                    >
                      <PhoneCall size={16} className="text-[#D4AF37] shrink-0" />
                      <span>Call Now</span>
                    </a>

                    {/* OUR SERVICES */}
                    <button
                      onClick={scrollToServices}
                      className="bg-slate-900/80 hover:bg-slate-800 text-white font-heading font-semibold px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm border border-slate-700/80 flex items-center justify-center gap-2 transition-all backdrop-blur-md cursor-pointer"
                    >
                      <Grid size={16} className="text-[#D4AF37] shrink-0" />
                      <span>Our Services</span>
                    </button>

                  </div>

                </div>
              </div>
            </div>
          );
        })}

        {/* CAROUSEL CONTROLS */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900/70 backdrop-blur-md border border-slate-700/60 text-white flex items-center justify-center hover:bg-[#1E3A8A] hover:border-[#1E3A8A] transition-all duration-300 shadow-xl group cursor-pointer"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900/70 backdrop-blur-md border border-slate-700/60 text-white flex items-center justify-center hover:bg-[#1E3A8A] hover:border-[#1E3A8A] transition-all duration-300 shadow-xl group cursor-pointer"
        >
          <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* SLIDE INDICATORS */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                index === currentSlide
                  ? "bg-[#D4AF37] w-8 sm:w-10"
                  : "bg-white/30 hover:bg-white/60 w-2"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 2. EXECUTIVE CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-20">
        
        {/* INSTALLATION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-[#1E3A8A] transition-all"
          >
            <div className="h-44 sm:h-48 bg-[#152a63]/50 rounded-xl flex flex-col items-center justify-center border border-slate-700/50 mb-6 relative overflow-hidden">
              <Cpu size={52} className="text-[#D4AF37] mb-2" />
              <span className="text-xs font-heading uppercase tracking-widest text-slate-300">Centralized Server Rack</span>
              <div className="absolute top-3 right-3 flex gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              </div>
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">Architectural Lighting & Climate</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Precision panel wiring and centralized automation hubs unifying motorized blinds, scene lighting, and multi-zone climate.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-[#1E3A8A] transition-all"
          >
            <div className="h-44 sm:h-48 bg-[#152a63]/50 rounded-xl flex flex-col items-center justify-center border border-slate-700/50 mb-6 relative overflow-hidden">
              <Lock size={52} className="text-[#D4AF37] mb-2" />
              <span className="text-xs font-heading uppercase tracking-widest text-slate-300">Moorgen & Hikvision Systems</span>
              <div className="absolute top-3 right-3 flex gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">Hikvision AI & Smart Locks</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Biometric access integration paired with perimeter protection, thermal CCTV, and zero-latency intrusion alerts.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-[#1E3A8A] transition-all"
          >
            <div className="h-44 sm:h-48 bg-[#152a63]/50 rounded-xl flex flex-col items-center justify-center border border-slate-700/50 mb-6 relative overflow-hidden">
              <Radio size={52} className="text-[#D4AF37] mb-2" />
              <span className="text-xs font-heading uppercase tracking-widest text-slate-300">Starlink Gen 3 & Sonos Setup</span>
              <div className="absolute top-3 right-3 flex gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">High-Speed Satellite & Multi-Room Audio</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              High-speed Starlink installations paired with Sonos multi-room sound systems for seamless indoor and outdoor sound distribution.
            </p>
          </motion.div>

        </div>

        {/* THREE COLUMN BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white text-slate-950 p-6 sm:p-8 rounded-2xl shadow-xl border-t-4 border-[#1E3A8A]"
          >
            <div className="w-12 h-12 bg-[#1E3A8A] text-[#D4AF37] rounded-xl flex items-center justify-center mb-6">
              <Cpu size={26} />
            </div>
            <h2 className="font-heading text-xl font-bold mb-4 text-[#1E3A8A]">What Futurica Does</h2>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              We provide turnkey engineering services covering complete design, electrical conduit wiring, integration, and lifetime system maintenance:
            </p>
            <ul className="space-y-3 text-sm font-medium text-slate-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-[#1E3A8A] shrink-0 mt-0.5" />
                <span>Smart lighting control, scene automation & motorized curtains.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-[#1E3A8A] shrink-0 mt-0.5" />
                <span>Hikvision AI PTZ CCTV surveillance with remote mobile control.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-[#1E3A8A] shrink-0 mt-0.5" />
                <span>Moorgen facial recognition & keyless smart lock installation.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-[#1E3A8A] shrink-0 mt-0.5" />
                <span>Starlink high-speed satellite connectivity & enterprise Wi-Fi mesh.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-[#1E3A8A] shrink-0 mt-0.5" />
                <span>Multi-room acoustic distribution & Sonos integrated soundscapes.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-[#1E3A8A] shrink-0 mt-0.5" />
                <span>Centralized server rack wiring, management & smart panel retrofitting.</span>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white text-slate-950 p-6 sm:p-8 rounded-2xl shadow-xl border-t-4 border-[#D4AF37]"
          >
            <div className="w-12 h-12 bg-[#0A0A0A] text-[#D4AF37] rounded-xl flex items-center justify-center mb-6">
              <Building2 size={26} />
            </div>
            <h2 className="font-heading text-xl font-bold mb-4 text-[#0A0A0A]">Who We Serve</h2>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Our engineering standards are built to meet the rigorous demands of high-end private residences and business enterprises:
            </p>
            <ul className="space-y-4 text-sm font-medium text-slate-800">
              <li className="flex items-start gap-3">
                <HomeIcon size={20} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-950">Luxury Homeowners</strong>
                  <span className="text-xs text-slate-600">Custom home automation for villas, estates, and luxury apartments.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Building2 size={20} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-950">Corporate & Commercial Real Estate</strong>
                  <span className="text-xs text-slate-600">Boardroom automation, centralized access control, and network security.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck size={20} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-950">Real Estate Developers & Architects</strong>
                  <span className="text-xs text-slate-600">Smart infrastructure blueprints, conduit planning, and developer-grade volume installs.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Award size={20} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-950">Hospitality & High-Security Facilities</strong>
                  <span className="text-xs text-slate-600">Boutique hotel keyless entry, perimeter thermal monitoring, and centralized management.</span>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#152a63] text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-700"
          >
            <div className="w-12 h-12 bg-[#D4AF37] text-slate-950 rounded-xl flex items-center justify-center mb-6">
              <Award size={26} />
            </div>
            <h2 className="font-heading text-xl font-bold mb-4 text-[#D4AF37]">Why Clients Choose Us</h2>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              We deliver engineered reliability rather than consumer-grade DIY gadgets:
            </p>
            <ul className="space-y-3.5 text-sm font-medium text-slate-200">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <span><strong>Certified Engineers:</strong> Trained in direct brand standards (Hikvision, Moorgen, Sonos).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <span><strong>Clean Installations:</strong> Concealed conduit wiring and architectural finishing.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <span><strong>24/7 Dedicated Support:</strong> Remote network monitoring and fast onsite assistance.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <span><strong>CCTV Solutions:</strong> Hikvision, Dahua, EZVIZ, Ubox, and more.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <span><strong>Sound Systems:</strong> Sonos, Bose, Klipsch, Auxdio, RS-Audio, Denon, Arylic, etc.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <span><strong>Automation Platforms:</strong> Orvibo, Tuya, Alexa, Google Home, and more.</span>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* 3. COUNTERS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 sm:mt-20 pt-10 border-t border-slate-800 text-center">
          <div>
            <p className="font-heading text-3xl sm:text-5xl font-black text-[#D4AF37]">
              <CounterNumber value={150} suffix="+" />
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-2">Projects Delivered</p>
          </div>
          <div>
            <p className="font-heading text-3xl sm:text-5xl font-black text-white">
              <CounterNumber value={100} suffix="%" />
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-2">System Uptime</p>
          </div>
          <div>
            <p className="font-heading text-3xl sm:text-5xl font-black text-[#D4AF37]">
              24/7
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-2">Technical Support</p>
          </div>
          <div>
            <p className="font-heading text-3xl sm:text-5xl font-black text-white">
              Top Grade
            </p>
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-2">Hardware Partners</p>
          </div>
        </div>

      </div>
    </section>
  );
}