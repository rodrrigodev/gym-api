import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test']).default('production'),
  PORT: z.coerce.number().default(3333),
  ACCESS_TOKEN: z.string(),
  REFRESH_TOKEN: z.string(),
  GEMINI_KEY: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  throw (
    (new Error('⚠️ Invalid environment variables!'),
    console.error(_env.error.format()))
  )
}

export const env = _env.data
