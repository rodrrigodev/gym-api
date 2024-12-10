import { InMemoryBillRepository } from '@/repositories/inMemory/inMemoryBillRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { DeleteBillUseCase } from './deleteBillUseCase'
import { createBillTestHelper } from '@/utils/tests/createBillTestHelper'

let inMemoryBillRepository: InMemoryBillRepository
let sut: DeleteBillUseCase

describe('delete a bill test', () => {
  beforeEach(() => {
    inMemoryBillRepository = new InMemoryBillRepository()
    sut = new DeleteBillUseCase(inMemoryBillRepository)
  })

  it('should be able to delete a bill', async () => {
    const bill = await createBillTestHelper(inMemoryBillRepository)

    const { bills, length } = await sut.execute(bill.id)

    expect(bills).toHaveLength(20)
    expect(length).toBe(2)
  })
})
