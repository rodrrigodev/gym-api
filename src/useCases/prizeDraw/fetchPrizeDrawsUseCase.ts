import { PrizeDrawRepository } from '@/repositories/interfaces/prizeDrawRepository'

export class FetchPrizeDrawsUseCase {
  constructor(private prizeDrawRepository: PrizeDrawRepository) {}

  async execute() {
    const prizeDraws = await this.prizeDrawRepository.fetchPrizeDraw()

    return prizeDraws
  }
}
