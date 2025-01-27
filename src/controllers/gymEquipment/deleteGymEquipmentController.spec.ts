import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { controllerTestHelper } from '@/tests/controllerTestHelper'

describe('delete a gym equipment test', () => {
  it('should be able to delete a gym equipment', async () => {
    const gymEquipments = await controllerTestHelper.createGymEquipments()

    const { body, status } = await request(app)
      .delete('/delete-gym-equipment')
      .send({
        id: gymEquipments[0].id,
      })

    expect(status).toBe(200)
    expect(body).toHaveProperty('message')
    expect(body.message).toEqual(
      expect.stringContaining('Gym equipment deleted successfully!'),
    )
  })
})
