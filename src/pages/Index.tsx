import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import InnovationSection from "@/components/InnovationSection";
import ProgressSection from "@/components/ProgressSection";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <InnovationSection />
      <ProgressSection />
      <WaitlistSection />
      <Footer />
    </div>
  );
};

export default Index;
