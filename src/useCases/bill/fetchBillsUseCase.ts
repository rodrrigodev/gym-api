import { BillsNotFoundError } from '@/errors/billsNotFoundError'
import { BillRepository } from '@/repositories/billRepository'

interface FetchBillsRequest {
  period: number
  page: number
  name?: string
  category?: string
}

export class FetchBillsUseCase {
  constructor(private billRepository: BillRepository) {}

  async execute({ period, name, category, page }: FetchBillsRequest) {
    const bills = await this.billRepository.fetchBills(
      period,
      page,
      name,
      category,
    )

    if (!bills.length) {
      throw new BillsNotFoundError()
    }

    return bills
  }
}
