import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Send,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import axios from "axios";

function GetQuote() {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const productName = location.state?.productName || "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsappNumber: "",
    product: productName,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [statusMessage, setStatusMessage] = useState("");

  const fullAddress =
    "GF9, Jahi Mall, No. 1, Valentine Nwabueze Cresc. Abuja, Nigeria";
  const encodedAddress = encodeURIComponent(fullAddress);
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  // Exact Google Maps Embed URL generated from Google Maps
  const embedMapUrl =
    "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3939.423575898387!2d7.430807973145103!3d9.116158787622386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sGF9%2C%20Jahi%20Mall%2C%20No.%201%2C%20Valentine%20Nwabueze%20Cresc.%20Abuja%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1788017546612!5m2!1sen!2sng";

  const socialLinks = [
    {
      icon: FaFacebookF,
      to: "https://www.facebook.com/profile.php?id=61571460622062",
      label: "Facebook",
    },
    {
      icon: FaInstagram,
      to: "https://www.instagram.com/futurica_automations?igsi=MmFtZXhyeWZtNWF5",
      label: "Instagram",
    },
    {
      icon: FaWhatsapp,
      to: "https://wa.me/2349130799766",
      label: "WhatsApp",
    },
    {
      icon: FaTiktok,
      to: "https://www.tiktok.com/@futurica_automations?_r=1&_t=ZS-99AuQEFYZWe",
      label: "TikTok",
    },
    {
      icon: FaYoutube,
      to: "https://youtube.com/@futurica_automations?si=vIPGCFMlpEbb_OEB",
      label: "YouTube",
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await axios.post(
        "https://futuricaautomations.com/api/submit-quote.php",
        {
          fullName: formData.fullName,
          email: formData.email,
          product: formData.product || "General Inquiry",
          whatsappNumber: formData.whatsappNumber,
          message: formData.message,
        }
      );

      if (response.data && response.data.success) {
        setStatus("success");
        setStatusMessage("Your request has been submitted successfully.");
        setTimeout(() => navigate("/"), 3000);
      } else {
        setStatus("error");
        setStatusMessage(
          response.data?.error || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        "Failed to submit. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-slate-50 pt-28 sm:pt-32 pb-16 md:pb-24 font-sans min-h-screen relative overflow-hidden">
      {/* BACKGROUND DECORATIVE ACCENTS */}
      <div className="absolute top-0 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 h-64 sm:w-80 sm:h-80 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-blue hover:text-brand-black transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>

        {/* PAGE HEADER */}
        <div className="mb-10 text-center md:text-left">
          <span className="inline-block text-[11px] sm:text-xs font-bold text-brand-blue bg-brand-gold/20 border border-brand-gold px-3.5 py-1.5 rounded-full mb-3 shadow-sm uppercase tracking-widest">
            <span className="text-brand-black">Get</span>{" "}
            <span className="text-brand-gold font-extrabold">&</span>{" "}
            <span className="text-brand-blue">In Touch</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-black tracking-tight">
            Request a Quote
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-xl">
            Have questions or need a custom setup? Send us a message or reach out through our direct channels.
          </p>
        </div>

        {/* TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: FORM */}
          <div className="lg:col-span-7 bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
            {status === "success" ? (
              <div className="flex flex-col items-center text-center py-10">
                <CheckCircle2 size={56} className="text-green-500 mb-4" />
                <h2 className="text-xl font-bold text-brand-black mb-2">
                  Submitted Successfully
                </h2>
                <p className="text-sm text-gray-500">
                  {statusMessage} Redirecting you home shortly...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {status === "error" && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-xl">
                    <XCircle size={18} className="shrink-0 mt-0.5" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-brand-black mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-brand-black focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-brand-black mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-brand-black focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-brand-black mb-1.5">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      name="whatsappNumber"
                      required
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                      placeholder="e.g. 09130799766"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-brand-black focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-brand-black mb-1.5">
                    Product / Service Inquiry
                  </label>
                  <input
                    type="text"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    readOnly={!!productName}
                    className={`w-full border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-brand-black transition-all ${
                      productName
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30"
                    }`}
                    placeholder={
                      productName ? "" : "e.g. Smart Locks, General Inquiry..."
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-brand-black mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-brand-black focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 resize-none transition-all"
                    placeholder="Tell us more about your space and requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-blue text-brand-black hover:text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl uppercase tracking-wider transition-all duration-300 shadow-md disabled:opacity-60 cursor-pointer"
                >
                  <Send size={16} />
                  <span>{isSubmitting ? "Sending..." : "Send Request"}</span>
                </button>
              </form>
            )}
          </div>

          {/* RIGHT COLUMN: CONTACT DETAILS & GOOGLE MAP */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* CONTACT DETAILS CARD */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-brand-black border-b border-gray-100 pb-3">
                Contact Information
              </h2>

              {/* PHONE NUMBERS */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-brand-blue/10 text-brand-blue rounded-xl shrink-0 mt-0.5">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Phone & Call Lines
                  </span>
                  <div className="flex flex-col gap-1 text-xs sm:text-sm font-semibold text-brand-black">
                    <a href="tel:09130799766" className="hover:text-brand-blue transition-colors">
                      09130799766
                    </a>
                    <a href="tel:08137574644" className="hover:text-brand-blue transition-colors">
                      08137574644
                    </a>
                  </div>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-brand-blue/10 text-brand-blue rounded-xl shrink-0 mt-0.5">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Email Address
                  </span>
                  <a
                    href="mailto:futuricaautomations@gmail.com"
                    className="text-xs sm:text-sm font-semibold text-brand-black hover:text-brand-blue transition-colors break-all"
                  >
                    futuricaautomations@gmail.com
                  </a>
                </div>
              </div>

              {/* CLICKABLE PHYSICAL ADDRESS */}
              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-gray-200 transition-all cursor-pointer"
              >
                <div className="p-2.5 bg-brand-gold/20 text-brand-black group-hover:bg-brand-gold rounded-xl shrink-0 mt-0.5 transition-colors">
                  <MapPin size={18} />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Office Address
                    </span>
                    <ExternalLink size={12} className="text-gray-400 group-hover:text-brand-blue" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-brand-black group-hover:text-brand-blue transition-colors leading-relaxed">
                    {fullAddress}
                  </p>
                  <span className="inline-block text-[11px] text-brand-blue font-medium underline mt-1">
                    Open in Google Maps
                  </span>
                </div>
              </a>

              {/* SOCIAL MEDIA HANDLES */}
              <div className="pt-2 border-t border-gray-100">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Connect With Us
                </span>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {socialLinks.map(({ icon: Icon, to, label }, index) => (
                    <a
                      key={index}
                      href={to}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded-xl bg-slate-100 border border-gray-200/60 flex items-center justify-center text-gray-600 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all"
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* EMBEDDED GOOGLE MAP */}
            <div className="w-full h-64 sm:h-72 bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm relative">
              <iframe
                title="Futurica Automations Location Map"
                src={embedMapUrl}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default GetQuote;