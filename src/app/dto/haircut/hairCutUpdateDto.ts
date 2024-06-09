import z from "zod";

export const hairCutUpdateSchema = z.object({
  user_id: z.string(),
  haircut_id: z.string(),
  name: z.string().optional(),
  price: z.number().optional(),
  status: z.boolean().optional(),
}) 

export type HairCutUpdateDto = z.infer<typeof hairCutUpdateSchema>