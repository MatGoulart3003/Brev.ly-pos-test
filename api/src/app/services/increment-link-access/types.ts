import { z } from "zod";

export const incrementLinkAccessInputSchema = z.object({
  id: z.uuid(),
});

export type IncrementLinkAccessInput = z.infer<
  typeof incrementLinkAccessInputSchema
>;

export interface IncrementLinkAccessResult {
  accessCount: number;
}
