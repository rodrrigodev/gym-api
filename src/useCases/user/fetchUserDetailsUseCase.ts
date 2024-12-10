import { UserNotFoundError } from '@/errors/userNotFoundError'
import { UserProgressNotFoundError } from '@/errors/userProgressNotFoundError'
import { UserProgressRepository } from '@/repositories/userProgressRepository'
import { UserRepository } from '@/repositories/userRepository'

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
      throw new UserProgressNotFoundError()
    }

    return { user: { ...user, password: null }, userProgress }
  }
}