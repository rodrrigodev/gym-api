import { UserNotFoundError } from '@/errors/userNotFoundError'
import { UserRepository } from '@/repositories/userRepository'

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const userExists = await this.userRepository.findUserById(userId)

    if (!userExists) {
      throw new UserNotFoundError()
    }

    await this.userRepository.deleteUserById(userExists.id)

    return 'Success!'
  }
}
