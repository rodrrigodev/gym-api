import { describe, expect, it } from '@jest/globals'
import request from 'supertest'
import { app } from '@/app'
import { testHelper } from '@/tests/testHelper'

describe('get a lucky number test', () => {
  it('should be able to get a lucky number', async () => {
    const users = await testHelper.createRandomUsers()

    const { body, status } = await request(app)
      .post('/lucky-number')
      .send({ type: 'str', id: users[16].id })

    expect(status).toBe(200)
    expect(body).toHaveLength(2)
  })
})
