import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'
import { randomUUID } from 'node:crypto'

describe('create user progress test', () => {
  it('should be able to create a user progress', async () => {
    const users = await testHelper.createRandomUsers()
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .post('/progress/create')
      .send({
        userId: users[5].id,
        initialWeight: 74,
        currentGoal: 'bulk up',
        workouts: [{ id: randomUUID(), category: 'legs' }],
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(201)
    expect(body.initial_weight).toBe(74)
  })
})
