import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('delete training and gym equipment relation test', () => {
  it('should be able to delete training and gym equipment relation', async () => {
    const training = await testHelper.createRandomTrainings()
    const gymEquipment = await testHelper.createGymEquipment()

    const token = await testHelper.createAndAuthenticateUser(app)

    await request(app)
      .post('/training-gym-equipment/create')
      .send({
        trainingId: training[0].id,
        gymEquipmentIds: [gymEquipment[0].id, gymEquipment[1].id],
      })
      .set('Authorization', `Bearer ${token}`)

    const { body, status } = await request(app)
      .delete('/training-gym-equipment/delete')
      .send({
        trainingId: training[0].id,
        gymEquipmentId: gymEquipment[0].id,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(200)
    expect(body).toHaveProperty('message')
    expect(body.message).toEqual(
      expect.stringContaining(
        'Training and gym equipment deleted successfully!',
      ),
    )
  })
})
