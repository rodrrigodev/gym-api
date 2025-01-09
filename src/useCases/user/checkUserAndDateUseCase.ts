import { InvalidCredencialError } from '@/errors/invalidCredencialError'
import { InvalidDateError } from '@/errors/invalidDateError'
import { UserRepository } from '@/repositories/interfaces/userRepository'
import dayjs from 'dayjs'

export class CheckUserAndDateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const userExists = await this.userRepository.findUserById(userId)

    if (!userExists) {
      throw new InvalidCredencialError()
    }

    const checkDifferenceBetweenDates = dayjs(userExists.last_login).diff(
      dayjs(),
      'hours',
    )

    if (checkDifferenceBetweenDates >= 4) {
      throw new InvalidDateError()
    }

    return { userId: userExists.id, role: userExists.role }
  }
}
