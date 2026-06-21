import { type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}

/** Feixe de luz percorrendo a borda do container (usa offset-path). */
export function BorderBeam({
  className,
  size = 220,
  duration = 9,
  delay = 0,
  colorFrom = "#D1B08C",
  colorTo = "#F3E4CC",
}: BorderBeamProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] [border:1px_solid_transparent] [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]"
      aria-hidden
    >
      <div
        className={cn(
          "absolute aspect-square animate-border-beam [background:linear-gradient(to_left,var(--from),var(--to),transparent)] [offset-anchor:90%_50%] [offset-path:rect(0_auto_auto_0_round_var(--radius,14px))]",
          className
        )}
        style={
          {
            width: size,
            "--from": colorFrom,
            "--to": colorTo,
            "--duration": duration,
            animationDelay: `${delay}s`,
          } as CSSProperties
        }
      />
    </div>
  );
}
