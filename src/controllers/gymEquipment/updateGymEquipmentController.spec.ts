import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { controllerTestHelper } from '@/tests/controllerTestHelper'

describe('update gym equipment test', () => {
  it('should be able to update a gym equipment', async () => {
    const gymEquipments = await controllerTestHelper.createGymEquipments()

    const { body, status } = await request(app)
      .patch('/update-gym-equipment')
      .send({
        id: gymEquipments[0].id,
        name: 'Leg Curl Machine',
        category: 'legs',
        sets: 10,
        reps: 4,
        cod: 4,
        status: 'broken',
        last_maintenance: new Date('2024-11-15:10:15:00'),
      })

    expect(status).toBe(200)
    expect(body.name).toEqual(expect.stringContaining('Leg Curl Machine'))
    expect(body.category).toEqual(expect.stringContaining('legs'))
  })
})
