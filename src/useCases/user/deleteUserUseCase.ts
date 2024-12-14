import { UserNotFoundError } from '@/errors/userNotFoundError'
import { UserRepository } from '@/repositories/interfaces/userRepository'

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const userExists = await this.userRepository.findUserById(userId)

    if (!userExists) {
      throw new UserNotFoundError()
    }

    const usersUpdated = await this.userRepository.deleteUserById(userExists.id)

    return usersUpdated
  }
}
