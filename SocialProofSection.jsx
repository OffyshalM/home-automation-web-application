import React, { useState, useRef } from "react";
import {
  ShieldCheck,
  Award,
  Star,
  CheckCircle2,
  Zap,
  Users,
  Wrench,
  Building2,
  ChevronLeft,
  ChevronRight,
  ChevronRight as ArrowRightIcon,
  Sparkles,
} from "lucide-react";

// Local video import
import homeAutomationVideo from "../assets/images/complete-home-automation-setup.mp4";

// Partner Brand Logo Imports
import sonosLogo from "../assets/images/sonos.png";
import hikvisionLogo from "../assets/images/hikvision_logo.jpg";
import orviboLogo from "../assets/images/orvibo_logo.jpg";
import arylicLogo from "../assets/images/Arylic-Logo.png";
import boseLogo from "../assets/images/Bose-Logo.jpg";
import huaweiLogo from "../assets/images/huawei-logo.jpg";
import tpLinkLogo from "../assets/images/TP-Link-Logo.png";
import moorgenLogo from "../assets/images/moorgen_logo.jpg";
import alexaLogo from "../assets/images/Alexa-Logo.png";
import tuyaLogo from "../assets/images/tuya-logo.png";
import dahuaLogo from "../assets/images/logo-dahua.png";

