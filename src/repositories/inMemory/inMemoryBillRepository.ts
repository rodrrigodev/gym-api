import { Bill, Prisma } from '@prisma/client'
import { BillRepository, FetchBills } from '../interfaces/billRepository'
import { randomUUID } from 'node:crypto'

export class InMemoryBillRepository implements BillRepository {
  private bills: Bill[] = []

  async createBill(data: Prisma.BillCreateInput) {
    const bill = {
      id: randomUUID(),
      name: data.name,
      category: data.category,
      price: new Prisma.Decimal(Number(data.price)),
      created_at: data.created_at ? new Date(data.created_at) : new Date(),
    }

    this.bills.push(bill)

    return bill
  }

  async findBill(id: string) {
    const billExists = this.bills.find((bill) => {
      return bill.id === id
    })

    return billExists || null
  }

  async updateBill(id: string, data: Prisma.BillUpdateInput) {
    const billsUpdated = this.bills.map((bill) => {
      if (bill.id === id) {
        return { ...bill, ...data }
      } else {
        return bill
      }
    })

    this.bills = billsUpdated as Bill[]

    const billUpdated = this.bills.find((bill) => {
      return bill.id === id
    })

    return billUpdated || null
  }

  async deleteBill(billId: string) {
    const filteredBills = this.bills.filter((bill) => {
      return bill.id !== billId
    })

    this.bills = filteredBills

    return 'Bill deleted successfully!'
  }

  async fetchBills({ page, period, category, name }: FetchBills) {
    const filteredBills = this.bills.filter((bill) => {
      const matchesCategory = category
        ? bill.category.toLowerCase() === category.toLowerCase()
        : true
      const matchesName = name
        ? bill.name.toLowerCase() === name.toLowerCase()
        : true
      const matchesPeriod = bill.created_at >= period

      return matchesCategory && matchesName && matchesPeriod
    })

    return {
      bills: filteredBills.slice((page - 1) * 20, page * 20),
      length: Math.ceil(filteredBills.length / 20),
    }
  }

  async fetchAllBills() {
    return this.bills
  }
}
