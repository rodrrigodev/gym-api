import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('fetch user details test', () => {
  it('should be able to fetch user details', async () => {
    const users = await testHelper.createRandomUsers()
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .get(`/user/${users[15].id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(200)
    expect(body).toHaveProperty('user')
    expect(body.user.email).toEqual(expect.any(String))
  })

  it('should be able to fetch user details', async () => {
    const users = await testHelper.createRandomUsers()
    const token = await testHelper.createAndAuthenticateUser(app)

    const { body, status } = await request(app)
      .get(`/user/${users[15].id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(200)
    expect(body).toHaveProperty('user')
    expect(body.user.email).toEqual(expect.any(String))
  })
})
