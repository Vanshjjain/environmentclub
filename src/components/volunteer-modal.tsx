import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Sparkles, Send, User, Mail, Phone, School, Heart } from "lucide-react";
import { toast } from "sonner";

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: string;
}

export function VolunteerModal({ isOpen, onClose, defaultRole = "Plantation Drive" }: VolunteerModalProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [college, setCollege] = React.useState("");
  const [role, setRole] = React.useState(defaultRole);
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (defaultRole) setRole(defaultRole);
  }, [defaultRole]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Please fill in your name and email address.");
      return;
    }

    setSubmitted(true);
    toast.success(`Welcome to the movement, ${name}! Your registration was recorded.`);

    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setPhone("");
      setCollege("");
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg rounded-3xl bg-card border border-forest/40 p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* Ambient emerald blur background */}
            <div className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-forest/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 size-60 rounded-full bg-accent/20 blur-3xl" />

            <button
              onClick={onClose}
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-muted/80 text-muted-foreground hover:bg-forest/20 hover:text-accent transition-colors"
              aria-label="Close modal"
            >
              <X className="size-5" />
            </button>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="mx-auto grid size-16 place-items-center rounded-full bg-accent/20 text-accent border border-accent/40 animate-bounce">
                  <CheckCircle2 className="size-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">You&apos;re On Board!</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  Thank you for joining the Environment Club. We will reach out to you via WhatsApp & Email shortly.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
                    <Sparkles className="size-3.5" />
                    Volunteer Onboarding
                  </span>
                </div>

                <h2 className="font-display text-2xl font-extrabold text-foreground">
                  Join The Movement
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Fill in your details below to become an active volunteer in campus drives and clean-ups.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sawan Kanojia"
                        className="w-full rounded-xl bg-muted/60 border border-border pl-10 pr-4 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com"
                          className="w-full rounded-xl bg-muted/60 border border-border pl-10 pr-4 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                        Phone / WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-xl bg-muted/60 border border-border pl-10 pr-4 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Campus / College / Organization
                    </label>
                    <div className="relative">
                      <School className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        placeholder="e.g. CCS University / Meerut College"
                        className="w-full rounded-xl bg-muted/60 border border-border pl-10 pr-4 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Primary Area of Interest
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full rounded-xl bg-muted/60 border border-border px-4 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    >
                      <option value="Plantation Drive">Plantation Drives & Forest Care</option>
                      <option value="Nukkad Natak">Nukkad Natak Street Theatre</option>
                      <option value="Environmental Summits">Environmental Summits & Panels</option>
                      <option value="Water Conservation">Water Body Restoration & Audits</option>
                      <option value="Media & Design">Media, Photography & Socials</option>
                    </select>
                  </div>

                  <div className="pt-2 flex flex-col gap-3 sm:flex-row items-center justify-between">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-forest px-7 py-3 text-sm font-bold text-primary-foreground shadow-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                    >
                      Complete Registration <Send className="size-4" />
                    </button>

                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSeEHUaqvl-nNr_75heT3-fC_sYlcXQIPtDB21ZTq3gUfs5icQ/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-muted-foreground hover:text-accent underline"
                    >
                      Or fill Google Form directly
                    </a>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
