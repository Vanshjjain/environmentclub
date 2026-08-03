import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Heart, Trees, FileSignature, Send, User, Mail } from "lucide-react";
import { toast } from "sonner";

interface CampaignSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignTitle?: string;
}

export function CampaignSupportModal({
  isOpen,
  onClose,
  campaignTitle = "Plastic Free Meerut",
}: CampaignSupportModalProps) {
  const [supportType, setSupportType] = React.useState<"volunteer" | "sponsor" | "petition">("volunteer");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [saplingsCount, setSaplingsCount] = React.useState(5);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Please enter your name and email.");
      return;
    }

    setSubmitted(true);
    toast.success(`Thank you, ${name}! Your pledge for "${campaignTitle}" was recorded.`);

    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      onClose();
    }, 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg rounded-3xl bg-card border border-forest/40 p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
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
                <h3 className="font-display text-2xl font-bold text-foreground">Support Confirmed!</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  Your pledge for <strong>{campaignTitle}</strong> has been logged. Our campaign leads will follow up shortly.
                </p>
              </div>
            ) : (
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent mb-3">
                  <Heart className="size-3.5 fill-accent" />
                  Support Campaign
                </span>

                <h2 className="font-display text-2xl font-extrabold text-foreground">
                  {campaignTitle}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Choose how you want to contribute to this campaign&apos;s goal.
                </p>

                {/* Support Option Selector */}
                <div className="mt-5 grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSupportType("volunteer")}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                      supportType === "volunteer"
                        ? "border-accent bg-accent/15 text-accent font-bold"
                        : "border-border bg-muted/40 text-muted-foreground hover:border-forest/40"
                    }`}
                  >
                    <User className="size-5 mb-1" />
                    <span className="text-[11px]">Volunteer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSupportType("sponsor")}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                      supportType === "sponsor"
                        ? "border-accent bg-accent/15 text-accent font-bold"
                        : "border-border bg-muted/40 text-muted-foreground hover:border-forest/40"
                    }`}
                  >
                    <Trees className="size-5 mb-1" />
                    <span className="text-[11px]">Sponsor Saplings</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSupportType("petition")}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                      supportType === "petition"
                        ? "border-accent bg-accent/15 text-accent font-bold"
                        : "border-border bg-muted/40 text-muted-foreground hover:border-forest/40"
                    }`}
                  >
                    <FileSignature className="size-5 mb-1" />
                    <span className="text-[11px]">Sign Petition</span>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full rounded-xl bg-muted/60 border border-border px-4 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full rounded-xl bg-muted/60 border border-border px-4 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none"
                    />
                  </div>

                  {supportType === "sponsor" && (
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                        Saplings to Sponsor ({saplingsCount} Saplings = ₹{saplingsCount * 100})
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={saplingsCount}
                        onChange={(e) => setSaplingsCount(Number(e.target.value))}
                        className="w-full accent-accent"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                  >
                    Submit Support Pledge <Send className="size-4" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
