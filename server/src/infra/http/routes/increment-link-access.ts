import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

import { incrementLinkAccess } from "../../../app/services/increment-link-access/increment-link-access";
import { incrementLinkAccessInputSchema } from "../../../app/services/increment-link-access/types";

export const incrementLinkAccessRoute: FastifyPluginAsyncZod = async (app) => {
  app.patch(
    "/links/:id/access",
    {
      schema: {
        summary: "Increment the access count of a link",
        params: incrementLinkAccessInputSchema,
        response: {
          200: z.object({ accessCount: z.number() }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const result = await incrementLinkAccess(request.params);

      if (!result) {
        return reply.status(404).send({ message: "link not found" });
      }

      return result;
    },
  );
};
