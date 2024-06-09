import z from 'zod';

export const createHairCutSchema = z.object({
  name: z.string(),
  price: z.number(),
});

export type CreateHairCutDto = z.infer<typeof createHairCutSchema>;