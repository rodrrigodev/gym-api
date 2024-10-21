import { UserNotFoundError } from '@/errors/userNotFoundError'
import { UserRepository } from '@/repositories/userRepository'

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string) {
    const userExists = await this.userRepository.deleteUserById(id)

    if (!userExists) {
      throw new UserNotFoundError()
    }

    await this.userRepository.deleteUserById(id)
    return 'Success!'
  }
}
