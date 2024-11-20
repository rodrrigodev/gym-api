import { InMemoryBillRepository } from '@/repositories/inMemory/inMemoryBillRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { UpdateBillUseCase } from './updateBillUseCase'
import { createBillTestHelper } from '@/utils/tests/createBillTestHelper'
import { BillNotFoundError } from '@/errors/billNotFoundError'

let inMemoryBillRepository: InMemoryBillRepository
let sut: UpdateBillUseCase

describe('update a bill test', () => {
  beforeEach(() => {
    inMemoryBillRepository = new InMemoryBillRepository()
    sut = new UpdateBillUseCase(inMemoryBillRepository)
  })

  it('should be able to update a bill', async () => {
    const bill = await createBillTestHelper(inMemoryBillRepository)

    const billUpdated = await sut.execute(bill.id, {
      amount: '48.85',
      name: 'Desinfetante',
    })

    expect(billUpdated?.name).toBe('Desinfetante')
    expect(Number(billUpdated?.amount) / 100).toBeCloseTo(48.85, 2)
  })

  it('should not be able to update a bill with wrong id', async () => {
    await createBillTestHelper(inMemoryBillRepository)

    await expect(
      sut.execute('noId', {
        amount: '48.85',
        name: 'Desinfetante',
      }),
    ).rejects.toBeInstanceOf(BillNotFoundError)
  })
})
