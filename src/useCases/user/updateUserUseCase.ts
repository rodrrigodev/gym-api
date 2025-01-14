import { UserNotFoundError } from '@/errors/userNotFoundError'
import { UserRepository } from '@/repositories/interfaces/userRepository'

interface UpdateUserRequest {
  email?: string
  name?: string
  nickname?: string
  birthDate?: Date
  currentWeight?: number
  height?: number
  imageURL?: string
}

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, data: UpdateUserRequest) {
    const userExists = await this.userRepository.findUserById(id)

    if (!userExists) {
      throw new UserNotFoundError()
    }

    const userUpdated = await this.userRepository.updateUser(id, {
      email: data.email ?? userExists.email,
      name: data.name ?? userExists.name,
      birth_date: data.birthDate ?? userExists.birth_date,
      nickname: data.nickname ?? userExists.nickname,
      current_weight: data.currentWeight ?? userExists.current_weight,
      height: data.height ?? userExists.height,
      image_URL: data.imageURL ?? userExists.image_URL,
    })

    return userUpdated
  }
}
