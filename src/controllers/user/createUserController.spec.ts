import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('create user test', () => {
  it('should be able to create a user', async () => {
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .post('/create-user')
      .send({
        email: 'john_smith@email.com',
        name: 'John Smith',
        password: '12345678',
        nickname: null,
        cellPhone: null,
        birthDate: null,
        weight: null,
        height: null,
        imageUrl: null,
        role: 'USER',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(201)
    expect(body).toHaveProperty('email')
    expect(body.name).toEqual(expect.stringContaining('John Smith'))
  })
})
