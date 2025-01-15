import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { controllerTestHelper } from '@/tests/controllerTestHelper'

describe('create activity test', () => {
  it('should be able to create an activity', async () => {
    const users = await controllerTestHelper.createRandomUsers()
    const usersProgresses =
      await controllerTestHelper.createRandomUsersProgress(users)

    const { body, status } = await request(app).post('/create-activity').send({
      userProgressId: usersProgresses[5].id,
    })

    expect(status).toBe(201)
    expect(body).toHaveProperty('workout')
    expect(body.finished_at).toBe(null)
  })
})
