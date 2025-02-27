import { BillsNotFoundError } from '@/errors/billsNotFoundError'
import { BillRepository } from '@/repositories/interfaces/billRepository'

interface FetchBillsRequest {
  period: number
  page: number
  name?: string
  category?: string
}

export class FetchBillsUseCase {
  constructor(private billRepository: BillRepository) {}

  async execute({ period, name, category, page }: FetchBillsRequest) {
    const date = new Date()
    const periodUpdated = new Date(date.setDate(date.getDate() - period))

    const bills = await this.billRepository.fetchBills({
      period: periodUpdated,
      page,
      name,
      category,
    })

    if (!bills.bills.length) {
      throw new BillsNotFoundError()
    }

    return bills
  }
}
