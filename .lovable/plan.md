## Plano

Planilha: `1pLj3TDp1dvcNfSDVWkxP51zOmYz6ZidV4MbpGVmkmc0` — aba `Leads`.

Cabeçalho esperado (linha 1, A:J):
```
data | nome | email | telefone | lote | preco | utm_source | utm_medium | utm_campaign | url
```

### 1. Captura de UTM — `src/lib/utm.ts`
Lê `utm_source`, `utm_medium`, `utm_campaign` da URL no primeiro carregamento e persiste em `sessionStorage`. Helper `getStoredUtms()` retorna o objeto.

### 2. `CtaLink` passa lote/preço
Adicionar props opcionais `lote?: string` e `preco?: string`. Cada uso atual (Hero, Pricing, Includes, etc.) recebe o rótulo correspondente — vou inferir pelo contexto de cada chamada (ex: cards de Pricing já têm o nome do lote).

### 3. `CheckoutProvider.openCheckout(href, meta?)`
Aceita `meta?: { lote?: string; preco?: string }`. Guarda em estado junto com `targetHref`.

### 4. Endpoint `src/routes/api/public/lead.ts`
- `POST`, body validado com Zod: `name`, `email`, `phone`, `lote?`, `preco?`, `utm_source?`, `utm_medium?`, `utm_campaign?`, `url?`.
- Chama gateway:
  ```
  POST https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/1pLj3TDp1dvcNfSDVWkxP51zOmYz6ZidV4MbpGVmkmc0/values/Leads!A:J:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS
  ```
  Headers: `Authorization: Bearer ${LOVABLE_API_KEY}`, `X-Connection-Api-Key: ${GOOGLE_SHEETS_API_KEY}`.
- Body: `{ values: [[dataISO_SaoPaulo, nome, email, telefoneMascarado, lote, preco, utm_source, utm_medium, utm_campaign, url]] }`.
- Sempre responde `{ ok: true }` 200, mesmo em erro (loga server-side). Falha no Sheets nunca trava o checkout.

### 5. Front dispara antes do redirect
Em `CheckoutProvider.onSubmit`:
1. `fetch('/api/public/lead', POST, JSON)` com `AbortController` timeout 2.5s.
2. `Promise.allSettled([fetch])` — independente do resultado, salva localStorage e `window.location.href = buildKiwifyUrl(...)`.

### Detalhes
- Telefone na planilha: com máscara (`(11) 99999-9999`); no Kiwify continua só dígitos com `55`.
- Data: `Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' })` → `dd/MM/yyyy HH:mm:ss`.
- `url` enviada = `window.location.href` no momento do submit (preserva UTMs originais).

### Fora do escopo
Deduplicação por e-mail, notificação, pixel Meta/GA4, CRM.

### Pergunta única antes de implementar
Confirma que a aba se chama exatamente **`Leads`** (com L maiúsculo) e que o cabeçalho da linha 1 já está preenchido com as 10 colunas acima? Se a aba tiver outro nome ou o cabeçalho ainda não estiver lá, me avise — o append funciona sem cabeçalho, mas a planilha fica sem rótulos.
