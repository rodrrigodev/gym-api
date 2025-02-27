import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { DeleteUserUseCase } from './deleteUserUseCase'
import { UserNotFoundError } from '@/errors/userNotFoundError'
import { createUsersTestHelper } from '@/tests/createUsersTestHelper'

let inMemoryUserRepository: InMemoryUserRepository
let sut: DeleteUserUseCase

describe('delete user test', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new DeleteUserUseCase(inMemoryUserRepository)
  })

  it('should be able to delete a user', async () => {
    const user = await createUsersTestHelper(inMemoryUserRepository)

    const message = await sut.execute(user.id)

    expect(message).toBe('Successfully deleted! 👍😁')
  })

  it('should not be able to delete a user passing wrong id', async () => {
    await createUsersTestHelper(inMemoryUserRepository)

    await expect(sut.execute('nonExistentUserId')).rejects.toBeInstanceOf(
      UserNotFoundError,
    )
  })
})
