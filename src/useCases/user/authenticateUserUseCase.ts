import { InvalidCredencialError } from '@/errors/invalidCredencialError'
import { UserRepository } from '@/repositories/interfaces/userRepository'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: AuthenticateUseCaseRequest) {
    const userExists = await this.userRepository.findUserByEmail(email)

    if (!userExists) {
      throw new InvalidCredencialError()
    }

    const passwordMatch = await compare(password, userExists.password)

    if (!passwordMatch) {
      throw new InvalidCredencialError()
    }

    await this.userRepository.updateUser(userExists.id, {
      last_login: new Date(),
    })

    return { ...userExists, password: null, last_login: null }
  }
}
