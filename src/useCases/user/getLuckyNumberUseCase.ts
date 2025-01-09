import { LuckyNumberAlreadyExistsError } from '@/errors/luckyNumberAlreadyExistsError'
import { UserNotFoundError } from '@/errors/userNotFoundError'
import { UserRepository } from '@/repositories/interfaces/userRepository'
import { getRandomLuckyNumber } from '@/utils/getRandomLuckyNumber'

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
    const luckyNumbers = [
      getRandomLuckyNumber(id, type),
      ...userExists.lucky_numbers,
    ]

    await this.userRepository.updateUser(id, {
      lucky_numbers: luckyNumbers,
    })

    return luckyNumbers
  }
}
