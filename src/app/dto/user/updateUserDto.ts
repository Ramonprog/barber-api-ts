import { z } from "zod";

export const updateUserSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  token: z.string().optional(),
  name: z.string().optional(),
  address: z.string().optional(),
});

export type updateUserDto = z.infer<typeof updateUserSchema> 
