import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

import { createLink } from "../../../app/services/create-link/create-link";
import { createLinkInputSchema } from "../../../app/services/create-link/types";
import { linkSchema } from "../schemas/link";

export const createLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/links",
    {
      schema: {
        summary: "Create a link",
        body: createLinkInputSchema,
        response: {
          201: linkSchema,
          409: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const result = await createLink(request.body);

      if (!result.ok) {
        return reply.status(409).send({ message: "shortUrl already exists" });
      }

      return reply.status(201).send(result.link);
    },
  );
};
