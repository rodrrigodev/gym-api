import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('create training test', () => {
  it('should be able to create a training', async () => {
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .post('/training/create')
      .send({
        level: 'beginner',
        category: 'chest',
        type: 'bulk up',
        ageGroup: '25-40',
        gender: 'male',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(201)
    expect(body).toHaveProperty('id')
    expect(body.type).toBe('bulk up')
  })
})
