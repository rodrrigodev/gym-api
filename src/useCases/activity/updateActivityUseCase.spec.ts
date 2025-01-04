import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { InMemoryActivityRepository } from '@/repositories/inMemory/inMemoryActivityRepository'
import { InMemoryUserProgressRepository } from '@/repositories/inMemory/inMemoryUserProgressRepository'
import { randomUUID } from 'node:crypto'
import { UserProgressNotFoundError } from '@/errors/userProgressNotFoundError'
import { UpdateActivityUseCase } from './updateActivityUseCase'
import { ActivityNotFoundError } from '@/errors/activityNotFoundError'
import { createUserProgressTestHelper } from '@/tests/createUserProgressTestHelper'

let inMemoryActivityRepository: InMemoryActivityRepository
let inMemoryUserProgressRepository: InMemoryUserProgressRepository
let sut: UpdateActivityUseCase

describe('update activity test', () => {
  beforeEach(() => {
    inMemoryActivityRepository = new InMemoryActivityRepository()
    inMemoryUserProgressRepository = new InMemoryUserProgressRepository()
    sut = new UpdateActivityUseCase(
      inMemoryActivityRepository,
      inMemoryUserProgressRepository,
    )
    jest.useFakeTimers({ now: new Date('2023-10-11T16:40:00') })
  })

  it('should be able to update an activity', async () => {
    const userProgress = await createUserProgressTestHelper({
      userProgressRepository: inMemoryUserProgressRepository,
      userId: randomUUID(),
      streak: 11,
      max_streak: 11,
    })

    const activity = await inMemoryActivityRepository.createActivity({
      user_progress_id: userProgress.id,
      workout: userProgress.next_workout || 'legs',
      created_at: new Date(),
    })

    const { activityUpdated, userProgressUpdated } = await sut.execute({
      activityId: activity.id,
      finishedAt: new Date('2023-10-11T17:40:00'),
    })

    expect(activityUpdated?.finished_at).toStrictEqual(
      new Date('2023-10-11T17:40:00'),
    )
    expect(userProgressUpdated?.current_streak).toBe(12)
    expect(userProgressUpdated?.max_streak_reached).toBe(12)
  })

  it('should not be able to update an activity passing wrong activity id', async () => {
    const userProgress = await createUserProgressTestHelper({
      userProgressRepository: inMemoryUserProgressRepository,
      userId: randomUUID(),
    })

    await inMemoryActivityRepository.createActivity({
      user_progress_id: userProgress.id,
      workout: userProgress.next_workout || 'legs',
      created_at: new Date(),
    })

    await expect(
      sut.execute({
        activityId: 'wrongId',
        finishedAt: new Date('2023-10-11T17:40:00'),
      }),
    ).rejects.toBeInstanceOf(ActivityNotFoundError)
  })

  it('should not be able to update an activity with no activity pending', async () => {
    const userProgress = await createUserProgressTestHelper({
      userProgressRepository: inMemoryUserProgressRepository,
      userId: randomUUID(),
    })

    const activity = await inMemoryActivityRepository.createActivity({
      user_progress_id: userProgress.id,
      workout: userProgress.next_workout || 'legs',
      created_at: new Date(),
      finished_at: new Date('2023-10-11T17:40:00'),
    })

    await expect(
      sut.execute({
        activityId: activity.id,
        finishedAt: new Date('2023-10-11T17:40:00'),
      }),
    ).rejects.toBeInstanceOf(UserProgressNotFoundError)
  })
})
