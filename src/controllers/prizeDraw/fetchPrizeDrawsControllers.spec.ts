import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('fetch prize draws test', () => {
  it('should be able to draw a participant winner', async () => {
    const token = await testHelper.createAndAuthenticateUser(app)
    await testHelper.createPrizeDraw()

    const { body, status } = await request(app)
      .get('/prize/all')
      .query({ page: 1 })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(200)
    expect(body).toHaveLength(3)
  })
})
