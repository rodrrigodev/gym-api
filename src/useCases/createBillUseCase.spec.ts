import { InMemoryBillRepository } from '@/repositories/inMemory/inMemoryBillRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { CreateBillUseCase } from './createBillUseCase'

let inMemoryBillRepository: InMemoryBillRepository
let sut: CreateBillUseCase

describe('create a bill test', () => {
  beforeEach(() => {
    inMemoryBillRepository = new InMemoryBillRepository()
    sut = new CreateBillUseCase(inMemoryBillRepository)
  })

  it('should be able to create a bill', async () => {
    const bill = await sut.execute({
      amount: '38.25',
      category: 'cleaning products',
      name: 'Itens de higiene',
    })

    expect(bill.name).toBe('Itens de higiene')
    expect(Number(bill.amount) / 100).toBeCloseTo(38.25, 2)
  })
})
