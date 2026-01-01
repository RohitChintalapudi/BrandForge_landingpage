import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LOGIN_URL, REGISTER_URL } from "../config/appUrls.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
      <nav className="w-full fixed top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="text-2xl font-bold">
              <span className="text-gray-900">Brand</span>
              <span className="text-orange-500">Forge</span>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "How it works", id: "how-it-works" },
              { label: "Features", id: "features" },
              { label: "For Brands", id: "for-brands" },
              { label: "For Creators", id: "for-creators" },
            ].map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -2 }}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 cursor-pointer hover:text-orange-600 font-medium text-sm relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}

            <div className="flex items-center gap-3 ml-4">
              <a
                href={LOGIN_URL}
                className="px-4 py-2 cursor-pointer text-gray-700 hover:text-gray-900 font-medium text-sm"
              >
                Login
              </a>
              <motion.a
                href={REGISTER_URL}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 cursor-pointer transition-colors"
              >
                Get Started
              </motion.a>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <div className="w-6 h-6 relative">
              <span
                className={`absolute w-6 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                  isOpen ? "rotate-45 top-3" : "top-2"
                }`}
              />
              <span
                className={`absolute w-6 h-0.5 bg-gray-700 rounded-full top-3 transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute w-6 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
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
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-4 space-y-1">
                {[
                  { label: "How it works", id: "how-it-works" },
                  { label: "Features", id: "features" },
                  { label: "For Brands", id: "for-brands" },
                  { label: "For Creators", id: "for-creators" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left py-3 px-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg font-medium transition-colors"
                  >
                    {item.label}
                  </button>
                ))}

                <div className="pt-4 border-t border-gray-100 mt-2">
                  <a
                    href={LOGIN_URL}
                    className="w-full py-3 cursor-pointer text-gray-700 hover:text-gray-900 font-medium block"
                  >
                    Login
                  </a>
                  <a
                    href={REGISTER_URL}
                    className="w-full mt-2 py-3 bg-orange-500 text-white font-semibold rounded-lg cursor-pointer hover:bg-orange-600 transition-colors block text-center"
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
        className="fixed top-0 left-0 h-1 bg-orange-500 z-40"
        initial={{ width: 0 }}
        animate={{
          width: `${
            (window.scrollY /
              (document.body.scrollHeight - window.innerHeight)) *
            100
          }%`,
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
};

export default Navbar;
