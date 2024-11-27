import { PrizeDrawUpdateError } from '@/errors/prizeDrawUpdateError'
import { PrizeDrawRepository } from '@/repositories/prizeDrawRepository'

interface CreatePrizeDrawUseCaseRequest {
  id: string
  prize?: string
  finishedAt?: Date
}

export class UpdatePrizeDrawUseCase {
  constructor(private prizeDrawRepository: PrizeDrawRepository) {}

  async execute({ id, prize, finishedAt }: CreatePrizeDrawUseCaseRequest) {
    const prizeDrawExists = await this.prizeDrawRepository.checkPrizeDraw(id)

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
