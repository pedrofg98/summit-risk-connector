import { Check, Award, Sparkles } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { MagicCard } from "@/components/magicui/magic-card";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { SectionHeading } from "./SectionHeading";
import { INCLUDES, EVENT } from "@/data/summit";

export function Includes() {
  return (
    <section id="entregas" className="relative border-y border-border bg-black/40 py-20 md:py-28">
      <div className="shell flex flex-col gap-12">
        <SectionHeading
          eyebrow="O que você vai encontrar"
          title={
            <>
              Tudo que você precisa em{" "}
              <span className="text-gold-gradient">um único dia</span>
            </>
          }
        />

        <div className="grid items-stretch gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* card de destaque */}
          <BlurFade className="h-full">
            <MagicCard className="relative h-full overflow-hidden">
              <div className="flex h-full flex-col justify-between gap-8 p-8">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.07] px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold">
                    <Sparkles className="h-3.5 w-3.5" /> Imersão completa
                  </span>

                  <div className="mt-6 flex items-end gap-3">
                    <span className="font-display text-7xl font-black leading-none text-gold">
                      <NumberTicker value={9} />
                    </span>
                    <span className="mb-2 text-sm leading-tight text-muted-foreground">
                      entregas em
                      <br />
                      <span className="font-semibold text-white">um único dia</span>
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    Conteúdo técnico, método, debates ao vivo e networking — tudo o
                    que você precisa para sair pronto para conduzir a NR1.
                  </p>
                </div>

                {/* selo certificado */}
                <div className="flex items-center gap-4 rounded-2xl border border-gold/25 bg-gold/[0.05] p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold ring-1 ring-gold/30">
                    <Award className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-display text-base font-extrabold uppercase text-white">
                      Certificado de participação
                    </p>
                    <p className="text-xs text-gold">
                      Summit R.I.S.C.O. 2026 · {EVENT.date}
                    </p>
                  </div>
                </div>
              </div>
            </MagicCard>
          </BlurFade>

          {/* checklist */}
          <div className="grid content-center gap-2.5">
            {INCLUDES.map((item, i) => (
              <BlurFade key={i} delay={0.04 * i}>
                <div className="group flex items-center gap-3.5 rounded-xl border border-border bg-card/60 px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:border-gold/35">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gold text-gold-ink">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium text-white/90">{item}</span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
