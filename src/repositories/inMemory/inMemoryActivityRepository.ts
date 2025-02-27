import { Activity, Prisma } from '@prisma/client'
import { ActivityRepository } from '../interfaces/activityRepository'
import { randomUUID } from 'node:crypto'
import { setDate } from '@/utils/setDate'

export class InMemoryActivityRepository implements ActivityRepository {
  private activities: Activity[] = []

  async createActivity(data: Prisma.ActivityUncheckedCreateInput) {
    const activity = {
      id: randomUUID(),
      created_at: new Date(),
      finished_at: data.finished_at ? new Date(data.finished_at) : null,
      training_id: data.training_id || null,
      user_progress_id: data.user_progress_id,
    }

    this.activities.push(activity)

    return activity
  }

  async findActivity(id: string) {
    const activity = this.activities.find((activity) => {
      return activity.id === id
    })

    return activity || null
  }

  async updateActivity(activityId: string, data: Prisma.ActivityUpdateInput) {
    const activitiesUpdated = this.activities.map((activity) => {
      if (activity.id === activityId) {
        return { ...activity, ...data }
      } else {
        return activity
      }
    })

    this.activities = activitiesUpdated as Activity[]

    const activityUpdated = this.activities.find((activity) => {
      return activity.id === activityId
    })

    return activityUpdated || null
  }

  async checkActivities() {
    const activity = this.activities.find((activity) => {
      return !activity.finished_at
    })

    return activity || null
  }

  async fetchLastActivitiesByProgressId() {
    return this.activities.filter(
      (activity) =>
        activity.finished_at && activity.finished_at >= setDate(7, 'less'),
    )
  }
}
