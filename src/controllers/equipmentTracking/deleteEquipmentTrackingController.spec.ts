import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { controllerTestHelper } from '@/tests/controllerTestHelper'

describe('delete an equipment tracking test', () => {
  it('should be able to delete an equipment tracking', async () => {
    const gymEquipmentTracking =
      await controllerTestHelper.createEquipmentTracking()

    const { body, status } = await request(app)
      .delete('/delete-equipment-tracking')
      .send({
        id: gymEquipmentTracking[0].id,
      })

    expect(status).toBe(200)
    expect(body.message).toEqual(
      expect.stringContaining('Equipment tracking deleted successfully!'),
    )
  })
})
