import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ActivityRepository } from '../interfaces/activityRepository'

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
}
