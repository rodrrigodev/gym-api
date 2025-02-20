import { InMemoryBillRepository } from '@/repositories/inMemory/inMemoryBillRepository'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { FetchBillsUseCase } from './fetchBillsUseCase'
import { createBillTestHelper } from '@/tests/createBillTestHelper'
import { BillsNotFoundError } from '@/errors/billsNotFoundError'

let inMemoryBillRepository: InMemoryBillRepository
let sut: FetchBillsUseCase

describe('fetch bills test', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: new Date(2023, 10, 11) })
    inMemoryBillRepository = new InMemoryBillRepository()
    sut = new FetchBillsUseCase(inMemoryBillRepository)
  })

  it('should be able to fetch bills', async () => {
    await createBillTestHelper(inMemoryBillRepository)

    const { bills, length } = await sut.execute({
      period: 30,
      page: 1,
      category: 'cleaning',
      name: 'products',
    })

    expect(length).toBe(2)
    expect(bills[0].category).toBe('cleaning')
  })

  it('should not be able to fetch bills passing wrong category', async () => {
    await createBillTestHelper(inMemoryBillRepository)

    await expect(
      sut.execute({
        period: 120,
        page: 1,
        category: 'wrongCategory',
        name: 'products',
      }),
    ).rejects.toBeInstanceOf(BillsNotFoundError)
  })

  it('should not be able to fetch bills passing wrong name', async () => {
    await createBillTestHelper(inMemoryBillRepository)

    await expect(
      sut.execute({
        period: 30,
        page: 1,
        category: 'cleaning',
        name: 'wrongProduct',
      }),
    ).rejects.toBeInstanceOf(BillsNotFoundError)
  })
})
