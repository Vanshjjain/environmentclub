import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, Trees, Sparkles, Navigation, Layers, Search } from "lucide-react";
import { impactLocations } from "@/data/mock";
import { Separated3DColumnCard } from "@/components/ui/separated-3d-column-card";

export function ImpactMap() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [activeLocation, setActiveLocation] = React.useState<number | null>(1);

  const categories = ["All", "Campus", "Riverbed", "Urban Park", "Forest Belt", "Wetland", "Sanctuary"];

  const filteredLocations = impactLocations.filter((loc) => {
    const matchesCat = selectedCategory === "All" || loc.category === selectedCategory;
    const matchesQuery =
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.species.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const totalTrees = impactLocations.reduce((sum, loc) => sum + loc.count, 0);

  return (
    <div className="w-full space-y-8">
      {/* Map Header Controls */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/40 bg-forest/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent backdrop-blur-md">
            <Sparkles className="size-3.5" />
            Interactive Reforestation Map
          </span>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-foreground">
            30+ Planting Sites Across Meerut & UP
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl font-medium">
            Explore verified reforestation corridors, riverbank buffer zones, and campus native forests planted by our volunteers.
          </p>
        </div>

        {/* Live Total Pill */}
        <div className="flex items-center gap-4 bg-card/90 border border-forest/30 rounded-2xl p-4 shadow-xl">
          <div className="grid size-12 place-items-center rounded-xl bg-forest/20 text-accent border border-forest/40">
            <Trees className="size-6" />
          </div>
          <div>
            <div className="font-display text-2xl font-extrabold text-accent matrix-glow">
              {totalTrees.toLocaleString()}+
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Total Verified Trees Planted
            </div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card/60 p-3 rounded-2xl border border-border">
        {/* Category Pills */}
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

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search site, city or tree species..."
            className="w-full rounded-xl bg-muted/60 border border-border pl-9 pr-4 py-2 text-xs font-medium text-foreground focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {/* Grid of Location Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredLocations.map((loc, i) => (
          <Separated3DColumnCard
            key={loc.id}
            index={i}
            maxRotation={8}
            badge={loc.category}
            title={loc.name}
            subtitle={loc.city}
            glowColor="rgba(34, 197, 94, 0.4)"
            onClick={() => setActiveLocation(loc.id)}
            className={activeLocation === loc.id ? "border-accent bg-card" : ""}
            footer={
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                  <MapPin className="size-3.5 text-accent" /> Verified Site
                </span>
                <span className="text-xs font-bold text-accent">{loc.count}+ Saplings</span>
              </div>
            }
          >
            <div className="my-3 space-y-2">
              <div className="text-xs font-semibold text-foreground flex items-center justify-between">
                <span className="text-muted-foreground">Species:</span>
                <span className="text-accent font-bold">{loc.species}</span>
              </div>
              <div className="w-full bg-muted/80 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-forest to-accent h-full rounded-full"
                  style={{ width: `${Math.min(100, (loc.count / 2500) * 100)}%` }}
                />
              </div>
            </div>
          </Separated3DColumnCard>
        ))}
      </div>
    </div>
  );
}
