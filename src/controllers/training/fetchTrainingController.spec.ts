import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('fetch trainings test', () => {
  it('should be able to fetch a training', async () => {
    await testHelper.createRandomTrainings()
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .get('/training/all')
      .query({
        page: 1,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(200)
    expect(body.trainings).toHaveLength(3)
  })
})
