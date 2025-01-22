import { PrismaPlanRepository } from '@/repositories/prisma/prismaPlanRepository'
import { CreatePlanUseCase } from '@/useCases/plan/createPlanUseCase'

export function useMakeCreatePlanUseCase() {
  const prismaPlanRepository = new PrismaPlanRepository()

  const createPlanUseCase = new CreatePlanUseCase(prismaPlanRepository)

  return createPlanUseCase
}
