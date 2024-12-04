import { InvalidDateError } from '@/errors/invalidDateError'
import { PrizeDrawUpdateError } from '@/errors/prizeDrawUpdateError'
import { PrizeDrawRepository } from '@/repositories/prizeDrawRepository'
import { getDateDifference } from '@/utils/getDateDifference'

interface CreatePrizeDrawUseCaseRequest {
  id: string
  prize?: string
  finishedAt?: Date
}

export class UpdatePrizeDrawUseCase {
  constructor(private prizeDrawRepository: PrizeDrawRepository) {}

  async execute({ id, prize, finishedAt }: CreatePrizeDrawUseCaseRequest) {
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
      { prize, finished_at: finishedAt },
    )

    return prizeDrawUpdated
  }
}
