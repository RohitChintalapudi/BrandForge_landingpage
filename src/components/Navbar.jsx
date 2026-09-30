import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowUpRight, Menu, X, Sparkles, Layers, Flame, Trophy, Calculator, HelpCircle } from "lucide-react";
import { LOGIN_URL, REGISTER_URL } from "../config/appUrls.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks = [
    { label: "Live Demo", id: "live-demo" },
    { label: "Features", id: "for-brands" },
    { label: "Campaigns", id: "campaigns-explorer" },
    { label: "Workflow", id: "how-it-works" },
    { label: "ROI Calc", id: "roi-calculator" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const scrollPosition = window.scrollY + 120;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-2 sm:top-3 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        {/* Floating Compact Glass Island */}
        <div
          className={`relative rounded-2xl transition-all duration-300 ${
            scrolled
              ? "bg-white/90 backdrop-blur-xl border border-purple-100/90 shadow-[0_8px_30px_rgba(124,58,237,0.08)] py-2 px-3 sm:px-4"
              : "bg-white/80 backdrop-blur-md border border-purple-100/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-2 px-3 sm:px-4"
          }`}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Compact Brand Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5 cursor-pointer select-none flex-shrink-0"
            >
              <img
                src="/favi.png"
                alt="BrandForge"
                className="w-8 h-8 rounded-xl object-contain flex-shrink-0 shadow-xs"
              />

              <div className="text-base sm:text-lg font-black tracking-tight text-[#1e1b4b]">
                Brand<span className="bg-gradient-to-r from-[#7C3AED] to-[#6366F1] bg-clip-text text-transparent">Forge</span>
              </div>
            </motion.div>

            {/* Curated Compact Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-slate-50/80 p-1 rounded-xl border border-slate-100">
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-3 py-1 text-xs font-semibold rounded-lg transition-all duration-150 border-none cursor-pointer ${
                      isActive
                        ? "text-[#6d28d9] bg-white shadow-xs font-bold"
                        : "text-slate-600 hover:text-[#7c3aed] hover:bg-white/60 bg-transparent"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Quick Actions */}
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              <a
                href={LOGIN_URL}
                className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-[#7c3aed] hover:bg-purple-50/70 rounded-lg transition-colors"
              >
                Sign In
              </a>

              <motion.a
                href={REGISTER_URL}
                whileHover={{ y: -1, boxShadow: "0 4px 16px rgba(124, 58, 237, 0.35)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#8b5cf6] via-[#7c3aed] to-[#4f46e5] text-white text-xs font-bold shadow-[0_2px_10px_rgba(124,58,237,0.25)] transition-all"
              >
                <span>Get Started</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </motion.a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-1.5 rounded-lg text-slate-700 hover:bg-purple-50 hover:text-[#7c3aed] transition-colors border border-purple-100/60 bg-white/50"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Card */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="md:hidden mt-2 p-3 bg-white/95 backdrop-blur-xl border border-purple-100 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left py-2 px-3 rounded-xl text-xs font-bold text-slate-700 hover:text-[#7c3aed] hover:bg-purple-50/80 transition-colors flex items-center justify-between border-none bg-transparent cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
                  </button>
                ))}

                <div className="pt-2.5 mt-1 border-t border-purple-100 flex items-center gap-2">
                  <a
                    href={LOGIN_URL}
                    className="flex-1 py-2 text-center text-xs font-bold text-slate-700 hover:text-[#7c3aed] bg-slate-50 hover:bg-purple-50 rounded-xl transition-all"
                  >
                    Sign In
                  </a>
                  <a
                    href={REGISTER_URL}
                    className="flex-1 py-2 text-center text-xs font-bold text-white bg-gradient-to-r from-[#8b5cf6] via-[#7c3aed] to-[#4f46e5] rounded-xl shadow-sm hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-1"
                  >
                    <span>Get Started</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
