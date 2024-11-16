import { Bill, Prisma } from '@prisma/client'

export interface BillRepository {
  createBill: (data: Prisma.BillCreateInput) => Promise<Bill>

  updateBill: (
    billId: string,
    data: Prisma.BillUpdateInput,
  ) => Promise<Bill | null>

  findBillById: (billId: string) => Promise<Bill | null>
}
