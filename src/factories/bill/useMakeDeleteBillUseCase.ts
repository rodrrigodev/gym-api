import { PrismaBillRepository } from '@/repositories/prisma/prismaBillRepository'
import { DeleteBillUseCase } from '@/useCases/bill/deleteBillUseCase'

export function useMakeDeleteBillsUseCase() {
  const prismaBillRepository = new PrismaBillRepository()

  const deleteBillsUseCase = new DeleteBillUseCase(prismaBillRepository)

  return deleteBillsUseCase
}
