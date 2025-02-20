import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { AuthenticateUseCase } from './authenticateUserUseCase'
import { createUsersTestHelper } from '@/tests/createUsersTestHelper'
import { InvalidCredencialError } from '@/errors/invalidCredencialError'

let inMemoryUserRepository: InMemoryUserRepository
let sut: AuthenticateUseCase

describe('authenticate user test', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(inMemoryUserRepository)
  })

  it('should be able to authenticate user', async () => {
    await createUsersTestHelper(inMemoryUserRepository)

    const user = await sut.execute({
      email: 'rodrigo@email.com',
      password: '12345678',
    })

    expect(user).toHaveProperty('id')
    expect(user.name).toBe('Rodrigo')
    expect(user.email).toBe('rodrigo@email.com')
  })

  it('should not be able authenticate user passing wrong email', async () => {
    await createUsersTestHelper(inMemoryUserRepository)

    await expect(
      sut.execute({
        email: 'rodrigues@email.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredencialError)
  })

  it('should not be able authenticate user passing wrong password', async () => {
    await createUsersTestHelper(inMemoryUserRepository)

    await expect(
      sut.execute({
        email: 'rodrigues@email.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(InvalidCredencialError)
  })
})
