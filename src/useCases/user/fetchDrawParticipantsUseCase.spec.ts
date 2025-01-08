import { InMemoryUserRepository } from '@/repositories/inMemory/inMemoryUserRepository'
import { beforeEach, describe, expect, it } from '@jest/globals'
import { FetchDrawParticipantsUseCase } from './fetchDrawParticipantsUseCase'
import { createUsersTestHelper } from '@/tests/createUsersTestHelper'
import { NoParticipantsFoundError } from '@/errors/noParticipantsFoundError'

let inMemoryUserRepository: InMemoryUserRepository
let sut: FetchDrawParticipantsUseCase

describe('fetch user details test', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new FetchDrawParticipantsUseCase(inMemoryUserRepository)
  })

  it('should be able to fetch draw participants', async () => {
    await createUsersTestHelper(inMemoryUserRepository)

    const drawParticipants = await sut.execute()

    expect(drawParticipants).toHaveLength(9)
    expect(drawParticipants[0].name).toBe('Alex-0')
  })

  it('should not be able to fetch user details passing wrong id', async () => {
    await expect(sut.execute()).rejects.toBeInstanceOf(NoParticipantsFoundError)
  })
})
