import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('create activity test', () => {
  it('should be able to create an activity', async () => {
    const users = await testHelper.createRandomUsers()
    const usersProgresses = await testHelper.createRandomUsersProgress(users)
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .post('/activity/create')
      .send({
        userProgressId: usersProgresses[5].id,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(201)
    expect(body).toHaveProperty('workout')
    expect(body.finished_at).toBe(null)
  })
})
