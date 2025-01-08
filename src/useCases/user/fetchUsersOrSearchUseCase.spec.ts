import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { FetchUsersOrSearchUseCase } from './fetchUsersOrSearchUseCase'
import { UsersNotFoundError } from '@/errors/usersNotFoundError'
import { createUsersTestHelper } from '@/tests/createUsersTestHelper'

let inMemoryUserRepository: InMemoryUserRepository
let sut: FetchUsersOrSearchUseCase

describe('fetch users test', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new FetchUsersOrSearchUseCase(inMemoryUserRepository)
  })

  it('should be able to fetch a user', async () => {
    await createUsersTestHelper(inMemoryUserRepository)

    await Promise.all(
      Array.from({ length: 25 }, (_, i) =>
        inMemoryUserRepository.createUser({
          email: `alex-${i}@email.com`,
          name: `Alex-${i}`,
          password: '12345678',
          created_at: new Date(),
        }),
      ),
    )

    const usersResult = await sut.execute(1, undefined)

    expect(usersResult.users).toHaveLength(20)
    expect(usersResult.users[0]).toHaveProperty('name')
  })

  it('should be able to fetch a user', async () => {
    await createUsersTestHelper(inMemoryUserRepository)

    await Promise.all(
      Array.from({ length: 25 }, (_, i) =>
        inMemoryUserRepository.createUser({
          email: `alex-${i}@email.com`,
          name: `Alex-${i}`,
          password: '12345678',
          created_at: new Date(),
        }),
      ),
    )

    const usersResult = await sut.execute(1, 'Rodrigo')

    expect(usersResult).toHaveLength(1)
    expect(usersResult.users[0].name).toBe('Rodrigo')
    expect(usersResult.users[0]).toEqual(
      expect.objectContaining({ email: 'rodrigo@email.com' }),
    )
  })

  it('should not be able to fetch a user passing non-existent user', async () => {
    await createUsersTestHelper(inMemoryUserRepository)

    await Promise.all(
      Array.from({ length: 25 }, (_, i) =>
        inMemoryUserRepository.createUser({
          email: `alex-${i}@email.com`,
          name: `Alex-${i}`,
          password: '12345678',
          created_at: new Date(),
        }),
      ),
    )

    await expect(sut.execute(1, 'Michael')).rejects.toBeInstanceOf(
      UsersNotFoundError,
    )
  })
})
