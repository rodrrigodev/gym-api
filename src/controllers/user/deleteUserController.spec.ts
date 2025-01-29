import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('delete user test', () => {
  it('should be able to delete a user', async () => {
    const users = await testHelper.createRandomUsers()
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .delete('/delete-user')
      .send({
        id: users[0].id,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(200)
    expect(body).toHaveProperty('message')
    expect(body.message).toEqual(
      expect.stringContaining('User deleted successfully!'),
    )
  })
})
