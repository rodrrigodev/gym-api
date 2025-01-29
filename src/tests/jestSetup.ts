import { afterAll, beforeEach } from '@jest/globals'
import resetDb from './reset-db'

beforeEach(async () => {
  if (process.env.DATABASE_URL?.endsWith('test')) {
    await resetDb.reset()
  }
})

afterAll(async () => {
  await resetDb.clear()
})
