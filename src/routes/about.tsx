import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Compass, Sprout } from "lucide-react";
import communityImg from "@/assets/community.jpg";
import { TiltCard } from "@/components/ui/tilt-card";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Environment Club" },
      {
        name: "description",
        content:
          "Our mission, vision, coordinators and the small history of a student community that grew into a movement.",
      },
      { property: "og:title", content: "About — Environment Club" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const pillars = [
  {
    icon: Target,
    title: "Mission",
    body: "Empower students to become everyday stewards of the environment through action, learning and community.",
  },
  {
    icon: Eye,
    title: "Vision",
    body: "A generation that treats sustainability not as a subject, but as a way of living.",
  },
  {
    icon: Compass,
    title: "Objectives",
    body: "Grow native forests, cut single-use plastic, restore water bodies, and build climate literacy on campus.",
  },
  {
    icon: Sprout,
    title: "Values",
    body: "Curiosity, care, and quiet consistency — small acts, done together, add up to real change.",
  },
];

const timeline = [
  { year: "2018", body: "A handful of students plant 50 saplings on campus." },
  { year: "2020", body: "First city-wide plastic audit; results published locally." },
  { year: "2022", body: "Signed MoU with the Forest Department for native reforestation." },
  { year: "2024", body: "Reached 10,000 trees planted and 500+ active volunteers." },
  { year: "2026", body: "Chapters open in six partner colleges across the region." },
];

function AboutPage() {
  const [teamList, setTeamList] = useState<any[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data, error } = await supabase
          .from("team")
          .select("*")
          .order("created_at", { ascending: true });
        if (!error && data) {
          setTeamList(data);
        }
      } catch (err) {
        console.error("Failed to load team:", err);
      }
    };
    fetchTeam();
  }, []);
  return (
    <div className="px-6 pb-20 pt-16 overflow-hidden">
      {/* Hero */}
      <div className="mx-auto max-w-5xl relative">
        {/* Decorative mesh */}
        <div className="pointer-events-none absolute -top-20 -left-20 size-80 rounded-full bg-forest/5 blur-[100px] animate-mesh" />
        <div className="pointer-events-none absolute -top-10 -right-20 size-60 rounded-full bg-accent/5 blur-[80px] animate-mesh-alt" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            About us
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold leading-tight text-forest text-balance md:text-6xl">
            A student community, quietly reshaping what tomorrow looks like.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            We started with fifty saplings on a Sunday morning in 2018. Today
            we're a network of 850+ volunteers running long-term ecological
            work — and we're just getting started.
          </p>
        </motion.div>

        <TiltCard
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          maxRotation={4}
          className="mt-16 relative group rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-tr from-forest/10 to-accent/10 blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
          <img
            src={communityImg}
            alt="Volunteers gathered under an old oak tree at sunset"
            className="relative aspect-[16/9] w-full rounded-3xl object-cover shadow-forest/10 transition-transform duration-700 group-hover:scale-[1.01]"
            loading="lazy"
          />
        </TiltCard>
      </div>

      {/* 10 Years */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto mt-24 max-w-5xl rounded-3xl bg-gradient-to-br from-forest/5 to-accent/5 p-8 md:p-12 text-center relative overflow-hidden border border-forest/10"
      >
        <div className="pointer-events-none absolute top-0 right-0 size-48 rounded-full bg-accent/5 blur-[60px] animate-mesh" />
        <h2 className="mb-6 font-display text-3xl font-bold text-forest relative z-10">Celebrating 10 Years of Impact</h2>
        <p className="text-lg leading-relaxed text-muted-foreground relative z-10">
          This year marks a momentous milestone for the Environment Club as we celebrate a decade of steadfast commitment to environmental conservation. Over the past ten years, we have worked tirelessly to protect, restore, and advocate for our local ecosystems. Our core initiatives—ranging from community-wide cleanups and targeted environmental campaigns to rigorous educational drives—have consistently driven tangible change. By actively collaborating with a diverse network of partner organizations, we have amplified our reach and maximized our impact within the community. We also believe in investing in those who invest in our planet; through sponsored environmental trips, we reward the dedication of our most active members and supporters. As we look to the future, our mission remains clear: to build a sustainable world through community-led action and unwavering dedication.
        </p>
      </motion.div>

      {/* Pillars */}
      <div className="mx-auto mt-24 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4" style={{ perspective: 1200, transformStyle: "preserve-3d" }}>
        {pillars.map((p, i) => (
          <TiltCard
            key={p.title}
            initial={{ opacity: 0, y: 30, rotateX: 12 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            maxRotation={8}
            className="group rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-forest/10 hover:border-forest/30"
          >
            <div className="grid size-11 place-items-center rounded-xl bg-leaf/15 text-forest transition-all duration-300 group-hover:bg-forest group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-forest/30">
              <p.icon className="size-5" />
            </div>
            <h3 className="mt-6 font-display text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </TiltCard>
        ))}
      </div>

      {/* Timeline */}
      <div className="mx-auto mt-32 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 font-display text-3xl font-bold text-forest md:text-4xl"
        >
          Our story so far
        </motion.h2>
        <ol className="relative border-l-2 border-border pl-8">
          {timeline.map((t, i) => (
            <motion.li
              key={t.year}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="mb-10 last:mb-0 group"
            >
              <span className="absolute -left-[11px] mt-1.5 grid size-5 place-items-center rounded-full border-4 border-background bg-forest transition-all duration-300 group-hover:bg-accent group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-accent/40" />
              <div className="font-display text-sm font-bold text-accent">{t.year}</div>
              <p className="mt-1 text-foreground">{t.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Team */}
      <div className="mx-auto mt-32 max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 font-display text-3xl font-bold text-forest md:text-4xl"
        >
          Faculty & core team
        </motion.h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1200, transformStyle: "preserve-3d" }}>
          {teamList.length === 0 ? (
            <div className="col-span-full text-center py-10 border border-dashed border-border rounded-2xl bg-card">
              <p className="text-sm text-muted-foreground">No team members registered yet.</p>
            </div>
          ) : (
            teamList.map((m, i) => (
              <TiltCard
                key={m.id || m.name}
                initial={{ opacity: 0, y: 25, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                maxRotation={6}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/10 hover:border-forest/30"
              >
                <div
                  className="grid size-14 shrink-0 place-items-center rounded-full font-display text-lg font-bold text-forest transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-forest/20"
                  style={{
                    background:
                      "linear-gradient(135deg, color-mix(in oklab, var(--leaf) 40%, transparent), color-mix(in oklab, var(--moss) 20%, transparent))",
                  }}
                >
                  {m.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0">
                  <div className="truncate font-semibold">{m.name}</div>
                  <div className="text-sm text-muted-foreground">{m.role}</div>
                </div>
              </TiltCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
}