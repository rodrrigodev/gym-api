import { UserProgress } from '@prisma/client'
import {
  CreateUserProgressData,
  UserProgressRepository,
} from '../userProgressRepository'
import { randomUUID } from 'crypto'
import getNextWorkoutExercise from '@/util/getNextWorkoutExercise'

export class InMemoryUserProgressRepository implements UserProgressRepository {
  private usersProgress: UserProgress[] = []

  async createUserProgress({
    id,
    currentGoal,
    lastWeight,
    nextWorkout,
  }: CreateUserProgressData) {
    const newWorkout = {
      id: randomUUID(),
      lastWeight,
      nextWorkout: nextWorkout || getNextWorkoutExercise(this.usersProgress),
      lastWorkout: null,
      iaAnalyses: null,
      iaAnalysesDate: null,
      currentGoal,
      streaks: [new Date()],
      userId: id,
    }

    this.usersProgress.push(newWorkout)
  }
}
