import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { UserNotFoundError } from '@/errors/userNotFoundError'
import { UpdateUserUseCase } from './updateUserUseCase'
import { createUserTestHelper } from '@/tests/createUserTestHelper'

let inMemoryUserRepository: InMemoryUserRepository
let sut: UpdateUserUseCase

describe('update user test', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new UpdateUserUseCase(inMemoryUserRepository)
  })

  it('should be able to update a user', async () => {
    const user = await createUserTestHelper(inMemoryUserRepository)

    const userUpdated = await sut.execute(user.id, {
      email: 'alex@email.com',
      name: 'Alex',
    })

    expect(userUpdated?.email).toBe('alex@email.com')
    expect(userUpdated?.name).toBe('Alex')
  })

  it('should not be able to update a user', async () => {
    await createUserTestHelper(inMemoryUserRepository)

    await expect(
      sut.execute('nonExistentUserId', {
        email: 'alex@email.com',
        name: 'Alex',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
