import { PrismaBillRepository } from '@/repositories/prisma/prismaBillRepository'
import { CreateBillUseCase } from '@/useCases/bill/createBillUseCase'

export function useMakeCreateBillUseCase() {
  const prismaBillRepository = new PrismaBillRepository()

  const createBillUseCase = new CreateBillUseCase(prismaBillRepository)

  return createBillUseCase
}
