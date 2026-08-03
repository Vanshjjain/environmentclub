import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, Calendar, MapPin, Leaf, TreePine, Droplets, Wind, ShieldCheck, HeartHandshake, Award, CalendarPlus, Bell } from "lucide-react";
import heroImg from "@/assets/hero-planting.jpg";
import { heroStats, campaigns, events, testimonials, partnerLogos, initiatives, leadership } from "@/data/mock";
import { TiltCard } from "@/components/ui/tilt-card";
import { Interactive3DGrid } from "@/components/ui/interactive-3d-grid";
import { MatrixBackground } from "@/components/ui/matrix-background";
import { EcoMotionBackdrop } from "@/components/ui/eco-motion-backdrop";
import { Separated3DColumnCard } from "@/components/ui/separated-3d-column-card";
import { VolunteerModal } from "@/components/volunteer-modal";
import { CampaignSupportModal } from "@/components/campaign-support-modal";
import { SuggestEventModal } from "@/components/suggest-event-modal";
import { ImpactMap } from "@/components/impact-map";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/")({
  component: HomePage,
});

/* ─── Animated Counter Component ─── */
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          const start = performance.now();
          const dur = 1600;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(value * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Floating Leaf Particles ─── */
function FloatingLeaves() {
  const leaves = ["🍃", "🌿", "🍂", "🌱", "☘️"];
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {leaves.map((leaf, i) => (
        <span
          key={i}
          className={`absolute text-xl opacity-20 animate-leaf-${i + 1}`}
          style={{ left: `${15 + i * 18}%`, top: "-20px" }}
        >
          {leaf}
        </span>
      ))}
    </div>
  );
}

/* ─── Animated Gradient Mesh Background ─── */
function GradientMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-mesh absolute -top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-forest/10 blur-[120px]" />
      <div className="animate-mesh-alt absolute -top-1/3 -right-1/4 h-[500px] w-[500px] rounded-full bg-accent/8 blur-[100px]" />
      <div className="animate-mesh-slow absolute -bottom-1/4 left-1/3 h-[400px] w-[400px] rounded-full bg-leaf/8 blur-[80px]" />
    </div>
  );
}

