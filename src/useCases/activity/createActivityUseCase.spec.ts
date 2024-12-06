import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryActivityRepository } from '@/repositories/inMemory/inMemoryActivityRepository'
import { CreateActivityUseCase } from './createActivityUseCase'
import { InMemoryUserProgressRepository } from '@/repositories/inMemory/inMemoryUserProgressRepository'
import { randomUUID } from 'node:crypto'
import { UserProgressNotFoundError } from '@/errors/userProgressNotFoundError'
import { ActivityPendingError } from '@/errors/activityPendingError'

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
    const userProgress =
      await inMemoryUserProgressRepository.createUserProgress({
        user_id: randomUUID(),
        next_workout: 'legs',
      })

    const activity = await sut.execute({
      userProgressId: userProgress.id,
      workout: userProgress.next_workout,
    })

    expect(activity.workout).toBe('legs')
  })

  it('should not be able to create a activity passing wrong userProgressId', async () => {
    await expect(
      sut.execute({
        userProgressId: 'wrongId',
        workout: 'legs',
      }),
    ).rejects.toBeInstanceOf(UserProgressNotFoundError)
  })

  it('should not be able to create a activity with an activity pending', async () => {
    const userProgress =
      await inMemoryUserProgressRepository.createUserProgress({
        user_id: randomUUID(),
        next_workout: 'legs',
      })

    await sut.execute({
      userProgressId: userProgress.id,
      workout: userProgress.next_workout,
    })

    await expect(
      sut.execute({
        userProgressId: userProgress.id,
        workout: 'back',
      }),
    ).rejects.toBeInstanceOf(ActivityPendingError)
  })
})
