import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Environment Club" },
      { name: "description", content: "Photographs from campaigns, events and quiet mornings restoring what matters." },
      { property: "og:title", content: "Gallery — Environment Club" },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [dbGallery, setDbGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data, error } = await supabase
          .from("gallery")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error && data) {
          setDbGallery(data);
        }
      } catch (err) {
        console.error("Failed to load gallery:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const goNext = () => {
    if (active !== null) setActive((active + 1) % dbGallery.length);
  };
  const goPrev = () => {
    if (active !== null) setActive((active - 1 + dbGallery.length) % dbGallery.length);
  };

  return (
    <div className="px-6 pb-20 pt-16 overflow-hidden">
      <div className="mx-auto max-w-6xl relative">
        {/* Decorative mesh */}
        <div className="pointer-events-none absolute -top-20 -right-20 size-80 rounded-full bg-forest/5 blur-[100px] animate-mesh" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Gallery</span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold leading-tight text-forest text-balance md:text-6xl">
            Frames from the field.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A quiet archive of the work — the mornings, the mud, the small triumphs and the trees.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="size-8 animate-spin text-forest" />
          </div>
        ) : dbGallery.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-3xl bg-card mt-14">
            <p className="text-sm text-muted-foreground">No photos in the gallery yet. Head to the admin panel to upload images!</p>
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
            {dbGallery.map((g, i) => (
              <motion.button
                key={g.id || i}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                className={`group relative overflow-hidden rounded-2xl bg-muted cursor-pointer ${
                  i % 5 === 0 ? "col-span-2 aspect-[4/3]" : "aspect-square"
                }`}
              >
                <img
                  src={g.src}
                  alt={g.caption}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-forest/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-center justify-center">
                  <div className="glass rounded-full p-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <ZoomIn className="size-5 text-white" />
                  </div>
                </div>
                {/* Caption on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-sm text-white font-medium drop-shadow-lg">{g.caption}</p>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && dbGallery[active] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            {/* Close button */}
            <button
              aria-label="Close"
              className="absolute right-6 top-6 grid size-12 place-items-center rounded-full glass text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 z-20 cursor-pointer"
              onClick={() => setActive(null)}
            >
              <X className="size-5" />
            </button>

            {/* Previous */}
            <button
              aria-label="Previous"
              className="absolute left-6 top-1/2 -translate-y-1/2 grid size-12 place-items-center rounded-full glass text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 z-20 cursor-pointer"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* Next */}
            <button
              aria-label="Next"
              className="absolute right-6 top-1/2 -translate-y-1/2 grid size-12 place-items-center rounded-full glass text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 z-20 cursor-pointer"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >
              <ChevronRight className="size-6" />
            </button>

            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={dbGallery[active].src}
              alt={dbGallery[active].caption}
              className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Caption */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 glass rounded-full px-6 py-2 text-sm text-white font-medium"
            >
              {dbGallery[active].caption}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}