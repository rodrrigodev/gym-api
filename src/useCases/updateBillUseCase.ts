import { BillNotFoundError } from '@/errors/billNotFoundError'
import { BillRepository } from '@/repositories/billRepository'

interface UpdateBillRequest {
  name?: string
  category?: string
  amount?: string
}

export class UpdateBillUseCase {
  constructor(private billRepository: BillRepository) {}

  async execute(billId: string, data: UpdateBillRequest) {
    const billExists = await this.billRepository.findBillById(billId)

    if (!billExists) {
      throw new BillNotFoundError()
    }

    console.log('tofix')
    const amountToDecimal = data.amount.replace('.', '')

    const billUpdated = await this.billRepository.updateBill(billId, {
      amount: amountToDecimal,
      category: data.category,
      name: data.name,
    })

    return billUpdated
  }
}
