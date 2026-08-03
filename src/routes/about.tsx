import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Compass, Sprout, Sparkles } from "lucide-react";
import communityImg from "@/assets/community.jpg";
import { TiltCard } from "@/components/ui/tilt-card";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { MatrixBackground } from "@/components/ui/matrix-background";
import { Separated3DColumnCard } from "@/components/ui/separated-3d-column-card";

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
    <div className="px-6 pb-24 pt-28 overflow-hidden bg-background">
      <MatrixBackground opacity={0.1} speed={1} />

      {/* Hero */}
      <div className="mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-forest/40 bg-forest/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent backdrop-blur-md">
            <Sparkles className="size-3.5 text-accent" />
            About Our Movement
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-extrabold leading-tight text-foreground text-balance md:text-6xl">
            A student community, quietly reshaping what <span className="text-accent matrix-glow">tomorrow looks like.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground font-medium leading-relaxed">
            We started with fifty saplings on a Sunday morning in 2018. Today we're a network of 850+ volunteers running long-term ecological work — and we're just getting started.
          </p>
        </motion.div>

        <TiltCard
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          maxRotation={6}
          className="mt-16 relative group rounded-3xl overflow-hidden shadow-2xl border border-forest/30"
        >
          <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-tr from-forest/20 to-accent/20 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
          <img
            src={communityImg}
            alt="Volunteers gathered under an old oak tree at sunset"
            className="relative aspect-[16/9] w-full rounded-3xl object-cover shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]"
            loading="lazy"
          />
        </TiltCard>
      </div>

      {/* 10 Years Impact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto mt-24 max-w-5xl rounded-3xl bg-card/80 backdrop-blur-xl p-8 md:p-12 text-center relative overflow-hidden border border-forest/40 shadow-2xl z-10"
      >
        <h2 className="mb-6 font-display text-3xl font-extrabold text-foreground relative z-10">
          Celebrating <span className="text-accent matrix-glow">10 Years of Impact</span>
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground relative z-10 font-medium">
          This year marks a decade of steadfast commitment to environmental conservation. Over the past ten years, we have worked tirelessly to protect, restore, and advocate for our local ecosystems. Our core initiatives—ranging from community-wide cleanups and targeted environmental campaigns to rigorous educational drives—have consistently driven tangible change.
        </p>
      </motion.div>

      {/* Pillars - SEPARATED 3D COLUMNS */}
      <div className="mx-auto mt-24 max-w-6xl z-10 relative">
        <h2 className="mb-10 text-center font-display text-4xl font-extrabold text-foreground">
          Core Pillars & Values
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Separated3DColumnCard
              key={p.title}
              index={i}
              maxRotation={12}
              icon={<p.icon className="size-6" />}
              title={p.title}
              glowColor="rgba(34, 197, 94, 0.4)"
            >
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground font-medium">
                {p.body}
              </p>
            </Separated3DColumnCard>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mx-auto mt-32 max-w-4xl z-10 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 font-display text-3xl font-extrabold text-foreground md:text-4xl text-center"
        >
          Our Story So Far
        </motion.h2>
        <ol className="relative border-l-2 border-forest/40 pl-8 space-y-10">
          {timeline.map((t, i) => (
            <motion.li
              key={t.year}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="relative group"
            >
              <span className="absolute -left-[41px] top-1 grid size-6 place-items-center rounded-full border-4 border-background bg-accent transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_12px_#34d399]" />
              <div className="font-display text-base font-extrabold text-accent">{t.year}</div>
              <p className="mt-1 text-foreground text-lg font-medium">{t.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Core Team - SEPARATED 3D COLUMNS */}
      <div className="mx-auto mt-32 max-w-6xl z-10 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 font-display text-4xl font-extrabold text-foreground text-center"
        >
          Faculty & Core Team
        </motion.h2>
        
        {teamList.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card">
            <p className="text-sm text-muted-foreground">No team members registered yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamList.map((m, i) => (
              <Separated3DColumnCard
                key={m.id || m.name}
                index={i}
                maxRotation={10}
                title={m.name}
                subtitle={m.role}
                glowColor="rgba(16, 185, 129, 0.4)"
              >
                <div className="flex items-center gap-4 my-2">
                  <div className="grid size-14 shrink-0 place-items-center rounded-full bg-forest/20 border border-forest/40 font-display text-lg font-bold text-accent shadow-md">
                    {m.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-[10px] font-bold text-accent uppercase">
                      {m.role || "Team Member"}
                    </span>
                  </div>
                </div>
              </Separated3DColumnCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}