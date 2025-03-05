import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('update training test', () => {
  it('should be able to update a training', async () => {
    const training = await testHelper.createRandomTrainings()
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .patch('/training/update')
      .send({
        id: training[0].id,
        gender: 'female',
        level: 'medium',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(200)
    expect(body.gender).toEqual(expect.stringContaining('female'))
    expect(body.level).toEqual(expect.stringContaining('medium'))
  })
})
