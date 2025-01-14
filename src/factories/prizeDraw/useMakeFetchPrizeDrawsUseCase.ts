import { PrismaPrizeDrawRepository } from '@/repositories/prisma/prizeDrawRepository'
import { FetchPrizeDrawsUseCase } from '@/useCases/prizeDraw/fetchPrizeDrawsUseCase'

export function useMakeFetchPrizeDrawsUseCase() {
  const prizeDrawRepository = new PrismaPrizeDrawRepository()

  const fetchPrizeDrawsUseCase = new FetchPrizeDrawsUseCase(prizeDrawRepository)

  return fetchPrizeDrawsUseCase
}
