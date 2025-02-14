import { prisma } from '@/lib/prisma'
import { Express } from 'express'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { User, UserProgress } from '@prisma/client'
import { setDate } from '@/utils/setDate'

export const testHelper = {
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
      .post('/user/auth')
      .send({ email: 'john@email.com', password: '12345678' })

    const { token } = authResponse.body
    return token
  },

  createRandomUsers: async () => {
    await prisma.user.createMany({
      data: Array.from({ length: 22 }, (_, i) => ({
        email: `richard_roe${i}@email.com`,
        name: `Richard Roe`,
        nickname: `roe-${i}`,
        height: 172,
        current_weight: i < 15 ? 60 + i : 65 + i,
        password: '12345678',
        created_at: new Date(`2024-06-${i}:15:${i + 12}:${i + 20}`),
        lucky_numbers: i > 15 ? [`ind-${i}`] : undefined,
      })),
    })

    const users = await prisma.user.findMany()
    return users
  },

  createRandomUsersProgress: async (users: User[]) => {
    for (const [i, user] of users.entries()) {
      await prisma.userProgress.create({
        data: {
          user_id: user.id,
          initial_weight: 65 + i,
          current_streak: i,
          current_goal: 'slim down',
          max_streak_reached: i + 5,
          next_workout: i % 2 === 0 ? 'legs' : 'chest',
        },
      })
    }

    const progress = await prisma.userProgress.findMany()

    return progress
  },

  createRandomActivities: async (userProgress: UserProgress) => {
    const date = new Date()
    const exercises = [
      'chest',
      'back',
      'legs',
      'gluteus',
      'deltoids',
      'triceps',
      'forearm',
      'abs',
      'cardio',
      'biceps',
    ]

    await Promise.all(
      Array.from({ length: 10 }, (_, i) =>
        prisma.activity.create({
          data: {
            created_at: new Date(
              date.setDate(
                date.getDate() -
                  Math.floor(Math.random() * exercises.length + 1),
              ),
            ),
            workout: exercises[Math.floor(Math.random() * exercises.length)],
            finished_at: setDate(i + 1, 'less'),
            user_progress_id: userProgress.id,
          },
        }),
      ),
    )
  },

  createPrizeDraw: async () => {
    await prisma.prizeDraw.createMany({
      data: [
        {
          prize: 'Garrafa violetfit 1.5',
          status: 'waiting',
          finished_at: setDate(15),
        },
        {
          prize: 'Capinha violetfit',
          status: 'waiting',
          finished_at: setDate(15),
        },
        {
          prize: 'T-shirt violetfit',
          status: 'finished',
          finished_at: setDate(15),
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
          created_at: setDate(29, 'less'),
        },
        {
          name: 'Sabão liquido',
          category: 'cleaning',
          price: '15.66',
          created_at: setDate(10, 'less'),
        },

        {
          name: 'Products',
          category: 'cleaning',
          price: '38.25',
          created_at: setDate(5, 'less'),
        },

        {
          name: 'Leg press machine',
          category: 'maintenance',
          price: '381.25',
          created_at: setDate(25, 'less'),
        },
      ],
    })

    const bills = await prisma.bill.findMany()
    return bills
  },

  createPlans: async () => {
    await prisma.plan.createMany({
      data: [
        { name: 'basic', price: 120.0 },
        { name: 'premium', price: 180 },
      ],
    })

    return await prisma.plan.findMany()
  },

  createGym equipment: async () => {
    await prisma.gymEquipment.createMany({
      data: [
        {
          name: 'Leg Press 45',
          category: 'legs',
          sets: 12,
          reps: 4,
          cod: '1',
          last_maintenance: new Date(),
          status: 'available',
        },
        {
          name: 'Chest Press Machine',
          category: 'chest',
          sets: 12,
          reps: 4,
          cod: '2',
          last_maintenance: new Date(),
          status: 'available',
        },
        {
          name: 'Back Extension Machine',
          category: 'chest',
          sets: 12,
          reps: 4,
          cod: '3',
          last_maintenance: new Date(),
          status: 'available',
        },
      ],
    })

    return await prisma.gymEquipment.findMany()
  },

  createEquipmentTracking: async () => {
    const users = await testHelper.createRandomUsers()
    const userProgress = await testHelper.createRandomUsersProgress(users)

    const gym equipment = await testHelper.createGym equipment()

    for (let i = 0; i < gym equipment.length; i++) {
      await prisma.equipmentTracking.createMany({
        data: [
          {
            actual_weight: i + 2,
            initial_weight: i + 2,
            user_progress_id: userProgress[i].id,
            gym_equipment_id: gym equipment[i].id,
            active: true,
          },
        ],
      })
    }

    return await prisma.equipmentTracking.findMany()
  },
}
