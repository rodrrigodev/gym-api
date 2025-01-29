import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { CreateUserUseCase } from './createUserUseCase'
import { UserAlreadyExistsError } from '@/errors/userAlreadyExistsError'
import { compare } from 'bcryptjs'

let inMemoryUserRepository: InMemoryUserRepository
let sut: CreateUserUseCase

describe('create user test', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(inMemoryUserRepository)
  })

  it('should be able to create a user', async () => {
    const user = await sut.execute({
      email: 'rodrigo@email.com',
      name: 'Rodrigo',
      password: '12345678',
      role: 'USER',
    })

    expect(user.name).toBe('Rodrigo')
  })

  it('should be able to encrypt the user password', async () => {
    const user = await sut.execute({
      email: 'rodrigo@email.com',
      name: 'Rodrigo',
      password: '12345678',
      role: 'USER',
    })

    const comparePassword = await compare('12345678', user.password)
    expect(comparePassword).toBeTruthy()
  })

  it('should not be able to create a user', async () => {
    await sut.execute({
      email: 'rodrigo@email.com',
      name: 'Rodrigo',
      password: '12345678',
      role: 'USER',
    })

    await expect(
      sut.execute({
        email: 'rodrigo@email.com',
        name: 'Rodrigo',
        password: '12345678',
        role: 'USER',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
