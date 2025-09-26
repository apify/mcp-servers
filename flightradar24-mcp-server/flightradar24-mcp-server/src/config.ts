import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

/**
 * Environment variable schema validation
 */
const envSchema = z.object({
    FR24_API_KEY: z
        .string({
            required_error: 'FR24_API_KEY is required in environment variables',
            invalid_type_error: 'FR24_API_KEY must be a string',
        })
        .min(1, { message: 'FR24_API_KEY cannot be empty' }),
    FR24_API_URL: z
        .string({
            invalid_type_error: 'FR24_API_URL must be a string',
        })
        .url({ message: 'FR24_API_URL must be a valid URL' })
        .default('https://fr24api.flightradar24.com'),
});

/**
 * Validate and extract environment variables
 * @throws {Error} If validation fails
 */
export const env = envSchema.parse(process.env);
