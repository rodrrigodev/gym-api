import { UserProgressError } from '@/errors/userProgressError'
import { UserProgressRepository } from '@/repositories/interfaces/userProgressRepository'

export interface UpdateUserProgressRequest {
  initial_weight?: number
  next_workout?: string
  current_goal?: string
  streaks?: Date[]
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
        data,
      )

    return userProgressUpdated
  }
}
