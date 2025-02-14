import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('create an equipment tracking test', () => {
  it('should be able to create an equipment tracking', async () => {
    const users = await testHelper.createRandomUsers()
    const userProgress = await testHelper.createRandomUsersProgress(users)
    const gym equipment = await testHelper.createGym equipment()
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .post('/tracking/create')
      .send({
        actualWeight: 5,
        initialWeight: 5,
        gymEquipmentId: gym equipment[0].id,
        userProgressId: userProgress[0].id,
        active: true,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(201)
    expect(body).toHaveProperty('actual_weight')
    expect(body.initial_weight).toBe(5)
  })
})
