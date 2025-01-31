import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('create a gym equipment test', () => {
  it('should be able to create a gym equipment', async () => {
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .post('/equipments/create')
      .send({
        name: 'Leg Press 45',
        category: 'legs',
        sets: 12,
        reps: 4,
        cod: 1,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(201)
    expect(body).toHaveProperty('name')
    expect(body.category).toEqual(expect.stringContaining('legs'))
  })
})
