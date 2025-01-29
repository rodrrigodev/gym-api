import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryUserProgressRepository } from '@/repositories/inMemory/inMemoryUserProgressRepository'
import { UserProgressError } from '@/errors/userProgressError'
import { UpdateUserProgressUseCase } from './updateUserProgressUseCase'
import { createUsersTestHelper } from '@/tests/createUsersTestHelper'
import { createUserProgressTestHelper } from '@/tests/createUserProgressTestHelper'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryUserProgressRepository: InMemoryUserProgressRepository
let sut: UpdateUserProgressUseCase

describe('update user progress test', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryUserProgressRepository = new InMemoryUserProgressRepository()
    sut = new UpdateUserProgressUseCase(inMemoryUserProgressRepository)
  })

  it('should be able to update a user', async () => {
    const user = await createUsersTestHelper(inMemoryUserRepository)

    const progress = await createUserProgressTestHelper({
      userProgressRepository: inMemoryUserProgressRepository,
      userId: user.id,
    })

    const userProgressUpdated = await sut.execute(progress.user_id, {
      initialWeight: 82,
      nextWorkout: 'legs',
      currentGoal: 'slim down',
      currentStreak: 0,
      maxStreakReached: 15,
    })

    expect(userProgressUpdated?.initial_weight).toBe(82)
    expect(userProgressUpdated?.next_workout).toBe('legs')
  })

  it('should not be able to update user progress', async () => {
    const user = await createUsersTestHelper(inMemoryUserRepository)

    await createUserProgressTestHelper({
      userProgressRepository: inMemoryUserProgressRepository,
      userId: user.id,
    })

    await expect(
      sut.execute('progressId', {
        initialWeight: 82,
        nextWorkout: 'chest',
        currentGoal: 'slim down',
        currentStreak: 1,
        maxStreakReached: 5,
      }),
    ).rejects.toBeInstanceOf(UserProgressError)
  })
})
