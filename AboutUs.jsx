import React from "react";
import {
  ShieldCheck,
  Cpu,
  Radio,
  Clock,
  CheckCircle2,
  Users,
  Target,
  Award,
} from "lucide-react";

// IMAGE IMPORTS
import automationImg from "../assets/images/automation.png";
import teamPhoto from "../assets/images/team-photo-1.jpeg";

export default function About() {
  // CORE SERVICES & CAPABILITIES BREAKDOWN
  const coreCapabilities = [
    {
      title: "Smart Home & Building Automation",
      description:
        "Centralized touch, voice, and app control for intelligent lighting, motorized window shades, HVAC climate management, and automated power distribution.",
      icon: Cpu,
    },
    {
      title: "Integrated Security & Surveillance",
      description:
        "Commercial-grade IP CCTV systems, 4K optical zoom night-vision cameras, thermal perimeter sensors, and biometric access control platforms.",
      icon: ShieldCheck,
    },
    {
      title: "Satellite & High-Speed Networking",
      description:
        "Deployment of Starlink high-speed satellite terminals, enterprise Wi-Fi 6 mesh infrastructure, and gigabit wired LAN backbone cabling.",
      icon: Radio,
    },
    {
      title: "24/7 Technical Support & Maintenance",
      description:
        "Proactive system diagnostics, firmware upgrades, and dedicated engineering dispatch for uninterrupted operational continuity.",
      icon: Clock,
    },
  ];

  return (
    <section id="about" className="bg-white py-16 md:py-24 font-sans text-brand-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">

        {/* 1. HERO / OVERVIEW SECTION */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT: TEXT CONTENT */}
          <div>
            <span className="inline-block text-xs font-semibold text-brand-gold uppercase tracking-widest border border-brand-gold px-3.5 py-1 mb-6 rounded-full">
              About Us
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-black leading-tight mb-6">
              Futurica Automations <br />
              <span className="text-brand-blue">& Integrated Service Ltd</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-600 mb-5 leading-relaxed">
              Futurica Automations and Integrated Service Ltd is a premier smart engineering and automation solutions firm headquartered in Nigeria. We specialize in transforming conventional luxury residential estates, corporate headquarters, and commercial facilities into intelligent, self-sustaining, and highly secure environments.
            </p>

            <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
              Our engineering philosophy centers around total integration. Rather than treating security, lighting, networking, and power as disconnected silos, we tie every subsystem into an intuitive, unified platform accessible from anywhere in the world.
            </p>

            <div className="space-y-3 pt-2">
              {[
                "Customized engineering tailored specifically to building layouts",
                "Clean, non-intrusive cabling and OEM-compliant hardware",
                "Direct mobile app, voice command, and physical touch panel controls",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-brand-gold shrink-0 mt-1" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-800">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: FEATURED AUTOMATION IMAGE */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100">
              <img
                src={automationImg}
                alt="Futurica Smart Automation Systems"
                className="w-full h-[380px] sm:h-[480px] lg:h-[520px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* ACCENT BACKGROUND BOX */}
            <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-brand-gold/20 rounded-2xl -z-10 hidden sm:block" />
            <div className="absolute -top-4 -right-4 w-28 h-28 bg-brand-blue/10 rounded-2xl -z-10 hidden sm:block" />
          </div>
        </div>

        {/* 2. WHAT WE DO - CORE SERVICES GRID */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold border border-brand-gold px-3 py-1 rounded-full inline-block">
              Our Expertise
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-brand-black">
              Comprehensive Smart Solutions
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We provide end-to-end services ranging from initial architectural consultation and wire-framing to hardware procurement, on-site installation, and long-term maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreCapabilities.map((capability, idx) => {
              const Icon = capability.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-200/80 rounded-2xl p-6 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="p-3 bg-brand-gold/10 text-brand-black rounded-xl inline-block mb-4 group-hover:bg-brand-gold transition-colors">
                      <Icon size={24} />
                    </div>
                    <h4 className="text-base font-bold text-brand-black mb-2 group-hover:text-brand-blue transition-colors">
                      {capability.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. TEAM VISUALS & LEADERSHIP SECTION */}
        <div className="bg-brand-black text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* TEXT SIDE */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-gold uppercase tracking-widest border border-brand-gold/40 px-3 py-1 rounded-full">
                <Users size={14} /> The Minds Behind Futurica
              </span>

              <h3 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                Driven by Passionate Engineering Experts
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Our multidisciplinary team comprises OEM-certified automation engineers, network architects, security experts, and customer support specialists dedicated to raising the standard of smart living across Nigeria.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/10 rounded-lg text-brand-gold shrink-0">
                    <Target size={18} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Precision Execution</h5>
                    <p className="text-xs text-gray-400">Strict adherence to international wiring and safety standards.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/10 rounded-lg text-brand-gold shrink-0">
                    <Award size={18} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Continuous Innovation</h5>
                    <p className="text-xs text-gray-400">Constantly adopting next-generation IoT hardware and AI capabilities.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TEAM PHOTO DISPLAY */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl group">
                <img
                  src={teamPhoto}
                  alt="Futurica Engineering Team"
                  className="w-full h-[320px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <p className="text-sm sm:text-base font-bold text-white">
                      Futurica On-Site Installation & Systems Engineering Team
                    </p>
                    <p className="text-xs text-brand-gold">
                      Abuja Engineering Units
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
