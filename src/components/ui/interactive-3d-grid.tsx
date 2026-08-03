import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function Interactive3DGrid({ className }: { className?: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 45, stiffness: 120 });
  const springY = useSpring(y, { damping: 45, stiffness: 120 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Get normalized coordinate offsets between -0.5 and 0.5
      const relativeX = (e.clientX / innerWidth) - 0.5;
      const relativeY = (e.clientY / innerHeight) - 0.5;

      // Map to translations
      x.set(relativeX * 35);
      y.set(relativeY * 35);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  // Calculate coordinates for 3D perspective grid plane
  const gridTranslateX = springX;
  const gridTranslateY = useTransform(springY, (value) => value * 0.6);
  const gridRotateY = useTransform(springX, (value) => -value * 0.08);
  const gridRotateX = useTransform(springY, (value) => 58 - value * 0.08);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden z-0 select-none",
        className
      )}
      style={{
        perspective: "800px",
        perspectiveOrigin: "50% 20%",
      }}
    >
      {/* 3D Grid Plane */}
      <motion.div
        className="absolute -inset-[150%] origin-center opacity-[0.18] dark:opacity-[0.14]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-forest) 1.5px, transparent 1.5px),
            linear-gradient(to bottom, var(--color-forest) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "80px 80px",
          backgroundPosition: "center",
          maskImage: "linear-gradient(to bottom, transparent 10%, rgba(0, 0, 0, 0.8) 45%, rgba(0, 0, 0, 0.9) 75%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 10%, rgba(0, 0, 0, 0.8) 45%, rgba(0, 0, 0, 0.9) 75%, transparent 100%)",
          translateX: gridTranslateX,
          translateY: gridTranslateY,
          rotateX: gridRotateX,
          rotateY: gridRotateY,
          translateZ: 0,
        }}
      />

      {/* Grid fade blend */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: "radial-gradient(circle 80% at 50% 50%, transparent 20%, var(--background) 95%)"
        }}
      />
    </div>
  );
}
