import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { CreateUserUseCase } from './createUserUseCase'
import { FetchUsersOrSearchUseCase } from './fetchUsersOrSearchUseCase'
import { UsersNotFoundError } from '@/errors/usersNotFoundError'

let inMemoryUserRepository: InMemoryUserRepository
let createUserUseCase: CreateUserUseCase
let sut: FetchUsersOrSearchUseCase

describe('fetch users test', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)
    sut = new FetchUsersOrSearchUseCase(inMemoryUserRepository)
  })

  it('should be able to fetch a user', async () => {
    await createUserUseCase.execute({
      email: 'rodrigo@email.com',
      name: 'Rodrigo',
      password: '12345678',
    })

    await Promise.all(
      Array.from({ length: 25 }, (_, i) =>
        createUserUseCase.execute({
          email: `alex-${i}@email.com`,
          name: `Alex-${i}`,
          password: '12345678',
        }),
      ),
    )

    const usersResult = await sut.execute(1, undefined)

    expect(usersResult).toHaveLength(20)
    expect(usersResult[0]).toHaveProperty('name')
  })

  it('should be able to fetch a user', async () => {
    await createUserUseCase.execute({
      email: 'rodrigo@email.com',
      name: 'Rodrigo',
      password: '12345678',
    })

    await Promise.all(
      Array.from({ length: 25 }, (_, i) =>
        createUserUseCase.execute({
          email: `alex-${i}@email.com`,
          name: `Alex-${i}`,
          password: '12345678',
        }),
      ),
    )

    const usersResult = await sut.execute(1, 'Rodrigo')

    expect(usersResult).toHaveLength(1)
    expect(usersResult[0].name).toBe('Rodrigo')
    expect(usersResult[0]).toEqual(
      expect.objectContaining({ email: 'rodrigo@email.com' }),
    )
  })

  it('should not be able to fetch a user', async () => {
    await createUserUseCase.execute({
      email: 'rodrigo@email.com',
      name: 'Rodrigo',
      password: '12345678',
    })

    await Promise.all(
      Array.from({ length: 25 }, (_, i) =>
        createUserUseCase.execute({
          email: `alex-${i}@email.com`,
          name: `Alex-${i}`,
          password: '12345678',
        }),
      ),
    )

    await expect(sut.execute(1, 'Michael')).rejects.toBeInstanceOf(
      UsersNotFoundError,
    )
  })
})
