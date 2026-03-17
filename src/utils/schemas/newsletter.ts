import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .email({ message: "Ingresa un email válido." })
    .transform((val: string) => val.trim().toLowerCase()),
});

export type NewsletterSchema = typeof newsletterSchema;
