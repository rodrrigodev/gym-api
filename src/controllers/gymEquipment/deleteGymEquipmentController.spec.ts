import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('delete a gym equipment test', () => {
  it('should be able to delete a gym equipment', async () => {
    const gym equipment = await testHelper.createGym equipment()
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .delete('/ equipment/delete')
      .send({
        id: gym equipment[0].id,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(200)
    expect(body).toHaveProperty('message')
    expect(body.message).toEqual(
      expect.stringContaining('Gym equipment deleted successfully!'),
    )
  })
})
