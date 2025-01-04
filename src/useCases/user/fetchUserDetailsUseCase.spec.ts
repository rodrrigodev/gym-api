import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { createUserTestHelper } from '@/tests/createUserTestHelper'
import { FetchUserDetailsUseCase } from './fetchUserDetailsUseCase'
import { InMemoryUserProgressRepository } from '@/repositories/inMemory/inMemoryUserProgressRepository'
import { createUserProgressTestHelper } from '@/tests/createUserProgressTestHelper'
import { UserNotFoundError } from '@/errors/userNotFoundError'
import { UserProgressNotFoundError } from '@/errors/userProgressNotFoundError'

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
    const newUser = await createUserTestHelper(inMemoryUserRepository)

    await createUserProgressTestHelper({
      userId: newUser.id,
      userProgressRepository: inMemoryUserProgressRepository,
      max_streak: 2,
    })

    const { user, userProgress } = await sut.execute(newUser.id)

    expect(user.name).toBe('Rodrigo')
    expect(user.current_weight).toBe(75)
    expect(userProgress.current_goal).toBe('slim down')
  })

  it('should not be able to fetch user details passing wrong id', async () => {
    await createUserTestHelper(inMemoryUserRepository)

    await expect(sut.execute('wrongId')).rejects.toBeInstanceOf(
      UserNotFoundError,
    )
  })

  it('should not be able to fetch user details passing wrong id', async () => {
    const user = await createUserTestHelper(inMemoryUserRepository)

    await expect(sut.execute(user.id)).rejects.toBeInstanceOf(
      UserProgressNotFoundError,
    )
  })
})
