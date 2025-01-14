import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { controllerTestHelper } from '@/tests/controllerTestHelper'

describe('draw participant winner test', () => {
  it('should be able to draw a participant winner', async () => {
    const token = await controllerTestHelper.createAndAuthenticateUser(app)
    await controllerTestHelper.createRandomUsers()
    const prize = await controllerTestHelper.createPrizeDraw()

    const { body, status } = await request(app)
      .post('/draw-participant')
      .send({
        prizeDrawId: prize.id,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(201)
    expect(body).toHaveProperty('prize')
    expect(body.status).toEqual(expect.stringContaining('finished'))
  })
})
