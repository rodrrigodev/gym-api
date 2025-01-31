import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('update a plan test', () => {
  it('should be able to update a plan', async () => {
    const plans = await testHelper.createPlans()
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .patch('/plan/update')
      .send({
        id: plans[0].id,
        name: 'premium++',
        price: 300.0,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(201)
    expect(body).toHaveProperty('price')
    expect(body.name).toEqual(expect.stringContaining('premium++'))
  })
})
