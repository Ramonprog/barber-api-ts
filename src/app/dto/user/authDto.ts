import { z } from "zod";

export const userAuthSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  token: z.string().optional()
});

export type UserAuthDto = z.infer<typeof userAuthSchema> 
