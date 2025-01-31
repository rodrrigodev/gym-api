import { PrizeDrawRepository } from '@/repositories/interfaces/prizeDrawRepository'

export async function createPrizeDrawTestHelper(
  prizeDrawRepository: PrizeDrawRepository,
) {
  const prizeDraws = [
    { prize: 'Garrafa violetfit 1.5', status: 'waiting' },
    { prize: 'T-shirt violetfit', status: 'finished' },
    { prize: 'Capinha violetfit', status: 'waiting' },
  ]

  const results = await Promise.all(
    prizeDraws.map((data) =>
      prizeDrawRepository.createPrizeDraw({
        ...data,
        finished_at: new Date(2023, 7, 10),
      }),
    ),
  )

  return results[2]
}
