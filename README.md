# Brev.ly

URL shortener: create, manage and share short links, with access counting and CSV export.

## Structure

| Directory | Description | Docs |
| --- | --- | --- |
| [`server/`](server) | REST API — TypeScript, Fastify, Drizzle ORM, PostgreSQL, Cloudflare R2 | [README](server/README.md) |
| [`web/`](web) | SPA — React 19, Vite, TypeScript, Chakra UI v3, Tailwind CSS v4 | [README](web/README.md) |

## Quick start

Start the API first (`http://localhost:3333`), then the web app (`http://localhost:5173`):

```bash
# API
cd server && pnpm install && cp .env.example .env
docker compose up -d && pnpm db:migrate && pnpm dev

# Web (in another terminal)
cd web && pnpm install && cp .env.example .env
pnpm dev
```

See each project's README for environment variables, scripts and details.
