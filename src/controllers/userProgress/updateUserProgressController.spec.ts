import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'
import { randomUUID } from 'node:crypto'

describe('update user progress test', () => {
  it('should be able to update a user progress', async () => {
    const users = await testHelper.createRandomUsers()
    const token = await testHelper.createAndAuthenticateUser(app)

    await request(app)
      .post('/progress/create')
      .send({
        userId: users[5].id,
        initialWeight: 74,
        currentGoal: 'bulk up',
        workouts: [{ id: randomUUID(), category: 'legs' }],
      })
      .set('Authorization', `Bearer ${token}`)

    const { body, status } = await request(app)
      .patch('/progress/update')
      .send({
        id: users[5].id,
        initialWeight: 76,
        currentStreak: 7,
        maxStreakReached: 7,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(200)
    expect(body.initial_weight).toBe(76)
    expect(body.current_goal).toBe('bulk up')
  })
})
