import { BillRepository } from '@/repositories/billRepository'

export async function createBillTestHelper(billRepository: BillRepository) {
  const bill = await billRepository.createBill({
    amount: '38.25',
    category: 'cleaning products',
    name: 'Itens de higiene',
  })

  return bill
}
