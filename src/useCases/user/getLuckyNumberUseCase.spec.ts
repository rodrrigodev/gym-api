import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { UserNotFoundError } from '@/errors/userNotFoundError'
import { createUserTestHelper } from '@/utils/tests/createUserTestHelper'
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
    const user = await createUserTestHelper(inMemoryUserRepository)

    await sut.execute({ id: user.id, type: 'const' })

    const luckyNumbers = await sut.execute({
      id: user.id,
      type: 'str',
    })

    if (!luckyNumbers) {
      throw new Error('LuckyNumbers empty!')
    }

    expect(luckyNumbers).toHaveLength(2)
    expect(luckyNumbers[0]).toContain('const')
  })

  it('should not be able to get a lucky number', async () => {
    await createUserTestHelper(inMemoryUserRepository)

    const user = await createUserTestHelper(inMemoryUserRepository)

    await sut.execute({ id: user.id, type: 'const' })

    await expect(
      sut.execute({ id: user.id, type: 'const' }),
    ).rejects.toBeInstanceOf(LuckyNumberAlreadyExistsError)
  })

  it('should not be able to get a lucky number', async () => {
    await createUserTestHelper(inMemoryUserRepository)

    const user = await createUserTestHelper(inMemoryUserRepository)

    await sut.execute({ id: user.id, type: 'const' })

    await expect(
      sut.execute({ id: 'wrongId', type: 'str' }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
