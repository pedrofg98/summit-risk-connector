import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/** Barra de progresso dourada fixa no topo. */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={cn(
        "fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold-deep via-gold to-gold-soft",
        className
      )}
      style={{ scaleX }}
    />
  );
}
