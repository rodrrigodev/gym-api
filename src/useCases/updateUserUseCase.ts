import { UserNotFoundError } from '@/errors/userNotFoundError'
import { UserDataToUpdate, UserRepository } from '@/repositories/userRepository'

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, data: UserDataToUpdate) {
    const userExists = await this.userRepository.findUserById(id)

    if (!userExists) {
      throw new UserNotFoundError()
    }

    const userUpdated = await this.userRepository.updateUser(id, data)

    return userUpdated
  }
}
