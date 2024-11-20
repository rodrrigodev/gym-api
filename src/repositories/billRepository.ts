import { Bill, Prisma } from '@prisma/client'

export interface BillRepository {
  createBill: (data: Prisma.BillCreateInput) => Promise<Bill>

  updateBill: (
    billId: string,
    data: Prisma.BillUpdateInput,
  ) => Promise<Bill | null>

  findBillById: (billId: string) => Promise<Bill | null>

  deleteBillById: (billId: string) => Promise<string>

  fetchBills: (
    period: number,
    page: number,
    name?: string,
    category?: string,
  ) => Promise<{ bills: Bill[]; length: number }>
}
