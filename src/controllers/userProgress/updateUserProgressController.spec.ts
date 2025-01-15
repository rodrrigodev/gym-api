import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { controllerTestHelper } from '@/tests/controllerTestHelper'

describe('update user progress test', () => {
  it('should be able to update a user progress', async () => {
    const users = await controllerTestHelper.createRandomUsers()

    const response = await request(app).post('/create-progress').send({
      userId: users[5].id,
      initialWeight: 74,
      currentGoal: 'bulk up',
      nextWorkout: 'legs',
    })

    const { body, status } = await request(app).patch('/update-progress').send({
      id: response.body.id,
      initialWeight: 76,
      nextWorkout: 'back',
      currentGoal: null,
      currentStreak: 7,
      maxStreakReached: 7,
    })

    expect(status).toBe(200)
    expect(body.initial_weight).toBe(76)
    expect(body.next_workout).toBe('back')
  })
})
