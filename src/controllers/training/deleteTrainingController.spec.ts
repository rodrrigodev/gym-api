import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('delete training test', () => {
  it('should be able to delete a training', async () => {
    const training = await testHelper.createRandomTrainings()
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .delete('/training/delete')
      .send({
        id: training[0].id,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(200)
    expect(body.message).toBe('Training deleted successfully!')
  })
})
