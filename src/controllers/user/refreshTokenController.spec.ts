import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('refresh token test', () => {
  it('should be able to refresh a token', async () => {
    await testHelper.createAndAuthenticateUser(app)

    const loginResponse = await request(app).post('/user/auth').send({
      email: 'jane_smith@email.com',
      password: '12345678',
    })

    const cookies = loginResponse.headers['set-cookie']

    const { body, status } = await request(app)
      .post('/user/refresh-token')
      .set('Cookie', cookies)

    expect(status).toBe(200)
    expect(body.token).toEqual(expect.any(String))
  })
})
