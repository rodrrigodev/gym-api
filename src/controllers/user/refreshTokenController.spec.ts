import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { controllerTestHelper } from '@/tests/controllerTestHelper'

describe('authenticate user test', () => {
  it('should be able to refresh a token a user', async () => {
    await controllerTestHelper.createAndAuthenticateUser(app)

    const loginResponse = await request(app).post('/login').send({
      email: 'jane_smith@email.com',
      password: '12345678',
    })

    const cookies = loginResponse.headers['set-cookie']

    const { body, status } = await request(app)
      .post('/refresh-token')
      .set('Cookie', cookies)

    expect(status).toBe(200)
    expect(body.token).toEqual(expect.any(String))
  })
})
