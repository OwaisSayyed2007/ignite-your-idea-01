import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link2, User, Cpu } from "lucide-react";

const innovations = [
  {
    icon: Link2,
    title: "Unified Academic Awareness",
    subtitle: "LMS INTEGRATIONS — ONE PLATFORM FOR ALL",
    description:
      "FIWB AI securely integrates with tools you already use — institutional email, Google Classroom, Moodle, and campus apps. It stays continuously aware of deadlines, announcements, and institutional activity.",
    visual: (
      <div className="flex items-center gap-3 flex-wrap">
        {["Classroom", "Moodle", "Gmail", "Drive"].map((tool) => (
          <span key={tool} className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            {tool}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: User,
    title: "Longitudinal Student Understanding",
    subtitle: "YOUR EVER-EVOLVING DIGITAL TWIN",
    description:
      "Beyond current enrollment, FIWB AI maintains awareness of your academic history — past courses, subject exposure, and accumulated knowledge. It adapts responses to your demonstrated background, not generic assumptions.",
    visual: (
      <div className="flex items-center gap-2">
        {["Sem 1", "Sem 2", "Sem 3", "Current"].map((sem, i) => (
          <div key={sem} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${i === 3 ? "bg-primary animate-pulse-glow" : "bg-primary/30"}`} />
            <span className="text-xs text-muted-foreground">{sem}</span>
            {i < 3 && <div className="w-6 h-px bg-border" />}
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Cpu,
    title: "Context-Driven Intelligence",
    subtitle: "AN AI THAT KNOWS YOU",
    description:
      "FIWB AI synthesizes your academic history, course materials, institutional updates, and faculty context to produce precise, personalized answers. It doesn't just answer — it reasons within your full academic context.",
    visual: (
      <div className="flex items-center gap-4">
        <div className="glass rounded-lg px-3 py-2 text-xs text-muted-foreground">Academic History</div>
        <div className="text-primary">+</div>
        <div className="glass rounded-lg px-3 py-2 text-xs text-muted-foreground">Live Updates</div>
        <div className="text-primary">=</div>
        <div className="bg-primary/10 border border-primary/30 rounded-lg px-3 py-2 text-xs text-primary font-medium">Perfect Answer</div>
      </div>
    ),
  },
];

const InnovationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="innovation" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display text-sm font-semibold tracking-widest uppercase mb-4 block">
            Innovation
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            What Makes FIWB AI <span className="text-gradient">Different</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {innovations.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="glass rounded-2xl p-8 md:p-10 hover:glow-border transition-all duration-500 group"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-primary font-display font-semibold tracking-widest uppercase mb-2">
                    {item.subtitle}
                  </p>
                  <h3 className="font-display font-bold text-2xl mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {item.description}
                  </p>
                  {item.visual}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
