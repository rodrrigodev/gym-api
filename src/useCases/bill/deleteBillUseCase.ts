import { BillNotFoundError } from '@/errors/billNotFoundError'
import { BillRepository } from '@/repositories/interfaces/billRepository'

export class DeleteBillUseCase {
  constructor(private billRepository: BillRepository) {}

  async execute(id: string) {
    const billExists = await this.billRepository.findBill(id)

    if (!billExists) {
      throw new BillNotFoundError()
    }

    const billsUpdated = await this.billRepository.deleteBill(billExists.id)

    return billsUpdated
  }
}
