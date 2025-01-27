import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { controllerTestHelper } from '@/tests/controllerTestHelper'

describe('fetch gym equipments test', () => {
  it('should be able to fetch gym equipments', async () => {
    await controllerTestHelper.createGymEquipments()

    const { body, status } = await request(app)
      .get('/fetch-gym-equipments')
      .query({ category: 'legs' })

    expect(status).toBe(200)
    expect(body).toHaveLength(1)
    expect(body[0].name).toEqual(expect.stringContaining('Leg Press 45'))
  })
})
