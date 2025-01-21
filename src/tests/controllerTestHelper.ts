import { prisma } from '@/lib/prisma'
import { Express } from 'express'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { User } from '@prisma/client'
import { setDate } from './setDate'

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
        created_at: new Date(`2024-06-${i}:15:${i + 12}:${i + 20}`),
        lucky_numbers: i > 15 ? [`ind-${i}`] : undefined,
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
          next_workout: i % 2 === 0 ? 'legs' : 'chest',
        },
      })
    })

    const progress = await prisma.userProgress.findMany()

    return progress
  },

  createPrizeDraw: async () => {
    const date = setDate(15)

    await prisma.prizeDraw.createMany({
      data: [
        {
          prize: 'Garrafa violetfit 1.5',
          status: 'waiting',
          finished_at: date,
        },
        {
          prize: 'Capinha violetfit',
          status: 'waiting',
          finished_at: new Date(date),
        },
        {
          prize: 'T-shirt violetfit',
          status: 'finished',
          finished_at: new Date(date),
        },
      ],
    })

    const prize = await prisma.prizeDraw.findFirst()

    if (!prize) {
      throw Error()
    }

    return prize
  },

  createBills: async () => {
    await prisma.bill.createMany({
      data: [
        {
          name: 'Assinatura trimestral',
          price: '400.00',
          category: 'revenue',
          created_at: new Date('2024-11-10'),
        },
        {
          name: 'Sabão liquido',
          category: 'cleaning',
          price: '15.66',
          created_at: new Date('2025-1-10'),
        },

        {
          name: 'Products',
          category: 'cleaning',
          price: '38.25',
          created_at: new Date('2024-11-11'),
        },

        {
          name: 'Leg press machine',
          category: 'maintenance',
          price: '381.25',
          created_at: new Date('2024-10-15'),
        },
      ],
    })

    const bills = await prisma.bill.findMany()

    return bills
  },
}
