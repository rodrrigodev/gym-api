import { PrismaBillRepository } from '@/repositories/prisma/prismaBillRepository'
import { FetchAllBillsUseCase } from '@/useCases/bill/fetchAllBillsUseCase'

export function useMakeFetchAllBillsUseCase() {
  const prismaBillRepository = new PrismaBillRepository()

  const fetchAllBillsUseCase = new FetchAllBillsUseCase(prismaBillRepository)

  return fetchAllBillsUseCase
}
