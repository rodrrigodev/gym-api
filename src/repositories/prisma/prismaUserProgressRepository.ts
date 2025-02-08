import { prisma } from '@/lib/prisma'
import { UserProgressRepository } from '../interfaces/userProgressRepository'
import { Prisma } from '@prisma/client'

export class PrismaUserProgressRepository implements UserProgressRepository {
  async createUserProgress(data: Prisma.UserProgressUncheckedCreateInput) {
    const userProgress = await prisma.userProgress.create({
      data: {
        ...data,
        current_streak: 0,
        max_streak_reached: 0,
      },
    })

    return userProgress
  }

  async findUserProgressById(id: string) {
    return prisma.userProgress.findUnique({
      where: { id },
    })
  }

  async findUserProgressByUserId(id: string) {
    return prisma.userProgress.findUnique({
      where: { user_id: id },
    })
  }

  async updateUserProgress(id: string, data: Prisma.UserProgressUpdateInput) {
    return await prisma.userProgress.update({
      where: { id },
      data,
    })
  }
}
