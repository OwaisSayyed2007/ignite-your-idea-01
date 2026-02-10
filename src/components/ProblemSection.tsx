import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, Shuffle, Eye } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Generic AI Fails Students",
    description:
      "Most AI tools have zero awareness of your course structure, academic progress, or evaluation patterns. You get broadly correct but practically useless answers.",
  },
  {
    icon: Eye,
    title: "Opaque Career Guidance",
    description:
      "Critical decisions — choosing courses, professors, or mentors — are guided by word-of-mouth and personal networks, leaving most students in the dark.",
  },
  {
    icon: Shuffle,
    title: "Fragmented Information",
    description:
      "Essential academic info, announcements, and opportunities are scattered across disconnected systems and unofficial channels. Nothing talks to each other.",
  },
];

const ProblemSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="problem" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display text-sm font-semibold tracking-widest uppercase mb-4 block">
            The Problem
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Your AI Doesn't Know You
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every student wastes hours re-explaining context, jumping between platforms, 
            and getting answers that don't match what their professor actually taught.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="group glass rounded-2xl p-8 hover:glow-border transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <problem.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-3 text-foreground">
                {problem.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
