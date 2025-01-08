import { prisma } from '@/lib/prisma'
import { Express } from 'express'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { User } from '@prisma/client'

export const controllerTestHelper = {
  createAndAuthenticateUser: async (app: Express) => {
    await prisma.user.createMany({
      data: [
        {
          name: 'john doe',
          email: 'john@email.com',
          password: await hash('12345678', 6),
          role: 'ADMIN',
          created_at: new Date(),
        },
        {
          email: 'jane_smith@email.com',
          name: 'Jane Smith',
          password: await hash('12345678', 6),
          created_at: new Date(),
        },
      ],
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
        name: `Richard Roe`,
        password: '12345678',
        created_at: new Date(`2023-06-${i}:15:${i + 12}:${i + 20}`),
        lucky_numbers: i > 15 ? [`violetgym-${i}`] : undefined,
      })),
    })

    const users = await prisma.user.findMany()
    return users
  },

  createRandomUsersProgress: async (users: User[]) => {
    users.forEach(async (user, i) => {
      return await prisma.userProgress.create({
        data: {
          user_id: user.id,
          initial_weight: 65 + i,
          current_streak: i,
          max_streak_reached: i + 5,
        },
      })
    })

    const progress = await prisma.userProgress.findMany()

    return progress
  },

  test: async (id: string) => {
    await prisma.user.update({
      where: { id },
      data: { lucky_numbers: ['violet'] },
    })
  },
}
