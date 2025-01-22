import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { BillRepository, FetchBills } from '../interfaces/billRepository'

export class PrismaBillRepository implements BillRepository {
  async createBill(data: Prisma.BillCreateInput) {
    const bill = await prisma.bill.create({ data })

    return bill
  }

  async fetchBills({ page, period, category, name }: FetchBills) {
    const length = Math.ceil(
      (await prisma.bill.count({
        where: {
          category,
          name,
          created_at: { lt: new Date(), lte: period },
        },
      })) / 20,
    )

    const bills = await prisma.bill.findMany({
      where: {
        category,
        name,
        created_at: { gte: period },
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return { bills, length }
  }

  async deleteBill(id: string) {
    await prisma.bill.delete({ where: { id } })

    return 'Bill deleted successfully!'
  }

  async findBill(id: string) {
    const bill = await prisma.bill.findUnique({ where: { id } })

    return bill
  }

  async updateBill(id: string, data: Prisma.BillUpdateInput) {
    const billUpdated = await prisma.bill.update({
      where: { id },
      data,
    })

    return billUpdated
  }
}
