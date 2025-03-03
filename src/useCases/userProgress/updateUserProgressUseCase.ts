import { UserProgressError } from '@/errors/userProgressError'
import { UserProgressRepository } from '@/repositories/interfaces/userProgressRepository'

export interface UpdateUserProgressRequest {
  initialWeight?: number
  currentGoal?: string
  currentStreak?: number
  maxStreakReached?: number
  iaAnalyses?: string
  workouts?: {
    id: string
    category: string
    finishedAt?: Date
  }[]
}

export class UpdateUserProgressUseCase {
  constructor(private userProgressRepository: UserProgressRepository) {}

  async execute(userId: string, data: UpdateUserProgressRequest) {
    const userProgressExists =
      await this.userProgressRepository.findUserProgressByUserId(userId)

    if (!userProgressExists) {
      throw new UserProgressError()
    }

    const workoutsArray = data.workouts?.length
      ? data.workouts.map(({ id, category, finishedAt }) => {
          return {
            id,
            category,
            finished_at: finishedAt || null,
          }
        })
      : userProgressExists.workouts

    const userProgressUpdated =
      await this.userProgressRepository.updateUserProgress(
        userProgressExists.id,
        {
          initial_weight:
            data.initialWeight ?? userProgressExists.initial_weight,
          current_goal: data.currentGoal ?? userProgressExists.current_goal,
          current_streak:
            data.currentStreak ?? userProgressExists.current_streak,
          max_streak_reached:
            data.maxStreakReached ?? userProgressExists.max_streak_reached,
          ia_analyses: data.iaAnalyses ?? userProgressExists.ia_analyses,
          ia_analyses_date: data.iaAnalyses
            ? new Date()
            : userProgressExists.ia_analyses_date,
          workouts: workoutsArray,
        },
      )

    return userProgressUpdated
  }
}
