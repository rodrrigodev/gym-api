import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUserTestHelper } from '@/tests/createAndAuthenticateUserTestHelper'

describe('create user test', () => {
  it('should be able to create a user', async () => {
    const token = await createAndAuthenticateUserTestHelper(app)

    const { body, status } = await request(app)
      .post('/create-user')
      .send({
        email: 'rodrigo@email.com',
        name: 'Rodrigo',
        password: '12345678',
        nickname: null,
        birthDate: null,
        weight: null,
        height: null,
        imageUrl: null,
        role: 'ADMIN',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(201)
    expect(body).toHaveProperty('message')
    expect(body.message).toEqual(
      expect.stringContaining('User created successfully!'),
    )
  })
})
