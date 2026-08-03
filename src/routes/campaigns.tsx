import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { campaigns, initiatives } from "@/data/mock";
import { MatrixBackground } from "@/components/ui/matrix-background";
import { Separated3DColumnCard } from "@/components/ui/separated-3d-column-card";

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
    <div className="overflow-hidden bg-background">
      {/* PAGE HEADER WITH MATRIX BACKDROP */}
      <section className="px-6 pb-20 pt-32 md:pt-40 relative border-b border-border/40">
        <MatrixBackground opacity={0.12} speed={1.1} />

        <div className="mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-forest/40 bg-forest/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent backdrop-blur-md">
              <Sparkles className="size-3.5 text-accent" />
              Our Pillars of Action
            </span>

            <h1 className="mt-6 max-w-3xl font-display text-5xl font-extrabold leading-tight text-foreground text-balance md:text-7xl">
              Impactful Work, <br />
              <span className="text-accent matrix-glow">Done Together.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-xl text-muted-foreground leading-relaxed font-medium">
              From planting thousands of trees to performing street plays in city squares, our campaigns are built on passion, community and a deep commitment to the planet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOUR PILLARS — INITIATIVES SHOWCASE */}
      <section className="px-6 py-24 relative">
        <div className="mx-auto max-w-6xl space-y-12">
          {initiatives.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Separated3DColumnCard
                index={i}
                maxRotation={8}
                badge={item.label}
                glowColor="rgba(34, 197, 94, 0.3)"
                className="grid gap-8 items-center p-8 md:p-12 md:grid-cols-2"
              >
                <div
                  className={`flex flex-col items-center justify-center rounded-3xl p-10 text-center min-h-[260px] transition-all duration-500 ${
                    item.id === "plantation"
                      ? "bg-gradient-to-br from-forest/20 to-accent/20 border border-forest/30"
                      : item.id === "nukkad-natak"
                      ? "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30"
                      : item.id === "summits"
                      ? "bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30"
                      : "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                  }`}
                >
                  <span className="text-8xl transition-transform duration-500 hover:scale-125 inline-block" role="img" aria-label={item.label}>
                    {item.emoji}
                  </span>
                  <div className="mt-6 flex gap-6 justify-center flex-wrap">
                    {item.stats.map((s) => (
                      <div key={s.l} className="text-center">
                        <div className="font-display text-2xl font-extrabold text-accent">
                          {s.v}
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
                          {s.l}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-3xl font-extrabold text-foreground leading-tight">
                    {item.headline}
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-base">
                    {item.description}
                  </p>
                  <a
                    href="https://www.instagram.com/environment_club_?igsh=bzdqcG03NDVoaGEw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-accent border-b-2 border-accent pb-1 transition-all hover:text-leaf group/link"
                  >
                    See it on Instagram <ArrowRight className="size-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </Separated3DColumnCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ALL CAMPAIGNS SEPARATED 3D COLUMNS GRID */}
      <section className="bg-card/50 border-t border-border px-6 py-28 relative overflow-hidden">
        <MatrixBackground opacity={0.07} speed={0.8} />

        <div className="mx-auto max-w-6xl relative z-10">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Active Campaigns</span>
            <h2 className="mt-3 font-display text-4xl font-extrabold text-foreground md:text-5xl">
              On-The-Ground Campaigns
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground text-lg">
              Each campaign is a multi-year commitment with a clear goal, an open method and space for anyone to join.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((c, i) => (
              <Separated3DColumnCard
                key={c.slug}
                index={i}
                maxRotation={10}
                badge={c.tag}
                glowColor="rgba(16, 185, 129, 0.4)"
                footer={
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground">{c.goal}</span>
                    <span className="text-xs font-bold text-accent">{c.progress}% Done</span>
                  </div>
                }
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted mb-4 group/img">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                  />
                  <div className="absolute top-3 left-3 z-20">
                    <span className="glass rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                      {c.tag}
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {c.excerpt}
                </p>

                <div className="mt-6 overflow-hidden rounded-full bg-muted/80 h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${c.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-forest via-accent to-leaf shadow-[0_0_12px_rgba(52,211,153,0.5)]"
                  />
                </div>
              </Separated3DColumnCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}