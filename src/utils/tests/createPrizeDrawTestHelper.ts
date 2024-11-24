import { PrizeDrawRepository } from '@/repositories/prizeDrawRepository'

export async function createPrizeDrawTestHelper(
  prizeDrawRepository: PrizeDrawRepository,
) {
  await prizeDrawRepository.createPrizeDraw({
    prize: 'Garrafa violetfit 1.5',
    status: 'waiting',
  })

  await prizeDrawRepository.createPrizeDraw({
    prize: 'T-shirt violetfit',
    status: 'waiting',
  })

  const prizeDraw = await prizeDrawRepository.createPrizeDraw({
    prize: 'Capinha violetfit',
    status: 'waiting',
  })

  return prizeDraw
}
