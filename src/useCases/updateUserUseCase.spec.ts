import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { CreateUserUseCase } from './createUserUseCase'
import { UserNotFoundError } from '@/errors/userNotFoundError'
import { UpdateUserUseCase } from './updateUserUseCase'

let inMemoryUserRepository: InMemoryUserRepository
let createUserUseCase: CreateUserUseCase
let sut: UpdateUserUseCase

describe('update user test', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)
    sut = new UpdateUserUseCase(inMemoryUserRepository)
  })

  it('should be able to update a user', async () => {
    const user = await createUserUseCase.execute({
      email: 'rodrigo@email.com',
      name: 'Rodrigo',
      password: '12345678',
    })

    const userUpdated = await sut.execute(user.id, {
      email: 'alex@email.com',
      name: 'Alex',
    })

    expect(userUpdated?.email).toBe('alex@email.com')
    expect(userUpdated?.name).toBe('Alex')
  })

  it('should not be able to update a user', async () => {
    await createUserUseCase.execute({
      email: 'rodrigo@email.com',
      name: 'Rodrigo',
      password: '12345678',
    })

    await expect(
      sut.execute('nonExistentUserId', {
        email: 'alex@email.com',
        name: 'Alex',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
