import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('fetch bills test', () => {
  it('should be able to fetch bills', async () => {
    await testHelper.createBills()
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .get('/bill/all')
      .query({
        period: 30,
        page: 1,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(200)
    expect(body).toHaveProperty('bills')
    expect(body.bills[0].category).toEqual(expect.stringContaining('revenue'))
  })
})
