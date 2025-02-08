import { Activity, Prisma } from '@prisma/client'
import { ActivityRepository } from '../interfaces/activityRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryActivityRepository implements ActivityRepository {
  private activities: Activity[] = []

  async createActivity(data: Prisma.ActivityUncheckedCreateInput) {
    const activity = {
      id: randomUUID(),
      workout: data.workout,
      created_at: new Date(),
      finished_at: data.finished_at ? new Date(data.finished_at) : null,
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

  async countActivities() {
    const period = new Date()
    period.setDate(period.getDate() - 7)

    const activities = this.activities.filter(
      (activity) => activity.finished_at && activity.finished_at >= period,
    )

    const resume = [
      { category: 'chest', amount: 0 },
      { category: 'back', amount: 0 },
      { category: 'legs', amount: 0 },
      { category: 'gluteus', amount: 0 },
      { category: 'deltoids', amount: 0 },
      { category: 'triceps', amount: 0 },
      { category: 'forearm', amount: 0 },
      { category: 'abs', amount: 0 },
      { category: 'cardio', amount: 0 },
      { category: 'biceps', amount: 0 },
    ]

    activities.forEach(({ workout }) => {
      resume.forEach((exercise) => {
        if (workout === exercise.category) {
          exercise.amount++
        }
      })
    })

    return {
      totalActivities: activities.length,
      resume,
    }
  }
}
