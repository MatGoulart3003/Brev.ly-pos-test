# Brev.ly Web

URL shortener SPA built with React 19, Vite, TypeScript, Chakra UI v3 and Tailwind CSS v4.

## Requirements

- Node.js 20+
- pnpm
- Brev.ly API running (see `../server`)

## Setup

```bash
# 1. install dependencies
pnpm install

# 2. environment variables
cp .env.example .env   # fill in the URLs (see below)

# 3. start the dev server
pnpm dev
```

App runs at `http://localhost:5173`.

## Environment variables

| Key                 | Description                                             | Local value             |
| ------------------- | ------------------------------------------------------- | ----------------------- |
| `VITE_FRONTEND_URL` | Public URL of this app (used to build/copy short links) | `http://localhost:5173` |
| `VITE_BACKEND_URL`  | Brev.ly API base URL                                    | `http://localhost:3333` |

## Scripts

| Script           | Description                    |
| ---------------- | ------------------------------ |
| `pnpm dev`       | start the dev server           |
| `pnpm build`     | typecheck + production build   |
| `pnpm preview`   | preview the production build   |
| `pnpm typecheck` | TypeScript check only          |
| `pnpm lint`      | Biome check (lint + format)    |
| `pnpm format`    | Biome check with fixes applied |

## Pages

- `/` — create-link form + links list (infinite scroll, copy, delete, CSV export)
- `/:shortUrl` — increments the access count and redirects to the original URL
- any other path — 404 page

## Architecture notes

- `src/services/` — one folder per API call (`<name>.ts` + `types.ts`), mirroring the server structure.
- `src/hooks/` — shared React Query hooks; component-specific logic lives in each component's `hooks/` folder.
- Components: PascalCase folder + file (`CreateLinkForm/CreateLinkForm.tsx`), Tailwind classes grouped in a `stylesheet` const, all copy through i18next (`pt_BR`).
- Chakra UI themes the interactive components (`src/theme.ts`); Tailwind handles layout. Tailwind utilities are imported **unlayered** on purpose — see the note in `src/styles/index.css`.
