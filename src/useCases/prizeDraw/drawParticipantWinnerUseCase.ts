import { DrawNotPossibleError } from '@/errors/drawNotPossibleError'
import { PrizeDrawNotFoundError } from '@/errors/prizeDrawNotFoundError'
import { PrizeDrawRepository } from '@/repositories/interfaces/prizeDrawRepository'
import { UserRepository } from '@/repositories/interfaces/userRepository'
import { getDateDifference } from '@/utils/getDateDifference'
import { getPrizeDrawWinner } from '@/utils/getPrizeDrawWinner'

export class DrawParticipantWinnerUseCase {
  constructor(
    private prizeDrawRepository: PrizeDrawRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(prizeDrawId: string) {
    const prizeDrawExists =
      await this.prizeDrawRepository.findPrizeDraw(prizeDrawId)

    if (!prizeDrawExists) {
      throw new PrizeDrawNotFoundError()
    }

    const checkDateDifference = getDateDifference(prizeDrawExists.finished_at)
    if (checkDateDifference <= 5 || prizeDrawExists.status === 'finished') {
      throw new DrawNotPossibleError()
    }

    const drawnParticipants = await this.userRepository.fetchDrawParticipants()

    const { drawNumber, winnerId } = getPrizeDrawWinner(drawnParticipants)

    const prizeDrawResult = await this.prizeDrawRepository.updatePrizeDraw(
      prizeDrawExists.id,
      {
        drawn_number: drawNumber,
        status: 'finished',
        winner_id: winnerId,
      },
    )

    return prizeDrawResult
  }
}
