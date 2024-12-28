import { UserRepository } from '@/repositories/interfaces/userRepository'
import dayjs from 'dayjs'

export class CheckUserAndDateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const userExists = await this.userRepository.findUserById(userId)

    if (!userExists) {
      throw new Error()
    }

    const checkDifferenceBetweenDates = dayjs().diff(
      dayjs(userExists.last_login),
      'hours',
    )

    if (checkDifferenceBetweenDates >= 4) {
      throw new Error()
    }

    return { userId: userExists.id, role: userExists.role }
  }
}
