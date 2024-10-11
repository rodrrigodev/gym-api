import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  throw (
    (new Error('⚠️ Invalid environment variables!'),
    console.error(_env.error.format()))
  )
}

export const env = _env.data
