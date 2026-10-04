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
      className="fixed top-2.5 sm:top-3.5 inset-x-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none"
    >
      {/* iPhone Dynamic Island Container */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        className={`pointer-events-auto transition-all duration-300 backdrop-blur-2xl ${
          isOpen
            ? "w-full max-w-md rounded-[28px] p-3.5 bg-[#0a0718]/95 border border-purple-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(124,58,237,0.25)]"
            : `rounded-full py-1.5 px-2.5 sm:px-3.5 bg-[#0b081c]/90 border ${
                scrolled
                  ? "border-purple-400/35 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.45),0_0_24px_rgba(124,58,237,0.25)]"
                  : "border-white/15 shadow-[0_12px_30px_-6px_rgba(0,0,0,0.35),0_0_18px_rgba(124,58,237,0.18)]"
              }`
        }`}
      >
        <div className="flex items-center justify-between gap-3 sm:gap-5">
          {/* Dynamic Island Brand Logo */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 cursor-pointer select-none flex-shrink-0 pl-1"
          >
            <img
              src="/favi.png"
              alt="BrandForge"
              className="w-7 h-7 rounded-full object-contain flex-shrink-0 shadow-sm ring-1 ring-purple-400/40"
            />

            <div className="text-base sm:text-lg font-black tracking-tight leading-none">
              <span className="font-extrabold text-white">Brand</span><span className="bg-gradient-to-r from-[#c084fc] via-[#a855f7] to-[#818cf8] bg-clip-text text-transparent font-black">Forge</span>
            </div>
          </motion.div>

          {/* Dynamic Island Segmented Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-0.5 bg-white/[0.06] p-1 rounded-full border border-white/10">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 border-none cursor-pointer ${
                    isActive
                      ? "text-white bg-purple-600/60 shadow-[0_0_12px_rgba(168,85,247,0.4)] font-bold border border-purple-400/40"
                      : "text-slate-300 hover:text-white hover:bg-white/10 bg-transparent"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Dynamic Island Right Actions */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0 pr-0.5">
            <a
              href={LOGIN_URL}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              Sign In
            </a>

            <motion.a
              href={REGISTER_URL}
              whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(168, 85, 247, 0.45)" }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#8b5cf6] via-[#7c3aed] to-[#4f46e5] text-white text-xs font-bold shadow-[0_2px_12px_rgba(124,58,237,0.3)] transition-all border border-purple-300/30"
            >
              <span>Get Started</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.a>
          </div>

          {/* Dynamic Island Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/15 transition-colors border border-white/15 bg-white/5"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
              className="md:hidden mt-3 pt-3 border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left py-2 px-3 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between border-none bg-transparent cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
                  </button>
                ))}

                <div className="pt-2.5 mt-1 border-t border-white/10 flex items-center gap-2">
                  <a
                    href={LOGIN_URL}
                    className="flex-1 py-2 text-center text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10"
                  >
                    Sign In
                  </a>
                  <a
                    href={REGISTER_URL}
                    className="flex-1 py-2 text-center text-xs font-bold text-white bg-gradient-to-r from-[#8b5cf6] via-[#7c3aed] to-[#4f46e5] rounded-full shadow-sm hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-1 border border-purple-400/30"
                  >
                    <span>Get Started</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
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
