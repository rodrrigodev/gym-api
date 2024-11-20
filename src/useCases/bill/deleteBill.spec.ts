import { InMemoryBillRepository } from '@/repositories/inMemory/inMemoryBillRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { DeleteBillUseCase } from './deleteBill'
import { createBillTestHelper } from '@/utils/tests/createBillTestHelper'

let inMemoryBillRepository: InMemoryBillRepository
let sut: DeleteBillUseCase

describe('create a bill test', () => {
  beforeEach(() => {
    inMemoryBillRepository = new InMemoryBillRepository()
    sut = new DeleteBillUseCase(inMemoryBillRepository)
  })

  it('should be able to create a bill', async () => {
    const bill = await createBillTestHelper(inMemoryBillRepository)

    const message = await sut.execute(bill.id)

    expect(message).toBe('Success!')
  })
})
