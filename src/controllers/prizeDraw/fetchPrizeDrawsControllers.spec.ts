import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { controllerTestHelper } from '@/tests/controllerTestHelper'

describe('fetch prize draws test', () => {
  it('should be able to draw a participant winner', async () => {
    const token = await controllerTestHelper.createAndAuthenticateUser(app)
    await controllerTestHelper.createPrizeDraw()

    const { body, status } = await request(app)
      .get('/prize-draws')
      .query({ page: 1 })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(200)
    expect(body).toHaveLength(3)
  })
})
