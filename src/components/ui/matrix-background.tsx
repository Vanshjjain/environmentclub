import * as React from "react";
import { cn } from "@/lib/utils";

interface MatrixBackgroundProps {
  className?: string;
  opacity?: number;
  speed?: number;
  fontSize?: number;
  interactive?: boolean;
}

export function MatrixBackground({
  className,
  opacity = 0.15,
  speed = 1,
  fontSize = 14,
  interactive = true,
}: MatrixBackgroundProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const mouseRef = React.useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const chars = [
      "🌱", "🌿", "⚡", "♻️", "0", "1", "λ", "Ω", "⌘", "▲", 
      "E", "C", "O", "G", "R", "E", "E", "N", "1", "0", "1", "0",
      "0101", "1010", "ECO", "BIO", "SUN", "AIR"
    ];

    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array(columns).fill(1).map(() => Math.floor(Math.random() * -50));
    const charIndex: number[] = Array(columns).fill(0).map(() => Math.floor(Math.random() * chars.length));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener("resize", handleResize);
    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    let lastTime = performance.now();

    const draw = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      if (delta < 0.033) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastTime = currentTime;

      // Dark translucent wash to create fading trailing effect
      ctx.fillStyle = "rgba(10, 20, 15, 0.12)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "Courier New", monospace`;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Calculate proximity to mouse
        const dist = Math.hypot(x - mouseX, y - mouseY);
        const isHovered = dist < 120;

        // Select character
        const text = chars[(charIndex[i] + Math.floor(drops[i])) % chars.length];

        // Glow header character
        if (isHovered) {
          ctx.fillStyle = "#6ee7b7"; // Bright neon mint
          ctx.shadowColor = "#34d399";
          ctx.shadowBlur = 12;
        } else if (Math.random() > 0.95) {
          ctx.fillStyle = "#a7f3d0"; // Soft emerald highlight
          ctx.shadowColor = "#10b981";
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = "rgba(16, 185, 129, 0.75)";
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, x, y);

        // Reset drops when they reach the bottom
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speed * (isHovered ? 1.8 : 1);
      }

      // Draw subtle interactive spotlight around cursor
      if (interactive && mouseX > 0 && mouseY > 0) {
        const radial = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 180);
        radial.addColorStop(0, "rgba(52, 211, 153, 0.18)");
        radial.addColorStop(0.5, "rgba(16, 185, 129, 0.06)");
        radial.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = radial;
        ctx.fillRect(0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [opacity, speed, fontSize, interactive]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none z-0",
        className
      )}
      style={{ opacity }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
