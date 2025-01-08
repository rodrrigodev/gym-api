import { NoParticipantsFoundError } from '@/errors/noParticipantsFoundError'
import { UserRepository } from '@/repositories/interfaces/userRepository'

export class fetchDrawParticipantsUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    const drawnParticipants = await this.userRepository.fetchDrawParticipants()

    if (!drawnParticipants) {
      throw new NoParticipantsFoundError()
    }

    return drawnParticipants
  }
}
