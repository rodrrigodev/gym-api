import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { CreateUserProgressUseCase } from './createUserProgressUseCase'
import { InMemoryUserProgressRepository } from '@/repositories/inMemory/inMemoryUserProgressRepository'
import { UserProgressError } from '@/errors/userProgressError'
import { createUsersTestHelper } from '@/tests/createUsersTestHelper'
import { UserNotFoundError } from '@/errors/userNotFoundError'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryUserProgressRepository: InMemoryUserProgressRepository
let sut: CreateUserProgressUseCase

describe('create user progress test', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryUserProgressRepository = new InMemoryUserProgressRepository()

    sut = new CreateUserProgressUseCase(
      inMemoryUserProgressRepository,
      inMemoryUserRepository,
    )
  })

  it('should be able to create a user progress', async () => {
    const user = await createUsersTestHelper(inMemoryUserRepository)

    const progress = await sut.execute({
      currentGoal: 'slim down',
      initialWeight: 88,
      nextWorkout: 'chest',
      userId: user.id,
    })

    expect(progress?.current_goal).toBe('slim down')
    expect(progress?.user_id).toEqual(user.id)
  })

  it('should be able to create a user progress without pass a nextWorkout', async () => {
    const user = await createUsersTestHelper(inMemoryUserRepository)

    const progress = await sut.execute({
      currentGoal: 'bulk up',
      initialWeight: 88,
      nextWorkout: null,
      userId: user.id,
    })

    expect(progress?.current_goal).toEqual(expect.stringContaining('bulk up'))
    expect(progress).toHaveProperty('last_workout', null)
  })

  it('should not be able to create a user progress twice', async () => {
    const user = await createUsersTestHelper(inMemoryUserRepository)

    await sut.execute({
      currentGoal: 'bulk up',
      initialWeight: 88,
      nextWorkout: null,
      userId: user.id,
    })

    await expect(
      sut.execute({
        currentGoal: 'bulk up',
        initialWeight: 88,
        nextWorkout: null,
        userId: user.id,
      }),
    ).rejects.toBeInstanceOf(UserProgressError)
  })

  it('should not be able to create a user progress with wrong id', async () => {
    await createUsersTestHelper(inMemoryUserRepository)

    await expect(
      sut.execute({
        currentGoal: 'bulk up',
        initialWeight: 88,
        nextWorkout: null,
        userId: 'invalidId',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
