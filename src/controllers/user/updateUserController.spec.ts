import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { controllerTestHelper } from '@/tests/controllerTestHelper'

describe('update user test', () => {
  it('should be able to update a user', async () => {
    const token = await controllerTestHelper.createAndAuthenticateUser(app)
    const user = await controllerTestHelper.createRandomUsers()

    const { body, status } = await request(app)
      .patch('/update-user')
      .send({
        id: user[8].id,
        email: 'john_doeII@email.com',
        name: 'John Doe II',
        nickname: 'doe',
        birthDate: null,
        height: 1.75,
        currentWeight: 74,
        imageURL: null,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(200)
    expect(body).toHaveProperty('email')
    expect(body.name).toEqual(expect.stringContaining('John Doe II'))
  })
})
