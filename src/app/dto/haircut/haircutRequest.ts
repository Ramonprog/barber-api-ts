import z from "zod";

export const haircutSRequestSchema = z.object({
  user_id: z.string(),
  status: z.boolean(),
})

export type HiarcutRequest = z.infer<typeof haircutSRequestSchema>