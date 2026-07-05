# Brev.ly API

URL shortener API built with TypeScript, Fastify, Drizzle ORM, PostgreSQL and Cloudflare R2.

## Requirements

- Node.js 20+
- pnpm
- Docker

## Setup

```bash
# 1. install dependencies
pnpm install

# 2. environment variables
cp .env.example .env   # fill in the Cloudflare R2 credentials

# 3. start PostgreSQL
docker compose up -d

# 4. run migrations
pnpm db:migrate

# 5. start the server
pnpm dev
```

Server runs at `http://localhost:3333`. Interactive API docs at `http://localhost:3333/docs`.

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | start with hot reload |
| `pnpm test` | run tests (requires the database up) |
| `pnpm db:migrate` | apply database migrations |
| `pnpm db:generate` | generate migrations from schema changes |
| `pnpm db:studio` | browse the database in the browser |
| `pnpm build` | production build |
| `pnpm start` | run the production build |

## Routes

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/links` | create a link |
| `GET` | `/links` | list links (paginated: `?page=&pageSize=`) |
| `GET` | `/links/:shortUrl` | get the original URL from a short URL |
| `PATCH` | `/links/:id/access` | increment the access count |
| `DELETE` | `/links/:id` | delete a link |
| `POST` | `/links/export` | export all links to a CSV stored on Cloudflare R2 |

## Docker

```bash
docker build -t brevly-api .
docker run -p 3333:3333 --env-file .env brevly-api
```

Notes:

- values in the env file must **not** be wrapped in quotes (`docker run --env-file` reads them literally);
- `DATABASE_URL` must be reachable from inside the container (use `host.docker.internal` instead of `localhost` when the database runs on the host);
- the image does not run migrations — run `pnpm db:migrate` against the target database before starting the container.
