import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, Brain, GraduationCap, Zap } from "lucide-react";

const SolutionSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    { icon: Brain, label: "Knows Your Syllabus" },
    { icon: GraduationCap, label: "Tracks Your Progress" },
    { icon: Zap, label: "Instant Relevant Answers" },
    { icon: Bot, label: "One Platform, All Context" },
  ];

  return (
    <section id="solution" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-display text-sm font-semibold tracking-widest uppercase mb-4 block">
              The Solution
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
              AI That Actually{" "}
              <span className="text-gradient">Understands</span> You
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              FIWB AI functions as a central intelligence layer with continuous access to 
              your academic footprint. It knows your enrolled courses, completed coursework, 
              institutional communications, and campus contexts — delivering guidance from 
              real data, not assumptions.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Unlike generic AI that treats every query in isolation, FIWB AI reasons within 
              your full academic context. Your FIWB is unique to you — it will never be the 
              same as anyone else's.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl glass"
                >
                  <f.icon className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-medium text-foreground">{f.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual side - Interactive mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="glass rounded-2xl p-6 glow-border">
              {/* Mock chat interface */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border/50">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-primary/40" />
                <div className="w-3 h-3 rounded-full bg-accent/40" />
                <span className="ml-3 text-sm text-muted-foreground font-display">FIWB AI Chat</span>
              </div>

              {/* Messages */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                  className="flex justify-end"
                >
                  <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-foreground">Explain binary search trees from where we left off last lecture</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.2 }}
                  className="flex justify-start"
                >
                  <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-3 max-w-[85%]">
                    <p className="text-sm text-foreground mb-2">
                      Based on Prof. Sharma's Lecture 14 (DSA - CS201), you covered BST insertion and traversal. 
                      Here's the next topic — <span className="text-primary font-medium">BST Deletion</span>...
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary">CS201</span>
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary">Lecture 14</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.6 }}
                  className="flex justify-end"
                >
                  <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-foreground">Any assignments due for this topic?</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 2.0 }}
                  className="flex justify-start"
                >
                  <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-3 max-w-[85%]">
                    <p className="text-sm text-foreground">
                      📌 Assignment 5 on BSTs is due <span className="text-primary font-medium">Feb 18</span> via Moodle. 
                      It covers insertion, deletion & balancing — synced from your Classroom.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Input */}
              <div className="mt-6 flex items-center gap-2 glass rounded-xl p-3">
                <div className="flex-1 text-sm text-muted-foreground">Ask FIWB anything...</div>
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
