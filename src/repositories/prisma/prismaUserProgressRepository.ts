import { prisma } from '@/lib/prisma'
import { UserProgressRepository } from '../interfaces/userProgressRepository'
import { Prisma, UserProgress } from '@prisma/client'

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
    console.log(
      'Checar esse use case e vê como esta sendo definido next_workout',
    )
    return userProgress
  }

  async findUserProgressByUserId(userId: string) {
    const progress = await prisma.userProgress.findFirst({
      where: { user_id: userId },
    })

    return progress
  }
}
