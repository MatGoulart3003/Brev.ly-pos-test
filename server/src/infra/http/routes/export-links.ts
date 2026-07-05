import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { exportLinks } from "../../../app/services/export-links/export-links";
import { exportLinksOutputSchema } from "../../../app/services/export-links/types";

export const exportLinksRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/links/export",
    {
      schema: {
        summary: "Export all links to a CSV file",
        response: {
          200: exportLinksOutputSchema,
        },
      },
    },
    async () => {
      return exportLinks();
    },
  );
};
