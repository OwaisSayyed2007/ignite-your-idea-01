import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { z } from "zod";

const waitlistSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(10, "Valid phone number required").max(15),
  college: z.string().trim().min(1, "College name is required").max(200),
  year: z.string().min(1, "Please select your year"),
});

type WaitlistData = z.infer<typeof waitlistSchema>;

const WaitlistSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof WaitlistData, string>>>({});
  const [form, setForm] = useState<WaitlistData>({
    name: "",
    email: "",
    phone: "",
    college: "",
    year: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = waitlistSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof WaitlistData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof WaitlistData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);

    try {
      // GOOGLE SHEETS INTEGRATION
      const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyE00HV7fFM8zfwdVnCVe_nqgSzHiifU3Eb7r_HrheTpc931eijWumSyYeK-7F-7Ps/exec";

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Required for Google Apps Script
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      setLoading(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
      setLoading(false);
      setErrors({ ...errors, email: "Something went wrong. Please try again." });
    }
  };

  return (
    <section id="waitlist" className="pb-12 md:pb-16 lg:pb-20 xl:pb-24 pt-8 md:pt-12 relative overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="max-w-2xl mx-auto relative px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="text-primary font-display text-sm font-semibold tracking-widest uppercase mb-4 block">
            Early Access
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mb-4 md:mb-6">
            Be the First to <span className="text-gradient">Experience</span> FIWB AI
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            We're rolling out to a limited group of early beta users.
            Join the waitlist and get priority access.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass rounded-2xl p-10 text-center glow-border"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display font-bold text-2xl mb-3 text-foreground">You're on the list!</h3>
              <p className="text-muted-foreground">
                We'll reach out soon with early access details. Get ready to never explain your syllabus to AI again.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 lg:p-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                    maxLength={100}
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@college.edu"
                    className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                    maxLength={255}
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="1234567890"
                    className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                    maxLength={15}
                  />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">College / University</label>
                  <input
                    name="college"
                    value={form.college}
                    onChange={handleChange}
                    placeholder="College Name"
                    className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                    maxLength={200}
                  />
                  {errors.college && <p className="text-destructive text-xs mt-1">{errors.college}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Year of Study</label>
                  <select
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm appearance-none"
                  >
                    <option value="" className="bg-card">Select year</option>
                    <option value="1st" className="bg-card">1st Year</option>
                    <option value="2nd" className="bg-card">2nd Year</option>
                    <option value="3rd" className="bg-card">3rd Year</option>
                    <option value="4th" className="bg-card">4th Year</option>
                    <option value="pg" className="bg-card">Post Graduate</option>
                  </select>
                  {errors.year && <p className="text-destructive text-xs mt-1">{errors.year}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-base hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Get Early Access
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                No spam. We'll only email you about FIWB AI updates and early access.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistSection;
