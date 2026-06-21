import { BlurFade } from "@/components/magicui/blur-fade";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <BlurFade>
          <span className="eyebrow">{eyebrow}</span>
        </BlurFade>
      )}
      <BlurFade delay={0.08}>
        <h2
          className={cn(
            "display text-balance text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.06] text-white",
            align === "center" ? "mx-auto max-w-[820px]" : "max-w-[760px]"
          )}
        >
          {title}
        </h2>
      </BlurFade>
      {subtitle && (
        <BlurFade delay={0.16}>
          <p
            className={cn(
              "max-w-2xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg",
              align === "center" && "mx-auto"
            )}
          >
            {subtitle}
          </p>
        </BlurFade>
      )}
    </div>
  );
}
