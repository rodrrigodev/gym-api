import { BillRepository } from '@/repositories/interfaces/billRepository'

interface CreateBillRequest {
  name: string
  category: string
  price: string
}

export class CreateBillUseCase {
  constructor(private billRepository: BillRepository) {}

  async execute({ price, category, name }: CreateBillRequest) {
    const amountToDecimal = price.replace('.', '')

    const bill = await this.billRepository.createBill({
      price: amountToDecimal,
      category,
      name,
    })

    return bill
  }
}
