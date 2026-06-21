import { BlurFade } from "@/components/magicui/blur-fade";
import { Marquee } from "@/components/magicui/marquee";
import { SectionHeading } from "./SectionHeading";
import { TESTIMONIALS } from "@/data/summit";

export function Testimonials() {
  const half = Math.ceil(TESTIMONIALS.length / 2);
  const rowA = TESTIMONIALS.slice(0, half);
  const rowB = TESTIMONIALS.slice(half);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="shell flex flex-col gap-12">
        <SectionHeading
          eyebrow="Quem já vive o Método R.I.S.C.O."
          title={
            <>
              O que os alunos falam sobre o{" "}
              <span className="text-gold-gradient">Método R.I.S.C.O.</span>
            </>
          }
          subtitle="Profissionais que decidiram sair da insegurança e passaram a atuar com método, clareza e segurança diante da NR1."
        />
      </div>

      <BlurFade className="relative mt-4 flex flex-col gap-5">
        <Marquee pauseOnHover duration="60s" className="[--gap:1.25rem]">
          {rowA.map((src, i) => (
            <Card key={i} src={src} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover duration="60s" className="[--gap:1.25rem]">
          {rowB.map((src, i) => (
            <Card key={i} src={src} />
          ))}
        </Marquee>
        {/* fades laterais */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </BlurFade>
    </section>
  );
}

function Card({ src }: { src: string }) {
  return (
    <div className="w-[280px] overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-gold/35 sm:w-[330px]">
      <img
        src={src}
        alt="Depoimento de aluno do Método R.I.S.C.O."
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
