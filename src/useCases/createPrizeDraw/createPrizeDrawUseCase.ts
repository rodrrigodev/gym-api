import { PrizeDrawRepository } from '@/repositories/prizeDrawRepository'

interface CreatePrizeDrawUseCaseRequest {
  prize: string
  drawn_number: string
  status: string
}

export class CreatePrizeDrawUseCase {
  constructor(private prizeDrawRepository: PrizeDrawRepository) {}

  async execute({
    prize,
    drawn_number,
    status,
  }: CreatePrizeDrawUseCaseRequest) {
    const prizeDraw = await this.prizeDrawRepository.createPrizeDraw({
      prize,
      drawn_number,
      status,
    })

    return prizeDraw
  }
}
