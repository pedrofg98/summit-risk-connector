import { useEffect, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
  className?: string;
}

/** Chuva de meteoros douradas (acento sutil em seções escuras). */
export function Meteors({ number = 16, className }: MeteorsProps) {
  const [meteors, setMeteors] = useState<CSSProperties[]>([]);

  useEffect(() => {
    setMeteors(
      Array.from({ length: number }, () => ({
        top: "-5%",
        left: `${Math.floor(Math.random() * 100)}%`,
        animationDelay: `${(Math.random() * 5).toFixed(2)}s`,
        animationDuration: `${(Math.random() * 4 + 4).toFixed(2)}s`,
        ["--angle" as string]: "215deg",
      }))
    );
  }, [number]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {meteors.map((style, i) => (
        <span
          key={i}
          style={style}
          className="absolute size-0.5 rotate-[215deg] animate-meteor rounded-full bg-gold shadow-[0_0_0_1px_rgba(209,176,140,0.15)]"
        >
          <span className="absolute top-1/2 -z-10 h-px w-[60px] -translate-y-1/2 bg-gradient-to-r from-gold to-transparent" />
        </span>
      ))}
    </div>
  );
}
