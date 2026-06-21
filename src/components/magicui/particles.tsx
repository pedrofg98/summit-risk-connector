import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  color?: string;
}

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h.split("").map((c) => c + c).join("")
      : h.padEnd(6, "0").slice(0, 6);
  const int = parseInt(full, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

/** Partículas douradas leves que reagem ao mouse. */
export function Particles({
  className,
  quantity = 60,
  staticity = 50,
  ease = 50,
  size = 0.5,
  color = "#D1B08C",
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const size_ = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const rgb = hexToRgb(color);

  useEffect(() => {
    if (canvasRef.current) ctxRef.current = canvasRef.current.getContext("2d");
    init();
    window.addEventListener("resize", init);
    let raf = 0;
    const loop = () => {
      animate();
      raf = requestAnimationFrame(loop);
    };
    loop();
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left - rect.width / 2;
      mouse.current.y = e.clientY - rect.top - rect.height / 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resize = () => {
    if (!containerRef.current || !canvasRef.current || !ctxRef.current) return;
    const { offsetWidth, offsetHeight } = containerRef.current;
    size_.current.w = offsetWidth;
    size_.current.h = offsetHeight;
    canvasRef.current.width = offsetWidth * dpr;
    canvasRef.current.height = offsetHeight * dpr;
    canvasRef.current.style.width = `${offsetWidth}px`;
    canvasRef.current.style.height = `${offsetHeight}px`;
    ctxRef.current.scale(dpr, dpr);
  };

  const newCircle = (): Circle => {
    const { w, h } = size_.current;
    return {
      x: Math.floor(Math.random() * w),
      y: Math.floor(Math.random() * h),
      translateX: 0,
      translateY: 0,
      size: Math.floor(Math.random() * 2) + size,
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.5 + 0.1).toFixed(2)),
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      magnetism: 0.1 + Math.random() * 4,
    };
  };

  const init = () => {
    resize();
    circles.current = Array.from({ length: quantity }, newCircle);
  };

  const draw = (c: Circle) => {
    if (!ctxRef.current) return;
    ctxRef.current.translate(c.translateX, c.translateY);
    ctxRef.current.beginPath();
    ctxRef.current.arc(c.x, c.y, c.size, 0, 2 * Math.PI);
    ctxRef.current.fillStyle = `rgba(${rgb.join(",")}, ${c.alpha})`;
    ctxRef.current.fill();
    ctxRef.current.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const animate = () => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.clearRect(0, 0, size_.current.w, size_.current.h);
    circles.current.forEach((c, i) => {
      const edge = [
        c.x + c.translateX - c.size,
        size_.current.w - c.x - c.translateX - c.size,
        c.y + c.translateY - c.size,
        size_.current.h - c.y - c.translateY - c.size,
      ];
      const closest = Math.min(...edge);
      const remap =
        closest > 20 ? 1 : parseFloat((closest / 20).toFixed(2));
      c.alpha += remap > c.alpha ? 0.02 : 0;
      if (c.alpha > c.targetAlpha) c.alpha = c.targetAlpha;
      c.x += c.dx;
      c.y += c.dy;
      c.translateX +=
        (mouse.current.x / (staticity / c.magnetism) - c.translateX) / ease;
      c.translateY +=
        (mouse.current.y / (staticity / c.magnetism) - c.translateY) / ease;
      if (
        c.x < -c.size ||
        c.x > size_.current.w + c.size ||
        c.y < -c.size ||
        c.y > size_.current.h + c.size
      ) {
        circles.current[i] = newCircle();
      } else {
        draw(c);
      }
    });
  };

  return (
    <div ref={containerRef} className={cn("pointer-events-none", className)} aria-hidden>
      <canvas ref={canvasRef} />
    </div>
  );
}
