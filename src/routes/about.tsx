import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Compass, Sprout, Sparkles, Linkedin, Twitter, Instagram, Mail, ExternalLink } from "lucide-react";
import communityImg from "@/assets/community.jpg";
import { TiltCard } from "@/components/ui/tilt-card";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { MatrixBackground } from "@/components/ui/matrix-background";
import { Separated3DColumnCard } from "@/components/ui/separated-3d-column-card";
import { ResourceHub } from "@/components/resource-hub";
import { leadership } from "@/data/mock";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Environment Club" },
      {
        name: "description",
        content:
          "Our mission, vision, leadership team, coordinators and the history of a student community that grew into a movement.",
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

      {/* LEADERSHIP & CORE TEAM SECTION WITH SOCIAL LINKS */}
      <div className="mx-auto mt-32 max-w-6xl z-10 relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Club Leadership</span>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-foreground">
            Meet Our Founders & Directors
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Student leaders and mentors driving ecological action, campus chapters, and policy partnerships.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((member, i) => (
            <Separated3DColumnCard
              key={member.name}
              index={i}
              maxRotation={10}
              badge={member.role}
              title={member.name}
              glowColor="rgba(34, 197, 94, 0.4)"
              footer={
                <div className="flex items-center gap-3 pt-2">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-forest/15 text-accent hover:bg-accent hover:text-accent-foreground transition-all"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="size-4" />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-forest/15 text-accent hover:bg-accent hover:text-accent-foreground transition-all"
                      aria-label={`${member.name} Twitter`}
                    >
                      <Twitter className="size-4" />
                    </a>
                  )}
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-forest/15 text-accent hover:bg-accent hover:text-accent-foreground transition-all"
                      aria-label={`${member.name} Instagram`}
                    >
                      <Instagram className="size-4" />
                    </a>
                  )}
                  {member.socials.email && (
                    <a
                      href={`mailto:${member.socials.email}`}
                      className="p-2 rounded-xl bg-forest/15 text-accent hover:bg-accent hover:text-accent-foreground transition-all ml-auto"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="size-4" />
                    </a>
                  )}
                </div>
              }
            >
              <div className="my-3 space-y-3">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-forest/30">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="size-full object-cover"
                  />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  {member.bio}
                </p>
              </div>
            </Separated3DColumnCard>
          ))}
        </div>
      </div>

      {/* DOWNLOADABLE RESOURCE HUB */}
      <div className="mx-auto mt-32 max-w-6xl z-10 relative">
        <ResourceHub />
      </div>

      {/* Pillars - SEPARATED 3D COLUMNS */}
      <div className="mx-auto mt-32 max-w-6xl z-10 relative">
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
    </div>
  );
}