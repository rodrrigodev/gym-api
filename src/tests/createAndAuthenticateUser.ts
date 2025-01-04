import { prisma } from '@/lib/prisma'
import { Express } from 'express'
import request from 'supertest'

export async function createAndAuthenticateUser(app: Express) {
  console.log(12)
  await prisma.user.create({
    data: {
      name: 'john doe',
      email: 'johnsdkskdjsljkd@email.com',
      password: '12345678',
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