export default function SocialProofSection() {
  const [activeTab, setActiveTab] = useState("all");
  const scrollRef = useRef(null);

  const testimonials = [
    {
      name: "Emeka Okafor",
      role: "House Owner",
      quote:
        "The team installed smart locks and CCTV across my entire compound. Everything works seamlessly from one app, and installation was clean and professional.",
    },
    {
      name: "Chiamaka Nwosu",
      role: "Property Owner",
      quote:
        "I manage several rental units, and their automation systems have made monitoring and security so much easier. Reliable team, excellent after-installation support.",
    },
    {
      name: "Tunde Bakare",
      role: "Office Owner",
      quote:
        "We automated our office lighting, access control, and CCTV in one project. The consultation process was thorough and the final setup exceeded expectations.",
    },
    {
      name: "Amaka Eze",
      role: "House Owner",
      quote:
        "From the video doorbell to the smart curtains, everything was set up perfectly. My home finally feels modern and secure at the same time.",
    },
    {
      name: "Ibrahim Suleiman",
      role: "Property Developer",
      quote:
        "I now specify their automation packages for every new development. Consistent quality, dependable timelines, and genuinely knowledgeable staff.",
    },
    {
      name: "Ngozi Adeyemi",
      role: "House Owner",
      quote:
        "The Starlink and smart switch installation transformed how my home runs. No more worrying about power outages disrupting my internet or security cameras.",
    },
    {
      name: "Segun Alabi",
      role: "Office Owner",
      quote:
        "Our intercom and access control system has made managing staff entry effortless. Support has been quick whenever we have needed adjustments.",
    },
  ];

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstChild?.offsetWidth || 350;
    const scrollAmount = cardWidth + 24;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const partnerBrands = [
    { name: "Sonos", logo: sonosLogo },
    { name: "Hikvision", logo: hikvisionLogo },
    { name: "Orvibo", logo: orviboLogo },
    { name: "Arylic", logo: arylicLogo },
    { name: "Bose", logo: boseLogo },
    { name: "Huawei", logo: huaweiLogo },
    { name: "TP-Link", logo: tpLinkLogo },
    { name: "Moorgen", logo: moorgenLogo },
    { name: "Amazon Alexa", logo: alexaLogo },
    { name: "Tuya", logo: tuyaLogo },
    { name: "Dahua", logo: dahuaLogo },
  ];

  const certifications = [
    {
      title: "CAC Registered",
      subtitle: "Integrated Service Ltd.",
      icon: Building2,
    },
    {
      title: "Certified Engineers",
      subtitle: "OEM Certified Team",
      icon: Award,
    },
    {
      title: "100% Quality Assurance",
      subtitle: "Warranty Backed Installs",
      icon: ShieldCheck,
    },
  ];

  const completedProjects = [
    {
      id: 1,
      title: "Complete Home Automation Setup",
      location: "Guzape, Abuja",
      category: "Ongoing",
      description:
        "Full smart lighting, automated curtain modules, and biometrics access control installation.",
      videoUrl: homeAutomationVideo,
    },
    {
      id: 2,
      title: "Commercial Office Security",
      location: "Jahi Mall, Abuja",
      category: "Completed",
      description:
        "CCTV surveillance grid, keyless smart locks, and central administrative dashboard integration.",
      imgUrl:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Luxury Apartment Smart Locks",
      location: "Maitama, Abuja",
      category: "residential",
      description:
        "Multi-tenant digital keypad locks with remote mobile app gatekeeping.",
      imgUrl:
        "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const whyChooseUs = [
    {
      title: "Tailored Smart Setups",
      desc: "Custom-configured systems designed specifically for your space layout and budget.",
      icon: Zap,
    },
    {
      title: "Expert Installation",
      desc: "Clean, non-intrusive cabling and hardware setups by trained automation specialists.",
      icon: Wrench,
    },
    {
      title: "Mobile App Control",
      desc: "Manage locks, cameras, lighting, and power directly from your smartphone anywhere.",
      icon: CheckCircle2,
    },
    {
      title: "Dedicated After-Sales",
      desc: "Responsive ongoing support, system updates, and maintenance guarantees.",
      icon: Users,
    },
  ];

  const filteredProjects =
    activeTab === "all"
      ? completedProjects
      : completedProjects.filter((p) => p.category === activeTab);

  return (
    <section className="bg-slate-50 py-16 sm:py-24 font-sans text-brand-black overflow-hidden relative">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20 relative z-10">
        
        {/* 1. CERTIFICATIONS & BADGES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 p-5 bg-white border border-gray-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-3.5 bg-brand-gold/20 text-brand-black rounded-xl shrink-0">
                  <Icon size={26} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-brand-black">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. AUTOMATIC INFINITE SCROLLING BRAND LOGOS */}
        <div className="text-center space-y-6">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Powered by Global Smart Hardware Leaders
          </p>

          <div className="w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="animate-marquee flex items-center gap-8 py-2">
              {[...partnerBrands, ...partnerBrands].map((brand, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-36 h-16 px-4 py-2 bg-white border border-gray-200/60 rounded-xl flex items-center justify-center shadow-sm opacity-80 hover:opacity-100 transition-opacity duration-300"
                >
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. REAL INSTALLATION SHOWCASE */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full mb-2">
                <Sparkles size={14} /> Real Projects
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-black">
                Recent  Projects
              </h2>
            </div>

            <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-200 self-start md:self-auto">
              {["all", "Ongoing", "Completed"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-brand-blue text-white shadow-sm"
                      : "text-gray-500 hover:text-brand-black"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="h-48 sm:h-52 overflow-hidden relative">
                  {project.videoUrl ? (
                    <video
                      src={project.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={project.imgUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider bg-brand-black/80 text-white px-2.5 py-1 rounded-md backdrop-blur-sm z-10">
                    {project.location}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-brand-black group-hover:text-brand-blue transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-brand-blue">
                    <span>Verified Installation</span>
                    <ArrowRightIcon size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. WHY CHOOSE FUTURICA */}
        <div className="bg-brand-black text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl mb-10 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
              Why Choose Futurica?
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mt-2 leading-tight">
              Engineered for Security, Convenience, and Peace of Mind.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {whyChooseUs.map((reason, idx) => {
              const Icon = reason.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
                >
                  <div className="p-3 bg-brand-gold text-brand-black rounded-xl inline-block mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. INTEGRATED TESTIMONIALS CAROUSEL */}
        <div id="testimonials" className="bg-brand-black rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="inline-block text-xs font-semibold text-brand-gold uppercase tracking-widest border border-brand-gold px-3 py-1 rounded-full mb-3">
                Client Experiences
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white max-w-xl leading-tight">
                Trusted by Homes and Businesses Across Nigeria
              </h2>
            </div>

            <div className="hidden md:flex gap-3">
              <button
                onClick={() => scroll("left")}
                aria-label="Previous testimonials"
                className="w-11 h-11 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-colors cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Next testimonials"
                className="w-11 h-11 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-colors cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="min-w-[280px] sm:min-w-[320px] lg:min-w-[calc(33.333%-16px)] snap-start bg-white/5 border-t-2 border-brand-gold rounded-b-2xl p-7 flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed mb-6 flex-grow">
                  "{t.quote}"
                </p>

                <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className="fill-brand-gold text-brand-gold"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex md:hidden gap-3 mt-6 justify-center">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous testimonials"
              className="w-11 h-11 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-colors cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next testimonials"
              className="w-11 h-11 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-colors cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}