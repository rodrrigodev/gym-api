import { PrizeDrawNotFoundError } from '@/errors/prizeDrawNotFoundError'
import { PrizeDrawRepository } from '@/repositories/interfaces/prizeDrawRepository'

export class FetchPrizeDrawsUseCase {
  constructor(private prizeDrawRepository: PrizeDrawRepository) {}

  async execute() {
    const prizeDraws = await this.prizeDrawRepository.fetchPrizeDraws()

    if (!prizeDraws.length) {
      throw new PrizeDrawNotFoundError()
    }

    return prizeDraws
  }
}
