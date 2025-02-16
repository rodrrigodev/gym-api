import { Prisma, UserProgress } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { UserProgressRepository } from '../interfaces/userProgressRepository'

export class InMemoryUserProgressRepository implements UserProgressRepository {
  private usersProgress: UserProgress[] = []

  async createUserProgress(data: Prisma.UserProgressUncheckedCreateInput) {
    const newWorkout = {
      id: randomUUID(),
      current_goal: data.current_goal || null,
      initial_weight: data.initial_weight || null,
      workouts: [],
      current_streak: data.current_streak,
      max_streak_reached: data.max_streak_reached,
      ia_analyses: null,
      ia_analyses_date: null,
      user_id: data.user_id,
    }

    this.usersProgress.push(newWorkout)

    return newWorkout
  }

  async findUserProgressByUserId(userId: string) {
    const userProgressExists = this.usersProgress.find((userProgress) => {
      return userProgress.user_id === userId
    })

    return userProgressExists || null
  }

  async findUserProgressById(progressId: string) {
    const userProgressExists = this.usersProgress.find((userProgress) => {
      return userProgress.id === progressId
    })

    return userProgressExists || null
  }

  async updateUserProgress(
    userProgressId: string,
    data: Prisma.UserProgressUpdateInput,
  ) {
    const usersProgressUpdated = this.usersProgress.map((progress) => {
      if (progress.id === userProgressId) {
        return { ...progress, ...data }
      } else {
        return progress
      }
    })

    this.usersProgress = usersProgressUpdated as UserProgress[]

    const userProgressUpdated = this.usersProgress.find((progress) => {
      return progress.id === userProgressId
    })

    return userProgressUpdated || null
  }
}
