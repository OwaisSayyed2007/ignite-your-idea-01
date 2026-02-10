import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Circle, Rocket } from "lucide-react";

const milestones = [
  { label: "Concept Validated", done: true },
  { label: "Proof of Concept Complete", done: true },
  { label: "Architecture Designed & Validated", done: true },
  { label: "MVP Development", done: true, current: true },
  { label: "Beta Testing with Early Users", done: false },
  { label: "Public Launch", done: false },
];

const ProgressSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="progress" className="section-padding relative" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display text-sm font-semibold tracking-widest uppercase mb-4 block">
            Progress
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Where We Are <span className="text-gradient">Right Now</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            FIWB AI is currently in the MVP stage. Our core platform is built, validated, 
            and being refined for pilot deployments.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-8">
            {milestones.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className={`relative flex items-center gap-6 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ml-16 md:ml-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                  <div
                    className={`inline-block glass rounded-xl px-6 py-4 ${
                      m.current ? "glow-border" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`font-display font-semibold ${m.current ? "text-primary" : m.done ? "text-foreground" : "text-muted-foreground"}`}>
                        {m.label}
                      </span>
                      {m.current && <Rocket className="w-4 h-4 text-primary" />}
                    </div>
                  </div>
                </div>

                {/* Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  {m.done ? (
                    <CheckCircle2 className={`w-5 h-5 ${m.current ? "text-primary" : "text-primary/60"}`} />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground/40" />
                  )}
                </div>

                {/* Spacer for layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;
