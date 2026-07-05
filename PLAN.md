# Brev.ly Web — Implementation Plan

React SPA (Vite + TypeScript) in `web/`, consuming the API in `server/` (Fastify, `localhost:3333`, CORS open).

Stack: Chakra UI v3 (components) + Tailwind CSS v4 (layout), react-router v7, React Query, React Hook Form + Zod, Zustand, axios, react-icons (Phosphor set `react-icons/pi`). Package manager: pnpm.

Code in English; user-facing copy in pt-BR (per Figma).

## Reference

### Style guide (extracted from the .fig file)

| Token | Value |
|---|---|
| blue-base | `#2C46B1` |
| blue-dark | `#2C4091` |
| white | `#FFFFFF` |
| gray-100 | `#F9F9FB` |
| gray-200 | `#E4E6EC` |
| gray-300 | `#CDCFD5` |
| gray-400 | `#74798B` |
| gray-500 | `#4D505C` |
| gray-600 | `#1F2025` |
| danger | `#B12C4D` |

Typography: Open Sans (Google Fonts, 400/600/700).
Text styles: `xl` 24/32 bold · `lg` 18/24 bold · `md` 14/18 semibold · `sm` 12/16 regular · `xs` 10/14 regular uppercase.

### API contract

| Method | Path | In | Out |
|---|---|---|---|
| POST | `/links` | `{originalUrl: url, shortUrl: 3-30 /^[a-z0-9-]+$/}` | 201 Link · 409 `{message}` |
| GET | `/links?page&pageSize` | defaults 1/20 | 200 `{links[], total}` (createdAt desc) |
| GET | `/links/:shortUrl` | — | 200 Link · 404 (does not increment) |
| PATCH | `/links/:id/access` | id (uuid) | 200 `{accessCount}` · 404 |
| DELETE | `/links/:id` | id (uuid) | 204 · 404 |
| POST | `/links/export` | — | 200 `{reportUrl}` |

`Link = { id, originalUrl, shortUrl, accessCount, createdAt }` (createdAt is an ISO string on the wire).

### Target structure

```
web/
├── .env.example            # VITE_FRONTEND_URL= / VITE_BACKEND_URL=
├── index.html              # lang pt-BR, Open Sans, title Brev.ly
├── tailwind.config.js      # style guide colors/font (loaded via @config)
├── vite.config.ts          # react() + tailwindcss()
└── src/
    ├── main.tsx            # ChakraProvider(system) > QueryClientProvider > BrowserRouter + <Toaster/>
    ├── App.tsx             # routes: / , /:shortUrl , *
    ├── theme.ts            # Chakra v3 system (createSystem + defineConfig)
    ├── styles/index.css    # Tailwind v4 layers (no preflight) + @config
    ├── lib/                # env.ts, api.ts (axios), query-client.ts
    ├── api/                # types.ts, links.ts (6 fns + query keys)
    ├── stores/             # delete-dialog.ts (zustand)
    ├── hooks/              # use-links, use-create-link, use-delete-link, use-export-links
    ├── components/         # logo, create-link-form, links-list, link-item,
    │   │                   # delete-link-dialog, empty-state
    │   └── ui/toaster.tsx
    └── pages/              # home.tsx, redirect.tsx, not-found.tsx
```

---

## Step 1 — Scaffold & tooling

