import { Prisma, UserProgress } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { getNextWorkoutExercise } from '@/utils/getNextWorkoutExercise'
import { UserProgressRepository } from '../userProgressRepository'

export class InMemoryUserProgressRepository implements UserProgressRepository {
  private usersProgress: UserProgress[] = []

  async createUserProgress({
    user_id,
    initial_weight,
    current_goal,
    next_workout,
  }: Prisma.UserProgressUncheckedCreateInput) {
    const newWorkout = {
      id: randomUUID(),
      initial_weight: initial_weight || null,
      next_workout: next_workout || getNextWorkoutExercise(this.usersProgress),
      last_workout: null,
      ia_analyses: null,
      ia_analyses_date: null,
      current_goal: current_goal || null,
      streaks: [],
      user_id,
    }

    this.usersProgress.push(newWorkout)

    return newWorkout
  }

  async findUserProgressByUserId(userId: string) {
    const userProgressAlreadyExists = this.usersProgress.find(
      (userProgress) => {
        return userProgress.user_id === userId
      },
    )

    return userProgressAlreadyExists || null
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
