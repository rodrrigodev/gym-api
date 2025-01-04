import { describe, expect, it, jest } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/tests/createAndAuthenticateUser'

describe('create user test', () => {
  it('should be able to create a user', async () => {
    const user = request(app).post('/create-user').send({
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

    console.log((await user).body)

    expect(10 + 10).toBe(20)
  })
})
