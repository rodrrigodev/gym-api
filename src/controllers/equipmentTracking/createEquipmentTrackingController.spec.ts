import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { controllerTestHelper } from '@/tests/controllerTestHelper'

describe('create an equipment tracking test', () => {
  it('should be able to create an equipment tracking', async () => {
    const users = await controllerTestHelper.createRandomUsers()
    const userProgress =
      await controllerTestHelper.createRandomUsersProgress(users)
    const gymEquipments = await controllerTestHelper.createGymEquipments()

    const { body, status } = await request(app)
      .post('/create-equipment-tracking')
      .send({
        actualWeight: 5,
        initialWeight: 5,
        gymEquipmentId: gymEquipments[0].id,
        userProgressId: userProgress[0].id,
        active: true,
      })

    expect(status).toBe(201)
    expect(body).toHaveProperty('actual_weight')
    expect(body.initial_weight).toBe(5)
  })
})
