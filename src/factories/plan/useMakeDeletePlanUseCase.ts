import { PrismaPlanRepository } from '@/repositories/prisma/prismaPlanRepository'
import { DeletePlanUseCase } from '@/useCases/plan/deletePlanUseCase'

export function useMakeDeletePlanUseCase() {
  const prismaPlanRepository = new PrismaPlanRepository()

  const deletePlanUseCase = new DeletePlanUseCase(prismaPlanRepository)

  return deletePlanUseCase
}
