import { describe, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'

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
    })

    console.log((await user).body)
  })
})
