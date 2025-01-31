import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('create plan test', () => {
  it('should be able to create a plan', async () => {
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .post('/plan/create')
      .send({
        name: 'basic',
        price: 120.0,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(201)
    expect(body).toHaveProperty('price')
    expect(body.name).toEqual(expect.stringContaining('basic'))
  })
})
