import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('create training and gym equipment relation test', () => {
  it('should be able to create training and gym equipment relation', async () => {
    const training = await testHelper.createRandomTrainings()
    const gymEquipment = await testHelper.createGymEquipment()

    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .post('/training-gym-equipment/create')
      .send({
        trainingId: training[0].id,
        gymEquipmentIds: [gymEquipment[0].id, gymEquipment[1].id],
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(201)
    expect(body).toHaveProperty('trainingId')
    expect(body).toHaveProperty('gymEquipment')
    expect(body.gymEquipment).toHaveLength(2)
  })
})
