import { Bill, Prisma } from '@prisma/client'
import { BillRepository } from '../interfaces/billRepository'
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

  async findBill(billId: string) {
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

  async deleteBill(billId: string) {
    const filteredBills = this.bills.filter((bill) => {
      return bill.id !== billId
    })

    this.bills = filteredBills

    return {
      bills: filteredBills.slice(0, 20),
      length: Math.ceil(filteredBills.length / 20),
    }
  }

  async fetchBills(
    period: number,
    page: number,
    name?: string,
    category?: string,
  ) {
    const date = new Date()
    const currentMonth = date.getMonth()
    const monthThreshold = currentMonth - Math.floor(period / 30) + 1

    const filteredBills = this.bills.filter((bill) => {
      const billMonth = bill.created_at.getMonth()
      const matchesCategory = category
        ? bill.category.toLowerCase() === category.toLowerCase()
        : true
      const matchesName = name
        ? bill.name.toLowerCase() === name.toLowerCase()
        : true
      const matchesPeriod = billMonth >= monthThreshold

      return matchesCategory && matchesName && matchesPeriod
    })

    return {
      bills: filteredBills.slice((page - 1) * 20, page * 20),
      length: filteredBills.length,
    }
  }
}
