import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('authenticate user test', () => {
  it('should be able to authenticate a user', async () => {
    await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app).post('/user/auth').send({
      email: 'jane_smith@email.com',
      password: '12345678',
    })

    expect(status).toBe(200)
    expect(body.token).toEqual(expect.any(String))
  })
})
