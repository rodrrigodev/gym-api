import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { beforeAll, describe, expect, test } from '@jest/globals'
import { CreateUserUseCase } from './createUserUseCase'

let inMemoryUserRepository: InMemoryUserRepository
let sut: CreateUserUseCase

describe('create user test', () => {
  beforeAll(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(inMemoryUserRepository)
  })

  test('it should be able to create a user', async () => {
    const user = await sut.execute({
      email: 'rodrigo@email.com',
      name: 'Rodrigo',
      password: '12345678',
    })

    expect(user.name).toBe('Rodrigo')
  })
})
