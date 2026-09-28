import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Emeka Okafor",
    role: "House Owner",
    quote: "The team installed smart locks and CCTV across my entire compound. Everything works seamlessly from one app, and installation was clean and professional.",
  },
  {
    name: "Chiamaka Nwosu",
    role: "Property Owner",
    quote: "I manage several rental units, and their automation systems have made monitoring and security so much easier. Reliable team, excellent after-installation support.",
  },
  {
    name: "Tunde Bakare",
    role: "Office Owner",
    quote: "We automated our office lighting, access control, and CCTV in one project. The consultation process was thorough and the final setup exceeded expectations.",
  },
  {
    name: "Amaka Eze",
    role: "House Owner",
    quote: "From the video doorbell to the smart curtains, everything was set up perfectly. My home finally feels modern and secure at the same time.",
  },
  {
    name: "Ibrahim Suleiman",
    role: "Property Developer",
    quote: "I now specify their automation packages for every new development. Consistent quality, dependable timelines, and genuinely knowledgeable staff.",
  },
  {
    name: "Ngozi Adeyemi",
    role: "House Owner",
    quote: "The Starlink and smart switch installation transformed how my home runs. No more worrying about power outages disrupting my internet or security cameras.",
  },
  {
    name: "Segun Alabi",
    role: "Office Owner",
    quote: "Our intercom and access control system has made managing staff entry effortless. Support has been quick whenever we have needed adjustments.",
  },
];

export default function Testimonials() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstChild?.offsetWidth || 350;
    const scrollAmount = cardWidth + 24;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="testimonials" className="bg-slate-900 py-16 md:py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="inline-block text-xs font-semibold text-brand-gold uppercase tracking-widest border border-brand-gold px-3 py-1 mb-4">
              Client Experiences
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-xl leading-tight">
              Trusted by Homes and Businesses Across Nigeria
            </h2>
          </div>

          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous testimonials"
              className="w-11 h-11 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next testimonials"
              className="w-11 h-11 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-colors"
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
              className="min-w-[280px] sm:min-w-[320px] lg:min-w-[calc(33.333%-16px)] snap-start bg-white/5 border-t-2 border-brand-gold p-7 flex flex-col"
            >
              <p className="text-base md:text-lg text-white leading-relaxed mb-8 flex-grow">
                {t.quote}
              </p>

              <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-brand-gold text-brand-gold" />
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
            className="w-11 h-11 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Next testimonials"
            className="w-11 h-11 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
}