import { UserProgressError } from '@/errors/userProgressError'
import { UserProgressRepository } from '@/repositories/interfaces/userProgressRepository'

export interface UpdateUserProgressRequest {
  initialWeight: number | null
  nextWorkout: string | null
  currentGoal: string | null
  currentStreak: number | null
  maxStreakReached: number | null
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
          current_goal: data.currentGoal ?? userProgressExists.next_workout,
          current_streak:
            data.currentStreak ?? Number(userProgressExists.current_goal),
          max_streak_reached:
            data.maxStreakReached ??
            Number(userProgressExists.max_streak_reached),
        },
      )

    return userProgressUpdated
  }
}
