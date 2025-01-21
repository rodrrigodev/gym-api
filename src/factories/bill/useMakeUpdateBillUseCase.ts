import { PrismaBillRepository } from '@/repositories/prisma/prismaBillRepository'
import { UpdateBillUseCase } from '@/useCases/bill/updateBillUseCase'

export function useMakeUpdateBillUseCase() {
  const prismaBillRepository = new PrismaBillRepository()

  const updateBillUseCase = new UpdateBillUseCase(prismaBillRepository)

  return updateBillUseCase
}
