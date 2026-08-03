import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { posts } from "@/data/mock";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Environment Club" },
      { name: "description", content: "Essays and field reports from our students on climate, biodiversity, water and waste." },
      { property: "og:title", content: "Journal — Environment Club" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <div className="px-6 pb-20 pt-16 overflow-hidden">
      <div className="mx-auto max-w-4xl relative">
        {/* Decorative mesh */}
        <div className="pointer-events-none absolute -top-20 -right-20 size-80 rounded-full bg-forest/5 blur-[100px] animate-mesh" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 size-60 rounded-full bg-accent/5 blur-[80px] animate-mesh-alt" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Journal</span>
          <h1 className="mt-4 font-display text-5xl font-bold leading-tight text-forest text-balance md:text-6xl">
            Notes from the field.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Longform pieces, short experiments, and the occasional confession. Written by the students doing the work.
          </p>
        </motion.div>

        <div className="mt-16 divide-y divide-border border-y border-border relative z-10">
          {posts.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group grid gap-6 py-10 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-baseline transition-all duration-300 hover:bg-forest/3 -mx-4 px-4 rounded-2xl"
            >
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground md:w-36">{p.date}</div>
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-accent">
                  <BookOpen className="size-3" />
                  {p.category}
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold leading-snug text-forest group-hover:text-accent transition-colors duration-300">
                  <a href="#" className="hover:underline">{p.title}</a>
                </h2>
                <p className="mt-3 text-muted-foreground">{p.excerpt}</p>
              </div>
              <div className="hidden items-center gap-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground md:inline-flex">
                <Clock className="size-3" />
                {p.readMin} min
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-forest transition-all duration-300 hover:border-forest hover:shadow-lg hover:shadow-forest/10 hover:-translate-y-1">
            Load more essays <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}