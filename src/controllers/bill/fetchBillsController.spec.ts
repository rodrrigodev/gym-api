import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { controllerTestHelper } from '@/tests/controllerTestHelper'

describe('fetch bills test', () => {
  it('should be able to fetch bills', async () => {
    await controllerTestHelper.createBills()

    const { body, status } = await request(app).get('/fetch-bills').query({
      name: null,
      category: null,
      period: 30,
      page: 1,
    })

    expect(status).toBe(200)
    expect(body).toHaveProperty('bills')
    expect(body.bills[0].price).toEqual(expect.stringContaining('15.66'))
  })
})
