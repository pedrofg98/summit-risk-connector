import { cn } from "@/lib/utils";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
}

/** Texto com aurora dourada em movimento (palavra de destaque do hero). */
export function AuroraText({ children, className }: AuroraTextProps) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span className="sr-only">{children}</span>
      <span
        aria-hidden
        className="relative bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(120deg,#F3E4CC,#D1B08C,#BF9B71,#F3E4CC)",
          backgroundSize: "200% auto",
          WebkitTextFillColor: "transparent",
          animation: "aurora-pan 8s ease-in-out infinite",
        }}
      >
        {children}
      </span>
    </span>
  );
}
