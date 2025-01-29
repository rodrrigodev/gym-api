import { PrismaPrizeDrawRepository } from '@/repositories/prisma/prismaPrizeDrawRepository'
import { UpdatePrizeDrawUseCase } from '@/useCases/prizeDraw/updatePrizeDrawUseCase'

export function useMakeUpdatePrizeDrawUseCase() {
  const prizeDrawRepository = new PrismaPrizeDrawRepository()

  const updatePrizeDrawUseCase = new UpdatePrizeDrawUseCase(prizeDrawRepository)

  return updatePrizeDrawUseCase
}
