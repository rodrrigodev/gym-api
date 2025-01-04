import { prisma } from '@/lib/prisma'
import { Express } from 'express'
import { hash } from 'bcryptjs'
import request from 'supertest'

export async function createAndAuthenticateUserTestHelper(app: Express) {
  await prisma.user.create({
    data: {
      name: 'john doe',
      email: 'john@email.com',
      password: await hash('12345678', 6),
      role: 'ADMIN',
      created_at: new Date(),
    },
  })

  const authResponse = await request(app)
    .post('/login')
    .send({ email: 'john@email.com', password: '12345678' })

  const { token } = authResponse.body

  return token
}
