import { Prisma, UserProgress } from '@prisma/client'
import { randomUUID } from 'crypto'
import { getNextWorkoutExercise } from '@/util/getNextWorkoutExercise'
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
      id: randomUUID().toString(),
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

  async findUserProgressById(id: string) {
    const userProgressAlreadyExists = this.usersProgress.find(
      (userProgress) => {
        return userProgress.user_id === id
      },
    )
    return userProgressAlreadyExists || null
  }
}
