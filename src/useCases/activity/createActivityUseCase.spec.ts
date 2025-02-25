import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryActivityRepository } from '@/repositories/inMemory/inMemoryActivityRepository'
import { CreateActivityUseCase } from './createActivityUseCase'
import { InMemoryUserProgressRepository } from '@/repositories/inMemory/inMemoryUserProgressRepository'
import { randomUUID } from 'node:crypto'
import { UserProgressNotFoundError } from '@/errors/userProgressNotFoundError'
import { ActivityPendingError } from '@/errors/activityPendingError'
import { createUserProgressTestHelper } from '@/tests/createUserProgressTestHelper'

let inMemoryActivityRepository: InMemoryActivityRepository
let inMemoryUserProgressRepository: InMemoryUserProgressRepository
let sut: CreateActivityUseCase

describe('create activity test', () => {
  beforeEach(() => {
    inMemoryActivityRepository = new InMemoryActivityRepository()
    inMemoryUserProgressRepository = new InMemoryUserProgressRepository()

    sut = new CreateActivityUseCase(
      inMemoryActivityRepository,
      inMemoryUserProgressRepository,
    )
  })

  it('should be able to create a activity', async () => {
    const userProgress = await createUserProgressTestHelper({
      userId: randomUUID(),
      userProgressRepository: inMemoryUserProgressRepository,
    })

    const activity = await sut.execute({
      userProgressId: userProgress.id,
      trainingId: randomUUID(),
    })

    expect(activity.training_id).toEqual(expect.any(String))
  })

  it('should not be able to create a activity passing wrong userProgressId', async () => {
    await expect(
      sut.execute({
        userProgressId: 'wrongId',
        trainingId: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(UserProgressNotFoundError)
  })

  it('should not be able to create a activity with an activity pending', async () => {
    const userProgress = await createUserProgressTestHelper({
      userId: randomUUID(),
      userProgressRepository: inMemoryUserProgressRepository,
    })

    await sut.execute({
      userProgressId: userProgress.id,
      trainingId: randomUUID(),
    })

    await expect(
      sut.execute({
        userProgressId: userProgress.id,
        trainingId: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(ActivityPendingError)
  })
})
