import { randomUUID } from "node:crypto";
import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

import { Upload } from "@aws-sdk/lib-storage";
import { stringify } from "csv-stringify";

import { env } from "../../../env";
import { pg } from "../../../infra/db";
import { r2 } from "../../../infra/storage/client";
import type { ExportLinksResult } from "./types";

export async function exportLinks(): Promise<ExportLinksResult> {
  // cursor streams rows in chunks instead of loading every link in memory
  const cursor = pg
    .unsafe(
      `select
         original_url,
         short_url,
         access_count,
         to_char(
           created_at at time zone 'America/Sao_Paulo',
           'DD/MM/YYYY - HH24:MI:SS'
         ) as created_at
       from links
       order by created_at desc`,
    )
    .cursor(50);

  const csv = stringify({
    delimiter: ",",
    header: true,
    columns: [
      { key: "original_url", header: "original_url" },
      { key: "short_url", header: "short_url" },
      { key: "access_count", header: "access_count" },
      { key: "created_at", header: "created_at" },
    ],
  });

  const uploadStream = new PassThrough();

  const fileName = `${randomUUID()}-links.csv`;

  const upload = new Upload({
    client: r2,
    params: {
      Bucket: env.CLOUDFLARE_BUCKET,
      Key: fileName,
      Body: uploadStream,
      ContentType: "text/csv",
    },
  });

  await Promise.all([
    pipeline(
      cursor,
      new Transform({
        objectMode: true,
        transform(rows: Record<string, unknown>[], _encoding, callback) {
          for (const row of rows) {
            this.push(row);
          }
          callback();
        },
      }),
      csv,
      uploadStream,
    ),
    upload.done(),
  ]);

  return { reportUrl: `${env.CLOUDFLARE_PUBLIC_URL}/${fileName}` };
}
