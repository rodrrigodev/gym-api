import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { createUsersTestHelper } from '@/tests/createUsersTestHelper'
import { FetchUserDetailsUseCase } from './fetchUserDetailsUseCase'
import { InMemoryUserProgressRepository } from '@/repositories/inMemory/inMemoryUserProgressRepository'
import { createUserProgressTestHelper } from '@/tests/createUserProgressTestHelper'
import { UserNotFoundError } from '@/errors/userNotFoundError'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryUserProgressRepository: InMemoryUserProgressRepository
let sut: FetchUserDetailsUseCase

describe('fetch user details test', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryUserProgressRepository = new InMemoryUserProgressRepository()
    sut = new FetchUserDetailsUseCase(
      inMemoryUserRepository,
      inMemoryUserProgressRepository,
    )
  })

  it('should be able to fetch user details', async () => {
    const newUser = await createUsersTestHelper(inMemoryUserRepository)

    await createUserProgressTestHelper({
      userId: newUser.id,
      userProgressRepository: inMemoryUserProgressRepository,
      max_streak: 2,
    })

    const { user, userProgress } = await sut.execute(newUser.id)

    expect(user.name).toBe('Rodrigo')
    expect(user.current_weight).toBe(75)
    expect(userProgress?.current_goal).toBe('slim down')
  })

  it('should not be able to fetch user details passing wrong id', async () => {
    await createUsersTestHelper(inMemoryUserRepository)

    await expect(sut.execute('wrongId')).rejects.toBeInstanceOf(
      UserNotFoundError,
    )
  })

  it('should not be able to fetch user details passing wrong id', async () => {
    await createUsersTestHelper(inMemoryUserRepository)

    await expect(sut.execute('wrongUserId')).rejects.toBeInstanceOf(
      UserNotFoundError,
    )
  })
})
