import { ClipboardList, Settings2, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Request a Consultation",
    description: "Tell us about your space and what you need. Our team reviews your request and reaches out to understand your goals.",
  },
  {
    number: "02",
    icon: Settings2,
    title: "Get a Tailored Solution",
    description: "We design a system built around your space, whether that is a single room or a full property, then walk you through it.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Professional Installation",
    description: "Our team installs and configures everything with care, leaving you with a fully connected space that just works.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 md:py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-brand-gold uppercase tracking-widest border border-brand-gold px-3 py-1 mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black">
            From Idea to Installation
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          <div className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-px bg-gray-200" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 w-20 h-20 rounded-full border-2 border-brand-gold bg-white flex items-center justify-center mb-6">
                  <Icon size={30} strokeWidth={1.5} className="text-brand-gold" />
                </div>

                <span className="text-xs font-semibold text-brand-gold tracking-widest mb-2">
                  STEP {step.number}
                </span>

                <h3 className="text-lg md:text-xl font-bold text-brand-black mb-3">
                  {step.title}
                </h3>

                <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}