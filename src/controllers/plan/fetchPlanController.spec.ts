import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { controllerTestHelper } from '@/tests/controllerTestHelper'

describe('fetch plans test', () => {
  it('should be able to fetch plans', async () => {
    await controllerTestHelper.createPlans()

    const { body, status } = await request(app).get('/fetch-plans')

    expect(status).toBe(200)
    expect(body).toHaveLength(2)
    expect(body[0].name).toEqual(expect.stringContaining('basic'))
  })
})
