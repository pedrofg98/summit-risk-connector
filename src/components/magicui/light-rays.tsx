import { useEffect, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LightRaysProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  color?: string;
  blur?: number;
  speed?: number;
  length?: string;
}

type Ray = {
  id: string;
  left: number;
  rotate: number;
  width: number;
  swing: number;
  delay: number;
  duration: number;
  intensity: number;
};

const createRays = (count: number, cycle: number): Ray[] =>
  Array.from({ length: Math.max(count, 0) }, (_, i) => ({
    id: `${i}`,
    left: 8 + Math.random() * 84,
    rotate: -26 + Math.random() * 52,
    width: 150 + Math.random() * 170,
    swing: 0.8 + Math.random() * 1.8,
    delay: Math.random() * cycle,
    duration: cycle * (0.75 + Math.random() * 0.5),
    intensity: 0.45 + Math.random() * 0.4,
  }));

/** Raios de luz dourados descendo do topo (atmosfera do hero). */
export function LightRays({
  className,
  style,
  count = 8,
  color = "rgba(209, 176, 140, 0.5)",
  blur = 40,
  speed = 16,
  length = "78vh",
  ...props
}: LightRaysProps) {
  const [rays, setRays] = useState<Ray[]>([]);
  const cycle = Math.max(speed, 0.1);

  useEffect(() => {
    setRays(createRays(count, cycle));
  }, [count, cycle]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 isolate overflow-hidden",
        className
      )}
      style={{ ...style }}
      {...props}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 30% 0%, rgba(209,176,140,0.18), transparent 60%)",
        }}
      />
      {rays.map((r) => (
        <motion.div
          key={r.id}
          className="absolute -top-[12%] origin-top -translate-x-1/2 rounded-full mix-blend-screen"
          style={
            {
              left: `${r.left}%`,
              width: `${r.width}px`,
              height: length,
              filter: `blur(${blur}px)`,
              background: `linear-gradient(to bottom, ${color}, transparent)`,
            } as CSSProperties
          }
          initial={{ rotate: r.rotate, opacity: 0 }}
          animate={{
            opacity: [0, r.intensity, 0],
            rotate: [r.rotate - r.swing, r.rotate + r.swing, r.rotate - r.swing],
          }}
          transition={{
            duration: r.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: r.delay,
          }}
        />
      ))}
    </div>
  );
}
