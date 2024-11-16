import { Bill, Prisma } from '@prisma/client'
import { BillRepository } from '../billRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryBillRepository implements BillRepository {
  private bills: Bill[] = []

  async createBill(data: Prisma.BillCreateInput) {
    const bill = {
      id: randomUUID(),
      name: data.name,
      category: data.category,
      amount: new Prisma.Decimal(Number(data.amount)),
      created_at: new Date(),
    }

    this.bills.push(bill)

    return bill
  }

  async findBillById(billId: string) {
    const billExists = this.bills.find((bill) => {
      return bill.id === billId
    })

    return billExists || null
  }

  async updateBill(billId: string, data: Prisma.BillUpdateInput) {
    const billsUpdated = this.bills.map((bill) => {
      if (bill.id === billId) {
        return { ...bill, ...data }
      } else {
        return bill
      }
    })

    this.bills = billsUpdated as Bill[]

    const billUpdated = this.bills.find((bill) => {
      return bill.id === billId
    })

    return billUpdated || null
  }
}
