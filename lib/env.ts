import { z } from "zod";

const _env = process.env;

const envSchema = z.object({
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
    NEXT_PUBLIC_STRIPE_SECRET_KEY: z.string(),
});

const envParse = envSchema.safeParse(_env);

if (!envParse.success) {
    throw new Error(envParse.error.message);
}

export const env = envParse.data;
