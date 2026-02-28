import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Loader2, Lock } from "lucide-react";

import logo from "../assets/logo.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";

const navLinks = [
  { label: "Problem", href: "/#comparison" },
  { label: "Solution", href: "/#solution" },
  { label: "Innovation", href: "/#innovation" },
  { label: "Progress", href: "/#progress" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const [isUnlocked, setIsUnlocked] = useState(() => {
    return localStorage.getItem("betaUnlocked") === "true";
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [emailToVerify, setEmailToVerify] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleBetaUnlocked = () => setIsUnlocked(true);
    window.addEventListener("betaUnlocked", handleBetaUnlocked);
    return () => window.removeEventListener("betaUnlocked", handleBetaUnlocked);
  }, []);

  // Scroll to section for hash links
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const handleVerify = async () => {
    if (!emailToVerify.trim()) {
      setVerifyError("Please enter your email");
      return;
    }

    setIsVerifying(true);
    setVerifyError("");

    try {
      // Direct live export of the Google Sheet you provided
      const CSV_URL = "https://docs.google.com/spreadsheets/d/1ctqt1xBSB3a6O0iGHc7NE2iEZAFvfdYLYyZNajUpYAs/export?format=csv";
      const response = await fetch(CSV_URL);
      const csvText = await response.text();

      // Basic CSV parsing
      const rows = csvText.split('\n');
      const targetEmail = emailToVerify.trim().toLowerCase();

      let isVerified = false;

      // Loop starting from 1 to skip header
      for (let i = 1; i < rows.length; i++) {
        // Split by comma, considering basic CSV structure (not considering quoted commas for simplicity of email checks)
        const columns = rows[i].split(',');
        if (columns.length >= 6) {
          const rowEmail = columns[2]?.trim().toLowerCase() || "";
          const rowVerifiedStatus = columns[5]?.trim().toLowerCase() || "";

          if (rowEmail === targetEmail && rowVerifiedStatus === "yes") {
            isVerified = true;
            break;
          }
        }
      }

      if (isVerified) {
        setIsUnlocked(true);
        localStorage.setItem("betaUnlocked", "true");
        setIsDialogOpen(false);
        setEmailToVerify(""); // Reset
      } else {
        setVerifyError("Access denied. Ensure you are on the waitlist and verified.");
      }
    } catch (err) {
      console.error(err);
      setVerifyError("Network error. Could not verify at this time.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <>
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
              {isUnlocked ? (
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
                  className="flex items-center gap-1.5 px-4 py-2 md:px-8 md:py-3 rounded-full transition-all duration-300 group shrink-0 font-bold text-xs md:text-base text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 hover:brightness-110 active:scale-95 shadow-lg shadow-indigo-500/20 border border-white/20"
                >
                  <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:animate-spin" />
                  <span>BETA</span>
                </motion.a>
              ) : (
                <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
                  <Link
                    to="/waitlist"
                    className="px-4 py-2 md:px-8 md:py-3 rounded-full bg-blue-600 text-white font-bold text-[10px] md:text-sm shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap shrink-0"
                  >
                    Join Waitlist
                  </Link>
                  <button
                    onClick={() => setIsDialogOpen(true)}
                    className="flex items-center gap-1 text-[10px] md:text-xs font-semibold text-gray-500 hover:text-primary transition-colors whitespace-nowrap"
                  >
                    <Lock className="w-3 h-3" />
                    Access Beta
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.nav>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md pointer-events-auto z-[60]">
          <DialogHeader>
            <DialogTitle>Access Beta Version</DialogTitle>
            <DialogDescription>
              Enter the email you used to join the waitlist. We will instantly verify if you have been approved.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 py-4">
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="you@college.edu"
                value={emailToVerify}
                onChange={(e) => setEmailToVerify(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleVerify();
                  }
                }}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm"
              />
              {verifyError && <p className="text-destructive text-xs font-semibold">{verifyError}</p>}
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all flex items-center gap-2 disabled:opacity-60"
            >
              {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Access"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
