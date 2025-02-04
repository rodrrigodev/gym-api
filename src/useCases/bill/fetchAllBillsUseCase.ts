import { BillsNotFoundError } from '@/errors/billsNotFoundError'
import { BillRepository } from '@/repositories/interfaces/billRepository'
import { brDateFormat } from '@/utils/dateBrFormat'

export class FetchAllBillsUseCase {
  constructor(private billRepository: BillRepository) {}

  async execute() {
    const bills = await this.billRepository.fetchAllBills()

    if (!bills.length) {
      throw new BillsNotFoundError()
    }

    const billsUpdated = bills.map((bill, index) => {
      return {
        ...bill,
        id: index + 1,
        price: Number(bill.price) / 100,
        created_at: brDateFormat(bill.created_at),
      }
    })

    return billsUpdated
  }
}
