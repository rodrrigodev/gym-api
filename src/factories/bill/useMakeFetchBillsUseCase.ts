import { PrismaBillRepository } from '@/repositories/prisma/prismaBillRepository'
import { FetchBillsUseCase } from '@/useCases/bill/fetchBillsUseCase'

export function useMakeFetchBillsUseCase() {
  const prismaBillRepository = new PrismaBillRepository()

  const fetchBillsUseCase = new FetchBillsUseCase(prismaBillRepository)

  return fetchBillsUseCase
}
