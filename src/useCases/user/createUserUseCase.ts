import { UserAlreadyExistsError } from '@/errors/userAlreadyExistsError'
import { UserRepository } from '@/repositories/userRepository'

interface CreateUserUseCaseRequest {
  email: string
  password: string
  name: string
  nickname?: string
  birthDate?: Date
  weight?: number
  height?: number
  imageUrl?: string
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserUseCaseRequest) {
    const emailAlreadyExists = await this.userRepository.findUserByEmail(
      data.email,
    )

    if (emailAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.userRepository.createUser({
      name: data.name,
      email: data.email,
      password: data.password,
      birth_date: data.birthDate || null,
      nickname: data.nickname || null,
      height: data.height || null,
      image_URL: data.imageUrl || null,
      current_weight: data.weight || null,
      created_at: new Date(),
    })

    return user
  }
}
