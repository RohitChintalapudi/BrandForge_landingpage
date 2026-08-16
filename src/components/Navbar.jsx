import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LOGIN_URL, REGISTER_URL } from "../config/appUrls.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.body.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <nav className="w-full fixed top-0 z-50 bg-[#0a071b]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="text-2xl font-bold tracking-tight">
              <span className="text-white">Brand</span>
              <span className="text-[#a855f7]">forge.</span>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "How it works", id: "how-it-works" },
              { label: "Features", id: "features" },
            ].map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -2 }}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-300 cursor-pointer hover:text-white font-semibold text-sm relative group bg-transparent border-none"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#a855f7] group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}

            <div className="flex items-center gap-4 ml-4">
              <a
                href={LOGIN_URL}
                className="px-4 py-2 cursor-pointer text-gray-300 hover:text-white font-semibold text-sm transition-colors text-decoration-none"
              >
                Login
              </a>
              <motion.a
                href={REGISTER_URL}
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(168, 85, 247, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 bg-gradient-to-r from-[#6d28d9] to-[#7c3aed] text-white font-bold rounded-xl cursor-pointer transition-all text-decoration-none text-sm"
              >
                Get Started
              </motion.a>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 border-none bg-transparent cursor-pointer"
          >
            <div className="w-6 h-6 relative">
              <span
                className={`absolute w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isOpen ? "rotate-45 top-3" : "top-2"
                }`}
              />
              <span
                className={`absolute w-6 h-0.5 bg-white rounded-full top-3 transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isOpen ? "-rotate-45 top-3" : "top-4"
                }`}
              />
            </div>
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0a071b] border-t border-white/5 overflow-hidden"
            >
              <div className="px-6 py-4 space-y-2">
                {[
                  { label: "How it works", id: "how-it-works" },
                  { label: "Features", id: "features" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left py-3 px-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl font-semibold transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}

                <div className="pt-4 border-t border-white/5 mt-2 flex flex-col gap-2">
                  <a
                    href={LOGIN_URL}
                    className="w-full py-3 cursor-pointer text-gray-300 hover:text-white font-semibold block text-center text-decoration-none"
                  >
                    Login
                  </a>
                  <a
                    href={REGISTER_URL}
                    className="w-full mt-1 py-3 bg-gradient-to-r from-[#6d28d9] to-[#7c3aed] text-white font-bold rounded-xl cursor-pointer block text-center text-decoration-none"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#6d28d9] to-[#a855f7] z-40"
        style={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
};

export default Navbar;
