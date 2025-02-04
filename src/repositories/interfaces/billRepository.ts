import { Bill, Prisma } from '@prisma/client'

export interface FetchBills {
  period: Date
  page: number
  name?: string
  category?: string
}
export interface BillRepository {
  createBill: (data: Prisma.BillCreateInput) => Promise<Bill>

  updateBill: (id: string, data: Prisma.BillUpdateInput) => Promise<Bill | null>

  findBill: (id: string) => Promise<Bill | null>

  deleteBill: (id: string) => Promise<string>

  fetchBills: (data: FetchBills) => Promise<{ bills: Bill[]; length: number }>

  fetchAllBills: () => Promise<Bill[]>
}
