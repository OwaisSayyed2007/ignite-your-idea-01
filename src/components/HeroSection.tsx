import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Zap, Bot } from "lucide-react";

const rotatingWords = ["Knows You", "Not Dumb", "Unique to You"];

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Section 1: Spline background + Chat mockup */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Spline 3D Background */}
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://my.spline.design/glassmorphlandingpage-Vrnw8J2CWeg0MTg0gVUTciUU/"
            frameBorder="0"
            width="100%"
            height="100%"
            className="w-full h-full"
            title="3D Background"
          />
          <div className="absolute inset-0 bg-background/40" />
        </div>

        {/* Chat mockup overlay */}
        <div className="relative z-10 w-full max-w-2xl mx-auto px-6 pt-28 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass rounded-2xl p-6 glow-border"
          >
            {/* Window chrome */}
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
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-end"
              >
                <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%]">
                  <p className="text-sm text-foreground">Explain binary search trees from where we left off last lecture</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
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
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="flex justify-end"
              >
                <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%]">
                  <p className="text-sm text-foreground">Any assignments due for this topic?</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.3 }}
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
          </motion.div>
        </div>
      </section>

      {/* Section 2: Rotating headline */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] mb-4">
              An AI That Is
            </h1>
            <div className="h-[1.2em] text-5xl md:text-7xl lg:text-8xl font-display font-bold overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingWords[wordIndex]}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="block text-gradient glow-text"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#waitlist"
              className="group px-8 py-4 rounded-full bg-primary text-primary-foreground font-display font-semibold text-base hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex items-center gap-2"
            >
              Join the Waitlist
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#solution"
              className="px-8 py-4 rounded-full glass border-primary/20 text-foreground font-display font-medium text-base hover:border-primary/40 transition-all duration-300"
            >
              See How It Works
            </a>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Why generic AI is bad */}
      <section className="relative py-20 md:py-28 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <span className="text-primary font-display text-sm font-semibold tracking-widest uppercase mb-4 block">
              The Hard Truth
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight">
              Stop Training Your AI.{" "}
              <span className="text-gradient">Let It Train For You.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass rounded-2xl p-8 glow-border"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center justify-center mb-5">
                <Bot className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-3 text-foreground">
                Generic AI
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                You spend <span className="text-foreground font-medium">hours re-explaining</span> your syllabus, 
                your professor's style, your course structure — every single time. It forgets everything. 
                You're training the AI instead of learning.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass rounded-2xl p-8 glow-border relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px]" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-3 text-foreground">
                  FIWB AI
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  FIWB already knows your courses, your professors, and your progress. 
                  You don't spend a second on context — you go{" "}
                  <span className="text-primary font-medium">straight to becoming smarter</span>. 
                  Your time is for learning, not explaining.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
