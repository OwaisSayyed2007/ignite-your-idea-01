import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";

import logo from "../assets/logo.png";

const navLinks = [
  { label: "Problem", href: "/#comparison" },
  { label: "Solution", href: "/#solution" },
  { label: "Innovation", href: "/#innovation" },
  { label: "Progress", href: "/#progress" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to section for hash links
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none p-2 sm:p-4 w-full">
      <motion.nav
        layout
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className={`pointer-events-auto backdrop-blur-xl border overflow-hidden shadow-2xl ${scrolled
          ? "w-fit min-w-[min(280px,100vw-1rem)] max-w-[95vw] md:min-w-[600px] rounded-full bg-white/60 border-black/10 px-3 sm:px-6 py-2 sm:py-3"
          : "w-full max-w-7xl rounded-full bg-white/20 border-white/10 px-4 sm:px-6 md:px-12 h-16 sm:h-20"
          }`}
      >
        <div className="flex items-center justify-between h-full gap-2 sm:gap-4 md:gap-8 lg:gap-12 w-full">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-3 shrink-0 pointer-events-auto">
            <img
              src={logo}
              alt="FIWB AI Logo"
              className={`transition-all duration-300 ${scrolled ? "h-6 sm:h-8" : "h-8 sm:h-12"}`}
            />
            <motion.span
              layout
              className={`font-display font-bold text-foreground whitespace-nowrap ${scrolled ? "text-sm sm:text-base" : "text-base sm:text-xl"
                }`}
            >
              FIWB <span className="text-primary">AI</span>
            </motion.span>
          </Link>

          {/* Desktop Links - Hidden on Mobile */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-gray-800 hover:text-primary transition-all duration-300 font-bold whitespace-nowrap ${scrolled ? "text-base" : "text-lg"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 shrink-0">
            <motion.a
              href="https://app.fiwbai.xyz"
              target="_blank"
              rel="noopener noreferrer"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(139, 92, 246, 0)",
                  "0 0 20px rgba(139, 92, 246, 0.4)",
                  "0 0 0px rgba(139, 92, 246, 0)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 md:px-8 md:py-3 rounded-full transition-all duration-300 group shrink-0 font-bold text-[10px] sm:text-xs md:text-base text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 hover:brightness-110 active:scale-95 shadow-lg shadow-indigo-500/20 border border-white/20"
            >
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 group-hover:animate-spin" />
              <span>BETA</span>
            </motion.a>

            <Link
              to="/waitlist"
              className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-8 md:py-3 rounded-full bg-blue-600 text-white font-bold text-[10px] sm:text-xs md:text-base shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap shrink-0"
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
