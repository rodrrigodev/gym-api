import { UserNotFoundError } from '@/errors/userNotFoundError'
import { UserRepository } from '@/repositories/interfaces/userRepository'

interface UpdateUserRequest {
  email?: string
  name?: string
  nickname?: string
  birthDate?: Date
  weight?: number
  height?: number
  imageUrl?: string
}

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, data: UpdateUserRequest) {
    const userExists = await this.userRepository.findUserById(id)

    if (!userExists) {
      throw new UserNotFoundError()
    }

    const userUpdated = await this.userRepository.updateUser(id, data)

    return userUpdated
  }
}
