import { BillRepository } from '@/repositories/billRepository'

interface CreateBillRequest {
  name: string
  category: string
  amount: string
}

export class CreateBillUseCase {
  constructor(private billRepository: BillRepository) {}

  async execute({ amount, category, name }: CreateBillRequest) {
    const amountToDecimal = amount.replace('.', '')

    const bill = await this.billRepository.createBill({
      amount: amountToDecimal,
      category,
      name,
    })

    return bill
  }
}