function HomePage() {
  const [dbEvents, setDbEvents] = useState<any[]>([]);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
  const [isCampaignSupportOpen, setIsCampaignSupportOpen] = useState(false);
  const [selectedCampaignTitle, setSelectedCampaignTitle] = useState("");
  const [isSuggestEventOpen, setIsSuggestEventOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error && data) {
          setDbEvents(data);
        }
      } catch (err) {
        console.error("Failed to load events:", err);
      }
    };
    fetchEvents();
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const handleSupportCampaign = (title: string) => {
    setSelectedCampaignTitle(title);
    setIsCampaignSupportOpen(true);
  };

  return (
    <div className="overflow-hidden bg-background">
      <FloatingLeaves />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative px-6 pb-24 pt-32 md:pt-40 min-h-[95vh] flex items-center overflow-hidden">
        <EcoMotionBackdrop overlayOpacity={0.88} />
        <MatrixBackground opacity={0.12} speed={1.2} />
        <GradientMesh />
        <Interactive3DGrid />

        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-forest/40 bg-forest/10 glass px-4 py-2 text-xs font-bold uppercase tracking-widest text-accent shadow-xl backdrop-blur-md"
            >
              <span className="size-2.5 animate-pulse rounded-full bg-accent shadow-[0_0_10px_#34d399]" />
              Enrolling for the new session 2026
            </motion.span>

            <h1 className="mt-8 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground text-balance md:text-7xl lg:text-8xl">
              Together for a <br className="hidden md:block" />
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-leaf to-forest animate-shimmer matrix-glow"
                style={{ backgroundSize: "200% 100%" }}
              >
                Greener
              </span>{" "}
              Tomorrow
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-8 max-w-[48ch] text-xl leading-relaxed text-muted-foreground font-medium"
            >
              We are the heartbeat of environmental action on campus — a community of students growing forests, cleaning rivers, and rewriting what tomorrow can look like.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-12 flex flex-wrap items-center gap-6"
            >
              <button
                onClick={() => setIsVolunteerOpen(true)}
                className="group relative inline-flex items-center gap-3 rounded-full bg-forest px-9 py-4 text-base font-bold text-primary-foreground shadow-2xl shadow-forest/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-accent/50 cursor-pointer overflow-hidden border border-accent/30"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent to-forest opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative z-10 flex items-center gap-2">
                  Join the Movement <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>

              <Link
                to="/campaigns"
                className="group inline-flex items-center gap-2 rounded-full border border-forest/40 bg-card/80 px-7 py-4 text-base font-bold text-foreground transition-all duration-300 hover:border-accent hover:bg-card hover:text-accent hover:shadow-lg"
              >
                Explore Campaigns
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={{ y: heroY }}
          >
            <TiltCard className="relative overflow-visible preserve-3d" maxRotation={10} glareOpacity={0.12}>
              <div
                className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-forest/30 via-accent/25 to-leaf/30 blur-3xl opacity-60 animate-breathe"
                style={{ transform: "translateZ(-40px)" }}
              />

              <img
                src={heroImg}
                width={1200}
                height={1400}
                alt="Students planting a sapling together at golden hour"
                className="relative aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-2xl border border-forest/30 transition-transform duration-700 hover:scale-[1.01]"
              />

              <motion.div
                initial={{ opacity: 0, x: -30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="glass absolute -bottom-8 -left-8 hidden rounded-2xl p-6 shadow-2xl md:block border border-accent/40"
                style={{ transform: "translateZ(50px)" }}
              >
                <div className="flex items-center gap-5">
                  <div className="grid size-14 place-items-center rounded-full bg-forest text-primary-foreground shadow-inner animate-glow-pulse">
                    <Sparkles className="size-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-bold text-accent">850+ Volunteers</p>
                    <p className="text-sm font-medium text-muted-foreground">Across 12 chapters</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="glass absolute -top-6 -right-6 hidden rounded-2xl px-6 py-4 shadow-2xl md:block border border-forest/40"
                style={{ transform: "translateZ(65px)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-11 place-items-center rounded-full bg-accent/20 text-accent border border-accent/40">
                    <TreePine className="size-6" />
                  </div>
                  <div>
                    <p className="font-display text-base font-bold text-accent">12,400+ Trees</p>
                    <p className="text-xs text-muted-foreground">and counting…</p>
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* SEPARATED 3D STATS COLUMNS SECTION WITH ANIMATED COUNTERS */}
      <section className="relative bg-card/60 border-y border-forest/20 px-6 py-20 overflow-hidden">
        <MatrixBackground opacity={0.08} speed={0.8} />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {heroStats.map((s, i) => (
              <Separated3DColumnCard
                key={s.label}
                index={i}
                maxRotation={14}
                glowColor="rgba(34, 197, 94, 0.35)"
                className="text-center bg-card/95 border-forest/30 hover:border-accent"
              >
                <div className="font-display text-4xl sm:text-5xl font-extrabold text-accent matrix-glow">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-3 text-xs font-bold uppercase tracking-widest text-leaf">
                  {s.label}
                </div>
              </Separated3DColumnCard>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CAMPAIGNS */}
      <section className="px-6 py-28 relative">
        <MatrixBackground opacity={0.06} speed={0.9} />
        <GradientMesh />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-accent">What We&apos;re Building</span>
              <h2 className="mt-3 font-display text-4xl font-extrabold text-foreground md:text-5xl">
                Impact Campaigns
              </h2>
              <p className="mt-3 text-muted-foreground text-lg">
                Live campaigns making measurable change in classrooms, neighbourhoods and ecosystems.
              </p>
            </motion.div>

            <Link
              to="/campaigns"
              className="group inline-flex items-center gap-2 border-b-2 border-accent pb-1 text-sm font-bold text-accent hover:text-leaf transition-all"
            >
              View All Campaigns <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.slice(0, 3).map((c, i) => (
              <Separated3DColumnCard
                key={c.slug}
                index={i}
                maxRotation={10}
                badge={c.tag}
                glowColor="rgba(16, 185, 129, 0.4)"
                footer={
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase">{c.goal}</span>
                    <button
                      onClick={() => handleSupportCampaign(c.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline cursor-pointer"
                    >
                      Support Campaign <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                }
              >
                <div className="overflow-hidden rounded-xl bg-muted aspect-video mb-5 relative group/img">
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
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {c.excerpt}
                </p>

                <div className="mt-6 overflow-hidden rounded-full bg-muted/80 h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${c.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-forest via-accent to-leaf shadow-[0_0_12px_rgba(52,211,153,0.6)]"
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs font-bold text-muted-foreground">
                  <span>Goal: {c.goal}</span>
                  <span className="text-accent">{c.progress}% Complete</span>
                </div>
              </Separated3DColumnCard>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE PLANTING IMPACT MAP SECTION */}
      <section className="px-6 py-24 relative bg-card/40 border-y border-border">
        <MatrixBackground opacity={0.06} speed={0.8} />
        <div className="mx-auto max-w-7xl relative z-10">
          <ImpactMap />
        </div>
      </section>

      {/* PARTNERS & INSTITUTIONAL ALLIANCES GRID */}
      <section className="px-6 py-24 relative overflow-hidden bg-card/60">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Strategic Alliances</span>
            <h2 className="mt-3 font-display text-4xl font-extrabold text-foreground">
              Official Partners & Government Bodies
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We collaborate with municipal departments, international NGOs, and technical institutions to scale ecological change.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partnerLogos.map((p, i) => (
              <Separated3DColumnCard
                key={p.name}
                index={i}
                maxRotation={6}
                badge={p.category}
                icon={<span className="text-2xl">{p.logo}</span>}
                title={p.name}
                glowColor="rgba(34, 197, 94, 0.3)"
              >
                <p className="mt-2 text-xs text-muted-foreground font-medium leading-relaxed">
                  {p.desc}
                </p>
              </Separated3DColumnCard>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS & SUGGEST EVENT MODAL TRIGGER */}
      <section className="relative bg-card/50 border-t border-border px-6 py-28 overflow-hidden">
        <MatrixBackground opacity={0.06} speed={0.9} />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Join Our Events</span>
              <h2 className="mt-2 font-display text-4xl font-extrabold text-foreground md:text-5xl">
                Upcoming Events & Drives
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSuggestEventOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-xs font-bold text-accent hover:bg-accent hover:text-accent-foreground transition-all shadow-md cursor-pointer"
              >
                <CalendarPlus className="size-4" /> Suggest An Event
              </button>

              <Link
                to="/events"
                className="group inline-flex items-center gap-2 border-b-2 border-accent pb-1 text-sm font-bold text-accent hover:text-leaf transition-all"
              >
                See Full Calendar <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {dbEvents.length === 0 ? (
              <div className="col-span-3 text-center py-16 border border-dashed border-forest/30 rounded-3xl bg-card/90 p-8 space-y-4">
                <div className="mx-auto grid size-14 place-items-center rounded-full bg-forest/20 text-accent border border-forest/40">
                  <Calendar className="size-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">New Drives Being Scheduled</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Our next major plantation drive and street play schedule is being finalized for this month.
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => setIsSuggestEventOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-2.5 text-xs font-bold text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all shadow-lg"
                  >
                    <CalendarPlus className="size-4" /> Suggest A Cleanup Location
                  </button>
                  <button
                    onClick={() => setIsSuggestEventOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-forest/40 bg-card px-6 py-2.5 text-xs font-bold text-accent hover:bg-forest/20 transition-all"
                  >
                    <Bell className="size-4" /> Get Email Alerts
                  </button>
                </div>
              </div>
            ) : (
              dbEvents
                .filter((e) => e.upcoming)
                .slice(0, 3)
                .map((e, i) => (
                  <Separated3DColumnCard
                    key={e.id || e.title}
                    index={i}
                    maxRotation={10}
                    badge={e.kind}
                    title={e.title}
                    footer={
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                          <MapPin className="size-3.5 text-accent" /> {e.location}
                        </span>
                        <Link
                          to="/events"
                          className="rounded-full bg-forest/20 px-4 py-1.5 text-xs font-bold text-accent hover:bg-accent hover:text-accent-foreground transition-all"
                        >
                          RSVP Now
                        </Link>
                      </div>
                    }
                  >
                    <div className="flex items-center gap-4 my-4">
                      <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-xl bg-forest/20 border border-forest/40 text-accent">
                        <span className="text-[10px] font-bold uppercase">{e.date.split(" ")[0]}</span>
                        <span className="font-display text-2xl font-bold leading-none">{e.date.split(" ")[1]}</span>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex items-center gap-1 font-semibold text-foreground">
                          <Calendar className="size-3.5 text-accent" /> {e.time}
                        </div>
                      </div>
                    </div>
                  </Separated3DColumnCard>
                ))
            )}
          </div>
        </div>
      </section>

      {/* CTA SECTION WITH MODAL TRIGGER */}
      <section className="px-6 py-28 relative overflow-hidden">
        <MatrixBackground opacity={0.12} speed={1} />

        <div className="mx-auto max-w-4xl relative z-10">
          <TiltCard
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            maxRotation={4}
            className="rounded-[2.5rem] bg-gradient-to-br from-card via-card/95 to-forest/30 border border-accent/40 p-12 md:p-16 text-center text-foreground shadow-2xl relative overflow-hidden"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-accent relative z-10">
              Be The Change
            </span>

            <h2 className="mt-4 font-display text-4xl font-extrabold text-balance md:text-5xl relative z-10">
              Every action counts. <span className="text-accent matrix-glow">Start yours today.</span>
            </h2>

            <p className="mt-5 text-muted-foreground max-w-xl mx-auto leading-relaxed relative z-10 text-lg">
              Whether you want to plant trees, clean rivers, attend workshops or connect us with your organisation — there is a place for you here.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-5 relative z-10">
              <button
                onClick={() => setIsVolunteerOpen(true)}
                className="group relative inline-flex items-center gap-2.5 rounded-full bg-forest px-8 py-4 text-base font-bold text-primary-foreground shadow-xl transition-all hover:-translate-y-1 hover:shadow-accent/40 overflow-hidden border border-accent/40 cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Join the Club <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-forest/40 bg-card px-8 py-4 text-base font-bold text-foreground transition-all hover:bg-forest/20 hover:text-accent hover:-translate-y-1"
              >
                Partner With Us
              </Link>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* Render Modals */}
      <VolunteerModal isOpen={isVolunteerOpen} onClose={() => setIsVolunteerOpen(false)} />
      <CampaignSupportModal
        isOpen={isCampaignSupportOpen}
        onClose={() => setIsCampaignSupportOpen(false)}
        campaignTitle={selectedCampaignTitle}
      />
      <SuggestEventModal isOpen={isSuggestEventOpen} onClose={() => setIsSuggestEventOpen(false)} />
    </div>
  );
}
