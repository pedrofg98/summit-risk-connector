import { X, Check } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "./SectionHeading";
import { COMPARISON } from "@/data/summit";

export function Divide() {
  return (
    <section className="relative border-y border-border bg-black/40 py-20 md:py-28">
      <div className="shell flex flex-col gap-12">
        <SectionHeading
          eyebrow="O mercado está dividido"
          title={
            <>
              De qual lado da transformação da{" "}
              <span className="text-gold-gradient">NR1</span> você quer estar?
            </>
          }
          subtitle="Existem dois tipos de profissional. Um recebeu informações soltas e ainda não sabe transformá-las em processo seguro. O outro compreendeu que o futuro exige método, critério e decisões responsáveis."
        />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border md:grid-cols-2">
          {/* coluna negativa */}
          <div className="bg-card/60">
            <header className="border-b border-border px-6 py-5">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Profissional que
              </span>
              <h3 className="font-display text-xl font-extrabold uppercase text-white/80">
                não domina a NR1
              </h3>
            </header>
            <ul className="divide-y divide-border/70">
              {COMPARISON.map((row, i) => (
                <BlurFade key={i} delay={0.03 * i}>
                  <li className="flex items-start gap-3 px-6 py-4">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400/70" />
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {row.bad}
                    </span>
                  </li>
                </BlurFade>
              ))}
            </ul>
          </div>

          {/* coluna positiva — realce dourado */}
          <div className="relative bg-gradient-to-b from-gold/[0.06] to-transparent ring-1 ring-inset ring-gold/25">
            <header className="border-b border-gold/20 px-6 py-5">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold">
                Profissional
              </span>
              <h3 className="font-display text-xl font-extrabold uppercase text-white">
                preparado para a NR1
              </h3>
            </header>
            <ul className="divide-y divide-gold/10">
              {COMPARISON.map((row, i) => (
                <BlurFade key={i} delay={0.03 * i}>
                  <li className="flex items-start gap-3 px-6 py-4">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span className="text-sm font-medium leading-relaxed text-white/90">
                      {row.good}
                    </span>
                  </li>
                </BlurFade>
              ))}
            </ul>
          </div>
        </div>

        <BlurFade>
          <p className="mx-auto max-w-2xl text-balance text-center text-lg font-medium text-white/90">
            Não é apenas sobre entender a NR1. É sobre desenvolver clareza, método
            e segurança para conduzir decisões que impactam pessoas e organizações.{" "}
            <span className="text-gold">O futuro pertence aos preparados.</span>
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
