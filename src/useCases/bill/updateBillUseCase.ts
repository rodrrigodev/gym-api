import { BillNotFoundError } from '@/errors/billNotFoundError'
import { BillRepository } from '@/repositories/interfaces/billRepository'

interface UpdateBillRequest {
  name?: string
  category?: string
  amount?: string
}

export class UpdateBillUseCase {
  constructor(private billRepository: BillRepository) {}

  async execute(billId: string, data: UpdateBillRequest) {
    const billExists = await this.billRepository.findBill(billId)

    if (!billExists) {
      throw new BillNotFoundError()
    }

    const amountToDecimal = data.amount
      ? data.amount.replace('.', '')
      : billExists.amount

    const billUpdated = await this.billRepository.updateBill(billId, {
      amount: amountToDecimal,
      category: data.category,
      name: data.name,
    })

    return billUpdated
  }
}
