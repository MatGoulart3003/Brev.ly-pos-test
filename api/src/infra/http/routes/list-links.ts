import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

import { listLinks } from "../../../app/services/list-links/list-links";
import { listLinksInputSchema } from "../../../app/services/list-links/types";
import { linkSchema } from "../schemas/link";

export const listLinksRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/links",
    {
      schema: {
        summary: "List all links",
        querystring: listLinksInputSchema,
        response: {
          200: z.object({
            links: z.array(linkSchema),
            total: z.number(),
          }),
        },
      },
    },
    async (request) => {
      return listLinks(request.query);
    },
  );
};
