import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { controllerTestHelper } from '@/tests/controllerTestHelper'

describe('create user progress test', () => {
  it('should be able to create a user progress', async () => {
    const users = await controllerTestHelper.createRandomUsers()

    const { body, status } = await request(app).post('/create-progress').send({
      userId: users[5].id,
      initialWeight: 74,
      currentGoal: 'bulk up',
      nextWorkout: 'legs',
    })

    expect(status).toBe(201)
    expect(body.initial_weight).toBe(74)
    expect(body.next_workout).toBe('legs')
  })
})
