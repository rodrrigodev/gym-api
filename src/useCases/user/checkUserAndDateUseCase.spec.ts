import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { createUsersTestHelper } from '@/tests/createUsersTestHelper'
import { CheckUserAndDateUseCase } from './checkUserAndDateUseCase'

let inMemoryUserRepository: InMemoryUserRepository
let sut: CheckUserAndDateUseCase

describe('check user role and last login test', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: new Date('2023-07-10T15:00:00') })
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new CheckUserAndDateUseCase(inMemoryUserRepository)
  })

  it('should be able to return userId and role', async () => {
    await createUsersTestHelper(inMemoryUserRepository)

    const user = await inMemoryUserRepository.createUser({
      email: 'alex@email.com',
      name: 'Alex',
      password: '12345678',
      created_at: new Date('2023-06-10T15:00:00'),
      current_weight: 75,
      last_login: new Date('2023-07-10T14:00:00'),
    })

    const { userId, role } = await sut.execute(user.id)

    expect(userId).toBe(user.id)
    expect(role).toBe('USER')
  })

  it('should not be able to return userId and role with 4 hours of difference from last login', async () => {
    await createUsersTestHelper(inMemoryUserRepository)

    const user = await inMemoryUserRepository.createUser({
      email: 'alex@email.com',
      name: 'Alex',
      password: '12345678',
      created_at: new Date('2023-06-10T15:00:00'),
      current_weight: 75,
      last_login: new Date('2023-07-10T19:00:01'),
    })

    await expect(sut.execute(user.id)).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to return userId and role passing wrong userId', async () => {
    await createUsersTestHelper(inMemoryUserRepository)

    await expect(sut.execute('wrongUserId')).rejects.toBeInstanceOf(Error)
  })
})
