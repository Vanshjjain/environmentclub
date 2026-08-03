import { Link } from "@tanstack/react-router";
import { Instagram, ArrowRight, Linkedin, Leaf, Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-background relative overflow-hidden">
      {/* Decorative background mesh */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-forest/3 blur-[120px] animate-mesh" />
        <div className="absolute -top-20 -right-20 size-64 rounded-full bg-accent/3 blur-[80px] animate-mesh-alt" />
      </div>

      {/* Top gradient glow line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-forest/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-20 relative z-10">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="grid size-10 place-items-center rounded-full bg-forest/10 border border-forest/30 text-forest transition-all duration-300 group-hover:bg-forest/20 group-hover:shadow-lg group-hover:shadow-forest/20">
                <Leaf className="size-5" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-foreground group-hover:text-forest transition-colors duration-300">
                Environment Club
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Together for a greener tomorrow. A student-led community turning
              care for the planet into everyday action.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/environment_club_?igsh=bzdqcG03NDVoaGEw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid size-10 place-items-center rounded-full border border-border glass text-muted-foreground transition-all duration-300 hover:border-pink-500/50 hover:text-pink-400 hover:shadow-lg hover:shadow-pink-500/20 hover:scale-110"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/enclubmrt/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid size-10 place-items-center rounded-full border border-border glass text-muted-foreground transition-all duration-300 hover:border-blue-500/50 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-110"
              >
                <Linkedin className="size-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-forest">Explore</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                { to: "/about", label: "About" },
                { to: "/campaigns", label: "Campaigns" },
                { to: "/events", label: "Events" },
                { to: "/gallery", label: "Gallery" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center gap-1 transition-colors duration-300 hover:text-forest"
                  >
                    <span className="inline-block w-0 overflow-hidden transition-all duration-300 group-hover:w-4">
                      <ArrowRight className="size-3" />
                    </span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-forest">Community</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/blog" className="group inline-flex items-center gap-1 hover:text-forest transition-colors duration-300">
                  <span className="inline-block w-0 overflow-hidden transition-all duration-300 group-hover:w-4">
                    <ArrowRight className="size-3" />
                  </span>
                  Journal
                </Link>
              </li>
              <li>
                <Link to="/contact" className="group inline-flex items-center gap-1 hover:text-forest transition-colors duration-300">
                  <span className="inline-block w-0 overflow-hidden transition-all duration-300 group-hover:w-4">
                    <ArrowRight className="size-3" />
                  </span>
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeEHUaqvl-nNr_75heT3-fC_sYlcXQIPtDB21ZTq3gUfs5icQ/viewform?fbclid=PAZXh0bgNhZW0DMTAwAHNydGMGYXBwX2lkDzU2NzA2NzM0MzM1MjQyNwABp_yiAGyAByIT2tJhwpOLqkOb-OVdS6SqcWoVCJzSS1630Wlm_UdEJM2lLG3Q_aem_yWTZyf3lnuINVO5cO3zOHg&pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 hover:text-forest transition-colors duration-300"
                >
                  <span className="inline-block w-0 overflow-hidden transition-all duration-300 group-hover:w-4">
                    <ArrowRight className="size-3" />
                  </span>
                  Volunteer
                </a>
              </li>
              <li>
                <a href="#" className="group inline-flex items-center gap-1 hover:text-forest transition-colors duration-300">
                  <span className="inline-block w-0 overflow-hidden transition-all duration-300 group-hover:w-4">
                    <ArrowRight className="size-3" />
                  </span>
                  Partner with us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-forest">Newsletter</h4>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              Monthly stories from the frontlines of campus conservation.
            </p>
            <form className="relative group" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="you@campus.edu"
                className="w-full rounded-2xl border border-border bg-white/5 px-5 py-3.5 pr-14 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 transition-all duration-300 focus:border-forest/50 focus:ring-2 focus:ring-forest/20 focus:bg-white/8 focus:shadow-lg focus:shadow-forest/10"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-2 top-2 bottom-2 aspect-square rounded-xl bg-forest flex items-center justify-center text-background transition-all duration-300 hover:bg-accent hover:shadow-lg hover:shadow-forest/30 hover:scale-105"
              >
                <ArrowRight className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 relative z-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-forest/20 to-transparent" />
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Environment Club, Meerut. All rights reserved.</p>
          <p className="inline-flex items-center gap-1 text-xs text-muted-foreground/60">
            Built with <Heart className="size-3 text-forest fill-forest animate-pulse" /> for the planet
          </p>
        </div>
      </div>
    </footer>
  );
}