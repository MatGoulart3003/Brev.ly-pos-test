import { z } from "zod";

export const deleteLinkInputSchema = z.object({
  id: z.uuid(),
});

export type DeleteLinkInput = z.infer<typeof deleteLinkInputSchema>;
