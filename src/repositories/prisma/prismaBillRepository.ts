import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { BillRepository } from '../interfaces/billRepository'

export class PrismaBillRepository implements BillRepository {
  async createBill(data: Prisma.BillCreateInput) {
    const bill = await prisma.bill.create({ data })

    return bill
  }

  async fetchBills(
    period: number,
    page: number,
    name?: string,
    category?: string,
  ) {
    const date = new Date()
    const finalDate = date.setDate(date.getDate() - period)
    const length = await prisma.bill.count({
      where: {
        category,
        name,
        created_at: { lt: new Date(), lte: new Date(finalDate) },
      },
    })

    const bills = await prisma.bill.findMany({
      where: {
        category,
        name,
        created_at: { lt: new Date(), lte: new Date(finalDate) },
      },
      take: 20,
    })

    return { bills, length }
  }
}
