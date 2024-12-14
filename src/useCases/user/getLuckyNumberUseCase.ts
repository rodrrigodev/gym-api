import { LuckyNumberAlreadyExistsError } from '@/errors/luckyNumberAlreadyExistsError'
import { UserNotFoundError } from '@/errors/userNotFoundError'
import { UserRepository } from '@/repositories/interfaces/userRepository'

interface GetLuckyNumberUseCaseRequest {
  id: string
  type: string
}

export class GetLuckyNumberUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id, type }: GetLuckyNumberUseCaseRequest) {
    const userExists = await this.userRepository.findUserById(id)

    if (!userExists) {
      throw new UserNotFoundError()
    }

    const luckyNumberAlreadyExists = userExists.lucky_numbers.find((number) => {
      return number.startsWith(type)
    })

    if (luckyNumberAlreadyExists) {
      throw new LuckyNumberAlreadyExistsError()
    }

    const luckyNumbers = await this.userRepository.getLuckyNumber(id, type)

    return luckyNumbers
  }
}
