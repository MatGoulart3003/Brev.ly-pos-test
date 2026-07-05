import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { env } from "../../env";
import { createLinkRoute } from "./routes/create-link";
import { deleteLinkRoute } from "./routes/delete-link";
import { getLinkByShortUrlRoute } from "./routes/get-link-by-short-url";
import { incrementLinkAccessRoute } from "./routes/increment-link-access";
import { listLinksRoute } from "./routes/list-links";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, { origin: "*" });

app.get("/health", () => {
  return { status: "ok" };
});

app.register(createLinkRoute);
app.register(listLinksRoute);
app.register(getLinkByShortUrlRoute);
app.register(deleteLinkRoute);
app.register(incrementLinkAccessRoute);

app.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
  console.log(`HTTP server running on http://localhost:${env.PORT}`);
});
