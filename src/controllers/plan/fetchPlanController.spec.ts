import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('fetch plans test', () => {
  it('should be able to fetch plans', async () => {
    await testHelper.createPlans()
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .get('/plan/all')
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(200)
    expect(body).toHaveLength(2)
    expect(body[0].name).toEqual(expect.stringContaining('basic'))
  })
})
