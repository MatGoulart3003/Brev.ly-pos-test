import { z } from "zod";

export const exportLinksOutputSchema = z.object({
  reportUrl: z.url(),
});

export type ExportLinksResult = z.infer<typeof exportLinksOutputSchema>;
