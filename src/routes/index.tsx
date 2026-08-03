import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, Calendar, MapPin, Leaf, TreePine, Droplets, Wind } from "lucide-react";
import heroImg from "@/assets/hero-planting.jpg";
import { heroStats, campaigns, events, testimonials, partners, initiatives } from "@/data/mock";
import { TiltCard } from "@/components/ui/tilt-card";
import { Interactive3DGrid } from "@/components/ui/interactive-3d-grid";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/")(  {
  component: HomePage,
});

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
      { threshold: 0.3 },
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
      <div className="animate-mesh absolute -top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-forest/8 blur-[120px]" />
      <div className="animate-mesh-alt absolute -top-1/3 -right-1/4 h-[500px] w-[500px] rounded-full bg-accent/6 blur-[100px]" />
      <div className="animate-mesh-slow absolute -bottom-1/4 left-1/3 h-[400px] w-[400px] rounded-full bg-leaf/5 blur-[80px]" />
    </div>
  );
}

function HomePage() {
  const [dbEvents, setDbEvents] = useState<any[]>([]);

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
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="overflow-hidden">
      <FloatingLeaves />

      {/* HERO */}
      <section ref={heroRef} className="relative px-6 pb-24 pt-32 md:pt-40 min-h-[90vh] flex items-center">
        <GradientMesh />
        <Interactive3DGrid />
        {/* Grain texture overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />

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
              className="inline-flex items-center gap-2 rounded-full border border-forest/20 glass px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-forest shadow-lg"
            >
              <span className="size-2 animate-pulse rounded-full bg-accent" />
              Enrolling for the new session
            </motion.span>
            <h1 className="mt-8 font-display text-6xl font-bold leading-[1.05] tracking-tight text-forest text-balance md:text-8xl">
              Together for a <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest via-accent to-leaf animate-shimmer" style={{ backgroundSize: '200% 100%' }}>Greener</span> Tomorrow
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-8 max-w-[48ch] text-xl leading-relaxed text-muted-foreground font-medium"
            >
              We are the heartbeat of environmental action on campus — a
              community of students growing forests, cleaning rivers and
              rewriting what tomorrow can look like.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-12 flex flex-wrap items-center gap-6"
            >
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeEHUaqvl-nNr_75heT3-fC_sYlcXQIPtDB21ZTq3gUfs5icQ/viewform?fbclid=PAZXh0bgNhZW0DMTAwAHNydGMGYXBwX2lkDzU2NzA2NzM0MzM1MjQyNwABp_yiAGyAByIT2tJhwpOLqkOb-OVdS6SqcWoVCJzSS1630Wlm_UdEJM2lLG3Q_aem_yWTZyf3lnuINVO5cO3zOHg&pli=1"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 rounded-full bg-forest px-8 py-4 text-base font-bold text-primary-foreground shadow-2xl shadow-forest/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-accent/40 cursor-pointer overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent to-forest opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative z-10 flex items-center gap-2">
                  Join the Movement <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
              <Link
                to="/campaigns"
                className="group inline-flex items-center gap-2 px-4 py-4 text-base font-bold text-foreground transition-all duration-300 hover:text-accent"
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
            <TiltCard 
              className="relative overflow-visible preserve-3d" 
              maxRotation={8} 
              glareOpacity={0.08}
            >
              {/* Animated glow ring around image */}
              <div 
                className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-forest/20 via-accent/15 to-leaf/20 blur-3xl opacity-50 animate-breathe" 
                style={{ transform: "translateZ(-30px)" }}
              />

              {/* Decorative orbiting dot */}
              <div 
                className="absolute -right-6 -top-6 size-12 rounded-full border border-forest/30 grid place-items-center animate-spin-slow"
                style={{ transform: "translateZ(20px)" }}
              >
                <div className="size-3 rounded-full bg-accent shadow-lg shadow-accent/50" />
              </div>

              <img
                src={heroImg}
                width={1200}
                height={1400}
                alt="Students planting a sapling together at golden hour"
                className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl border border-border/50 transition-transform duration-700 hover:scale-[1.01]"
                style={{ transform: "translateZ(0px)" }}
              />

              {/* Glass stat card - bottom left */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="glass absolute -bottom-8 -left-8 hidden rounded-2xl p-6 shadow-2xl md:block translate-z-45"
              >
                <div className="flex items-center gap-5">
                  <div className="grid size-14 place-items-center rounded-full bg-forest text-primary-foreground shadow-inner animate-glow-pulse">
                    <Sparkles className="size-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-bold text-forest">850+ Volunteers</p>
                    <p className="text-sm font-medium text-muted-foreground">
                      Across 12 chapters
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Glass stat card - top right */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="glass absolute -top-4 -right-4 hidden rounded-2xl px-5 py-4 shadow-2xl md:block translate-z-60"
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-accent/20 text-accent">
                    <TreePine className="size-5" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-forest">12,400+ Trees</p>
                    <p className="text-xs text-muted-foreground">and counting…</p>
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* STATS with organic wave divider */}
      <section className="section-wave relative bg-forest px-6 pt-20 pb-32 text-primary-foreground overflow-hidden">
        {/* Animated background orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 size-64 rounded-full bg-accent/10 blur-[80px] animate-mesh" />
          <div className="absolute -bottom-20 -right-20 size-48 rounded-full bg-leaf/10 blur-[60px] animate-mesh-alt" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 text-center md:grid-cols-4 relative z-10">
          {heroStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group"
            >
              <div className="font-display text-4xl font-bold md:text-6xl transition-all duration-500 group-hover:scale-110 group-hover:text-accent">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-xs font-semibold uppercase tracking-widest text-leaf">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED CAMPAIGNS */}
      <section className="px-6 py-28 relative">
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
              <span className="text-xs font-bold uppercase tracking-widest text-accent">What we&apos;re building</span>
              <h2 className="mt-3 font-display text-4xl font-bold text-forest md:text-5xl">
                Impact initiatives
              </h2>
              <p className="mt-3 text-muted-foreground text-lg">
                Live campaigns making measurable change in classrooms,
                neighbourhoods and ecosystems.
              </p>
            </motion.div>
            <Link
              to="/campaigns"
              className="group inline-flex items-center gap-2 border-b-2 border-leaf/40 pb-1 text-sm font-semibold text-forest hover:border-forest transition-all"
            >
              View all campaigns <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 lg:grid-rows-2 h-auto min-h-[600px]" style={{ perspective: 1200, transformStyle: "preserve-3d" }}>
            {campaigns.slice(0, 3).map((c, i) => (
              <TiltCard
                key={c.slug}
                initial={{ opacity: 0, y: 50, rotateX: 12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                maxRotation={6}
                className={`group relative overflow-hidden rounded-[2.5rem] bg-card p-5 border border-border shadow-md transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-forest/15 hover:border-forest/30 flex flex-col ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
              >
                <div className={`overflow-hidden rounded-2xl bg-muted relative ${i === 0 ? "flex-1 mb-6" : "aspect-video mb-4"}`}>
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
                <div className="flex flex-col justify-end px-2 pb-2">
                  <h3 className={`font-display font-bold text-forest ${i === 0 ? "text-3xl mt-2" : "text-xl mt-1"}`}>
                    {c.title}
                  </h3>
                  {i === 0 && (
                    <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                      {c.excerpt}
                    </p>
                  )}
                  <div className={`overflow-hidden rounded-full bg-muted ${i === 0 ? "mt-8 h-2.5" : "mt-5 h-2"}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.15, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-forest to-accent shadow-[0_0_12px_rgba(0,200,83,0.4)]"
                    />
                  </div>
                  <div className="mt-3 flex justify-between text-xs font-bold uppercase tracking-tight text-muted-foreground">
                    <span>{c.goal}</span>
                    <span className="text-forest">{c.progress}% complete</span>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="px-6 py-20 relative overflow-hidden">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-forest/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-forest/30 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-forest/3 blur-[120px] animate-breathe" />
        </div>

        <div className="mx-auto max-w-5xl relative z-10">
          <TiltCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            maxRotation={4}
            className="grid gap-12 md:grid-cols-2 items-center rounded-3xl bg-card border border-border p-8 md:p-12 shadow-lg hover:shadow-2xl hover:shadow-forest/10 transition-all duration-700"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:order-last group">
              <img 
                src="/founder.jpg.jpeg" 
                alt="Founder of Environment Club" 
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-bold tracking-widest text-accent uppercase"
              >
                Founder of Club
              </motion.span>
              <h2 className="mt-4 font-display text-4xl font-bold text-forest">
                Sawan Kanojia
              </h2>
              <blockquote className="mt-6 border-l-4 border-accent pl-6 italic text-muted-foreground text-lg relative">
                <span className="absolute -top-4 -left-2 text-6xl text-accent/20 font-serif leading-none">&ldquo;</span>
                "We do not inherit the earth from our ancestors; we borrow it from our children. Our daily choices today are the seeds of the forests of tomorrow. Every single act of conservation matters."
              </blockquote>
              <p className="mt-6 text-foreground leading-relaxed">
                Started with a vision to bring youth together for climate action, our founder believes that true environmental change begins at the grassroots level. By nurturing a profound respect for nature and fostering a community of passionate volunteers, the club has grown from a handful of students into a campus-wide movement dedicated to a sustainable, thriving planet.
              </p>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* PILLARS STRIP */}
      <section className="px-6 py-16 relative">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-accent">What we do</span>
              <h2 className="mt-2 font-display text-4xl font-bold text-forest md:text-5xl">Our Pillars of Action</h2>
            </motion.div>
            <Link
              to="/campaigns"
              className="hidden md:inline-flex items-center gap-2 border-b-2 border-leaf/40 pb-1 text-sm font-semibold text-forest hover:border-forest group transition-all"
            >
              Explore all campaigns <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: 1200, transformStyle: "preserve-3d" }}>
            {initiatives.map((item, i) => (
              <TiltCard
                key={item.id}
                initial={{ opacity: 0, y: 40, rotateX: 12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                maxRotation={8}
                className="group flex flex-col rounded-[2rem] border border-border bg-card p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-forest/15 hover:border-forest/30"
              >
                <span className="text-5xl mb-6 transition-transform duration-500 group-hover:scale-125 inline-block" role="img" aria-label={item.label}>{item.emoji}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2">{item.label}</span>
                <h3 className="font-display text-xl font-bold text-forest">{item.headline}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                  {item.description.slice(0, 120)}…
                </p>
                <div className="mt-6 flex gap-4 flex-wrap">
                  {item.stats.map((s) => (
                    <div key={s.l}>
                      <div className="font-display text-lg font-bold text-forest group-hover:text-accent transition-colors duration-300">{s.v}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{s.l}</div>
                    </div>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS PREVIEW */}
      <section className="section-wave-top relative bg-muted/40 px-6 py-28 pt-36 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute bottom-0 right-0 size-96 rounded-full bg-forest/5 blur-[100px] animate-mesh" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4"
          >
            <h2 className="font-display text-4xl font-bold text-forest md:text-5xl">
              Come do something real
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Our events are open to every student — no prior experience
              needed. Just show up, and leave changed.
            </p>
            <Link
              to="/events"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-forest group"
            >
              See the calendar <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <div className="flex flex-col gap-4 lg:col-span-8">
            {dbEvents.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card">
                <p className="text-sm text-muted-foreground">No upcoming events scheduled at the moment. Check back soon!</p>
              </div>
            ) : (
              dbEvents
                .filter((e) => e.upcoming)
                .slice(0, 3)
                .map((e, i) => (
                  <motion.div
                    key={e.id || e.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-forest/30 hover:shadow-xl hover:shadow-forest/10 hover:-translate-y-1"
                  >
                    <div className="grid size-16 shrink-0 place-items-center rounded-xl border border-leaf/30 bg-leaf/10 text-forest group-hover:bg-forest group-hover:text-primary-foreground transition-all duration-300">
                      <span className="text-[10px] font-bold uppercase">
                        {e.date.split(" ")[0]}
                      </span>
                      <span className="font-display text-xl font-bold leading-none">
                        {e.date.split(" ")[1]}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-moss">
                        {e.kind}
                      </span>
                      <h4 className="mt-1 truncate font-display font-semibold">
                        {e.title}
                      </h4>
                      <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <Calendar className="size-3" /> {e.time}
                        <MapPin className="size-3" /> {e.location}
                      </p>
                    </div>
                    <button className="hidden rounded-full bg-forest/5 px-4 py-2 text-sm font-semibold text-forest opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-forest group-hover:text-primary-foreground md:block">
                      Register
                    </button>
                  </motion.div>
                ))
            )}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 py-28 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/4 size-80 rounded-full bg-accent/5 blur-[100px] animate-mesh" />
          <div className="absolute bottom-1/4 right-1/4 size-60 rounded-full bg-forest/5 blur-[80px] animate-mesh-alt" />
        </div>
        <div className="mx-auto max-w-7xl relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 max-w-2xl font-display text-4xl font-bold text-forest md:text-5xl"
          >
            Voices from the community
          </motion.h2>
          <div className="grid gap-8 md:grid-cols-3" style={{ perspective: 1200, transformStyle: "preserve-3d" }}>
            {testimonials.map((t, i) => (
              <TiltCard
                key={t.name}
                initial={{ opacity: 0, y: 40, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                maxRotation={6}
                className="group rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-forest/10 hover:border-forest/30 relative overflow-hidden"
              >
                {/* Decorative large quote mark */}
                <span className="absolute -top-2 -left-1 text-8xl leading-none text-forest/5 font-serif select-none group-hover:text-forest/10 transition-colors duration-500">&ldquo;</span>
                {/* Gradient accent on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-forest via-accent to-leaf opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <p className="font-display text-lg leading-relaxed text-foreground relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 border-t border-border pt-4 flex items-center gap-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-full bg-forest/10 font-display text-sm font-bold text-forest">
                    {t.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-forest">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </footer>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS — Infinite Marquee */}
      <section className="border-y border-border bg-muted/40 px-6 py-14 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
            In partnership with
          </p>
          <div className="relative overflow-hidden">
            {/* Gradient fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted/40 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted/40 to-transparent z-10" />
            <div className="flex animate-marquee whitespace-nowrap">
              {[...partners, ...partners].map((p, i) => (
                <span
                  key={`${p}-${i}`}
                  className="mx-8 inline-flex items-center gap-2 text-lg font-display font-semibold text-muted-foreground/70 hover:text-forest transition-colors duration-300"
                >
                  <Leaf className="size-4 text-forest/40" />
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-6 py-28 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] rounded-full bg-forest/5 blur-[150px] animate-breathe" />
        </div>
        <div className="mx-auto max-w-4xl relative z-10">
          <TiltCard
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            maxRotation={3}
            className="rounded-[2.5rem] bg-gradient-to-br from-forest via-forest/90 to-accent/80 p-12 md:p-16 text-center text-primary-foreground shadow-2xl shadow-forest/30 relative overflow-hidden"
          >
            {/* Animated decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/20 blur-[80px] animate-mesh" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-leaf/15 blur-[60px] animate-mesh-alt" />

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xs font-bold uppercase tracking-widest text-leaf relative z-10"
            >
              Be the change
            </motion.span>
            <h2 className="mt-4 font-display text-4xl font-bold text-balance md:text-5xl relative z-10">
              Every action counts.{" "}
              <span className="text-accent">Start yours today.</span>
            </h2>
            <p className="mt-5 text-primary-foreground/80 max-w-xl mx-auto leading-relaxed relative z-10 text-lg">
              Whether you want to plant trees, perform on stage, attend a summit
              or connect us with your organisation — there is a place for you here.
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
          </TiltCard>
        </div>
      </section>
    </div>
  );
}
