import { NoParticipantsFoundError } from '@/errors/noParticipantsFoundError'
import { UserRepository } from '@/repositories/interfaces/userRepository'

export class FetchDrawParticipantsUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    const drawnParticipants = await this.userRepository.fetchDrawParticipants()

    if (!drawnParticipants.length) {
      throw new NoParticipantsFoundError()
    }

    return drawnParticipants
  }
}
