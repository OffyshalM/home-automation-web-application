import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Search, X, Layers, ArrowLeft } from "lucide-react";
import products, { CATEGORIES } from "../data/products.js";
import ScrollToTop from "../components/ScrollToTop.jsx";

export default function ProductCatalog() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [activeCategory, setActiveCategory] = useState("all");

  // Sync internal search state when URL search params change
  useEffect(() => {
    const urlSearch = searchParams.get("search");
    if (urlSearch !== null) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  // Handle quote navigation
  const handleGetQuote = (product) => {
    navigate(`/quote/${product.id}`, { state: { productName: product.name } });
  };

  // Find active category object for description rendering
  const currentCategoryObj = useMemo(() => {
    return CATEGORIES.find((c) => c.id === activeCategory);
  }, [activeCategory]);

  // Filter products by active category and search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Clear search query and clear parameter from URL
  const handleClearSearch = () => {
    setSearchQuery("");
    if (searchParams.has("search")) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete("search");
      setSearchParams(nextParams);
    }
  };

  return (
    <section className="bg-slate-50 pt-28 sm:pt-32 pb-16 md:pb-24 font-sans min-h-screen relative overflow-hidden">
      
      {/* BACKGROUND DECORATIVE ACCENTS */}
      <div className="absolute top-0 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 h-64 sm:w-80 sm:h-80 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* BACK TO HOME LINK */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-blue hover:text-brand-black transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>

        {/* HEADER SECTION */}
        <div className="mb-8 sm:mb-10 text-center">
          <span className="inline-block text-[11px] sm:text-xs font-bold text-brand-blue bg-brand-gold/20 border border-brand-gold px-3.5 py-1.5 rounded-full mb-3 sm:mb-4 shadow-sm uppercase tracking-widest">
            <span className="text-brand-black">Product Catalog</span>{" "}
            <span className="text-brand-gold font-extrabold">&</span>{" "}
            <span className="text-brand-blue">Solutions</span>
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-brand-black mb-3 sm:mb-4 tracking-tight leading-tight">
            Engineered Smart Systems
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore our full range of smart automation products, and request a personalized quote for anything that fits your space.
          </p>
        </div>

        {/* CATEGORY FILTER BUTTONS CONTAINER */}
        <div className="w-full mb-6 sm:mb-8 overflow-hidden">
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-4 pt-2 px-1 max-w-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {CATEGORIES.map((cat) => {
              const isAll = cat.id === "all";
              const isActive = activeCategory === cat.id;

              let buttonStyles =
                "bg-white text-gray-700 border-gray-200 hover:border-brand-blue hover:text-brand-blue";

              if (isActive) {
                if (isAll) {
                  buttonStyles =
                    "bg-brand-gold text-brand-black border-brand-gold font-extrabold shadow-md shadow-brand-gold/20";
                } else {
                  buttonStyles =
                    "bg-brand-blue text-white border-brand-blue font-bold shadow-md shadow-brand-blue/20";
                }
              } else if (isAll) {
                buttonStyles =
                  "bg-brand-gold/20 text-brand-black border-brand-gold font-bold hover:bg-brand-gold hover:text-brand-black";
              }

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[11px] sm:text-xs md:text-sm uppercase tracking-wider whitespace-nowrap transition-all border cursor-pointer flex items-center gap-1.5 sm:gap-2 ${buttonStyles}`}
                >
                  {isAll && <Layers size={15} className="text-brand-black shrink-0" />}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* DYNAMIC CATEGORY DESCRIPTION */}
        {activeCategory !== "all" && currentCategoryObj?.description && (
          <div className="max-w-3xl mx-auto mb-8 sm:mb-10 p-4 sm:p-6 bg-white border-l-4 border-brand-gold rounded-r-2xl shadow-sm border-y border-r border-gray-100 transition-all">
            <h2 className="text-lg sm:text-xl font-bold text-brand-black mb-1.5 sm:mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-gold inline-block shrink-0" />
              {currentCategoryObj.label}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
              {currentCategoryObj.description}
            </p>
          </div>
        )}

        {/* SEARCH BAR */}
        <div className="max-w-xl mx-auto mb-8 sm:mb-12 px-1">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, e.g. Starlink, Echo Show, Smart Switch..."
              className="w-full border border-gray-200 bg-white rounded-xl pl-11 pr-11 py-3 sm:py-3.5 text-xs sm:text-sm text-brand-black placeholder-gray-400 focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-gold transition-colors p-1"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {searchQuery && (
            <p className="text-xs sm:text-sm text-gray-500 mt-2.5 text-center">
              Found <span className="font-semibold text-brand-blue">{filteredProducts.length}</span> result{filteredProducts.length !== 1 ? "s" : ""} for "{searchQuery}"
            </p>
          )}
        </div>

        {/* PRODUCT GRID */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-white rounded-2xl border border-dashed border-gray-200 max-w-lg mx-auto px-4">
            <p className="text-sm sm:text-base text-gray-500 font-medium">
              No products match your search or selected category.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                handleClearSearch();
              }}
              className="mt-4 px-4 py-2.5 bg-brand-blue text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-brand-black transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isVideo =
                typeof product.image === "string" &&
                /\.(mp4|webm|ogg|mov)$/i.test(product.image);

              return (
                <div
                  key={product.id}
                  className="border border-gray-200/80 hover:border-brand-gold/50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white flex flex-col group"
                >
                  <div className="relative overflow-hidden h-48 sm:h-56 bg-slate-100">
                    {isVideo ? (
                      <video
                        src={product.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-base sm:text-lg text-brand-black mb-2 group-hover:text-brand-blue transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-5 sm:mb-6 flex-grow leading-relaxed">
                      {product.description}
                    </p>

                    <button
                      onClick={() => handleGetQuote(product)}
                      className="w-full inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-gold text-white hover:text-brand-black font-bold text-xs py-3 sm:py-3.5 px-5 sm:px-6 rounded-xl uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
                    >
                      <span>Get a Quote</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
      <ScrollToTop />

    </section>
  );
}