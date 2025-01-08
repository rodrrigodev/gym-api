import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { UserNotFoundError } from '@/errors/userNotFoundError'
import { createUsersTestHelper } from '@/tests/createUsersTestHelper'
import { GetLuckyNumberUseCase } from './getLuckyNumberUseCase'
import { LuckyNumberAlreadyExistsError } from '@/errors/luckyNumberAlreadyExistsError'

let inMemoryUserRepository: InMemoryUserRepository
let sut: GetLuckyNumberUseCase

describe('get lucky number test', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new GetLuckyNumberUseCase(inMemoryUserRepository)
  })

  it('should be able to get a lucky number', async () => {
    const user = await createUsersTestHelper(inMemoryUserRepository)

    await sut.execute({ id: user.id, type: 'plan' })

    const luckyNumbers = await sut.execute({
      id: user.id,
      type: 'str',
    })

    if (!luckyNumbers) {
      throw new Error('LuckyNumbers empty!')
    }

    expect(luckyNumbers).toHaveLength(2)
    expect(luckyNumbers[0]).toContain('plan')
  })

  it('should not be able to get a lucky number', async () => {
    const user = await createUsersTestHelper(inMemoryUserRepository)

    await sut.execute({ id: user.id, type: 'plan' })

    await expect(
      sut.execute({ id: user.id, type: 'plan' }),
    ).rejects.toBeInstanceOf(LuckyNumberAlreadyExistsError)
  })

  it('should not be able to get a lucky number', async () => {
    const user = await createUsersTestHelper(inMemoryUserRepository)

    await sut.execute({ id: user.id, type: 'plan' })

    await expect(
      sut.execute({ id: 'wrongId', type: 'str' }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
