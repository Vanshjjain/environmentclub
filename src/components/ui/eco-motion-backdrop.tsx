import * as React from "react";
import ecoBg from "@/assets/eco-background.png";
import { cn } from "@/lib/utils";

interface EcoMotionBackdropProps {
  className?: string;
  overlayOpacity?: number;
}

export function EcoMotionBackdrop({ className, overlayOpacity = 0.85 }: EcoMotionBackdropProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    // Glowing firefly particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random(),
      maxAlpha: Math.random() * 0.7 + 0.3,
      speedAlpha: Math.random() * 0.015 + 0.005,
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.speedAlpha;

        if (p.alpha > p.maxAlpha || p.alpha < 0.1) {
          p.speedAlpha = -p.speedAlpha;
        }

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52, 211, 153, ${p.alpha})`;
        ctx.shadowColor = "#34d399";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none z-0",
        className
      )}
    >
      {/* Background Image Artwork */}
      <img
        src={ecoBg}
        alt="Ambient Environmental Background"
        className="absolute inset-0 h-full w-full object-cover object-center animate-breathe opacity-35 scale-105"
      />

      {/* Fireflies particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Dark gradient radial vignette for text contrast */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle 70% at 50% 40%, rgba(10, 20, 15, ${overlayOpacity - 0.2}), rgba(10, 20, 15, ${overlayOpacity}))`,
        }}
      />
    </div>
  );
}
