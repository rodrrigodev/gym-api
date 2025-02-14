import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('fetch gym  equipment test', () => {
  it('should be able to fetch gym  equipment', async () => {
    await testHelper.createGym equipment()
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .get('/ equipment/all')
      .query({ category: 'legs' })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(200)
    expect(body).toHaveLength(1)
    expect(body[0].name).toEqual(expect.stringContaining('Leg Press 45'))
  })
})
