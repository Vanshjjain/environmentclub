import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Sparkles, Loader2, CheckCircle2, CalendarPlus, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { MatrixBackground } from "@/components/ui/matrix-background";
import { Separated3DColumnCard } from "@/components/ui/separated-3d-column-card";
import { SuggestEventModal } from "@/components/suggest-event-modal";

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

function EventsPage() {
  const [dbEvents, setDbEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);

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
    <div className="px-6 pb-20 pt-28 overflow-hidden bg-background">
      <MatrixBackground opacity={0.1} speed={1} />

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-forest/40 bg-forest/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent backdrop-blur-md">
              <Sparkles className="size-3.5 text-accent" />
              Events Calendar
            </span>
            <h1 className="mt-4 max-w-3xl font-display text-5xl font-extrabold leading-tight text-foreground text-balance md:text-6xl">
              Show up. Get your hands dirty. <span className="text-accent matrix-glow">Leave changed.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground font-medium">
              A rolling calendar of workshops, panels and field days — open to any student, from any department.
            </p>
          </motion.div>

          <button
            onClick={() => setIsSuggestModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-xs font-bold text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all shadow-lg cursor-pointer shrink-0"
          >
            <CalendarPlus className="size-4" /> Suggest An Event
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="size-10 animate-spin text-accent" />
          </div>
        ) : (
          <div className="space-y-16">
            {/* UPCOMING EVENTS */}
            <section>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-8 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-full bg-forest/20 text-accent border border-forest/40">
                    <Sparkles className="size-5" />
                  </div>
                  <h2 className="font-display text-3xl font-extrabold text-foreground">Upcoming Events</h2>
                </div>
              </motion.div>

              {upcoming.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-forest/40 rounded-3xl bg-card/90 p-8 space-y-4">
                  <div className="mx-auto grid size-14 place-items-center rounded-full bg-forest/20 text-accent border border-forest/40">
                    <Calendar className="size-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">New Drives Being Scheduled</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Our next major plantation drive and street play schedule is being finalized for this month.
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center gap-4">
                    <button
                      onClick={() => setIsSuggestModalOpen(true)}
                      className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-2.5 text-xs font-bold text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all shadow-lg"
                    >
                      <CalendarPlus className="size-4" /> Suggest A Cleanup Location
                    </button>
                    <button
                      onClick={() => setIsSuggestModalOpen(true)}
                      className="inline-flex items-center gap-2 rounded-full border border-forest/40 bg-card px-6 py-2.5 text-xs font-bold text-accent hover:bg-forest/20 transition-all"
                    >
                      <Bell className="size-4" /> Get Email Alerts
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {upcoming.map((e, i) => (
                    <Separated3DColumnCard
                      key={e.id || e.title}
                      index={i}
                      maxRotation={10}
                      badge={e.kind}
                      title={e.title}
                      glowColor="rgba(34, 197, 94, 0.4)"
                      footer={
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                            <MapPin className="size-3.5 text-accent" /> {e.location}
                          </span>
                          <button className="rounded-full bg-forest px-4 py-1.5 text-xs font-bold text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all shadow-md">
                            RSVP Now
                          </button>
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
                            <Clock className="size-3.5 text-accent" /> {e.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="size-3.5 text-muted-foreground" /> {e.year}
                          </div>
                        </div>
                      </div>
                    </Separated3DColumnCard>
                  ))}
                </div>
              )}
            </section>

            {/* PAST HIGHLIGHTS */}
            <section>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-8 flex items-center gap-3"
              >
                <div className="grid size-9 place-items-center rounded-full bg-muted text-muted-foreground border border-border">
                  <CheckCircle2 className="size-5" />
                </div>
                <h2 className="font-display text-3xl font-extrabold text-foreground">Past Highlights</h2>
              </motion.div>

              {past.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card">
                  <p className="text-sm text-muted-foreground">No past events recorded yet.</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {past.map((e, i) => (
                    <Separated3DColumnCard
                      key={e.id || e.title}
                      index={i}
                      maxRotation={8}
                      badge="Completed"
                      title={e.title}
                      className="opacity-75 hover:opacity-100"
                      footer={
                        <div className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                          <MapPin className="size-3.5" /> {e.location}
                        </div>
                      }
                    >
                      <div className="flex items-center gap-4 my-4">
                        <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-muted border border-border text-muted-foreground">
                          <span className="text-[10px] font-bold uppercase">{e.date.split(" ")[0]}</span>
                          <span className="font-display text-xl font-bold leading-none">{e.date.split(" ")[1]}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <div>{e.time}</div>
                          <div>{e.year}</div>
                        </div>
                      </div>
                    </Separated3DColumnCard>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>

      <SuggestEventModal isOpen={isSuggestModalOpen} onClose={() => setIsSuggestModalOpen(false)} />
    </div>
  );
}