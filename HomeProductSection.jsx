import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import products from "../data/products.js";

export default function HomeProductSection() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  // OPTION 1: Explicitly select specific featured IDs present in your updated products array
  const featuredProductIds = [
    "starlink-gen3-kit",
    "hik-solar-camera1",
    "moorgen-smart-lock-series",
    "smart-switch-3",
    "amazon-all-echo-show-products",
    "orvibo-mixpad-series",
  ];

  let featuredProducts = products.filter((item) =>
    featuredProductIds.includes(item.id)
  );

  // OPTION 2 (FALLBACK): If featuredProductIds match fewer than 4 items, fall back to slicing the first 6 products
  if (featuredProducts.length === 0) {
    featuredProducts = products.slice(0, 6);
  }

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 340;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleGetQuote = (product) => {
    navigate(`/quote/${product.id}`, { state: { productName: product.name } });
  };

  return (
    <section id="products" className="bg-white py-16 md:py-24 font-sans text-brand-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* SECTION HEADER */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block text-xs font-semibold text-brand-gold uppercase tracking-widest border border-brand-gold px-3 py-1 mb-4 rounded-full">
              Featured Products
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black">
              Solutions Built for Your Space
            </h2>
          </div>

          {/* DESKTOP NAVIGATION BUTTONS */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-11 h-11 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-colors cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-11 h-11 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-colors cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* DIVERSE PRODUCT CAROUSEL */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="min-w-[280px] md:min-w-[320px] max-w-[320px] snap-start border border-gray-100 rounded-2xl hover:shadow-lg transition-all duration-300 bg-white flex flex-col justify-between group overflow-hidden"
            >
              {/* IMAGE CONTAINER */}
              <div className="h-48 overflow-hidden relative bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* CARD DETAILS */}
              <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-base md:text-lg text-brand-black group-hover:text-brand-blue transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <button
                  onClick={() => handleGetQuote(product)}
                  className="text-xs font-bold text-brand-gold hover:text-brand-blue transition-colors underline underline-offset-4 text-left cursor-pointer uppercase tracking-wider"
                >
                  Get a Quote &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE NAVIGATION BUTTONS */}
        <div className="flex md:hidden gap-3 mt-6 justify-center">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-11 h-11 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-colors cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-11 h-11 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-colors cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* CATALOG CTA BUTTON */}
        <div className="mt-10">
          <button
            onClick={() => navigate("/product-catalog")}
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-black text-xs font-bold py-4 px-8 uppercase tracking-wider hover:bg-brand-blue hover:text-white transition-colors cursor-pointer rounded-xl shadow-sm"
          >
            View Full Product Catalog
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}