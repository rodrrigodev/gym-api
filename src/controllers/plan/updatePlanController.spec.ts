import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { controllerTestHelper } from '@/tests/controllerTestHelper'

describe('update a plan test', () => {
  it('should be able to update a plan', async () => {
    const plans = await controllerTestHelper.createPlans()
    const { body, status } = await request(app).patch('/update-plan').send({
      id: plans[0].id,
      name: 'premium++',
      price: 300.0,
    })

    expect(status).toBe(201)
    expect(body).toHaveProperty('price')
    expect(body.name).toEqual(expect.stringContaining('premium++'))
  })
})
