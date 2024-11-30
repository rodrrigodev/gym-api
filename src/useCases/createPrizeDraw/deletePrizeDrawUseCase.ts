import { PrizeDrawNotFoundError } from '@/errors/prizedrawNotFoundError'
import { PrizeDrawRepository } from '@/repositories/prizeDrawRepository'

export class DeletePrizeDrawUseCase {
  constructor(private prizeDrawRepository: PrizeDrawRepository) {}

  async execute(id: string) {
    const prizeDrawExists = await this.prizeDrawRepository.findPrizeDraw(id)

    if (!prizeDrawExists) {
      throw new PrizeDrawNotFoundError()
    }
    const message = await this.prizeDrawRepository.deletePrizeDraw(
      prizeDrawExists.id,
    )

    return message
  }
}
