import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { InMemoryUserProgressRepository } from '@/repositories/inMemory/inMemoryUserProgressRepository'
import { createUsersTestHelper } from '@/tests/createUsersTestHelper'
import { createUserProgressTestHelper } from '@/tests/createUserProgressTestHelper'
import { InMemoryActivityRepository } from '@/repositories/inMemory/inMemoryActivityRepository'
import { ResumeError } from '@/errors/resumeError'
import { FetchUserProgressResumeUseCase } from './fetchUserProgressResumeUseCase'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryUserProgressRepository: InMemoryUserProgressRepository
let inMemoryActivityRepository: InMemoryActivityRepository
let sut: FetchUserProgressResumeUseCase

describe('update user progress test', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: new Date('2023-09-11T16:40:00') })

    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryUserProgressRepository = new InMemoryUserProgressRepository()
    inMemoryActivityRepository = new InMemoryActivityRepository()

    sut = new FetchUserProgressResumeUseCase(
      inMemoryUserRepository,
      inMemoryUserProgressRepository,
      inMemoryActivityRepository,
    )
  })

  it.skip('should be able to get user resume', async () => {
    const { id } = await createUsersTestHelper(inMemoryUserRepository)

    const progress = await createUserProgressTestHelper({
      userProgressRepository: inMemoryUserProgressRepository,
      userId: id,
      streak: 3,
      max_streak: 7,
    })

    await inMemoryActivityRepository.createActivity({
      created_at: new Date('2023-09-11T16:40:00'),
      user_progress_id: progress.id,
      finished_at: new Date('2023-09-11T17:40:00'),
    })

    await inMemoryActivityRepository.createActivity({
      created_at: new Date('2023-10-11T18:40:00'),
      user_progress_id: progress.id,
      finished_at: new Date('2023-10-11T19:21:00'),
    })

    const userResume = await sut.execute(id)

    expect(userResume.currentGoal).toEqual(expect.stringContaining('slim down'))
    expect(userResume.activitiesResume.totalActivities).toBe(2)
  })

  it.skip('should not be able to get user resume with streak less than 3', async () => {
    const { id } = await createUsersTestHelper(inMemoryUserRepository)

    const progress = await createUserProgressTestHelper({
      userProgressRepository: inMemoryUserProgressRepository,
      userId: id,
      streak: 2,
      max_streak: 7,
    })

    await inMemoryActivityRepository.createActivity({
      created_at: new Date('2023-09-11T16:40:00'),
      user_progress_id: progress.id,
      finished_at: new Date('2023-09-11T17:40:00'),
    })

    await inMemoryActivityRepository.createActivity({
      created_at: new Date('2023-10-11T18:40:00'),
      user_progress_id: progress.id,
      finished_at: new Date('2023-10-11T19:21:00'),
    })

    await expect(sut.execute(id)).rejects.toBeInstanceOf(ResumeError)
  })
})
