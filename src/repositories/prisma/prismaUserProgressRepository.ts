import { prisma } from '@/lib/prisma'
import { UserProgressRepository } from '../userProgressRepository'
import { Prisma } from '@prisma/client'

export class PrismaUserProgressRepository implements UserProgressRepository {
  async createUserProgress({
    user_id,
    initial_weight,
    current_goal,
    next_workout,
  }: Prisma.UserProgressUncheckedCreateInput) {
    if (!next_workout) {
      const workouts = await prisma.userProgress.groupBy({
        by: ['next_workout'],
        _count: { next_workout: true },
        orderBy: { _count: { next_workout: 'asc' } },
      })
      const progress = await prisma.userProgress.create({
        data: {
          user_id,
          current_goal,
          initial_weight,
          next_workout: workouts[0].next_workout,
        },
      })
      return progress
    }
    const progress = await prisma.userProgress.create({
      data: {
        user_id,
        current_goal,
        initial_weight,
        next_workout,
      },
    })
    return progress
  }
}
