import { Link, useNavigate, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok, FaYoutube } from "react-icons/fa6";
import logo from "../assets/images/logo.png";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const fullAddress = "GF9, Jahi Mall, No. 1, Valentine Nwabueze Cresc. Abuja, Nigeria";
  const encodedAddress = encodeURIComponent(fullAddress);
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  
  // Exact Google Maps Embed URL generated from Google Maps
  const embedMapUrl = "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3939.423575898387!2d7.430807973145103!3d9.116158787622386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sGF9%2C%20Jahi%20Mall%2C%20No.%201%2C%20Valentine%20Nwabueze%20Cresc.%20Abuja%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1788017546612!5m2!1sen!2sng";

  const footerLinks = {
    "For Home": [
      { label: "Home Automation", sectionId: "products" },
      { label: "Smart Security", sectionId: "products" },
      { label: "Consultation", to: "/quote", isPage: true },
    ],
    "For Business": [
      { label: "Office Automation", sectionId: "products" },
      { label: "Access Control Systems", sectionId: "products" },
      { label: "Bulk & Project Enquiries", to: "/quote", isPage: true },
    ],
    "Resources": [
      { label: "Product Catalog", to: "/product-catalog", isPage: true },
      { label: "How It Works", sectionId: "how-it-works" },
    ],
    "Company": [
      { label: "About Us", sectionId: "about" },
      { label: "Testimonials", sectionId: "testimonials" },
      { label: "Contact Us", to: "/quote", isPage: true },
    ],
  };

  const socialLinks = [
    { icon: FaFacebookF, to: "https://www.facebook.com/profile.php?id=61571460622062" },
    { icon: FaInstagram, to: "https://www.instagram.com/futurica_automations?igsi=MmFtZXhyeWZtNWF5" },
    { icon: FaWhatsapp, to: "https://wa.me/2349130799766" },
    { icon: FaTiktok, to: "https://www.tiktok.com/@futurica_automations?_r=1&_t=ZS-99AuQEFYZWe" },
    { icon: FaYoutube, to: "https://youtube.com/@futurica_automations?si=vIPGCFMlpEbb_OEB" },
  ];

  const handleSectionScroll = (sectionId) => {
    window.history.pushState(null, "", "/");
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavigation = (link) => {
    if (link.isPage) {
      navigate(link.to);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (location.pathname === "/") {
      handleSectionScroll(link.sectionId);
    } else {
      navigate("/");
      setTimeout(() => {
        handleSectionScroll(link.sectionId);
      }, 100);
    }
  };

  return (
    <footer className="bg-slate-900 font-sans text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-16 pb-10">

        {/* NAVIGATION LINKS & MAP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">

          {/* LINKS COLUMNS */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-white text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">
                  {category}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.isPage ? (
                        <Link
                          to={link.to}
                          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                          className="text-xs sm:text-sm text-gray-400 hover:text-brand-gold transition-colors inline-block"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleNavigation(link)}
                          className="text-xs sm:text-sm text-gray-400 hover:text-brand-gold transition-colors bg-transparent border-none p-0 cursor-pointer text-left"
                        >
                          {link.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* FOOTER GOOGLE MAP EMBED */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-xs sm:text-sm font-bold uppercase tracking-widest">
                Visit Our Office
              </h3>
              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-brand-gold hover:underline flex items-center gap-1"
              >
                <span>Direct Map</span>
                <ExternalLink size={12} />
              </a>
            </div>
            
            {/* MAP CONTAINER */}
            <div className="w-full h-52 rounded-xl overflow-hidden border border-white/10 shadow-lg relative bg-slate-800">
              <iframe
                title="Futurica Office Map Footer"
                src={embedMapUrl}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

        {/* CONTACT BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-white/10">
          <a href="tel:09130799766" className="flex items-center gap-3 text-gray-400 hover:text-brand-gold transition-colors">
            <Phone size={18} className="text-brand-gold shrink-0" />
            <span className="text-xs sm:text-sm">09130799766, 08137574644</span>
          </a>

          <a href="mailto:futuricaautomations@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-brand-gold transition-colors">
            <Mail size={18} className="text-brand-gold shrink-0" />
            <span className="text-xs sm:text-sm break-all">futuricaautomations@gmail.com</span>
          </a>

          <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-brand-gold transition-colors">
            <MapPin size={18} className="text-brand-gold shrink-0" />
            <span className="text-xs sm:text-sm">{fullAddress}</span>
          </a>
        </div>

        {/* BOTTOM BRANDING & SOCIAL LINKS */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Futurica Automations" className="h-10 w-auto object-contain" />
          </div>

          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-xs text-gray-500 text-center md:text-left">
              © 2026 Futurica Automations and Integrated Service Ltd. All Rights Reserved.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-brand-gold font-semibold">
              <ShieldCheck size={14} />
              <span>RC: 8976367</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, to }, index) => (
              <a
                key={index}
                href={to || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-brand-gold hover:text-brand-gold transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}