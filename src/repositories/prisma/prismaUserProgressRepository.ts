import { prisma } from '@/lib/prisma'
import { UserProgressRepository } from '../interfaces/userProgressRepository'
import { Prisma } from '@prisma/client'

export class PrismaUserProgressRepository implements UserProgressRepository {
  async createUserProgress({
    current_goal,
    initial_weight,
    next_workout,
    user_id,
  }: Prisma.UserProgressUncheckedCreateInput) {
    const userProgress = await prisma.userProgress.create({
      data: {
        user_id,
        current_goal,
        initial_weight,
        next_workout,
        current_streak: 0,
        max_streak_reached: 0,
      },
    })

    return userProgress
  }

  async findUserProgressById(id: string) {
    const progress = await prisma.userProgress.findUnique({
      where: { id },
    })

    return progress
  }

  async findUserProgressByUserId(id: string) {
    const userProgress = await prisma.userProgress.findUnique({
      where: { user_id: id },
    })

    return userProgress
  }

  async updateUserProgress(id: string, data: Prisma.UserProgressUpdateInput) {
    const userProgressUpdated = await prisma.userProgress.update({
      where: { id },
      data,
    })

    return userProgressUpdated
  }
}
