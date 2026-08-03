import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Sparkles, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Environment Club" },
      {
        name: "description",
        content:
          "Workshops, field days, panel talks and clean-ups. Everyone is welcome — no prior experience needed.",
      },
      { property: "og:title", content: "Events — Environment Club" },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: EventsPage,
});

function EventCard({ e, i, dim }: { e: any; i: number; dim?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      className={`group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6 rounded-2xl border border-border bg-card p-5 ${
        dim ? "opacity-60 hover:opacity-80" : "hover:border-forest/30 hover:shadow-xl hover:shadow-forest/10 hover:-translate-y-1"
      } transition-all duration-300`}
    >
      <div
        className={`grid size-16 shrink-0 place-items-center rounded-xl transition-all duration-300 ${
          dim
            ? "border border-border bg-muted text-muted-foreground"
            : "border border-leaf/30 bg-leaf/10 text-forest group-hover:bg-forest group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-forest/30 group-hover:scale-110"
        }`}
      >
        <span className="text-[10px] font-bold uppercase">{e.date.split(" ")[0]}</span>
        <span className="font-display text-xl font-bold leading-none">{e.date.split(" ")[1]}</span>
      </div>
      <div className="min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-widest text-moss">{e.kind}</span>
        <h4 className="mt-1 truncate font-display font-semibold">{e.title}</h4>
        <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Clock className="size-3" /> {e.time}</span>
          <span className="inline-flex items-center gap-1"><MapPin className="size-3" /> {e.location}</span>
          <span className="inline-flex items-center gap-1"><Calendar className="size-3" /> {e.year}</span>
        </p>
      </div>
      {!dim && (
        <button className="hidden rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-accent hover:shadow-lg hover:shadow-forest/30 md:block">
          Register
        </button>
      )}
    </motion.div>
  );
}

function EventsPage() {
  const [dbEvents, setDbEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const upcoming = dbEvents.filter((e) => e.upcoming);
  const past = dbEvents.filter((e) => !e.upcoming);

  return (
    <div className="px-6 pb-20 pt-16 overflow-hidden">
      <div className="mx-auto max-w-5xl relative">
        {/* Decorative mesh */}
        <div className="pointer-events-none absolute -top-20 -left-20 size-80 rounded-full bg-forest/5 blur-[100px] animate-mesh" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Events</span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold leading-tight text-forest text-balance md:text-6xl">
            Show up. Get your hands dirty. Leave changed.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A rolling calendar of workshops, panels and field days — open to any student, from any department.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="size-8 animate-spin text-forest" />
          </div>
        ) : (
          <>
            <section className="mt-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-6 flex items-center gap-3"
              >
                <div className="grid size-8 place-items-center rounded-full bg-forest/10 text-forest">
                  <Sparkles className="size-4" />
                </div>
                <h2 className="font-display text-2xl font-bold text-forest">Upcoming</h2>
              </motion.div>
              
              {upcoming.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-border rounded-2xl bg-card">
                  <p className="text-sm text-muted-foreground">No upcoming events scheduled at the moment. Check back soon!</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {upcoming.map((e, i) => <EventCard key={e.id || e.title} e={e} i={i} />)}
                </div>
              )}
            </section>

            <section className="mt-16">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-6 font-display text-2xl font-bold text-forest"
              >
                Past highlights
              </motion.h2>
              
              {past.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-border rounded-2xl bg-card">
                  <p className="text-sm text-muted-foreground">No past events recorded in the system.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {past.map((e, i) => <EventCard key={e.id || e.title} e={e} i={i} dim />)}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}