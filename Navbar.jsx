import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Phone, Mail, MessageSquare, ShieldCheck } from 'lucide-react';
import logo from '../assets/images/logo.png';
import logo_2 from '../assets/images/logo_2.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', sectionId: 'home' },
    { name: 'About Us', path: '/', sectionId: 'about' },
    { name: 'Our Services', path: '/', sectionId: 'services' },
    { name: 'Our Products', path: '/product-catalog', isPage: true },
    { name: 'Our Projects', path: '/projects', isPage: true },
    { name: 'Contact Us', path: '/quote', isPage: true },
  ];

  const handleNavigation = (link) => {
    setIsOpen(false);

    if (link.isPage) {
      navigate(link.path);
      return;
    }

    if (location.pathname === '/') {
      if (link.sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(link.sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate('/');
      setTimeout(() => {
        if (link.sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(link.sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300">
      {/* HIGH-VISIBILITY CONTACT BAR */}
      <div className="bg-[var(--color-brand-black)] text-white text-xs py-2 px-4 md:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 font-semibold text-[var(--color-brand-gold)]">
              <ShieldCheck size={13} className="text-[var(--color-brand-gold)]" />
              <span>RC:8976367</span>
            </span>
            <a href="tel:09130799766" className="flex items-center gap-1.5 hover:text-[var(--color-brand-gold)] transition-colors">
              <Phone size={13} className="text-[var(--color-brand-gold)]" />
              <span>09130799766</span>
            </a>
            <a href="mailto:futuricaautomations@gmail.com" className="hidden sm:flex items-center gap-1.5 hover:text-[var(--color-brand-gold)] transition-colors">
              <Mail size={13} className="text-[var(--color-brand-gold)]" />
              <span>futuricaautomations@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://wa.me/2349130799766" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-[var(--color-brand-gold)] hover:underline font-semibold"
            >
              <MessageSquare size={13} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION BAR */}
      <nav className="bg-white border-b border-slate-100 font-sans shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="flex justify-between items-center h-20">

            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
              <img
                src={logo_2}
                alt="Futurica Logo"
                className="h-20 md:h-16 w-auto object-contain bg-white"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link)}
                  className="text-xs font-semibold text-slate-900 hover:text-[var(--color-brand-blue)] uppercase tracking-wider transition-colors cursor-pointer bg-transparent border-none"
                >
                  {link.name}
                </button>
              ))}

              <div className="flex items-center gap-3 ml-2">
                <Link
                  to="/quote"
                  className="group flex items-center gap-2 bg-[var(--color-brand-gold)] text-slate-950 font-heading text-xs font-bold py-3 px-5 rounded-lg transition-all hover:bg-[var(--color-brand-gold-hover)] shadow-md uppercase tracking-wider"
                >
                  Get A Quote
                </Link>
                <Link
                  to="/product-catalog"
                  className="group flex items-center gap-2 bg-[var(--color-brand-blue)] text-white font-heading text-xs font-bold py-3 px-5 rounded-lg transition-all hover:bg-[var(--color-brand-blue-dark)] shadow-md uppercase tracking-wider"
                >
                  Products
                  <ChevronRight
                    size={14}
                    className="transition-transform duration-300 ease-in-out group-hover:translate-x-1 text-[var(--color-brand-gold)]"
                  />
                </Link>
              </div>
            </div>

            {/* Mobile Right Action Bar */}
            <div className="lg:hidden flex items-center gap-6 pr-1">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-[var(--color-brand-gold)] hover:text-[var(--color-brand-blue)] transition-colors focus:outline-none relative h-8 w-8 overflow-hidden"
              >
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                  isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180 scale-50'
                }`}>
                  <X size={28} strokeWidth={2} />
                </div>
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                  isOpen ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0'
                }`}>
                  <Menu size={28} strokeWidth={2} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out grid ${
          isOpen ? 'grid-rows-[1fr] opacity-100 visible' : 'grid-rows-[0fr] opacity-0 invisible'
        }`}>
          <div className="overflow-y-auto max-h-[calc(100vh-120px)] bg-white shadow-2xl border-t border-gray-100">
            <div className="flex flex-col p-6 space-y-1">
              {navLinks.map((link, index) => (
                <React.Fragment key={link.name}>
                  <button
                    onClick={() => handleNavigation(link)}
                    className="font-heading font-semibold text-base py-4 text-slate-900 hover:text-[var(--color-brand-blue)] transition-all block text-center bg-transparent border-none cursor-pointer"
                  >
                    {link.name}
                  </button>
                  {index !== navLinks.length - 1 && (
                    <div className="h-[1px] w-full bg-slate-100" />
                  )}
                </React.Fragment>
              ))}

              <div className="pt-6 space-y-3">
                <Link
                  to="/quote"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-4 text-center text-xs font-heading font-bold text-slate-950 bg-[var(--color-brand-gold)] hover:bg-[var(--color-brand-gold-hover)] rounded-xl uppercase tracking-wider shadow-lg block"
                >
                  Request A Quote
                </Link>
                <Link
                  to="/product-catalog"
                  onClick={() => setIsOpen(false)}
                  className="group w-full py-4 text-center text-xs font-heading font-bold text-white flex items-center justify-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] rounded-xl uppercase tracking-wider shadow-lg transition-all"
                >
                  Explore Products
                  <ChevronRight
                    size={16}
                    className="transition-transform duration-300 ease-in-out group-hover:translate-x-1 text-[var(--color-brand-gold)]"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}