- [x] `pnpm create vite . --template react-ts` in `web/` + `pnpm install`
- [x] Add deps: `@chakra-ui/react @emotion/react react-router @tanstack/react-query react-hook-form @hookform/resolvers zod axios react-icons zustand`
- [x] Add dev deps: `tailwindcss @tailwindcss/vite`
- [x] `vite.config.ts` with `react()` + `tailwindcss()` plugins
- [x] `tailwind.config.js` with style guide colors + `fontFamily.sans` Open Sans
- [x] `src/styles/index.css` — Tailwind v4 without preflight (Chakra's reset wins):
  ```css
  @layer theme, base, components, utilities;
  @import "tailwindcss/theme.css" layer(theme);
  @import "tailwindcss/utilities.css" layer(utilities);
  @config "../../tailwind.config.js";
  ```
- [x] `index.html`: `lang="pt-BR"`, title "Brev.ly", Open Sans `<link>` (400/600/700, display=swap), favicon
- [x] Smoke test: one Tailwind class renders

Notes: Chakra v3 needs only `@emotion/react`; react-router v7 is a single package (no `react-router-dom`).

## Step 2 — Theme & providers

- [ ] `src/theme.ts`: `createSystem(defaultConfig, defineConfig({...}))` (no `extendTheme` in v3)
  - `tokens.colors`: blue.base/dark, gray.100–600, danger, white
  - `fonts`: Open Sans (heading + body)
  - `textStyles`: xl/lg/md/sm/xs per style guide
  - `semanticTokens`: `primary`, `primary.hover`, `fg.error`/`border.error` → danger
  - `recipes.button`: solid (bg primary, h 48px, hover blue-dark, disabled opacity), subtle (bg gray.200, hover border blue-base — used by "Baixar CSV" and icon buttons)
  - `recipes.input`: h 48px, bg white, border gray.300, focus blue.base, invalid danger
  - `globalCss`: body bg gray.200, color gray.600
- [ ] `src/components/ui/toaster.tsx` (Chakra v3 `createToaster` snippet)
- [ ] `src/main.tsx`: `<ChakraProvider value={system}>` > QueryClientProvider > BrowserRouter + `<Toaster/>`
- [ ] Verify: themed Button/Input render correctly, no CSS reset conflicts

Boundary rule: Tailwind classes only on plain HTML layout elements; Chakra style props only on Chakra components (Emotion CSS is unlayered and always beats layered Tailwind utilities). Escape hatch: Tailwind `!` modifier.

## Step 3 — Env & data layer

- [ ] `.env.example` (`VITE_FRONTEND_URL=`, `VITE_BACKEND_URL=`) + local `.env`
- [ ] `src/vite-env.d.ts` typing + `src/lib/env.ts` (zod parse of `import.meta.env`, fail fast)
- [ ] `src/lib/api.ts`: axios instance, `baseURL = env.VITE_BACKEND_URL`
- [ ] `src/lib/query-client.ts`: `retry: 1`, `refetchOnWindowFocus: false`
- [ ] `src/api/types.ts` + `src/api/links.ts`: `createLink`, `listLinks`, `getLinkByShortUrl`, `incrementLinkAccess`, `deleteLink`, `exportLinks` + `linkKeys`
- [ ] Hooks: `use-links` (`useInfiniteQuery(['links'])`, pageSize 20, `getNextPageParam` accumulated vs `total`), `use-create-link`, `use-delete-link`, `use-export-links` — mutations invalidate `['links']`
- [ ] Verify against running server

## Step 4 — Home: create link form

- [ ] `src/pages/home.tsx`: mobile-first — `min-h-dvh bg-gray-200`, stacked on mobile, `lg:grid lg:grid-cols-[380px_1fr]` on desktop; `<Logo/>` on top
- [ ] `src/components/logo.tsx` (icon + "brev.ly" wordmark)
- [ ] `src/components/create-link-form.tsx` (card gray-100, rounded, p-6/p-8):
  - Heading "Novo link" (lg)
  - Field "LINK ORIGINAL" (label xs) — placeholder `www.exemplo.com.br`
  - Field "LINK ENCURTADO" — fixed `brev.ly/` prefix (InputGroup startElement)
  - RHF + zodResolver mirroring API validation: `z.url()` and `min(3).max(30).regex(/^[a-z0-9-]+$/)`
  - Field errors: Warning icon + message in danger
  - "Salvar link" button full width, disabled + spinner while pending
  - 409 → `form.setError("shortUrl")` + error toast, form data preserved

## Step 5 — Home: links list

- [ ] `src/components/links-list.tsx` (card, right column):
  - Header "Meus links" (lg) + "Baixar CSV" button (subtle, DownloadSimple icon; disabled when list empty or export pending, spinner while exporting → `window.open(reportUrl, "_blank", "noopener")`)
  - Scrollable body (`max-h` + `overflow-y-auto`, `divide-y divide-gray-200`), IntersectionObserver sentinel → `fetchNextPage`, spinner row while fetching
  - Loading state (spinner + "Carregando links...") and empty state ("AINDA NÃO EXISTEM LINKS CADASTRADOS", Link icon)
- [ ] `src/components/link-item.tsx`: `brev.ly/{shortUrl}` anchor (blue-base, md) → `VITE_FRONTEND_URL/{shortUrl}`, originalUrl below (gray-500, sm), both truncated; "{n} acessos"; IconButtons Copy (clipboard + toast) and Trash
- [ ] `src/stores/delete-dialog.ts` (zustand: link pending deletion) + `src/components/delete-link-dialog.tsx` (Chakra Dialog: confirm → delete mutation + toast)

## Step 6 — Redirect & 404 pages

- [ ] `src/App.tsx` routes: `/` → Home, `/:shortUrl` → Redirect, `*` → NotFound
- [ ] `src/pages/redirect.tsx`:
  - `useQuery` GET `/links/:shortUrl` with `retry: false`
  - Effect guarded by `useRef` (StrictMode runs effects twice in dev — prevents double increment)
  - `Promise.race([incrementLinkAccess(id), sleep(2000)])` **then** `window.location.replace(originalUrl)` (PATCH must settle before replace — unload cancels in-flight requests)
  - Card: "Redirecionando..." (xl), "O link será aberto automaticamente em alguns instantes.", "Não foi redirecionado? Acesse aqui" (`href={originalUrl}`)
  - On 404: render `<NotFound/>` **inline** (any 1-segment path matches `/:shortUrl` — do not navigate)
- [ ] `src/pages/not-found.tsx`: centered card, 404 graphic, "Link não encontrado" (xl), body text linking to `/`

## Step 7 — Polish & verification

- [ ] Responsive pass (mobile/desktop), loading/disabled states, toasts, favicon/title
- [ ] `web/README.md` (setup + env vars, same style as server README)
- [ ] `pnpm exec tsc --noEmit` + `pnpm build`
- [ ] E2E checklist:
  - [ ] Desktop: form left, list right; mobile: stacked
  - [ ] Empty DB → empty state, "Baixar CSV" disabled
  - [ ] Invalid URL / `AB!` shortUrl → field errors, no request
  - [ ] Valid create → spinner, item on top, form cleared, toast
  - [ ] Duplicate shortUrl → 409 field error, data preserved
  - [ ] Copy → clipboard has `http://localhost:5173/<shortUrl>` + toast
  - [ ] Delete → confirm dialog → row removed
  - [ ] 25 links (curl loop) → scroll loads page 2
  - [ ] Visit `/<shortUrl>` → redirects, accessCount +1 exactly (dev mode, StrictMode guard)
  - [ ] `/nao-existe` → 404 inline; `/a/b/c` → catch-all 404
  - [ ] "Baixar CSV" opens report URL
  - [ ] Server down → error state, no crash
