import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { InMemoryUserProgressRepository } from '@/repositories/inMemory/inMemoryUserProgressRepository'
import { UserProgressError } from '@/errors/userProgressError'
import { UpdateUserProgressUseCase } from './updateUserProgressUseCase'

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
    const user = await inMemoryUserRepository.createUser({
      name: 'Rodrigo',
      email: 'rodrigo@email.com',
      password: '12345678',
      created_at: new Date(),
    })

    const progress = await inMemoryUserProgressRepository.createUserProgress({
      user_id: user.id,
      initial_weight: 44,
      next_workout: 'back',
      current_goal: 'slim down',
    })

    const userProgressUpdated = await sut.execute(progress.user_id, {
      initial_weight: 82,
      next_workout: 'legs',
    })

    expect(userProgressUpdated?.initial_weight).toBe(82)
    expect(userProgressUpdated?.next_workout).toBe('legs')
  })

  it('should not be able to update user progress', async () => {
    const user = await inMemoryUserRepository.createUser({
      name: 'Rodrigo',
      email: 'rodrigo@email.com',
      password: '12345678',
      created_at: new Date(),
    })

    await inMemoryUserProgressRepository.createUserProgress({
      user_id: user.id,
      initial_weight: 44,
      next_workout: 'back',
      current_goal: 'slim down',
    })

    await expect(
      sut.execute('progressId', {
        initial_weight: 82,
        next_workout: 'legs',
      }),
    ).rejects.toBeInstanceOf(UserProgressError)
  })
})
