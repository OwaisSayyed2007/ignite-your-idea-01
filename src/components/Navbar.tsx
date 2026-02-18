import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

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
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none p-4">
      <motion.nav
        layout
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        className={`pointer-events-auto backdrop-blur-xl border overflow-hidden shadow-2xl ${scrolled
          ? "w-fit min-w-[280px] max-w-[95vw] md:min-w-[600px] rounded-full bg-white/60 border-black/10 px-6 py-3"
          : "w-full max-w-7xl rounded-full bg-white/20 border-white/10 px-6 md:px-12 h-20"
          }`}
      >
        <div className="flex items-center justify-between h-full gap-4 md:gap-8 lg:gap-12">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 shrink-0 pointer-events-auto">
            <img
              src={logo}
              alt="FIWB AI Logo"
              className={`transition-all duration-300 ${scrolled ? "h-8" : "h-12"}`}
            />
            <motion.span
              layout
              className={`font-display font-bold text-foreground whitespace-nowrap ${scrolled ? "text-base" : "text-xl"
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
          <div className="flex items-center gap-2 md:gap-4">
            <a
              href="https://app.fiwbai.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 px-4 py-2 md:px-6 md:py-2.5 rounded-full border transition-all duration-300 group shrink-0 ${scrolled
                ? "bg-black text-white hover:bg-black/90"
                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                }`}
            >
              <span className="font-bold text-xs md:text-sm">BETA</span>
            </a>

            <Link
              to="/waitlist"
              className="px-4 py-2 md:px-8 md:py-3 rounded-full bg-blue-600 text-white font-bold text-xs md:text-base shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap shrink-0"
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
