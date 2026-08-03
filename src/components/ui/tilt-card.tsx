import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxRotation?: number; // max rotation degrees, default 12
  perspective?: number; // perspective value, default 1000
  glareOpacity?: number; // max glare opacity, default 0.12
  glareColor?: string; // glare color, default white overlay
  springConfig?: { damping: number; stiffness: number };
}

export const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(
  (
    {
      children,
      className,
      maxRotation = 12,
      perspective = 1000,
      glareOpacity = 0.12,
      glareColor = "rgba(255, 255, 255, 0.4)",
      springConfig = { damping: 25, stiffness: 180 },
      ...props
    },
    ref
  ) => {
    const cardRef = React.useRef<HTMLDivElement>(null);

    // Motion values for X/Y rotation
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    // Smooth springs for rotations
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    // Glare coordinates
    const glareX = useMotionValue(0);
    const glareY = useMotionValue(0);
    const glareShow = useMotionValue(0);

    // Smooth spring for glare visibility and glare coords
    const springGlareX = useSpring(glareX, springConfig);
    const springGlareY = useSpring(glareY, springConfig);
    const springGlareShow = useSpring(glareShow, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Mouse position relative to the element
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Map to values between -0.5 and 0.5
      const relativeX = (mouseX / width) - 0.5;
      const relativeY = (mouseY / height) - 0.5;

      // Calculate rotation (Y-axis controls tilt on X, and vice-versa)
      rotateX.set(-relativeY * maxRotation);
      rotateY.set(relativeX * maxRotation);

      // Set glare coordinates as percentage (0% to 100%)
      glareX.set((mouseX / width) * 100);
      glareY.set((mouseY / height) * 100);
      glareShow.set(glareOpacity);
    };

    const handleMouseLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
      glareShow.set(0);
    };

    const handleMouseEnter = () => {
      glareShow.set(glareOpacity);
    };

    // Combine custom external ref with local cardRef
    React.useImperativeHandle(ref, () => cardRef.current!);

    // Glare dynamic background style
    const glareBg = useTransform(
      [springGlareX, springGlareY],
      ([x, y]) => {
        return `radial-gradient(circle 250px at ${x}% ${y}%, ${glareColor}, transparent)`;
      }
    );

    return (
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn("relative overflow-hidden", className)}
        style={{
          transformStyle: "preserve-3d",
          perspective: `${perspective}px`,
          rotateX: springRotateX,
          rotateY: springRotateY,
          ...props.style,
        }}
        {...props}
      >
        {/* Dynamic Sheen/Glare Overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300"
          style={{
            background: glareBg,
            opacity: springGlareShow,
          }}
        />
        
        {/* Card Content wrapper to make preserve-3d work for children */}
        <div style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }} className="w-full h-full">
          {children}
        </div>
      </motion.div>
    );
  }
);

TiltCard.displayName = "TiltCard";
