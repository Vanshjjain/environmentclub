import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface Separated3DColumnCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number;
  glowColor?: string;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  onClick?: () => void;
  index?: number;
}

export function Separated3DColumnCard({
  children,
  className,
  maxRotation = 12,
  glowColor = "rgba(16, 185, 129, 0.4)",
  badge,
  icon,
  title,
  subtitle,
  footer,
  onClick,
  index = 0,
}: Separated3DColumnCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxRotation, -maxRotation]), {
    damping: 25,
    stiffness: 250,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxRotation, maxRotation]), {
    damping: 25,
    stiffness: 250,
  });

  const spotlightX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-1000 w-full h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "group relative flex flex-col justify-between h-full rounded-2xl p-6 sm:p-8 cursor-pointer select-none transition-all duration-300",
          "bg-card/85 backdrop-blur-xl border border-forest/20 shadow-2xl",
          "hover:border-accent/60 hover:shadow-accent/25 hover:shadow-2xl",
          className
        )}
      >
        {/* Ambient background depth glow */}
        <div
          className="pointer-events-none absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl z-0"
          style={{
            background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
            transform: "translateZ(-30px)",
          }}
        />

        {/* Dynamic glare reflection overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([x, y]) => `radial-gradient(circle 300px at ${x} ${y}, rgba(255, 255, 255, 0.12), transparent 80%)`
            ),
          }}
        />

        {/* Top Header Layer (translateZ 40px) */}
        {(badge || icon || title) && (
          <div
            className="relative z-20 flex items-start justify-between gap-4 mb-4"
            style={{ transform: "translateZ(40px)" }}
          >
            <div className="flex items-center gap-3">
              {icon && (
                <div className="flex size-12 items-center justify-center rounded-xl bg-forest/15 border border-forest/30 text-accent group-hover:scale-110 group-hover:bg-accent/20 group-hover:border-accent/50 transition-all duration-300 shadow-lg">
                  {icon}
                </div>
              )}
              {title && (
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
                    {title}
                  </h3>
                  {subtitle && (
                    <p className="text-xs text-muted-foreground font-medium mt-0.5">{subtitle}</p>
                  )}
                </div>
              )}
            </div>

            {badge && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/30 bg-forest/10 px-3 py-1 text-xs font-semibold text-accent shadow-sm group-hover:border-accent/50 group-hover:bg-accent/15 transition-colors">
                <span className="size-1.5 animate-pulse rounded-full bg-accent" />
                {badge}
              </span>
            )}
          </div>
        )}

        {/* Card Body Content (translateZ 20px) */}
        <div className="relative z-20 flex-1 my-2" style={{ transform: "translateZ(20px)" }}>
          {children}
        </div>

        {/* Card Footer (translateZ 30px) */}
        {footer && (
          <div
            className="relative z-20 pt-4 mt-4 border-t border-border/40"
            style={{ transform: "translateZ(30px)" }}
          >
            {footer}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
