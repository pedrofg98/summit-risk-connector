Remover o comportamento de link da barra de urgência (UrgencyBar) no topo da página.

## O que será feito
- No arquivo `src/components/sections/UrgencyBar.tsx`, substituir a tag `<a>` por `<div>`, removendo os atributos `href`, `target` e `rel`.
- Preservar todos os estilos visuais (gradiente, animação de brilho, texto, ícone Flame).

## Resultado esperado
A barra superior continua visível e com a mesma aparência, mas não é mais clicável.