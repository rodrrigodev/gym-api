import { InvalidDateError } from '@/errors/invalidDateError'
import { PrizeDrawUpdateError } from '@/errors/prizeDrawUpdateError'
import { PrizeDrawRepository } from '@/repositories/interfaces/prizeDrawRepository'
import { getDateDifference } from '@/utils/getDateDifference'

interface CreatePrizeDrawUseCaseRequest {
  id: string
  prize?: string
  finishedAt?: Date
  status: string
  drawNumber: string
  winnerId: string
}

export class UpdatePrizeDrawUseCase {
  constructor(private prizeDrawRepository: PrizeDrawRepository) {}

  async execute({
    id,
    prize,
    winnerId,
    finishedAt,
    status,
    drawNumber,
  }: CreatePrizeDrawUseCaseRequest) {
    const checkDateDifference = finishedAt ? getDateDifference(finishedAt) : 15

    if (checkDateDifference < 10 || checkDateDifference > 31) {
      throw new InvalidDateError()
    }

    const prizeDrawExists = await this.prizeDrawRepository.findPrizeDraw(id)

    if (!prizeDrawExists) {
      throw new PrizeDrawUpdateError()
    }

    const prizeDrawUpdated = await this.prizeDrawRepository.updatePrizeDraw(
      id,
      {
        prize: prize ?? prizeDrawExists.prize,
        finished_at: finishedAt ?? prizeDrawExists.finished_at,
        status: status ?? prizeDrawExists.status,
        drawn_number: drawNumber ?? prizeDrawExists.drawn_number,
        winner_id: winnerId ?? prizeDrawExists.winner_id,
      },
    )

    return prizeDrawUpdated
  }
}
