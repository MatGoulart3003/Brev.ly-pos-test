import { randomUUID } from "node:crypto";

import { eq } from "drizzle-orm";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { db, pg } from "../../../infra/db";
import { links } from "../../../infra/db/schemas/links";
import { exportLinks } from "./export-links";

const uploadedChunks: Buffer[] = [];

vi.mock("@aws-sdk/lib-storage", () => ({
  Upload: class {
    private body: AsyncIterable<Buffer>;

    constructor({ params }: { params: { Body: AsyncIterable<Buffer> } }) {
      this.body = params.Body;
    }

    async done() {
      for await (const chunk of this.body) {
        uploadedChunks.push(Buffer.from(chunk));
      }
    }
  },
}));

describe("exportLinks", () => {
  const shortUrl = `test-${randomUUID().slice(0, 8)}`;

  beforeAll(async () => {
    await db
      .insert(links)
      .values({ originalUrl: "https://example.com/export", shortUrl });
  });

  afterAll(async () => {
    await db.delete(links).where(eq(links.shortUrl, shortUrl));
    await pg.end();
  });

  it("exports links to a csv file with a random unique name", async () => {
    const { reportUrl } = await exportLinks();

    expect(reportUrl).toMatch(/-links\.csv$/);

    const csv = Buffer.concat(uploadedChunks).toString("utf-8");

    expect(csv).toContain("original_url,short_url,access_count,created_at");
    expect(csv).toContain("https://example.com/export");
    expect(csv).toContain(shortUrl);
    expect(csv).toMatch(/\d{2}\/\d{2}\/\d{4} - \d{2}:\d{2}:\d{2}/);
  });
});
