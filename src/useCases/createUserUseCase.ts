import { UserAlreadyExistsError } from 'errors/userAlreadyExistsError'
import { UserRepository } from 'repositories/userRepository'

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
    const emailAlreadyExists = await this.userRepository.findByEmail(data.email)

    if (emailAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: data.password,
      birthDate: data.birthDate || null,
      nickname: data.nickname || null,
      height: data.height || null,
      imageUrl: data.imageUrl || null,
      weight: data.weight || null,
      createdAt: new Date(),
    })

    return user
  }
}
