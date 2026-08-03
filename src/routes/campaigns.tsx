import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { campaigns, initiatives } from "@/data/mock";

export const Route = createFileRoute("/campaigns")({
  head: () => ({
    meta: [
      { title: "Campaigns & Initiatives — Environment Club" },
      {
        name: "description",
        content:
          "Explore our flagship pillars: Plantation Drives, Nukkad Natak street plays, Environmental Summits, and powerful Collaborations for a greener Meerut.",
      },
      { property: "og:title", content: "Campaigns & Initiatives — Environment Club" },
      { property: "og:url", content: "/campaigns" },
    ],
    links: [{ rel: "canonical", href: "/campaigns" }],
  }),
  component: CampaignsPage,
});

function CampaignsPage() {
  return (
    <div className="overflow-hidden">
      {/* PAGE HEADER */}
      <section className="px-6 pb-16 pt-32 md:pt-40 relative">
        {/* Decorative mesh */}
        <div className="pointer-events-none absolute -top-20 -left-20 size-80 rounded-full bg-forest/5 blur-[100px] animate-mesh" />
        <div className="pointer-events-none absolute -top-10 -right-20 size-60 rounded-full bg-accent/5 blur-[80px] animate-mesh-alt" />

        <div className="mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Our Pillars of Action
            </span>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold leading-tight text-forest text-balance md:text-7xl">
              Long work, done together.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              From planting thousands of trees to performing street plays in
              city squares, our campaigns are built on passion, community and a
              deep commitment to the planet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOUR PILLARS — INITIATIVES SHOWCASE */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-6xl space-y-8">
          {initiatives.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`group grid gap-8 items-center rounded-[2.5rem] border border-border bg-card p-8 md:p-12 shadow-md transition-all duration-700 hover:shadow-2xl hover:shadow-forest/15 hover:border-forest/30 md:grid-cols-2 ${
                i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              {/* Visual block */}
              <div
                className={`flex flex-col items-center justify-center rounded-3xl p-12 text-center min-h-[260px] transition-all duration-500 group-hover:scale-[1.02] ${
                  item.id === "plantation"
                    ? "bg-gradient-to-br from-forest/10 to-accent/10 group-hover:from-forest/15 group-hover:to-accent/15"
                    : item.id === "nukkad-natak"
                    ? "bg-gradient-to-br from-amber-500/10 to-orange-500/10 group-hover:from-amber-500/15 group-hover:to-orange-500/15"
                    : item.id === "summits"
                    ? "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 group-hover:from-blue-500/15 group-hover:to-indigo-500/15"
                    : "bg-gradient-to-br from-purple-500/10 to-pink-500/10 group-hover:from-purple-500/15 group-hover:to-pink-500/15"
                }`}
              >
                <span className="text-8xl transition-transform duration-500 group-hover:scale-125 inline-block" role="img" aria-label={item.label}>
                  {item.emoji}
                </span>
                <div className="mt-6 flex gap-6 justify-center flex-wrap">
                  {item.stats.map((s) => (
                    <div key={s.l} className="text-center">
                      <div className="font-display text-2xl font-bold text-forest transition-colors duration-300 group-hover:text-accent">
                        {s.v}
                      </div>
                      <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Text block */}
              <div>
                <span className="inline-block rounded-full bg-forest/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-forest">
                  {item.label}
                </span>
                <h2 className="mt-5 font-display text-4xl font-bold text-forest leading-tight">
                  {item.headline}
                </h2>
                <p className="mt-6 text-muted-foreground leading-relaxed text-base">
                  {item.description}
                </p>
                <a
                  href="https://www.instagram.com/environment_club_?igsh=bzdqcG03NDVoaGEw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-forest border-b-2 border-accent pb-1 transition-all hover:border-forest group/link"
                >
                  See it on Instagram <ArrowRight className="size-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ALL CAMPAIGNS GRID */}
      <section className="bg-muted/40 px-6 py-28 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -bottom-20 -right-20 size-96 rounded-full bg-forest/3 blur-[120px] animate-mesh" />
        </div>
        <div className="mx-auto max-w-6xl relative z-10">
          <div className="mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                Active Campaigns
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold text-forest md:text-5xl">
                On-the-ground campaigns
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Each campaign is a multi-year commitment with a clear goal, an open
                method and space for anyone to join.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((c, i) => (
              <motion.article
                key={c.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                className="group flex flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-forest/15 hover:border-forest/30"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-10" />
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="inline-block glass rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-sm">
                      {c.tag}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-xl font-bold text-forest transition-colors duration-300 group-hover:text-accent">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                    {c.excerpt}
                  </p>
                  <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-forest to-accent shadow-[0_0_12px_rgba(0,200,83,0.3)]"
                    />
                  </div>
                  <div className="mt-3 flex justify-between text-xs font-bold uppercase tracking-tight text-muted-foreground">
                    <span>{c.goal}</span>
                    <span className="text-forest">{c.progress}% complete</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="px-6 py-24 relative">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-forest/5 blur-[120px] animate-breathe" />
        </div>
        <div className="mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[2.5rem] bg-gradient-to-br from-forest via-forest/90 to-accent/80 p-12 md:p-16 text-center text-primary-foreground shadow-2xl shadow-forest/30 relative overflow-hidden"
          >
            {/* Decorative orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/20 blur-[80px] animate-mesh" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-leaf/15 blur-[60px] animate-mesh-alt" />

            <span className="text-xs font-bold uppercase tracking-widest text-leaf relative z-10">
              Join the movement
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold text-balance md:text-5xl relative z-10">
              Every action counts. <span className="text-accent">Start yours today.</span>
            </h2>
            <p className="mt-5 text-primary-foreground/80 max-w-xl mx-auto leading-relaxed relative z-10 text-lg">
              Whether you want to plant trees, perform on stage, attend a summit
              or connect us with your organisation — there is a place for you
              here.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-5 relative z-10">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeEHUaqvl-nNr_75heT3-fC_sYlcXQIPtDB21ZTq3gUfs5icQ/viewform?fbclid=PAZXh0bgNhZW0DMTAwAHNydGMGYXBwX2lkDzU2NzA2NzM0MzM1MjQyNwABp_yiAGyAByIT2tJhwpOLqkOb-OVdS6SqcWoVCJzSS1630Wlm_UdEJM2lLG3Q_aem_yWTZyf3lnuINVO5cO3zOHg&pli=1"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-bold text-accent-foreground shadow-lg transition-all hover:-translate-y-1 hover:shadow-accent/40 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-leaf to-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative z-10 flex items-center gap-2">
                  Join the Club <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-8 py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary-foreground/10 hover:-translate-y-1"
              >
                Partner With Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}