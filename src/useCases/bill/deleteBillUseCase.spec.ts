import { InMemoryBillRepository } from '@/repositories/inMemory/inMemoryBillRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { DeleteBillUseCase } from './deleteBillUseCase'
import { createBillTestHelper } from '@/tests/createBillTestHelper'

let inMemoryBillRepository: InMemoryBillRepository
let sut: DeleteBillUseCase

describe('delete a bill test', () => {
  beforeEach(() => {
    inMemoryBillRepository = new InMemoryBillRepository()
    sut = new DeleteBillUseCase(inMemoryBillRepository)
  })

  it('should be able to delete a bill', async () => {
    const bill = await createBillTestHelper(inMemoryBillRepository)

    const message = await sut.execute(bill.id)

    expect(message).toEqual(
      expect.stringContaining('Bill deleted successfully!'),
    )
  })
})
