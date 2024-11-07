import { UserProgressError } from '@/errors/userProgressError'
import { UserProgressRepository } from '@/repositories/userProgressRepository'
import { UserRepository } from '@/repositories/userRepository'

export interface CreateUserProgressRequest {
  userId: string
  initialWeight: number
  currentGoal: string
  nextWorkout: string | null
}

export class CreateUserProgressUseCase {
  constructor(
    private userProgressRepository: UserProgressRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    currentGoal,
    initialWeight,
    nextWorkout,
    userId,
  }: CreateUserProgressRequest) {
    const userExists = await this.userRepository.findUserById(userId)
    const userProgressExists =
      await this.userProgressRepository.findUserProgressByUserId(userId)

    if (!userExists || userProgressExists) {
      throw new UserProgressError()
    }
    const progress = await this.userProgressRepository.createUserProgress({
      user_id: userExists.id,
      current_goal: currentGoal,
      initial_weight: initialWeight,
      next_workout: nextWorkout,
    })

    return progress
  }
}
