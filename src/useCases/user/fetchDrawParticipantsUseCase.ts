import { NoParticipantsFoundError } from '@/errors/noParticipantsFoundError'
import { UserRepository } from '@/repositories/interfaces/userRepository'

export class FetchDrawParticipantsUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    const participantsInfo = await this.userRepository.fetchDrawParticipants()

    if (!participantsInfo.length) {
      throw new NoParticipantsFoundError()
    }

    return participantsInfo
  }
}
