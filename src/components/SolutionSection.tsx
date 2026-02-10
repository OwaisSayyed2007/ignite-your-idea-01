import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, GraduationCap, Zap, Bot } from "lucide-react";

const SolutionSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    { icon: Brain, label: "Knows Your Syllabus", desc: "Understands your exact course structure and what you've covered." },
    { icon: GraduationCap, label: "Tracks Your Progress", desc: "Monitors assignments, grades, and upcoming deadlines automatically." },
    { icon: Zap, label: "Instant Relevant Answers", desc: "Responses grounded in your professor's material, not the internet." },
    { icon: Bot, label: "One Platform, All Context", desc: "No more switching between LMS, notes, and chat — it's all here." },
  ];

  return (
    <section id="solution" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display text-sm font-semibold tracking-widest uppercase mb-4 block">
            The Solution
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
            AI That Actually{" "}
            <span className="text-gradient">Understands</span> You
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            FIWB AI functions as a central intelligence layer with continuous access to
            your academic footprint — delivering guidance from real data, not assumptions.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="group glass rounded-2xl p-6 hover:glow-border transition-all duration-500 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 mx-auto group-hover:bg-primary/20 transition-colors duration-300">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2 text-foreground">
                {f.label}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
