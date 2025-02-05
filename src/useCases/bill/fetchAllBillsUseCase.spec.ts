import { InMemoryBillRepository } from '@/repositories/inMemory/inMemoryBillRepository'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { createBillTestHelper } from '@/tests/createBillTestHelper'
import { BillsNotFoundError } from '@/errors/billsNotFoundError'
import { FetchAllBillsUseCase } from './fetchAllBillsUseCase'

let inMemoryBillRepository: InMemoryBillRepository
let sut: FetchAllBillsUseCase

describe('fetch all bills test', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: new Date(2023, 10, 11) })
    inMemoryBillRepository = new InMemoryBillRepository()
    sut = new FetchAllBillsUseCase(inMemoryBillRepository)
  })

  it('should be able to fetch all bills', async () => {
    await createBillTestHelper(inMemoryBillRepository)

    const bills = await sut.execute()

    expect(bills.length).toBe(30)
    expect(bills[0].category).toBe('cleaning')
  })

  it('should not be able to fetch bills with empty database', async () => {
    await expect(sut.execute()).rejects.toBeInstanceOf(BillsNotFoundError)
  })
})
