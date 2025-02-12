import { UserProgressError } from '@/errors/userProgressError'
import { UserProgressRepository } from '@/repositories/interfaces/userProgressRepository'

export interface UpdateUserProgressRequest {
  initialWeight?: number
  nextWorkout?: string
  currentGoal?: string
  currentStreak?: number
  maxStreakReached?: number
  iaAnalyses?: string
}

export class UpdateUserProgressUseCase {
  constructor(private userProgressRepository: UserProgressRepository) {}

  async execute(userId: string, data: UpdateUserProgressRequest) {
    const userProgressExists =
      await this.userProgressRepository.findUserProgressByUserId(userId)

    if (!userProgressExists) {
      throw new UserProgressError()
    }

    const userProgressUpdated =
      await this.userProgressRepository.updateUserProgress(
        userProgressExists.id,
        {
          initial_weight:
            data.initialWeight ?? userProgressExists.initial_weight,
          next_workout: data.nextWorkout ?? userProgressExists.next_workout,
          current_goal: data.currentGoal ?? userProgressExists.current_goal,
          current_streak:
            data.currentStreak ?? userProgressExists.current_streak,
          max_streak_reached:
            data.maxStreakReached ?? userProgressExists.max_streak_reached,
          ia_analyses: data.iaAnalyses ?? userProgressExists.ia_analyses,
          ia_analyses_date: data.iaAnalyses
            ? new Date()
            : userProgressExists.ia_analyses_date,
        },
      )

    return userProgressUpdated
  }
}
