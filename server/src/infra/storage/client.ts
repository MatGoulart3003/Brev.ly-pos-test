import { S3Client } from "@aws-sdk/client-s3";

import { env } from "../../env";

// Cloudflare R2 is S3-compatible, so the AWS SDK works by
// pointing the endpoint to the R2 account
export const r2 = new S3Client({
  region: "auto",
  // path-style keeps the bucket out of the subdomain, which R2's
  // TLS certificate does not cover
  forcePathStyle: true,
  endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});
