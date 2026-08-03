import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, Search, Sparkles, BookOpen, User, Tag } from "lucide-react";
import React, { useState } from "react";
import { posts } from "@/data/mock";
import { MatrixBackground } from "@/components/ui/matrix-background";
import { Separated3DColumnCard } from "@/components/ui/separated-3d-column-card";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal & Climate Field Notes — Environment Club" },
      {
        name: "description",
        content:
          "Articles, field notes, plastic audit data and guides written by student volunteers and eco campaign leads.",
      },
      { property: "og:title", content: "Journal — Environment Club" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Biodiversity", "Plastic Pollution", "Water Conservation", "Climate Literacy"];

  const filteredPosts = posts.filter((post) => {
    const matchesCat = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="px-6 pb-24 pt-28 overflow-hidden bg-background">
      <MatrixBackground opacity={0.1} speed={1} />

      <div className="mx-auto max-w-6xl relative z-10 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-forest/40 bg-forest/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent backdrop-blur-md">
            <BookOpen className="size-3.5 text-accent" />
            Field Notes & Research
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-extrabold leading-tight text-foreground text-balance md:text-6xl">
            Journal, Data & <span className="text-accent matrix-glow">Climate Stories.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground font-medium leading-relaxed">
            Written by student volunteers, campaign leads, and guest researchers. Field guides, campus plastic audits, and native reforestation updates.
          </p>
        </motion.div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card/70 p-3.5 rounded-2xl border border-border">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-forest text-primary-foreground shadow-lg shadow-forest/30"
                    : "bg-muted/60 text-muted-foreground hover:bg-forest/20 hover:text-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3.5 top-3 size-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles & topics..."
              className="w-full rounded-xl bg-muted/60 border border-border pl-10 pr-4 py-2.5 text-xs font-medium text-foreground focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {filteredPosts.length === 0 ? (
            <div className="col-span-2 text-center py-16 border border-dashed border-border rounded-3xl bg-card p-8">
              <p className="text-sm text-muted-foreground">No articles match your current search criteria.</p>
            </div>
          ) : (
            filteredPosts.map((post, i) => (
              <Separated3DColumnCard
                key={post.slug}
                index={i}
                maxRotation={8}
                badge={post.category}
                title={post.title}
                subtitle={`${post.date} • ${post.readMin} min read`}
                glowColor="rgba(34, 197, 94, 0.35)"
                footer={
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      {post.authorAvatar && (
                        <img
                          src={post.authorAvatar}
                          alt={post.author}
                          className="size-7 rounded-full object-cover border border-accent/40"
                        />
                      )}
                      <span className="text-xs font-bold text-foreground">{post.author}</span>
                    </div>

                    <span className="text-xs font-bold text-accent hover:underline flex items-center gap-1">
                      Read Article <Clock className="size-3.5" />
                    </span>
                  </div>
                }
              >
                <p className="my-3 text-sm text-muted-foreground leading-relaxed font-medium">
                  {post.excerpt}
                </p>
              </Separated3DColumnCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
}