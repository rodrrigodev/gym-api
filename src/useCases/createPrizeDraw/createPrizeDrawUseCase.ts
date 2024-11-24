import { PrizeDrawRepository } from '@/repositories/prizeDrawRepository'

interface CreatePrizeDrawUseCaseRequest {
  prize: string
  status: string
}

export class CreatePrizeDrawUseCase {
  constructor(private prizeDrawRepository: PrizeDrawRepository) {}

  async execute({ prize, status }: CreatePrizeDrawUseCaseRequest) {
    const prizeDraw = await this.prizeDrawRepository.createPrizeDraw({
      prize,
      status,
    })

    return prizeDraw
  }
}
