import { BillNotFoundError } from '@/errors/billNotFoundError'
import { BillRepository } from '@/repositories/interfaces/billRepository'

interface UpdateBillRequest {
  name?: string
  category?: string
  price?: string
}

export class UpdateBillUseCase {
  constructor(private billRepository: BillRepository) {}

  async execute(id: string, data: UpdateBillRequest) {
    const billExists = await this.billRepository.findBill(id)

    if (!billExists) {
      throw new BillNotFoundError()
    }

    const amountToDecimal = data.price
      ? data.price.replace('.', '')
      : billExists.price

    const billUpdated = await this.billRepository.updateBill(id, {
      price: amountToDecimal,
      category: data.category,
      name: data.name,
    })

    return billUpdated
  }
}
