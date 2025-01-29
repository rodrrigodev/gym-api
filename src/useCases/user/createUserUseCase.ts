import { UserAlreadyExistsError } from '@/errors/userAlreadyExistsError'
import { UserRepository } from '@/repositories/interfaces/userRepository'

interface CreateUserUseCaseRequest {
  email: string
  password: string
  name: string
  cellPhone?: string
  nickname?: string
  birthDate?: Date
  weight?: number
  height?: number
  imageUrl?: string
  experience_date?: Date
  planId?: string
  role: 'ADMIN' | 'USER'
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
      cell_phone: data.cellPhone || null,
      nickname: data.nickname || null,
      height: data.height || null,
      image_URL: data.imageUrl || null,
      current_weight: data.weight || null,
      created_at: new Date(),
      experience_date: data.experience_date || null,
      plan_id: data.planId || null,
      role: data.role,
    })

    return user
  }
}
