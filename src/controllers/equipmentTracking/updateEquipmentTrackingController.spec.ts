import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('update an equipment tracking test', () => {
  it('should be able to update an equipment tracking', async () => {
    const gymEquipmentTracking = await testHelper.createEquipmentTracking()
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .patch('/tracking/update')
      .send({
        id: gymEquipmentTracking[0].id,
        actualWeight: gymEquipmentTracking[0].actual_weight + 3,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(201)
    expect(body.actual_weight).toBe(5)
    expect(body.active).toBeTruthy()
  })
})
