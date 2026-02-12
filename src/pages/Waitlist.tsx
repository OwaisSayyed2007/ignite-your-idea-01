import Navbar from "@/components/Navbar";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Waitlist = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />
            <main className="pt-28 md:pt-32">
                <div className="max-w-7xl mx-auto px-6 md:px-12 mb-2">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                </div>
                <WaitlistSection />
            </main>
            <Footer />
        </div>
    );
};

export default Waitlist;
