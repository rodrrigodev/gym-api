import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('create bill test', () => {
  it('should be able to create a bill', async () => {
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .post('/bill/create')
      .send({
        name: 'Sabonete liquido',
        category: 'cleaning',
        price: '25.45',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(201)
    expect(body).toHaveProperty('name')
    expect(body.category).toBe('cleaning')
    expect(body.price).toBe('2545')
  })
})
