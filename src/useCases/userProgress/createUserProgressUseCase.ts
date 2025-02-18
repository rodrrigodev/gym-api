import { UserNotFoundError } from '@/errors/userNotFoundError'
import { UserProgressError } from '@/errors/userProgressError'
import { UserProgressRepository } from '@/repositories/interfaces/userProgressRepository'
import { UserRepository } from '@/repositories/interfaces/userRepository'

export interface CreateUserProgressRequest {
  userId: string
  initialWeight: number
  currentGoal: string
  workout: {
    id: string
    category: string
    finished_at: Date | null
  }[]
}

export class CreateUserProgressUseCase {
  constructor(
    private userProgressRepository: UserProgressRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    currentGoal,
    initialWeight,
    workout,
    userId,
  }: CreateUserProgressRequest) {
    const userExists = await this.userRepository.findUserById(userId)

    if (!userExists) {
      throw new UserNotFoundError()
    }

    const userProgressExists =
      await this.userProgressRepository.findUserProgressByUserId(userId)

    if (userProgressExists) {
      throw new UserProgressError()
    }

    const progress = await this.userProgressRepository.createUserProgress({
      user_id: userId,
      current_goal: currentGoal,
      initial_weight: initialWeight,
      workouts: [{ ...workout, finished_at: null }],
      current_streak: 0,
      max_streak_reached: 0,
    })

    return progress
  }
}
