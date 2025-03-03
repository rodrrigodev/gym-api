import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ActivityRepository } from '../interfaces/activityRepository'
import { setDate } from '@/utils/setDate'

export class PrismaActivityRepository implements ActivityRepository {
  async createActivity(data: Prisma.ActivityUncheckedCreateInput) {
    return await prisma.activity.create({
      data: {
        created_at: data.created_at,
        training_id: data.training_id,
        user_progress_id: data.user_progress_id,
      },
    })
  }

  async findActivity(id: string) {
    const activityExists = await prisma.activity.findFirst({ where: { id } })

    return activityExists
  }

  async updateActivity(id: string, data: Prisma.ActivityUpdateInput) {
    const activityUpdated = await prisma.activity.update({
      data,
      where: { id },
    })

    return activityUpdated
  }

  async checkActivities() {
    const activityPending = await prisma.activity.findFirst({
      where: { finished_at: null },
    })

    return activityPending
  }

  async fetchLastActivitiesByProgressId(
    progressId: string,
    periodInDays: number,
  ) {
    const activities = await prisma.activity.findMany({
      where: {
        finished_at: { gte: setDate(periodInDays, 'less') },
        user_progress_id: progressId,
      },
    })

    return activities
  }
}
