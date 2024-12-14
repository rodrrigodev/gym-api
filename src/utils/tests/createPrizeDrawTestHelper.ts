import { PrizeDrawRepository } from '@/repositories/interfaces/prizeDrawRepository'

export async function createPrizeDrawTestHelper(
  prizeDrawRepository: PrizeDrawRepository,
) {
  await prizeDrawRepository.createPrizeDraw({
    prize: 'Garrafa violetfit 1.5',
    status: 'waiting',
    finished_at: new Date(2023, 7, 10),
  })

  await prizeDrawRepository.createPrizeDraw({
    prize: 'T-shirt violetfit',
    status: 'waiting',
    finished_at: new Date(2023, 7, 10),
  })

  const prizeDraw = await prizeDrawRepository.createPrizeDraw({
    prize: 'Capinha violetfit',
    status: 'waiting',
    finished_at: new Date(2023, 7, 10),
  })

  return prizeDraw
}
