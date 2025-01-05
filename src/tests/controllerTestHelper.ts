import { prisma } from '@/lib/prisma'
import { Express } from 'express'
import { hash } from 'bcryptjs'
import request from 'supertest'

export const controllerTestHelper = {
  createAndAuthenticateUserTestHelper: async (app: Express) => {
    await prisma.user.create({
      data: {
        name: 'john doe',
        email: 'john@email.com',
        password: await hash('12345678', 6),
        role: 'ADMIN',
        created_at: new Date(),
      },
    })

    await prisma.user.create({
      data: {
        email: 'jane_smith@email.com',
        name: 'Jane Smith',
        password: await hash('12345678', 6),
        role: 'USER',
        created_at: new Date(),
      },
    })

    const authResponse = await request(app)
      .post('/login')
      .send({ email: 'john@email.com', password: '12345678' })

    const { token } = authResponse.body
    return token
  },
  createRandomUsers: async () => {
    await prisma.user.createMany({
      data: Array.from({ length: 22 }, (_, i) => ({
        email: `richard_roe${i}@email.com`,
        name: `Richard Roe${i}`,
        password: '12345678',
        created_at: new Date(),
      })),
    })

    const users = await prisma.user.findMany()

    return users
  },
}
