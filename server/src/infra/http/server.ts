import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import fastifyApiReference from "@scalar/fastify-api-reference";
import { fastify } from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { env } from "../../env";
import { createLinkRoute } from "./routes/create-link";
import { deleteLinkRoute } from "./routes/delete-link";
import { exportLinksRoute } from "./routes/export-links";
import { getLinkByShortUrlRoute } from "./routes/get-link-by-short-url";
import { incrementLinkAccessRoute } from "./routes/increment-link-access";
import { listLinksRoute } from "./routes/list-links";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Brev.ly API",
      description: "URL shortener API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifyApiReference, {
  routePrefix: "/docs",
});

app.get("/health", () => {
  return { status: "ok" };
});

app.register(createLinkRoute);
app.register(exportLinksRoute);
app.register(listLinksRoute);
app.register(getLinkByShortUrlRoute);
app.register(deleteLinkRoute);
app.register(incrementLinkAccessRoute);

app.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
  console.log(`HTTP server running on http://localhost:${env.PORT}`);
});
