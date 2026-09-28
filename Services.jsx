import React from "react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Cpu, 
  Wrench, 
  Radio, 
  Volume2, 
  Zap, 
  ArrowRight,
  Clapperboard 
} from "lucide-react";

const services = [
  {
    icon: Cpu,
    title: "Smart Home & Building Automation",
    description: "End-to-end design and installation of integrated smart eco-systems, motorized curtain tracks, and voice control powered by Amazon Alexa, Siri, and Google home."
  },
  {
    icon: ShieldCheck,
    title: "Security & Surveillance Systems",
    description: "Deployment of smart biometric locks, Hikvision IP Video Intercoms, and high end surveillance system."
  },
  {
    icon: Radio,
    title: "High-Speed Satellite Internet Setup",
    description: "Professional installation and alignment of Starlink hardware for fast, dependable connectivity in homes and commercial properties."
  },
  {
    icon: Volume2,
    title: "Premium Multi-Room Audio",
    description: "Custom Spatial Audio & High-End Sound Solutions — Premium Sonos and Bose systems with AirPlay, multi-room integration, and professionally engineered speaker placement for a truly immersive listening experience."
  },
  {
    icon: Zap,
    title: "Smart Lighting & Power Systems",
    description: "Installation of smart touch switches, automated scheduling, and energy-efficient lighting control engineered for convenience."
  },
{
    icon: Clapperboard,
    title: "Home Cinema",
    description: (
      <>
        Transform your home into a private cinematic experience.
        <br /><br />
        At Futurica Automations, we create bespoke home cinemas with premium audiovisual technology, immersive sound, smart lighting, motorized systems, and luxury seating.
        <br /><br />
        With one command, the lights dim, shades close, the screen descends, and your cinema comes to life.
      </>
    )
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold text-[#D4AF37] uppercase tracking-widest border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1.5 rounded-full mb-4">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Professional <span className="text-[#D4AF37]">Services</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Delivering tailored automation, enterprise security, and audio-visual integration across residential and commercial properties.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Border Hover Effect */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#0056B3] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Icon Container - Gold Default, Blue Hover */}
                  <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] group-hover:bg-[#0056B3] group-hover:text-white flex items-center justify-center transition-colors duration-300 mb-6">
                    <IconComponent size={28} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#0056B3] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Banner - Gold Button Hovering to Blue */}
        <div className="mt-16 bg-slate-900 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-lg border border-[#D4AF37]/20">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Need a Tailored Automation Plan?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mb-8">
              We consult, design, and configure smart installations based on your exact architectural layout.
            </p>
            <Link 
              to="/quote"
              className="inline-flex items-center gap-2 bg-[#D4AF37] text-white hover:bg-[#0056B3] hover:text-white text-xs sm:text-sm font-semibold uppercase tracking-wider px-8 py-3.5 rounded-none transition-all duration-300 shadow-md cursor-pointer border-none"
            >
              Request a Consultation
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}