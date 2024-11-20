import { BillNotFoundError } from '@/errors/billNotFoundError'
import { BillRepository } from '@/repositories/billRepository'

export class DeleteBillUseCase {
  constructor(private billRepository: BillRepository) {}

  async execute(billId: string) {
    const billExists = await this.billRepository.findBill(billId)

    if (!billExists) {
      throw new BillNotFoundError()
    }

    const message = await this.billRepository.deleteBill(billExists.id)

    return message
  }
}
