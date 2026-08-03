import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Environment Club" },
      { name: "description", content: "Reach out to join, collaborate, or invite us to speak — we reply to every message." },
      { property: "og:title", content: "Contact — Environment Club" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const contactInfo = [
  { icon: Mail, label: "Email", value: "info.environmentclub@gmail.com", color: "forest" },
  { icon: Phone, label: "Phone", value: "94579 50841", color: "accent" },
  { icon: MapPin, label: "Office", value: "Rohta road, Meerut", color: "leaf" },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="px-6 pb-20 pt-16 overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 relative">
        {/* Decorative mesh */}
        <div className="pointer-events-none absolute -top-20 -left-20 size-80 rounded-full bg-forest/5 blur-[100px] animate-mesh" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 size-60 rounded-full bg-accent/5 blur-[80px] animate-mesh-alt" />

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Contact</span>
          <h1 className="mt-4 font-display text-5xl font-bold leading-tight text-forest text-balance md:text-6xl">
            Say hello. We&rsquo;re listening.
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Want to join? Fill out our{" "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeEHUaqvl-nNr_75heT3-fC_sYlcXQIPtDB21ZTq3gUfs5icQ/viewform?fbclid=PAZXh0bgNhZW0DMTAwAHNydGMGYXBwX2lkDzU2NzA2NzM0MzM1MjQyNwABp_yiAGyAByIT2tJhwpOLqkOb-OVdS6SqcWoVCJzSS1630Wlm_UdEJM2lLG3Q_aem_yWTZyf3lnuINVO5cO3zOHg&pli=1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest underline font-semibold hover:text-accent transition-colors duration-300"
            >
              membership form
            </a>{" "}
            directly. For collaborations, speaking requests, or general queries, send us a message below.
          </p>

          <ul className="mt-12 space-y-6 text-sm">
            {contactInfo.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                className="group flex items-start gap-4"
              >
                <span className="grid size-12 place-items-center rounded-full bg-leaf/15 text-forest transition-all duration-300 group-hover:bg-forest group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-forest/30 group-hover:scale-110">
                  <item.icon className="size-5" />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{item.label}</div>
                  <div className="mt-1 font-medium text-base">{item.value}</div>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="relative z-10 rounded-3xl border border-border bg-card p-8 shadow-lg md:p-10 transition-all duration-500 hover:shadow-xl hover:shadow-forest/10 hover:border-forest/20"
        >
          {/* Top accent */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-forest/30 to-transparent" />

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block group">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground group-focus-within:text-forest transition-colors duration-300">Name</span>
              <input required className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition-all duration-300 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:shadow-lg focus:shadow-forest/10" placeholder="Your name" />
            </label>
            <label className="block group">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground group-focus-within:text-forest transition-colors duration-300">Email</span>
              <input required type="email" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition-all duration-300 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:shadow-lg focus:shadow-forest/10" placeholder="you@campus.edu" />
            </label>
          </div>
          <label className="mt-5 block group">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground group-focus-within:text-forest transition-colors duration-300">Subject</span>
            <input className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition-all duration-300 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:shadow-lg focus:shadow-forest/10" placeholder="What is this about?" />
          </label>
          <label className="mt-5 block group">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground group-focus-within:text-forest transition-colors duration-300">Message</span>
            <textarea required rows={5} className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition-all duration-300 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:shadow-lg focus:shadow-forest/10" placeholder="Tell us a little more..." />
          </label>

          <button
            type="submit"
            className="group mt-6 relative inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/30 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accent to-forest opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative z-10 flex items-center gap-2">
              Send message <Send className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>

          {sent && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 inline-flex items-center gap-2 text-sm text-forest font-medium"
            >
              <CheckCircle className="size-4" />
              Thanks — your message is on its way. We&rsquo;ll be in touch soon.
            </motion.p>
          )}
        </motion.form>
      </div>
    </div>
  );
}