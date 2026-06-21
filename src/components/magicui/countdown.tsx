import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownProps {
  /** Data alvo ISO (ex.: 2026-08-08T08:00:00-03:00) */
  target: string;
  className?: string;
  compact?: boolean;
}

function diff(target: number) {
  const now = Date.now();
  const d = Math.max(0, target - now);
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d % 86400000) / 3600000),
    minutes: Math.floor((d % 3600000) / 60000),
    seconds: Math.floor((d % 60000) / 1000),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Contagem regressiva para o evento. */
export function Countdown({ target, className, compact = false }: CountdownProps) {
  const targetMs = useMemo(() => new Date(target).getTime(), [target]);
  const [t, setT] = useState(() => diff(targetMs));

  useEffect(() => {
    const id = setInterval(() => setT(diff(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const units = [
    { label: "dias", value: t.days },
    { label: "horas", value: t.hours },
    { label: "min", value: t.minutes },
    { label: "seg", value: t.seconds },
  ];

  return (
    <div className={cn("flex items-stretch gap-2 sm:gap-3", className)}>
      {units.map((u, i) => (
        <div key={u.label} className="flex items-stretch gap-2 sm:gap-3">
          <div
            className={cn(
              "flex flex-col items-center justify-center rounded-xl border border-gold/25 bg-white/[0.03] backdrop-blur-sm",
              compact ? "w-[58px] py-2" : "w-[70px] py-3 sm:w-20"
            )}
          >
            <span
              className={cn(
                "font-display font-black tabular-nums text-gold",
                compact ? "text-2xl" : "text-3xl sm:text-4xl"
              )}
            >
              {pad(u.value)}
            </span>
            <span className="mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {u.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span
              className={cn(
                "self-center font-display font-black text-gold/40",
                compact ? "text-xl" : "text-2xl"
              )}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
