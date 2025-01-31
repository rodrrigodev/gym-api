import { BillRepository } from '@/repositories/interfaces/billRepository'

export async function createBillTestHelper(billRepository: BillRepository) {
  const bills = [
    ...Array.from({ length: 25 }, (_, i) => ({
      price: `${i}0.00`,
      category: 'cleaning',
      name: 'Products',
      created_at: `2024-02-${String(i + 1).padStart(2, '0')}`,
    })),
    {
      price: '120.00',
      category: 'cleaning',
      name: 'Products',
      created_at: '2023-02-15',
    },
    {
      price: '30.00',
      category: 'maintenance',
      name: 'Filter Replacement',
      created_at: '2023-05-07',
    },
    {
      price: '400.00',
      category: 'revenue',
      name: 'Quarterly Payment',
      created_at: '2023-09-15',
    },
    {
      price: '381.25',
      category: 'maintenance',
      name: 'Leg press machine',
      created_at: '2023-10-15',
    },
    {
      price: '38.25',
      category: 'cleaning',
      name: 'Products',
      created_at: '2023-11-11',
    },
  ]

  const results = await Promise.all(
    bills.map((bill) => billRepository.createBill(bill)),
  )

  return results.at(-1)
}
