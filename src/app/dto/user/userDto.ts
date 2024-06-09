import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type UserDto = z.infer<typeof userSchema>;
