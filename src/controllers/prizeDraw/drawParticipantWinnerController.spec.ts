import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('draw participant winner test', () => {
  it('should be able to draw a participant winner', async () => {
    const token = await testHelper.createAndAuthenticateUser(app)
    await testHelper.createRandomUsers()
    const prize = await testHelper.createPrizeDraw()

    const { body, status } = await request(app)
      .post('/prize/draw')
      .send({
        prizeDrawId: prize.id,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(201)
    expect(body).toHaveProperty('prize')
    expect(body.status).toEqual(expect.stringContaining('finished'))
  })
})
