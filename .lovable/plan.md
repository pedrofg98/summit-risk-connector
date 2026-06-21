## Objetivo
Exibir a foto de cada palestrante no card do componente `Speakers`, usando os 8 arquivos enviados.

## Mapeamento (nome do arquivo → palestrante)
- `ÁUREA 11x.webp` → Áurea Santos
- `MILENA 11x.webp` → Milena Mendonça
- `LEO 11x.webp` → Léo Kaufmann
- `Felipe 11x.webp` → Felipe dos Anjos
- `Raphael 11x.webp` → Rapha Rezende
- `Ricardo 11x.webp` → Ricardo Queiroz
- `PABLO 11x.webp` → Pablo Funchal
- `DSC09499 11x.webp` → Silpresumi-se que seja **Silvino Santos** (única foto sem nome explícito; restante dos 8 palestrantes já está coberto). Se for outra pessoa, me avise antes que eu suba.

## Passos
1. Subir cada `.webp` via `lovable-assets` e salvar pointers em `src/assets/speakers/<slug>.webp.asset.json` (slugs: `aurea`, `milena`, `leo`, `felipe`, `raphael`, `ricardo`, `pablo`, `silvino`).
2. Em `src/data/summit.ts`: adicionar campo opcional `photo?: string` em `Speaker`, importar os 8 pointers e preencher cada item de `SPEAKERS` com o `photo` correspondente.
3. Em `src/components/sections/Speakers.tsx`: substituir o bloco de iniciais pelo `<img src={s.photo}>` quando existir; manter fallback com iniciais se faltar foto. Remover o caso especial só-do-Silvino (que usava `PHOTOS[3]`) — agora todo speaker usa o mesmo padrão. Manter o badge "Idealizador" para o Silvino. Remover a nota "* Fotos serão adicionadas em breve."

## Observação
Confirma só se `DSC09499 11x.webp` é mesmo o **Silvino Santos**? Se sim, sigo direto na build mode.