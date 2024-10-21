import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { beforeEach, describe, expect, test } from '@jest/globals'
import { DeleteUserUseCase } from './deleteUserUseCase'
import { CreateUserUseCase } from './createUserUseCase'

let inMemoryUserRepository: InMemoryUserRepository
let createUserUseCase: CreateUserUseCase
let sut: DeleteUserUseCase

describe('delete user test', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)
    sut = new DeleteUserUseCase(inMemoryUserRepository)
  })

  test('it should be able to delete a user', async () => {
    const user = await createUserUseCase.execute({
      email: 'rodrigo@email.com',
      name: 'Rodrigo',
      password: '12345678',
    })

    await createUserUseCase.execute({
      email: 'rafael@email.com',
      name: 'Rafael',
      password: '12345678',
    })

    const message = await sut.execute(user.id)

    expect(message).toBe('Success!')
  })

  test('it should not be able to delete a user', async () => {
    await createUserUseCase.execute({
      email: 'rodrigo@email.com',
      name: 'Rodrigo',
      password: '12345678',
    })

    await expect(sut.execute('nonExistentUserId')).rejects.toThrow(
      '⚠️ User not found!',
    )
  })
})
