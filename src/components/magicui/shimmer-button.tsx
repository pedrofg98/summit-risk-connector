import React, { type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  borderRadius?: string;
  background?: string;
  children?: React.ReactNode;
}

/** Botão dourado premium com sheen percorrendo no hover — CTA principal. */
export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      borderRadius = "999px",
      background = "linear-gradient(180deg,#E7D0AE 0%,#D1B08C 45%,#BF9B71 100%)",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        style={
          {
            background,
            borderRadius,
          } as CSSProperties
        }
        className={cn(
          "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap px-9 py-4 text-gold-ink",
          "font-display text-[0.95rem] font-extrabold uppercase tracking-[0.05em]",
          "border border-white/15 shadow-[0_14px_40px_-14px_rgba(209,176,140,0.65)]",
          "transform-gpu transition-all duration-300 hover:scale-[1.025] hover:shadow-[0_22px_60px_-12px_rgba(209,176,140,0.8)] active:translate-y-px",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className
        )}
        {...props}
      >
        {/* glow interno animado */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 animate-gold-pulse opacity-60"
          style={{
            background:
              "radial-gradient(120% 80% at 50% -10%, rgba(255,247,234,0.55), transparent 60%)",
          }}
        />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {/* sheen no hover */}
        <span className="pointer-events-none absolute inset-y-0 -left-1/3 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:left-[120%] group-hover:opacity-100" />
      </button>
    );
  }
);
ShimmerButton.displayName = "ShimmerButton";
