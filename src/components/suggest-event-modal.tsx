import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, CalendarPlus, Bell, Send } from "lucide-react";
import { toast } from "sonner";

interface SuggestEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuggestEventModal({ isOpen, onClose }: SuggestEventModalProps) {
  const [activeTab, setActiveTab] = React.useState<"suggest" | "notify">("suggest");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [eventIdea, setEventIdea] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setSubmitted(true);
    if (activeTab === "suggest") {
      toast.success("Thank you! Your event idea has been submitted to the team.");
    } else {
      toast.success("Subscribed! You will receive email alerts when new events are posted.");
    }

    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setEventIdea("");
      setLocation("");
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
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {activeTab === "suggest" ? "Idea Received!" : "Alerts Active!"}
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  {activeTab === "suggest"
                    ? "Our team will review your suggested event site and reach out."
                    : "You are subscribed to the Environment Club event dispatch list."}
                </p>
              </div>
            ) : (
              <div>
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab("suggest")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      activeTab === "suggest"
                        ? "border-accent bg-accent/15 text-accent"
                        : "border-border bg-muted/40 text-muted-foreground hover:border-forest/30"
                    }`}
                  >
                    <CalendarPlus className="size-4" /> Suggest Event
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("notify")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      activeTab === "notify"
                        ? "border-accent bg-accent/15 text-accent"
                        : "border-border bg-muted/40 text-muted-foreground hover:border-forest/30"
                    }`}
                  >
                    <Bell className="size-4" /> Get Event Alerts
                  </button>
                </div>

                <h2 className="font-display text-2xl font-extrabold text-foreground">
                  {activeTab === "suggest" ? "Suggest An Event / Clean-up" : "Subscribe To Event Alerts"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {activeTab === "suggest"
                    ? "Have a park, riverbank or school in mind that needs a cleanup or tree drive?"
                    : "Be the first to know when a new plantation drive or workshop is scheduled."}
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {activeTab === "suggest" && (
                    <>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                          Event Title / Idea *
                        </label>
                        <input
                          type="text"
                          required
                          value={eventIdea}
                          onChange={(e) => setEventIdea(e.target.value)}
                          placeholder="e.g. Kali Nadi Plastic Cleanup Drive"
                          className="w-full rounded-xl bg-muted/60 border border-border px-4 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                          Proposed Location (City / Campus)
                        </label>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Shastri Nagar Park, Meerut"
                          className="w-full rounded-xl bg-muted/60 border border-border px-4 py-2.5 text-sm font-medium text-foreground focus:border-accent focus:outline-none"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
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

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                  >
                    {activeTab === "suggest" ? "Submit Event Idea" : "Subscribe For Alerts"} <Send className="size-4" />
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
