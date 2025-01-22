import { PrismaPlanRepository } from '@/repositories/prisma/prismaPlanRepository'
import { FetchPlansUseCase } from '@/useCases/plan/fetchPlansUseCase'

export function useMakeFetchPlansUseCase() {
  const prismaPlanRepository = new PrismaPlanRepository()

  const fetchPlanUseCase = new FetchPlansUseCase(prismaPlanRepository)

  return fetchPlanUseCase
}
