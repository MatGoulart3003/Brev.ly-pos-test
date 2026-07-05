import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

import { getLinkByShortUrl } from "../../../app/services/get-link-by-short-url/get-link-by-short-url";
import { getLinkByShortUrlInputSchema } from "../../../app/services/get-link-by-short-url/types";
import { linkSchema } from "../schemas/link";

export const getLinkByShortUrlRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/links/:shortUrl",
    {
      schema: {
        summary: "Get the original URL from a short URL",
        params: getLinkByShortUrlInputSchema,
        response: {
          200: linkSchema,
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const link = await getLinkByShortUrl(request.params);

      if (!link) {
        return reply.status(404).send({ message: "link not found" });
      }

      return link;
    },
  );
};
