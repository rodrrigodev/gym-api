import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ActivityRepository } from '../interfaces/activityRepository'
import { setDate } from '@/utils/setDate'

export class PrismaActivityRepository implements ActivityRepository {
  async createActivity(data: Prisma.ActivityUncheckedCreateInput) {
    const activity = await prisma.activity.create({ data })

    return activity
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

  async fetchActivitiesByProgressId(progressId: string) {
    const activities = await prisma.activity.findMany({
      where: {
        finished_at: { gte: setDate(7, 'less') },
        user_progress_id: progressId,
      },
    })

    return activities
  }
}
