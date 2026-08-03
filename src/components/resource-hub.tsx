import * as React from "react";
import { motion } from "framer-motion";
import { Download, FileText, Sparkles, ShieldCheck, ExternalLink } from "lucide-react";
import { downloadableResources } from "@/data/mock";
import { Separated3DColumnCard } from "@/components/ui/separated-3d-column-card";
import { toast } from "sonner";

export function ResourceHub() {
  const handleDownload = (filename: string, title: string) => {
    toast.success(`Downloading "${title}"...`);
    
    // Simulate downloadable document trigger
    const element = document.createElement("a");
    const file = new Blob([`Environment Club Official Document: ${title}\nGenerated for user download.\nVisit https://github.com/Vanshjjain/environmentclub`], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/40 bg-forest/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent backdrop-blur-md">
            <Sparkles className="size-3.5" />
            Media & Resource Hub
          </span>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-foreground">
            Downloadable Reports & Toolkits
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl font-medium">
            Open-access ecological audits, native planting guides, zero-waste toolkits, and official press kits for institutions and sponsors.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {downloadableResources.map((res, i) => (
          <Separated3DColumnCard
            key={res.filename}
            index={i}
            maxRotation={8}
            badge={res.category}
            title={res.title}
            subtitle={`${res.format} • ${res.size}`}
            glowColor="rgba(34, 197, 94, 0.35)"
            footer={
              <button
                onClick={() => handleDownload(res.filename, res.title)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-forest px-4 py-2.5 text-xs font-bold text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-md"
              >
                <Download className="size-4" /> Download {res.format} ({res.size})
              </button>
            }
          >
            <p className="my-3 text-xs text-muted-foreground leading-relaxed font-medium">
              {res.subtitle}
            </p>
          </Separated3DColumnCard>
        ))}
      </div>
    </div>
  );
}
