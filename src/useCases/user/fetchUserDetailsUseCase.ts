import { UserNotFoundError } from '@/errors/userNotFoundError'
import { UserProgressError } from '@/errors/userProgressError'
import { UserProgressRepository } from '@/repositories/interfaces/userProgressRepository'
import { UserRepository } from '@/repositories/interfaces/userRepository'

export class FetchUserDetailsUseCase {
  constructor(
    private userRepository: UserRepository,
    private userProgressRepository: UserProgressRepository,
  ) {}

  async execute(userId: string) {
    const user = await this.userRepository.fetchUserDetails(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const userProgress =
      await this.userProgressRepository.findUserProgressByUserId(user.id)

    if (!userProgress) {
      throw new UserProgressError()
    }

    return {
      user: { ...user, password: undefined },
      userProgress: { ...userProgress, user_id: undefined },
    }
  }
}
