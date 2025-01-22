import { PrismaPlanRepository } from '@/repositories/prisma/prismaPlanRepository'
import { UpdatePlanUseCase } from '@/useCases/plan/updatePlanUseCase'

export function useMakeUpdatePlanUseCase() {
  const prismaPlanRepository = new PrismaPlanRepository()

  const updatePlanUseCase = new UpdatePlanUseCase(prismaPlanRepository)

  return updatePlanUseCase
}
