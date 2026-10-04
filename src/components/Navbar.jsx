import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowUpRight, Menu, X } from "lucide-react";
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

      const scrollPosition = window.scrollY + 140;
      let current = "";
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = link.id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setIsOpen(false);
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -85;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 24,
        mass: 0.8,
        delay: 0.15,
      }}
      className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none"
    >
      {/* iPhone Dynamic Island Container (White Glass Edition) */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        className={`pointer-events-auto transition-all duration-300 backdrop-blur-2xl ${
          isOpen
            ? "w-full max-w-lg rounded-[32px] p-4 sm:p-5 bg-white/98 border border-purple-200/90 shadow-[0_24px_60px_-12px_rgba(15,23,42,0.18),0_8px_32px_rgba(124,58,237,0.16)]"
            : `rounded-full py-2 sm:py-2.5 px-3.5 sm:px-5 bg-white/95 border ${
                scrolled
                  ? "border-purple-200/90 shadow-[0_16px_40px_-6px_rgba(15,23,42,0.14),0_6px_24px_rgba(124,58,237,0.14)]"
                  : "border-purple-100/90 shadow-[0_12px_32px_-6px_rgba(15,23,42,0.1),0_4px_18px_rgba(124,58,237,0.1)]"
              }`
        }`}
      >
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Dynamic Island Brand Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setActiveSection("");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 cursor-pointer select-none flex-shrink-0 pl-1"
          >
            <img
              src="/favi.png"
              alt="BrandForge"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-contain flex-shrink-0 shadow-xs ring-2 ring-purple-100"
            />

            <div className="text-lg sm:text-xl font-black tracking-tight text-[#1e1b4b] leading-none">
              <span className="font-extrabold text-[#1e1b4b]">Brand</span><span className="bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#4F46E5] bg-clip-text text-transparent font-black">Forge</span>
            </div>
          </motion.div>

          {/* Dynamic Island Animated Gliding Segmented Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 relative">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-200 border-none cursor-pointer select-none ${
                    isActive
                      ? "text-[#6d28d9] font-bold"
                      : "text-slate-600 hover:text-[#7c3aed] bg-transparent"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePillIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 32,
                      }}
                      className="absolute inset-0 bg-white rounded-full shadow-[0_2px_10px_rgba(124,58,237,0.14),0_1px_3px_rgba(0,0,0,0.05)] border border-purple-200/80"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6366f1]"
                      />
                    )}
                    <span>{item.label}</span>
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Dynamic Island Right Actions */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0 pr-1">
            <a
              href={LOGIN_URL}
              className="px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#7c3aed] hover:bg-purple-50/70 rounded-full transition-colors"
            >
              Sign In
            </a>

            <motion.a
              href={REGISTER_URL}
              whileHover={{ y: -1, scale: 1.02, boxShadow: "0 6px 20px rgba(124, 58, 237, 0.35)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#8b5cf6] via-[#7c3aed] to-[#4f46e5] text-white text-xs sm:text-sm font-bold shadow-[0_3px_14px_rgba(124,58,237,0.28)] transition-all"
            >
              <span>Get Started</span>
              <ChevronRight className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Dynamic Island Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full text-slate-700 hover:bg-purple-50 hover:text-[#7c3aed] transition-colors border border-purple-100/80 bg-white/70"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Dynamic Island Expanded Menu (Mobile) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="md:hidden mt-3.5 pt-3.5 border-t border-purple-100 overflow-hidden"
            >
              <div className="flex flex-col gap-1.5">
                {navLinks.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left py-2.5 px-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-between border-none cursor-pointer ${
                        isActive
                          ? "text-[#6d28d9] bg-purple-50/90 border border-purple-200/80 shadow-xs"
                          : "text-slate-700 hover:text-[#7c3aed] hover:bg-purple-50/50 bg-transparent"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6366f1]" />
                        )}
                        <span>{item.label}</span>
                      </span>
                      <ChevronRight className={`w-4 h-4 ${isActive ? "text-[#7c3aed]" : "text-purple-400"}`} />
                    </button>
                  );
                })}

                <div className="pt-3 mt-1.5 border-t border-purple-100 flex items-center gap-2.5">
                  <a
                    href={LOGIN_URL}
                    className="flex-1 py-2.5 text-center text-xs sm:text-sm font-bold text-slate-700 hover:text-[#7c3aed] bg-slate-50 hover:bg-purple-50 rounded-full transition-all border border-slate-100"
                  >
                    Sign In
                  </a>
                  <a
                    href={REGISTER_URL}
                    className="flex-1 py-2.5 text-center text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#8b5cf6] via-[#7c3aed] to-[#4f46e5] rounded-full shadow-md hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Get Started</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;
