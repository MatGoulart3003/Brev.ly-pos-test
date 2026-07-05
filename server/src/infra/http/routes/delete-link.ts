import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

import { deleteLink } from "../../../app/services/delete-link/delete-link";
import { deleteLinkInputSchema } from "../../../app/services/delete-link/types";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    "/links/:id",
    {
      schema: {
        summary: "Delete a link",
        params: deleteLinkInputSchema,
        response: {
          204: z.null(),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const deleted = await deleteLink(request.params);

      if (!deleted) {
        return reply.status(404).send({ message: "link not found" });
      }

      return reply.status(204).send(null);
    },
  );
};
