import { PrizeDrawRepository } from '@/repositories/prizeDrawRepository'

interface CreatePrizeDrawUseCaseRequest {
  prize: string
  status: string
  finishedAt: Date
}

export class CreatePrizeDrawUseCase {
  constructor(private prizeDrawRepository: PrizeDrawRepository) {}

  async execute({ prize, status, finishedAt }: CreatePrizeDrawUseCaseRequest) {
    const prizeDraw = await this.prizeDrawRepository.createPrizeDraw({
      prize,
      status,
      finished_at: finishedAt,
    })

    return prizeDraw
  }
}
