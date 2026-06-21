import { useCallback, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagicCardProps {
  children?: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

/** Card com spotlight dourado que segue o cursor + realce de borda. */
export function MagicCard({
  children,
  className,
  gradientSize = 240,
  gradientColor = "rgba(209,176,140,0.12)",
  gradientOpacity = 0.85,
  gradientFrom = "#D1B08C",
  gradientTo = "#7a5f3e",
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-gradientSize * 10);
  const mouseY = useMotionValue(-gradientSize * 10);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const { left, top } = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    },
    [mouseX, mouseY]
  );

  const handleLeave = useCallback(() => {
    mouseX.set(-gradientSize * 10);
    mouseY.set(-gradientSize * 10);
  }, [mouseX, mouseY, gradientSize]);

  useEffect(() => {
    handleLeave();
  }, [handleLeave]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card",
        className
      )}
    >
      {/* borda dourada que segue o cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientFrom}, ${gradientTo}, transparent 100%)`,
        }}
      />
      <div className="absolute inset-px rounded-[15px] bg-card" />
      {/* spotlight interno */}
      <motion.div
        className="pointer-events-none absolute inset-px rounded-[15px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)`,
          opacity: gradientOpacity,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
