import { InvalidDateError } from '@/errors/invalidDateError'
import { PrizeDrawRepository } from '@/repositories/interfaces/prizeDrawRepository'
import { getDateDifference } from '@/utils/getDateDifference'

interface CreatePrizeDrawUseCaseRequest {
  prize: string
  status: string
  finishedAt: Date
}

export class CreatePrizeDrawUseCase {
  constructor(private prizeDrawRepository: PrizeDrawRepository) {}

  async execute({ prize, status, finishedAt }: CreatePrizeDrawUseCaseRequest) {
    const checkDateDifference = getDateDifference(finishedAt)

    if (checkDateDifference < 10 || checkDateDifference > 31) {
      throw new InvalidDateError()
    }

    const prizeDraw = await this.prizeDrawRepository.createPrizeDraw({
      prize,
      status,
      finished_at: finishedAt,
    })

    return prizeDraw
  }
}
