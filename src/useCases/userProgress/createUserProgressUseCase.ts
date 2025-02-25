import { UserNotFoundError } from '@/errors/userNotFoundError'
import { UserProgressError } from '@/errors/userProgressError'
import { UserProgressRepository } from '@/repositories/interfaces/userProgressRepository'
import { UserRepository } from '@/repositories/interfaces/userRepository'

export interface CreateUserProgressRequest {
  userId: string
  initialWeight: number
  currentGoal: string
  workouts: {
    id: string
    category: string
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
    workouts,
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

    const workoutsArray = workouts.map(({ id, category }) => {
      return {
        id,
        category,
        finished_at: null,
      }
    })

    const progress = await this.userProgressRepository.createUserProgress({
      user_id: userId,
      current_goal: currentGoal,
      initial_weight: initialWeight,
      workouts: workoutsArray,
      current_streak: 0,
      max_streak_reached: 0,
    })

    return progress
  }
}
