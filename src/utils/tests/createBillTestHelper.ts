import { BillRepository } from '@/repositories/billRepository'

export async function createBillTestHelper(billRepository: BillRepository) {
  await Promise.all(
    Array.from({ length: 25 }, (_, i) =>
      billRepository.createBill({
        price: `${i}0.00`,
        category: 'cleaning',
        name: 'Products',
        created_at: `2024-02-${i + 1}`,
      }),
    ),
  )

  await billRepository.createBill({
    price: '120.00',
    category: 'cleaning',
    name: 'Products',
    created_at: '2023-02-15',
  })

  await billRepository.createBill({
    price: '30.00',
    category: 'maintenance',
    name: 'Filter Replacement',
    created_at: '2023-05-07',
  })

  await billRepository.createBill({
    price: '400.00',
    category: 'revenue',
    name: 'Quarterly Payment',
    created_at: '2023-09-15',
  })

  const bill = await billRepository.createBill({
    price: '38.25',
    category: 'cleaning',
    name: 'Products',
    created_at: '2023-11-11',
  })

  await billRepository.createBill({
    price: '381.25',
    category: 'maintenance',
    name: 'Leg press machine',
    created_at: '2023-10-15',
  })

  return bill
}
