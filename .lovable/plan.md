## Objetivo
Redesenhar a seção de lotes para corresponder à referência (barra horizontal, lote ativo em verde, lote esgotado com "ESGOTADO" em vermelho, sem badge "Lote atual") e mudar todos os botões CTA da página para verde.

## 1. Tokens de cor — `src/styles.css`
- Adicionar tokens semânticos de verde:
  - `--color-cta-green: #22c55e` (cor primária dos CTAs)
  - `--color-cta-green-light: #4ade80`
  - `--color-cta-green-dark: #16a34a`
  - `--color-cta-ink: #052e16` (texto sobre o verde)
- Adicionar tokens de verde-limão para o lote ativo na barra:
  - `--color-lime-active: #a3e635`

## 2. Dados dos lotes — `src/data/summit.ts`
- Estender o tipo `Lote.status` para incluir `"sold"`.
- Ajustar os dados para espelhar a referência:
  - **LOTE 0**: preço `27`, status `sold`
  - **LOTE 1**: preço `37`, status `active`
  - **LOTE 2**: preço `47`, status `next`
  - **LOTE 3**: preço `57`, status `soon`
  - **Adicionar LOTE 4**: preço `67`, status `soon`

## 3. Seção de lotes — `src/components/sections/Pricing.tsx`
- Transformar o grid 2×2 em uma **barra horizontal única** com 5 colunas (`grid-cols-5`).
- Cada célula exibe: nome do lote (ex: "LOTE 0") e preço (ex: "R$27").
- **Lote ativo (`status === "active"`)**: texto em verde-limão (`--color-lime-active`), sem badge.
- **Lote esgotado (`status === "sold"`)**: preço riscado + faixa vermelha "ESGOTADO".
- **Lotes futuros**: texto em branco com baixa opacidade (`text-white/35`).
- Manter divisórias verticais entre os lotes.
- O card de compra abaixo da barra permanece, mas o botão CTA usa a nova cor verde.

## 4. Botões CTA — `src/components/sections/CtaLink.tsx`
- Substituir o gradiente dourado por gradiente verde (`#22c55e → #16a34a`).
- Trocar sombras douradas por sombras verdes.
- Trocar `text-gold-ink` por `text-cta-ink`.
- Manter animação de brilho (shine), ajustando a cor do brilho para combinar.

## 5. Barra de urgência — `src/components/sections/UrgencyBar.tsx`
- Atualizar para refletir o lote ativo dinamicamente (atualmente está hardcoded como "LOTE 0").
- Destacar o nome do lote ativo em verde em vez de dourado.

## Resultado esperado
- Barra de lotes visualmente idêntica à referência em layout e comportamento de estados.
- Todos os botões "Garantir minha vaga" em verde vibrante, com maior destaque para conversão.