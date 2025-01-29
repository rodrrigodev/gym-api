import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('fetch users test', () => {
  it('should be able to fetch users', async () => {
    await testHelper.createRandomUsers()

    const { body, status } = await request(app)
      .get('/users')
      .query({ page: 1, query: null })

    expect(status).toBe(200)
    expect(body).toHaveProperty('users')
    expect(body).toHaveProperty('length')
    expect(body.length).toBe(2)
    expect(body.users).toHaveLength(20)
  })

  it('should be able to fetch users', async () => {
    await testHelper.createRandomUsers()

    const { body, status } = await request(app)
      .get('/users')
      .query({ page: 1, query: 'roe0' })

    expect(status).toBe(200)
    expect(body).toHaveProperty('users')
    expect(body).toHaveProperty('length')
    expect(body.length).toBe(1)
    expect(body.users).toHaveLength(1)
  })
})
