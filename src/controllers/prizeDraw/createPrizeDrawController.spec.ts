import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { controllerTestHelper } from '@/tests/controllerTestHelper'

describe('create prize draw test', () => {
  it('should be able to create a prize draw', async () => {
    const token = await controllerTestHelper.createAndAuthenticateUser(app)

    const date = new Date()
    date.setDate(date.getDate() + 15)

    const { body, status } = await request(app)
      .post('/create-prize')
      .send({
        prize: 'Protein kit',
        status: 'waiting',
        finishedAt: date,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(201)
    expect(body).toHaveProperty('prize')
    expect(body.status).toEqual(expect.stringContaining('waiting'))
  })
})
