import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { controllerTestHelper } from '@/tests/controllerTestHelper'

describe('update an equipment tracking test', () => {
  it('should be able to update an equipment tracking', async () => {
    const gymEquipmentTracking =
      await controllerTestHelper.createEquipmentTracking()

    const { body, status } = await request(app)
      .patch('/update-equipment-tracking')
      .send({
        id: gymEquipmentTracking[0].id,
        actualWeight: gymEquipmentTracking[0].actual_weight + 3,
      })

    expect(status).toBe(201)
    expect(body.actual_weight).toBe(5)
    expect(body.active).toBeTruthy()
  })
})
